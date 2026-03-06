import { getCommunityData } from '../actions/social';
import CommunityClient from './CommunityClient';

export default async function CommunityPage() {
    const data = await getCommunityData();

    if ('error' in data) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>{data.error}</div>;
    }

    return (
        <CommunityClient
            initialPosts={data.posts}
            initialClubs={data.clubs}
            initialEvents={data.events}
        />
    );
}
