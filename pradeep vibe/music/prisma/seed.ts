/**
 * Prisma Database Seed Script
 * Reads from mockData.ts and inserts records into the new SQLite database.
 */
import { PrismaClient } from '@prisma/client';
import { SELLERS, LISTINGS, REVIEWS, COMMUNITY_POSTS } from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // 1. Seed Users (Sellers)
    console.log('Seeding Users...');
    for (const seller of SELLERS) {
        await prisma.user.upsert({
            where: { id: seller.id },
            update: {},
            create: {
                id: seller.id,
                name: seller.name,
                avatar: seller.avatar,
                rating: seller.rating,
                reviewCount: seller.reviewCount,
                city: seller.city,
                verified: seller.verified,
                responseRate: seller.responseRate,
                memberSince: seller.memberSince,
            },
        });
    }

    // 2. Seed Listings
    console.log('Seeding Listings...');
    for (const listing of LISTINGS) {
        await prisma.listing.upsert({
            where: { id: listing.id },
            update: {
                images: JSON.stringify(listing.images),
                title: listing.title,
                price: listing.price,
                description: listing.description,
            },
            create: {
                id: listing.id,
                title: listing.title,
                brand: listing.brand,
                price: listing.price,
                rentPrice: listing.rentPrice,
                category: listing.category,
                condition: listing.condition,
                type: listing.type,
                images: JSON.stringify(listing.images),
                description: listing.description,
                location: listing.location,
                views: listing.views,
                favorites: listing.favorites,
                createdAt: new Date(listing.createdAt),
                hasSoundDemo: listing.hasSoundDemo,
                isNew: listing.isNew,
                yearMade: listing.yearMade,
                tags: JSON.stringify(listing.tags),
                sellerId: listing.seller.id,
            },
        });
    }

    // 3. Seed Reviews
    console.log('Seeding Reviews...');
    for (const review of REVIEWS) {
        await prisma.review.upsert({
            where: { id: review.id },
            update: {},
            create: {
                id: review.id,
                rating: review.rating,
                comment: review.text,
                createdAt: new Date(review.date),
                listingId: review.listingId,
                userId: SELLERS[0].id,
            },
        });
    }

    // 4. Seed Community Posts
    console.log('Seeding Community Posts...');
    for (const post of COMMUNITY_POSTS) {
        await prisma.communityPost.upsert({
            where: { id: post.id },
            update: {},
            create: {
                id: post.id,
                type: post.type,
                content: post.content,
                listingId: post.listingId,
                likes: post.likes,
                comments: post.comments,
                time: post.time,
                userId: post.user.id,
            },
        });
    }

    console.log('✅ Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
