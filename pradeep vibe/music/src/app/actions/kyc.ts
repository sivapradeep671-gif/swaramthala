'use server';
import { prisma } from '@/lib/db';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';

export async function submitVerification(formData: FormData) {
    const user = await getUser();
    if (!user) return { error: 'Unauthorized' };

    const documentType = formData.get('documentType') as string;
    const documentUrl = formData.get('documentUrl') as string;
    const spotify = formData.get('spotify') as string;
    const instagram = formData.get('instagram') as string;
    const youtube = formData.get('youtube') as string;

    const socialLinks = JSON.stringify({ spotify, instagram, youtube });

    try {
        // Create a new verification request
        await prisma.verificationRequest.create({
            data: {
                userId: user.id,
                documentType,
                documentUrl,
                socialLinks,
                status: 'pending'
            }
        });

        // Update user status
        await prisma.user.update({
            where: { id: user.id },
            data: { kycStatus: 'pending' }
        });

        revalidatePath('/dashboard');
        revalidatePath('/settings/verification');
        return { success: true };
    } catch (error) {
        console.error("KYC Submission error:", error);
        return { error: 'Failed to submit verification request' };
    }
}

export async function getVerificationStatus() {
    const user = await getUser();
    if (!user) return { error: 'Unauthorized' };

    try {
        const latestRequest = await prisma.verificationRequest.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });

        return {
            kycStatus: user.kycStatus || 'none',
            latestRequest
        };
    } catch (error) {
        console.error("Get KYC Status error:", error);
        return { error: 'Failed to fetch verification status' };
    }
}

export async function adminApproveVerification(requestId: string) {
    const admin = await getUser();
    if (!admin || admin.role !== 'admin') return { error: 'Unauthorized' };

    try {
        const request = await prisma.verificationRequest.findUnique({
            where: { id: requestId },
            include: { user: true }
        });

        if (!request) return { error: 'Request not found' };

        await prisma.$transaction([
            prisma.verificationRequest.update({
                where: { id: requestId },
                data: { status: 'approved' }
            }),
            prisma.user.update({
                where: { id: request.userId },
                data: {
                    kycStatus: 'verified',
                    verified: true,
                    documentType: request.documentType,
                    documentUrl: request.documentUrl,
                    socialLinks: request.socialLinks,
                    lastVerificationDate: new Date()
                }
            })
        ]);

        revalidatePath('/admin/verification');
        revalidatePath(`/profile/${request.userId}`);
        return { success: true };
    } catch (error) {
        console.error("Admin Approve KYC error:", error);
        return { error: 'Failed to approve verification' };
    }
}

export async function adminRejectVerification(requestId: string, reason: string) {
    const admin = await getUser();
    if (!admin || admin.role !== 'admin') return { error: 'Unauthorized' };

    try {
        const request = await prisma.verificationRequest.findUnique({
            where: { id: requestId }
        });

        if (!request) return { error: 'Request not found' };

        await prisma.$transaction([
            prisma.verificationRequest.update({
                where: { id: requestId },
                data: {
                    status: 'rejected',
                    rejectionReason: reason
                }
            }),
            prisma.user.update({
                where: { id: request.userId },
                data: { kycStatus: 'rejected' }
            })
        ]);

        revalidatePath('/admin/verification');
        return { success: true };
    } catch (error) {
        console.error("Admin Reject KYC error:", error);
        return { error: 'Failed to reject verification' };
    }
}
