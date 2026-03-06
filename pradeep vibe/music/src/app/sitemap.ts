import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://swaramthala.in';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/browse`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sell`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/community`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
    ];

    // Dynamic product pages from DB
    let productPages: MetadataRoute.Sitemap = [];
    try {
        const listings = await prisma.listing.findMany({
            where: { status: 'active', isApproved: true },
            select: { id: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 1000, // cap to avoid huge sitemaps
        });

        productPages = listings.map(listing => ({
            url: `${baseUrl}/product/${listing.id}`,
            lastModified: listing.createdAt,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch {
        // DB may be unavailable during build — degrade gracefully
        console.warn('[sitemap] Could not fetch listings for dynamic sitemap entries.');
    }

    return [...staticPages, ...productPages];
}

