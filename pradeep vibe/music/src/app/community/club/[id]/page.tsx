import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import CommunityClient from '../../CommunityClient';

export default async function ClubPage({ params }: { params: { id: string } }) {
    const club = await prisma.club.findUnique({
        where: { id: params.id },
        include: {
            members: { include: { user: true } },
            posts: { include: { user: true, club: true }, orderBy: { id: 'desc' } },
            events: true,
            _count: { select: { members: true } }
        }
    });

    if (!club) notFound();

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '60px 0' }}>
                <div className="container">
                    <div className="badge badge-mint" style={{ marginBottom: 12 }}>{club.category}</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '3rem', marginBottom: 12 }}>{club.name}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600 }}>{club.description}</p>
                </div>
            </div>

            <CommunityClient
                initialPosts={club.posts}
                initialClubs={[club]}
                initialEvents={club.events}
            />
        </div>
    );
}
