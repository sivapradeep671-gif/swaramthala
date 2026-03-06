'use server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

// Helper to format Prisma objects into the shape expected by the frontend
async function formatListing(listing: any, currentUserId?: string | null) {
    let isFavorited = false;
    if (currentUserId) {
        const fav = await prisma.favorite.findUnique({
            where: {
                userId_listingId: {
                    userId: currentUserId,
                    listingId: listing.id
                }
            }
        });
        isFavorited = !!fav;
    }

    return {
        ...listing,
        images: JSON.parse(listing.images),
        tags: JSON.parse(listing.tags),
        isFavorited
    };
}

export async function getHomeListings() {
    const user = await getSession();
    const data = await prisma.listing.findMany({
        include: { seller: true },
        orderBy: [
            { isPromoted: 'desc' },
            { createdAt: 'desc' }
        ],
        take: 8,
    });
    return Promise.all(data.map(l => formatListing(l, user?.id)));
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export async function getBrowseListings(filters: any = {}, userLatLng?: { lat: number, lng: number }) {
    const user = await getSession();

    const where: any = {};
    if (filters.category) where.category = filters.category;
    if (filters.condition) where.condition = filters.condition;
    if (filters.type) where.type = filters.type;
    if (filters.soundDemo) where.hasSoundDemo = true;
    if (filters.verified) where.seller = { verified: true };
    if (filters.minPrice) where.price = { gte: parseFloat(filters.minPrice) };
    if (filters.maxPrice) {
        where.price = {
            ...(where.price || {}),
            lte: parseFloat(filters.maxPrice)
        };
    }

    const data = await prisma.listing.findMany({
        where,
        include: { seller: true },
        orderBy: [
            { isPromoted: 'desc' },
            { createdAt: 'desc' }
        ],
    });

    let results = await Promise.all(data.map(l => formatListing(l, user?.id)));

    if (userLatLng && userLatLng.lat && userLatLng.lng) {
        results = results.map(r => ({
            ...r,
            distance: r.latitude && r.longitude ? calculateDistance(userLatLng.lat, userLatLng.lng, r.latitude, r.longitude) : null
        }));

        if (filters.sortBy === 'distance') {
            results.sort((a, b) => {
                if (a.distance === null && b.distance === null) return 0;
                if (a.distance === null) return 1;
                if (b.distance === null) return -1;
                return a.distance - b.distance;
            });
        }
    }

    return results;
}

export async function getListingById(id: string) {
    const user = await getSession();
    const data = await prisma.listing.findUnique({
        where: { id },
        include: {
            seller: true,
            reviews: {
                include: { user: true },
                orderBy: { createdAt: 'desc' }
            }
        },
    });
    if (!data) return null;

    // Check if current user can leave a review (has a finished order they haven't reviewed)
    let eligibleOrder = null;
    if (user) {
        eligibleOrder = await prisma.order.findFirst({
            where: {
                listingId: id,
                buyerId: user.id,
                status: { in: ['accepted', 'completed'] },
                review: null // No review exists for this order yet
            }
        });
    }

    // Increment view count
    await prisma.listing.update({
        where: { id },
        data: { views: { increment: 1 } }
    }).catch(() => null);

    const formatted = await formatListing(data, user?.id);
    return { ...formatted, eligibleOrder };
}

export async function getSimilarListings(category: string, excludeId: string) {
    const user = await getSession();
    const data = await prisma.listing.findMany({
        where: { category, id: { not: excludeId } },
        include: { seller: true },
        take: 3,
    });
    return Promise.all(data.map(l => formatListing(l, user?.id)));
}

export async function incrementViewCount(id: string) {
    return await prisma.listing.update({
        where: { id },
        data: { views: { increment: 1 } }
    }).catch(() => null);
}
