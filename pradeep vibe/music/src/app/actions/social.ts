'use server';

import { prisma } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function toggleClubMembership(clubId: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        const existing = await prisma.clubMembership.findUnique({
            where: {
                userId_clubId: {
                    userId: user.id,
                    clubId
                }
            }
        });

        if (existing) {
            await prisma.clubMembership.delete({
                where: { id: existing.id }
            });
            revalidatePath('/community');
            return { success: true, joined: false };
        } else {
            await prisma.clubMembership.create({
                data: {
                    userId: user.id,
                    clubId
                }
            });
            revalidatePath('/community');
            return { success: true, joined: true };
        }
    } catch (err) {
        console.error("Membership Error:", err);
        return { error: 'Failed to update membership' };
    }
}

export async function createCommunityPost(content: string, type: string = 'tip', clubId?: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        const post = await prisma.communityPost.create({
            data: {
                content,
                type,
                userId: user.id,
                clubId: clubId || null,
                time: 'Just now'
            }
        });

        revalidatePath('/community');
        return { success: true, post };
    } catch (err) {
        console.error("Post Error:", err);
        return { error: 'Failed to create post' };
    }
}

export async function rsvpToEvent(eventId: string, status: 'going' | 'interested') {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        const res = await prisma.eventRegistration.upsert({
            where: {
                userId_eventId: {
                    userId: user.id,
                    eventId
                }
            },
            update: { status },
            create: {
                userId: user.id,
                eventId,
                status
            }
        });

        revalidatePath('/community');
        return { success: true, registration: res };
    } catch (err) {
        console.error("RSVP Error:", err);
        return { error: 'Failed to RSVP' };
    }
}

export async function getCommunityData(clubId?: string) {
    try {
        const posts = await prisma.communityPost.findMany({
            where: clubId ? { clubId } : {},
            include: { user: true, club: true },
            orderBy: { id: 'desc' } // Temporary substitute for createdAt if not available
        });

        const clubs = await prisma.club.findMany({
            include: { _count: { select: { members: true } } },
            take: 5
        });

        const events = await prisma.event.findMany({
            include: { _count: { select: { attendees: true } } },
            take: 3
        });

        return { posts, clubs, events };
    } catch (err) {
        return { error: 'Failed to fetch community data' };
    }
}

export async function toggleFollowUser(followingId: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };
    if (user.id === followingId) return { error: 'You cannot follow yourself' };

    try {
        const existing = await prisma.userFollow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId
                }
            }
        });

        if (existing) {
            await prisma.userFollow.delete({
                where: { id: existing.id }
            });
            revalidatePath(`/product/${followingId}`); // revalidate common entry points
            revalidatePath('/dashboard');
            return { success: true, followed: false };
        } else {
            await prisma.userFollow.create({
                data: {
                    followerId: user.id,
                    followingId
                }
            });
            revalidatePath(`/product/${followingId}`);
            revalidatePath('/dashboard');
            return { success: true, followed: true };
        }
    } catch (err) {
        console.error("Follow Error:", err);
        return { error: 'Failed to update follow status' };
    }
}

export async function likeCommunityPost(postId: string) {
    try {
        const post = await prisma.communityPost.update({
            where: { id: postId },
            data: { likes: { increment: 1 } }
        });
        revalidatePath('/community');
        return { success: true, likes: post.likes };
    } catch (err) {
        return { error: 'Failed to like post' };
    }
}
