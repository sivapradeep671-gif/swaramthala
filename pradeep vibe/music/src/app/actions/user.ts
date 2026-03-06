'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const city = formData.get('city') as string;
    const avatar = formData.get('avatar') as string;

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                email: email || null,
                city,
                avatar
            }
        });

        revalidatePath('/settings');
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error("UpdateProfile error:", error);
        return { error: 'Failed to update profile' };
    }
}

export async function getSellerStats() {
    const { user, error } = await getAuthUser();
    if (error || !user) return null;

    try {
        const listings = await prisma.listing.findMany({
            where: { sellerId: user.id }
        });

        const orders = await prisma.order.findMany({
            where: { sellerId: user.id },
            include: { listing: true }
        });

        const activeListings = listings.filter(l => l.status === 'active').length;
        const totalSales = orders.filter(o => o.status === 'completed' && o.type === 'buy').length;
        const totalRentals = orders.filter(o => o.status === 'completed' && o.type === 'rent').length;

        const totalEarnings = orders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + o.amount, 0);

        const pendingOrders = orders.filter(o => o.status === 'pending').length;

        return {
            activeListings,
            totalSales,
            totalRentals,
            totalEarnings,
            pendingOrders,
            totalViews: listings.reduce((sum, l) => sum + (l.views || 0), 0),
            totalFavorites: listings.reduce((sum, l) => sum + (l.favorites || 0), 0)
        };
    } catch (error) {
        console.error("GetSellerStats error:", error);
        return null;
    }
}
