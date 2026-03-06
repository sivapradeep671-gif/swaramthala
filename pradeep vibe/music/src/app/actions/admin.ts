'use server';

import { prisma } from '@/lib/db';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';

// Middleware-like check for admin
async function ensureAdmin() {
    const user = await getUser();
    if (!user || user.role !== 'admin') {
        throw new Error("Unauthorized");
    }
}

export async function toggleUserBlock(userId: string, currentStatus: boolean) {
    await ensureAdmin();

    await prisma.user.update({
        where: { id: userId },
        data: { isBlocked: !currentStatus }
    });

    revalidatePath('/admin/users');
    return { success: true };
}

export async function toggleListingApproval(listingId: string, currentStatus: boolean) {
    await ensureAdmin();

    await prisma.listing.update({
        where: { id: listingId },
        data: { isApproved: !currentStatus }
    });

    revalidatePath('/admin/listings');
    revalidatePath('/browse');
    return { success: true };
}

export async function deleteListingAdmin(listingId: string) {
    await ensureAdmin();

    await prisma.listing.delete({
        where: { id: listingId }
    });

    revalidatePath('/admin/listings');
    revalidatePath('/browse');
    return { success: true };
}
