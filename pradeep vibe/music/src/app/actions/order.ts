'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

import { createNotification } from './notifications';

export async function placeOrder(cartItems: { id: string, type: 'buy' | 'rent', startDate?: string, endDate?: string }[], addressId?: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        const itemIds = cartItems.map(item => item.id);
        const listings = await prisma.listing.findMany({
            where: { id: { in: itemIds } },
            include: { seller: true }
        });

        if (listings.length === 0) return { error: 'No valid items in cart' };

        const orderPromises = cartItems.map(async item => {
            const listing = listings.find(l => l.id === item.id);
            if (!listing) return null;

            const order = await prisma.order.create({
                data: {
                    amount: item.type === 'rent' ? (listing.rentPrice || 0) : listing.price,
                    status: 'pending',
                    type: item.type,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    listingId: listing.id,
                    buyerId: user.id,
                    sellerId: listing.seller.id,
                }
            });

            // Notify Seller
            await createNotification(
                listing.seller.id,
                'order',
                'New Order Received',
                `You have a new order for "${listing.title}" from ${user.name}.`,
                `/dashboard/sales`
            );

            return order;
        }).filter(Boolean);

        const orders = await Promise.all(orderPromises);

        // Notify via Revalidation
        revalidatePath('/dashboard');
        revalidatePath('/messages');

        return { success: true, orderIds: orders.map(o => o?.id) };
    } catch (error) {
        console.error("Order error:", error);
        return { error: 'Failed to place order' };
    }
}

export async function processMockPayment(orderIds: string[]) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'Unauthorized' };

    try {
        // Mock successful payment processing
        for (const id of orderIds) {
            const order = await prisma.order.update({
                where: { id },
                data: { status: 'accepted' },
                include: { listing: true, buyer: true }
            });

            // Notify Buyer
            await createNotification(
                order.buyerId,
                'order',
                'Order Accepted',
                `Your order for "${order.listing.title}" has been accepted and is being processed.`,
                `/dashboard/orders`
            );
        }
        revalidatePath('/dashboard');
        return { success: true };
    } catch (err) {
        return { error: 'Payment processing failed' };
    }
}

export async function updateOrderStatus(orderId: string, status: 'accepted' | 'rejected' | 'completed' | 'cancelled') {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) return { error: 'Order not found' };

        await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        // If completed, mark listing as sold/rented
        if (status === 'completed') {
            await prisma.listing.update({
                where: { id: order.listingId },
                data: { status: order.type === 'rent' ? 'rented' : 'sold' }
            });
        }

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error("UpdateStatus error:", error);
        return { error: 'Failed to update order status' };
    }
}
