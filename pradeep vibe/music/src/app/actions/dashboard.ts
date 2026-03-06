'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateListingStatus(id: string, status: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'Unauthorized' };

    try {
        if (status === 'promote') {
            await prisma.listing.update({
                where: { id, sellerId: user.id },
                data: { isPromoted: true, promotedAt: new Date() }
            });
        } else {
            await prisma.listing.update({
                where: { id, sellerId: user.id },
                data: { status }
            });
        }
        revalidatePath('/dashboard');
        revalidatePath(`/product/${id}`);
        revalidatePath('/browse');
        return { success: true };
    } catch (err) {
        return { error: 'Failed to update listing status' };
    }
}

export async function deleteListing(id: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'Unauthorized' };

    try {
        await prisma.listing.delete({
            where: { id, sellerId: user.id }
        });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (err) {
        return { error: 'Failed to delete listing' };
    }
}
