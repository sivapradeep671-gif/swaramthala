'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listing, formatINR } from '@/lib/mockData';
import { MapPin, Eye, Heart, Star, ShieldCheck, Clock, ArrowRight, Play, Volume2, Rocket, ShoppingCart } from 'lucide-react';

interface ListingCardProps {
    listing: Listing;
    compact?: boolean;
}

export default function ListingCard({ listing, compact = false }: ListingCardProps) {
    const [liked, setLiked] = useState(listing.isFavorited || false);

    const catClass = `cat-${listing.category}`;

    const conditionBadge: Record<string, string> = {
        mint: 'badge-mint',
        good: 'badge-good',
        fair: 'badge-fair',
        repair: 'badge-repair',
    };

    const typeBadge: Record<string, string> = {
        sale: 'badge-sale',
        rent: 'badge-rent',
        trade: 'badge-trade',
    };

    const typeLabel: Record<string, string> = {
        sale: 'For Sale',
        rent: 'For Rent',
        trade: 'Trade',
    };

    return (
        <Link href={`/product/${listing.id}`} style={{ textDecoration: 'none' }}>
            <div
                className={`${catClass} glass-card hover-lift ${listing.isPromoted ? 'promoted-card' : ''}`}
                data-aos="fade-up"
                style={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                }}
            >
                {/* Image Area */}
                <div style={{ position: 'relative', aspectRatio: compact ? '4/3' : '16/10', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                    {/* Real Image */}
                    <div style={{
                        width: '100%', height: '100%',
                        overflow: 'hidden',
                        background: `linear-gradient(135deg, var(--cat-bg, rgba(124,92,252,0.08)), var(--bg-secondary))`,
                        position: 'relative'
                    }}>
                        {(listing.videoUrl || listing.audioUrl) && (
                            <div style={{
                                position: 'absolute', top: 12, left: 12,
                                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                                color: 'white', padding: '4px 8px', borderRadius: 'var(--radius-sm)',
                                fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4,
                                border: '1px solid rgba(255,255,255,0.1)', zIndex: 2
                            }}>
                                <Volume2 size={12} /> SOUND CHECK
                            </div>
                        )}
                        <Image
                            src={listing.images?.[0] || '/images/guitar.png'}
                            alt={listing.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                                objectFit: 'cover',
                                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>

                    {/* Type badge */}
                    <span className={`badge ${typeBadge[listing.type]}`} style={{
                        position: 'absolute', top: 10, left: 10,
                    }}>{typeLabel[listing.type]}</span>

                    {/* New badge */}
                    {listing.isNew && (
                        <span className="badge badge-new" style={{ position: 'absolute', top: 10, left: 70 }}>New</span>
                    )}

                    {/* Promoted badge */}
                    {listing.isPromoted && (
                        <div style={{
                            position: 'absolute', bottom: 12, right: 12,
                            background: 'linear-gradient(135deg, #7c5cfc, #c084fc)',
                            color: 'white', padding: '4px 10px', borderRadius: 'var(--radius-full)',
                            fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4,
                            boxShadow: '0 4px 12px rgba(124, 92, 252, 0.4)', zIndex: 2,
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <Rocket size={12} /> PROMOTED
                        </div>
                    )}

                    {/* Favorite button */}
                    <button
                        onClick={async e => {
                            e.preventDefault();
                            setLiked(!liked);
                            const { toggleFavorite } = await import('@/app/actions/favorite');
                            const res = await toggleFavorite(listing.id);
                            if (res.error) setLiked(liked);
                            else setLiked(!!res.favorited);
                        }}
                        aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
                        style={{
                            position: 'absolute', top: 10, right: 10,
                            background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                            width: 32, height: 32, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            animation: liked ? 'heartBurst 0.4s ease' : 'none',
                        }}><Heart fill={liked ? 'currentColor' : 'none'} size={16} color={liked ? '#ef4444' : 'white'} /></button>
                </div>

                {/* Info */}
                <div style={{ padding: compact ? '12px' : '16px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {listing.brand}
                    </p>
                    <h3 style={{
                        fontWeight: 700, fontSize: compact ? '0.85rem' : '0.95rem',
                        color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{listing.title}</h3>

                    {/* Condition + Location */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span className={`badge ${conditionBadge[listing.condition]}`} style={{ fontSize: '0.65rem' }}>
                            {listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={10} /> {listing.location}</span>
                    </div>

                    {/* Price Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: compact ? '1rem' : '1.15rem', color: 'var(--accent, var(--brand-primary))' }}>
                                    {formatINR(listing.price)}
                                </span>
                                <span style={{
                                    fontSize: '0.65rem', fontWeight: 800,
                                    padding: '2px 6px', borderRadius: '4px',
                                    background: listing.type === 'rent' ? 'rgba(56,189,248,0.1)' : 'rgba(74,222,128,0.1)',
                                    color: listing.type === 'rent' ? '#38bdf8' : '#4ade80',
                                    textTransform: 'uppercase', letterSpacing: '0.02em'
                                }}>
                                    {listing.type === 'rent' ? 'Rent' : 'Buy'}
                                </span>
                            </div>
                            {listing.rentPrice && (
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginLeft: 0, display: 'block', marginTop: 2 }}>
                                    or {formatINR(listing.rentPrice)}/mo
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            {listing.seller.verified && (
                                <div title="Verified Musician" style={{ color: 'var(--brand-primary)', display: 'flex', alignItems: 'center' }}>
                                    <ShieldCheck size={14} />
                                </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Star size={12} fill="currentColor" color="#fbbf24" stroke="none" />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600 }}>{listing.seller.rating}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>({listing.seller.reviewCount})</span>
                            </div>
                        </div>
                    </div>

                    {!compact && (
                        <Link
                            href={`/checkout?id=${listing.id}&type=${listing.type === 'rent' ? 'rent' : 'buy'}`}
                            onClick={e => e.stopPropagation()}
                            className="btn btn-primary"
                            style={{
                                width: '100%', marginTop: 12, justifyContent: 'center',
                                padding: '10px', fontSize: '0.85rem', fontWeight: 700,
                                borderRadius: 'var(--radius-md)',
                            }}
                        >
                            <ShoppingCart size={16} />
                            {listing.type === 'rent' ? 'Rent Now' : 'Buy Now'}
                        </Link>
                    )}
                </div>
            </div>
            <style jsx>{`
                .promoted-card {
                    border-color: rgba(124, 92, 252, 0.5) !important;
                    box-shadow: 0 10px 30px rgba(124, 92, 252, 0.15) !important;
                }
                .promoted-card:hover {
                    border-color: var(--brand-primary) !important;
                    box-shadow: 0 20px 40px rgba(124, 92, 252, 0.3) !important;
                }
            `}</style>
        </Link>
    );
}
