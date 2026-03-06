import { getHomeListings } from './actions/query';

export const dynamic = 'force-dynamic';
import HomePageClient from './HomePageClient';

export default async function Home() {
    // Fetch initial data securely on the server direct from the SQLite database
    const initialListings = await getHomeListings();

    // Pass it to the interactive client component
    return <HomePageClient initialListings={initialListings} />;
}
