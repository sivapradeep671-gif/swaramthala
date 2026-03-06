'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function toggleFavorite(listingId: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        const existing = await prisma.favorite.findUnique({
            where: {
                userId_listingId: {
                    userId: user.id,
                    listingId
                }
            }
        });

        if (existing) {
            await prisma.favorite.delete({
                where: { id: existing.id }
            });
            await prisma.listing.update({
                where: { id: listingId },
                data: { favorites: { decrement: 1 } }
            });
        } else {
            await prisma.favorite.create({
                data: {
                    userId: user.id,
                    listingId
                }
            });
            await prisma.listing.update({
                where: { id: listingId },
                data: { favorites: { increment: 1 } }
            });
        }

        revalidatePath('/');
        revalidatePath('/browse');
        revalidatePath('/favorites');
        revalidatePath(`/product/${listingId}`);
        return { success: true, favorited: !existing };
    } catch (error) {
        console.error("Toggle favorite error:", error);
        return { error: 'Failed to toggle favorite' };
    }
}
