'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { sendNotificationEmail } from '@/lib/email';

export async function getNotifications() {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'Unauthorized' };

    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 20
        });
        const unreadCount = await prisma.notification.count({
            where: { userId: user.id, isRead: false }
        });
        return { notifications, unreadCount };
    } catch (err) {
        return { error: 'Failed to fetch notifications' };
    }
}

export async function markAsRead(id: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'Unauthorized' };

    try {
        await prisma.notification.update({
            where: { id, userId: user.id },
            data: { isRead: true }
        });
        revalidatePath('/'); // Revalidate universally as the bell is likely in the header
        return { success: true };
    } catch (err) {
        return { error: 'Failed to update notification' };
    }
}

export async function markAllAsRead() {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'Unauthorized' };

    try {
        await prisma.notification.updateMany({
            where: { userId: user.id, isRead: false },
            data: { isRead: true }
        });
        revalidatePath('/');
        return { success: true };
    } catch (err) {
        return { error: 'Failed to clear notifications' };
    }
}

/**
 * Utility to create notifications from other server actions.
 * NOT exported as a server action (no 'use server' inside this function if used internally,
 * but it's in a 'use server' file so it's safe to call from other server actions).
 */
export async function createNotification(userId: string, type: string, title: string, content: string, link?: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true }
        });

        await prisma.notification.create({
            data: {
                userId,
                type,
                title,
                content,
                link
            }
        });

        // Send Email if user has one
        if (user?.email) {
            await sendNotificationEmail(user.email, title, content, link);
        }

        return { success: true };
    } catch (err) {
        console.error('Notification creation failed:', err);
        return { error: 'Failed to create notification' };
    }
}
