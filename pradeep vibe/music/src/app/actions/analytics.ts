'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { startOfDay, subDays, format, eachDayOfInterval } from 'date-fns';

export async function getSellerAnalytics() {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'Unauthorized' };

    try {
        const thirtyDaysAgo = subDays(new Date(), 30);

        // Fetch orders for the last 30 days
        const orders = await prisma.order.findMany({
            where: {
                sellerId: user.id,
                status: 'completed',
                createdAt: { gte: thirtyDaysAgo }
            },
            select: {
                amount: true,
                createdAt: true,
                type: true
            }
        });

        // Generate daily earnings map
        const dailyInterval = eachDayOfInterval({
            start: thirtyDaysAgo,
            end: new Date()
        });

        const earningsData = dailyInterval.map(date => {
            const dateStr = format(date, 'MMM dd');
            const dayOrders = orders.filter(o =>
                format(new Date(o.createdAt), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
            );
            const earnings = dayOrders.reduce((sum, o) => sum + o.amount, 0);

            return {
                date: dateStr,
                earnings
            };
        });

        // Summary metrics
        const totalEarnings = orders.reduce((sum, o) => sum + o.amount, 0);
        const salesCount = orders.filter(o => o.type === 'buy').length;
        const rentalCount = orders.filter(o => o.type === 'rent').length;

        // Listing performance
        const listings = await prisma.listing.findMany({
            where: { sellerId: user.id },
            select: {
                title: true,
                views: true,
                _count: {
                    select: { favoriteRecords: true }
                }
            },
            orderBy: { views: 'desc' },
            take: 5
        });

        return {
            earningsData,
            summary: {
                totalEarnings,
                salesCount,
                rentalCount
            },
            topListings: listings.map(l => ({
                title: l.title,
                views: l.views,
                favorites: l._count.favoriteRecords
            }))
        };
    } catch (err) {
        console.error('Analytics Error:', err);
        return { error: 'Failed to fetch analytics' };
    }
}
