'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

type MessageWithRelations = Prisma.MessageGetPayload<{
    include: {
        sender: true,
        receiver: true,
        listing: true
    }
}>;

import { createNotification } from './notifications';

export async function sendMessage(receiverId: string, content: string, listingId?: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        const message = await prisma.message.create({
            data: {
                content,
                senderId: user.id,
                receiverId,
                listingId,
            }
        });

        // Trigger Notification
        await createNotification(
            receiverId,
            'message',
            'New Message',
            `${user.name} sent you a message: "${content.slice(0, 50)}${content.length > 50 ? '...' : ''}"`,
            `/messages` // Ideally this should point to the specific chat
        );

        revalidatePath('/messages');
        return { success: true, message };
    } catch (error) {
        console.error("SendMessage error:", error);
        return { error: 'Failed to send message' };
    }
}

export async function getConversations() {
    const { user, error } = await getAuthUser();
    if (error || !user) return [];

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: user.id },
                { receiverId: user.id }
            ]
        },
        include: {
            sender: true,
            receiver: true,
            listing: true
        },
        orderBy: { createdAt: 'desc' }
    });

    const typedMessages = messages as unknown as MessageWithRelations[];

    // Group by the "other" user
    const conversationsMap = new Map();
    for (const msg of typedMessages) {
        const otherUser = msg.senderId === user.id ? msg.receiver : msg.sender;
        if (!conversationsMap.has(otherUser.id)) {
            conversationsMap.set(otherUser.id, {
                otherUser,
                lastMessage: msg,
                unreadCount: msg.receiverId === user.id && !msg.isRead ? 1 : 0
            });
        } else {
            if (msg.receiverId === user.id && !msg.isRead) {
                conversationsMap.get(otherUser.id).unreadCount++;
            }
        }
    }

    return Array.from(conversationsMap.values());
}

export async function getMessagesWithUser(otherUserId: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return [];

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: user.id, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: user.id }
            ]
        },
        include: {
            listing: true,
            sender: true
        },
        orderBy: { createdAt: 'asc' }
    });

    // Mark as read
    const unreadMessagesIds = messages.filter((m) => (m as any).receiverId === user.id && !(m as any).isRead).map((m) => m.id);
    if (unreadMessagesIds.length > 0) {
        await prisma.message.updateMany({
            where: { id: { in: unreadMessagesIds } },
            data: { isRead: true }
        });
        revalidatePath('/messages');
    }

    return messages;
}

export async function markAsRead(otherUserId: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: 'Unauthorized' };

    try {
        await prisma.message.updateMany({
            where: {
                senderId: otherUserId,
                receiverId: user.id,
                isRead: false
            },
            data: { isRead: true }
        });
        revalidatePath('/messages');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to mark messages as read' };
    }
}
