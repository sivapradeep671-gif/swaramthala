'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getAuthUser } from '@/lib/auth';

export async function createListing(formData: FormData) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    const title = formData.get('title') as string;
    const brand = formData.get('brand') as string;
    const price = parseFloat(formData.get('price') as string);
    const rentPrice = formData.get('rentPrice') ? parseFloat(formData.get('rentPrice') as string) : null;
    const category = formData.get('category') as string;
    const condition = formData.get('condition') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string || 'Chennai, TN';
    const yearMade = formData.get('yearMade') ? parseInt(formData.get('yearMade') as string) : null;
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags') as string) : [];

    // In a real app, handle multiple file uploads. Here we expect an array of URLs or use placeholders.
    const imagesJson = formData.get('images') as string;
    const images = imagesJson ? JSON.parse(imagesJson) : ['/images/placeholder.png'];

    try {
        const newListing = await prisma.listing.create({
            data: {
                title,
                brand,
                price,
                rentPrice,
                category,
                condition,
                type,
                description,
                location,
                yearMade,
                images: JSON.stringify(images),
                tags: JSON.stringify(tags),
                videoUrl: formData.get('videoUrl') as string || null,
                audioUrl: formData.get('audioUrl') as string || null,
                sellerId: user.id,
                isNew: condition === 'mint',
                hasSoundDemo: (formData.get('hasSoundDemo') === 'true') || !!formData.get('videoUrl') || !!formData.get('audioUrl'),
            },
        });

        revalidatePath('/');
        revalidatePath('/browse');
        return { success: true, id: newListing.id };
    } catch (error) {
        console.error("CreateListing error:", error);
        return { error: 'Failed to create listing' };
    }
}

export async function updateListing(id: string, formData: FormData) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    const data: any = {};
    const fields = ['title', 'brand', 'price', 'rentPrice', 'category', 'condition', 'type', 'description', 'location', 'yearMade', 'status', 'videoUrl', 'audioUrl'];

    fields.forEach(field => {
        const val = formData.get(field);
        if (val !== null) {
            if (field === 'price' || field === 'rentPrice') data[field] = parseFloat(val as string);
            else if (field === 'yearMade') data[field] = parseInt(val as string);
            else data[field] = val as string;
        }
    });

    if (data.videoUrl || data.audioUrl) data.hasSoundDemo = true;

    if (formData.get('tags')) data.tags = formData.get('tags');
    if (formData.get('images')) data.images = formData.get('images');

    try {
        const oldListing = await prisma.listing.findUnique({
            where: { id },
            select: { price: true }
        });

        const updatedListing = await prisma.listing.update({
            where: { id, sellerId: user.id },
            data
        });

        // Price Drop Alert Logic
        if (oldListing && data.price < oldListing.price) {
            const favorites = await prisma.favorite.findMany({
                where: { listingId: id },
                include: { user: true }
            });

            for (const fav of favorites) {
                await prisma.message.create({
                    data: {
                        content: `🚨 PRICE DROP ALERT! An item you liked, "${updatedListing.title}", is now available for ${formatINR(data.price)}! Check it out before it's gone. 🎸`,
                        senderId: user.id,
                        receiverId: fav.userId,
                        listingId: id
                    }
                });
            }
        }

        revalidatePath(`/product/${id}`);
        revalidatePath('/browse');
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error("UpdateListing error:", error);
        return { error: 'Failed to update listing' };
    }
}

function formatINR(amount: number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

export async function deleteListing(id: string) {
    const { user, error } = await getAuthUser();
    if (error || !user) return { error: error || 'Unauthorized' };

    try {
        await prisma.listing.delete({
            where: { id, sellerId: user.id }
        });

        revalidatePath('/');
        revalidatePath('/browse');
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error("DeleteListing error:", error);
        return { error: 'Failed to delete listing' };
    }
}
