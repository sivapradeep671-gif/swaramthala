import { prisma } from '@/lib/db';
import DashboardClient from './DashboardClient';
import { getUser } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import { getSellerAnalytics } from '@/app/actions/analytics';

export default async function DashboardPage() {
    const user = await getUser();
    if (!user) {
        redirect('/auth');
    }

    const activeListings = await prisma.listing.findMany({
        where: { sellerId: user.id },
        orderBy: { createdAt: 'desc' },
        include: { seller: true, favoriteRecords: true, messages: true }
    });

    const ordersAsBuyer = await prisma.order.findMany({
        where: { buyerId: user.id },
        orderBy: { createdAt: 'desc' },
        include: { listing: true, seller: true }
    });

    const ordersAsSeller = await prisma.order.findMany({
        where: { sellerId: user.id },
        orderBy: { createdAt: 'desc' },
        include: { listing: true, buyer: true }
    });

    // Aggregate Analytics
    const totalViews = activeListings.reduce((sum, l) => sum + (l.views || 0), 0);
    const totalFavorites = activeListings.reduce((sum, l) => sum + (l.favoriteRecords?.length || 0), 0);
    const totalMessages = activeListings.reduce((sum, l) => sum + (l.messages?.length || 0), 0);

    // Format for client
    const formattedListings = activeListings.map((listing: any) => ({
        ...listing,
        images: JSON.parse(listing.images),
        tags: JSON.parse(listing.tags),
        favoriteCount: listing.favoriteRecords.length,
        messageCount: listing.messages.length
    }));

    const formattedPurchases = ordersAsBuyer.map((order: any) => ({
        ...order,
        listing: {
            ...order.listing,
            images: JSON.parse(order.listing.images)
        }
    }));

    const formattedSales = ordersAsSeller.map((order: any) => ({
        ...order,
        listing: {
            ...order.listing,
            images: JSON.parse(order.listing.images)
        }
    }));

    const advancedAnalytics = await getSellerAnalytics();

    return <DashboardClient
        user={user}
        initialListings={formattedListings}
        purchases={formattedPurchases}
        sales={formattedSales}
        analytics={{
            totalViews,
            totalFavorites,
            totalMessages,
            topListings: formattedListings.sort((a, b) => (b.views + b.favoriteCount) - (a.views + a.favoriteCount)).slice(0, 3)
        }}
        advancedAnalytics={advancedAnalytics}
    />;
}
