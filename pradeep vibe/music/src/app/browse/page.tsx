import { getBrowseListings } from '../actions/query';
import BrowseClient from './BrowseClient';

export default async function Browse() {
    // Fetch all listings statically/SSR from DB
    const initialListings = await getBrowseListings();

    // Render the interactive client
    return <BrowseClient initialListings={initialListings} />;
}
