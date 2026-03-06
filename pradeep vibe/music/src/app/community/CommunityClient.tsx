'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SELLERS } from '@/lib/mockData';
import { Heart, MessageCircle, Share2, Camera, Music, MapPin, Send, ShieldCheck, Trophy, Flame, Gift, Lightbulb, Ticket, RefreshCw, Tag, Star, ChevronRight } from 'lucide-react';

export default function CommunityClient({
    initialPosts,
    initialClubs = [],
    initialEvents = []
}: {
    initialPosts: any[],
    initialClubs?: any[],
    initialEvents?: any[]
}) {
    const [liked, setLiked] = useState<Record<string, boolean>>({});
    const [postInput, setPostInput] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [activeClub, setActiveClub] = useState<string | null>(null);

    const filteredPosts = activeClub
        ? initialPosts.filter(p => p.clubId === activeClub)
        : initialPosts;

    const handleLike = async (postId: string) => {
        if (liked[postId]) return;
        const { likeCommunityPost } = await import('@/app/actions/social');
        const res = await likeCommunityPost(postId);
        if (res.success) {
            setLiked(p => ({ ...p, [postId]: true }));
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Header */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 8 }}>
                            Musician <span className="gradient-text">Community</span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Connect, share, and discover gear with musicians across India.</p>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '32px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 28, alignItems: 'flex-start' }}>

                {/* Feed */}
                <div>
                    {/* Post Composer */}
                    <div className="glass-card" style={{ padding: 20, marginBottom: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, fontWeight: 800 }}>S</div>
                            <textarea
                                value={postInput}
                                onChange={e => setPostInput(e.target.value)}
                                placeholder={activeClub ? `Post to ${initialClubs.find(c => c.id === activeClub)?.name}...` : "Share gear tips, jam invites, or your latest finds..."}
                                className="input-field"
                                rows={3}
                                style={{ resize: 'none', flex: 1, background: 'var(--bg-secondary)' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {[
                                    { label: 'Photo', icon: Camera },
                                    { label: 'Audio', icon: Music },
                                    { label: 'Location', icon: MapPin }
                                ].map(a => (
                                    <button key={a.label} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: '6px 14px', fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><a.icon size={14} /> {a.label}</button>
                                ))}
                            </div>
                            <button
                                onClick={async () => {
                                    if (!postInput.trim() || isPosting) return;
                                    setIsPosting(true);
                                    const { createCommunityPost } = await import('@/app/actions/social');
                                    const res = await createCommunityPost(postInput, 'tip', activeClub || undefined);
                                    if (res.success) {
                                        setPostInput('');
                                        // router.refresh handled by action revalidate
                                    } else {
                                        alert(res.error || 'Failed to post');
                                    }
                                    setIsPosting(false);
                                }}
                                disabled={isPosting}
                                className="btn btn-primary"
                                style={{ padding: '8px 24px', fontSize: '0.85rem' }}
                            >
                                {isPosting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 8 }}>
                        <button
                            onClick={() => setActiveClub(null)}
                            style={{
                                padding: '8px 16px', borderRadius: 'var(--radius-full)',
                                background: activeClub === null ? 'var(--brand-primary)' : 'var(--bg-secondary)',
                                color: activeClub === null ? 'white' : 'var(--text-secondary)',
                                border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap'
                            }}
                        >Global Feed</button>
                        {initialClubs.map(club => (
                            <button
                                key={club.id}
                                onClick={() => setActiveClub(club.id)}
                                style={{
                                    padding: '8px 16px', borderRadius: 'var(--radius-full)',
                                    background: activeClub === club.id ? 'var(--brand-primary)' : 'var(--bg-secondary)',
                                    color: activeClub === club.id ? 'white' : 'var(--text-secondary)',
                                    border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap'
                                }}
                            >{club.name}</button>
                        ))}
                    </div>

                    {/* Posts */}
                    {filteredPosts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
                            <Music size={48} style={{ marginBottom: 16 }} />
                            <p>No posts in this channel yet. Be the first!</p>
                        </div>
                    ) : filteredPosts.map((post, i) => (
                        <div key={post.id} className="glass-card animate-fade-up" style={{ padding: 20, marginBottom: 16 }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
                                    {post.user?.name?.[0] || 'M'}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {post.user?.name || 'Musician'}
                                        {post.user?.verified && <ShieldCheck size={14} color="#4ade80" />}
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                        {post.club ? `#${post.club.name}` : 'Global'} · {post.time || 'A few moments ago'}
                                    </div>
                                </div>
                                <span className="badge badge-good" style={{ fontSize: '0.65rem' }}>{post.type}</span>
                            </div>

                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 16, fontSize: '0.95rem' }}>{post.content}</p>

                            <div style={{ display: 'flex', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                                <button onClick={() => handleLike(post.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px', cursor: 'pointer', color: liked[post.id] ? '#f87171' : 'var(--text-muted)', fontWeight: 600 }}>
                                    <Heart size={16} fill={liked[post.id] ? 'currentColor' : 'none'} /> {post.likes + (liked[post.id] ? 1 : 0)}
                                </button>
                                <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px', cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 600 }}>
                                    <MessageCircle size={16} /> Discuss
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {/* Events */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
                        <h3 style={{ fontWeight: 800, marginBottom: 18, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}><Ticket size={20} color="var(--brand-primary)" /> Upcoming Jams</h3>
                        {initialEvents.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No events scheduled this week.</p>
                        ) : initialEvents.map(event => (
                            <div key={event.id} style={{ marginBottom: 20, borderBottom: '1px solid var(--border-hover)', paddingBottom: 16 }}>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{event.title}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                                    <MapPin size={12} /> {event.location}
                                </div>
                                <button
                                    onClick={async () => {
                                        const { rsvpToEvent } = await import('@/app/actions/social');
                                        const res = await rsvpToEvent(event.id, 'going');
                                        if (res.success) alert("You're on the list! See you there. 🤘");
                                    }}
                                    className="btn btn-outline"
                                    style={{ width: '100%', padding: '6px', fontSize: '0.75rem', justifyContent: 'center' }}
                                >
                                    RSVP Going
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Clubs */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
                        <h3 style={{ fontWeight: 800, marginBottom: 18, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}><Trophy size={20} color="var(--brand-secondary)" /> Musician Clubs</h3>
                        {initialClubs.map(club => (
                            <div key={club.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Music size={20} color="var(--brand-secondary)" />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{club.name}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{club._count?.members || 0} musicians</div>
                                </div>
                                <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>Join</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
