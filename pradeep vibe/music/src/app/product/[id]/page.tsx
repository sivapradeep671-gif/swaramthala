import { getListingById, getSimilarListings } from '../../actions/query';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const listing = await getListingById(params.id);
    if (!listing) return { title: 'Product Not Found | Swaramthala' };

    const firstImage = listing.images && listing.images.length > 0 ? listing.images[0] : '/og-default.png';

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://swaramthala.in';
    const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(listing.title)}&price=${encodeURIComponent(listing.price.toString())}&seller=${encodeURIComponent(listing.seller.name)}&image=${encodeURIComponent(listing.images[0] || '')}&category=${encodeURIComponent(listing.category)}`;

    return {
        title: `${listing.title} | Buy/Rent on Swaramthala`,
        description: `${listing.description.slice(0, 160)}... Buy or Rent ${listing.title} from verified musician ${listing.seller.name}.`,
        openGraph: {
            title: listing.title,
            description: listing.description,
            images: [ogImage],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: listing.title,
            description: listing.description,
            images: [ogImage],
        }
    };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const listing = await getListingById(params.id);

    if (!listing) {
        notFound();
    }

    const similar = await getSimilarListings(listing.category, listing.id);

    return <ProductClient initialListing={listing} initialReviews={listing.reviews || []} initialSimilar={similar} />;
}
