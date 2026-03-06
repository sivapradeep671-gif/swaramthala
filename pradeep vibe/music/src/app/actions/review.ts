'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

import { createNotification } from './notifications';

export async function submitReview(orderId: string, rating: number, comment: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        if (rating < 1 || rating > 5) return { error: 'Invalid rating' };

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { listing: { include: { seller: true } } }
        });

        if (!order) return { error: 'Order not found' };
        if (order.buyerId !== user.id) return { error: 'Only the buyer can review this transaction' };

        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                userId: user.id,
                listingId: order.listingId,
                orderId: order.id
            }
        });

        // Update seller overall rating
        const seller = order.listing.seller;
        const newCount = seller.reviewCount + 1;
        const newRating = ((seller.rating * seller.reviewCount) + rating) / newCount;

        await prisma.user.update({
            where: { id: seller.id },
            data: {
                rating: parseFloat(newRating.toFixed(1)),
                reviewCount: newCount
            }
        });

        // Notify Seller
        await createNotification(
            seller.id,
            'moderation',
            'New Review Received',
            `${user.name} left you a ${rating}-star review for "${order.listing.title}".`,
            `/dashboard/reviews`
        );

        revalidatePath(`/product/${order.listingId}`);
        revalidatePath('/dashboard');

        return { success: true, review };
    } catch (err) {
        console.error("Submit review error:", err);
        return { error: 'Failed to submit review' };
    }
}

export async function getListingReviews(listingId: string) {
    try {
        const reviews = await prisma.review.findMany({
            where: { listingId },
            include: { user: true },
            orderBy: { createdAt: 'desc' }
        });
        return { reviews };
    } catch (err) {
        return { error: 'Failed to fetch reviews' };
    }
}
