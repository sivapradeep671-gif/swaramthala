'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

import { createNotification } from './notifications';

export async function updateOrderStatus(orderId: string, status: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) {
        return { error: error || 'Unauthorized' };
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { listing: true }
        });
        if (!order) return { error: 'Order not found' };

        // Ensure the person updating the order is actually the seller
        if (order.sellerId !== user.id) {
            return { error: 'Unauthorized to manage this order' };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });

        // Notify Buyer
        await createNotification(
            order.buyerId,
            'order',
            'Order Status Updated',
            `The status of your order for "${order.listing.title}" has been updated to ${status}.`,
            `/dashboard/orders`
        );

        // Revalidate dashboard to reflect changes
        revalidatePath('/dashboard');

        return { success: true };
    } catch (error) {
        console.error("Update order error:", error);
        return { error: 'Failed to update order status' };
    }
}
