'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { createNotification } from './notifications';

export async function submitReport(listingId: string, reason: string, details?: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'You must be logged in to report a listing' };

    try {
        // Create the report
        const report = await prisma.report.create({
            data: {
                listingId,
                reporterId: user.id,
                reason,
                details,
            },
            include: { listing: true }
        });

        // Increment the reported count on the listing
        await prisma.listing.update({
            where: { id: listingId },
            data: {
                reportedCount: { increment: 1 },
                // Auto-flag if it reaches a threshold (e.g., 3 reports)
                isFlagged: { set: true } // For now, any report flags it for review
            }
        });

        // Notify Admins
        const admins = await prisma.user.findMany({ where: { role: 'admin' } });
        await Promise.all(admins.map(admin =>
            createNotification(
                admin.id,
                'moderation',
                'New Listing Report',
                `Listing "${report.listing.title}" was reported for: ${reason}`,
                `/admin/moderation`
            )
        ));

        revalidatePath(`/product/${listingId}`);
        return { success: true };
    } catch (err) {
        return { error: 'Failed to submit report. Please try again later.' };
    }
}

export async function getReports() {
    const { user, error } = await getAuthUser();
    if (error || !user || user.role !== 'admin') return { error: 'Unauthorized' };

    try {
        const reports = await prisma.report.findMany({
            include: {
                listing: { include: { seller: true } },
                reporter: true
            },
            orderBy: { createdAt: 'desc' }
        });
        return { reports };
    } catch (err) {
        return { error: 'Failed to fetch reports' };
    }
}

export async function resolveReport(reportId: string, status: 'resolved' | 'dismissed') {
    const { user, error } = await getAuthUser();
    if (error || !user || user.role !== 'admin') return { error: 'Unauthorized' };

    try {
        await prisma.report.update({
            where: { id: reportId },
            data: { status }
        });
        revalidatePath('/admin/moderation');
        return { success: true };
    } catch (err) {
        return { error: 'Failed to update report status' };
    }
}
