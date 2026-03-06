import { prisma } from '@/lib/db';
import { getUser } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import ListingCard from '@/app/components/ListingCard';
import { HeartCrack } from 'lucide-react';

export const metadata = { title: 'Favorites | Swaramthala' };

export default async function FavoritesPage() {
    const user = await getUser();
    if (!user) {
        redirect('/auth');
    }

    const favorites = await prisma.favorite.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: {
            listing: {
                include: { seller: true }
            }
        }
    });

    // Format for client
    const formattedListings = favorites.map((fav: any) => ({
        ...fav.listing,
        images: JSON.parse(fav.listing.images),
        tags: JSON.parse(fav.listing.tags),
    }));

    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', marginBottom: 16 }}>
                        My <span className="gradient-text">Favorites</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
                        Gear you&apos;ve saved for later.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 24px' }}>
                {formattedListings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--border)' }}>
                        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}><HeartCrack size={64} color="var(--border)" /></div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', marginBottom: 12 }}>No favorites yet</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>You haven&apos;t saved any listings to your favorites.</p>
                        <a href="/browse" className="btn btn-primary" style={{ display: 'inline-flex' }}>Search Listings</a>
                    </div>
                ) : (
                    <div className="listing-grid">
                        {formattedListings.map((listing: any) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
