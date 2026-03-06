'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatINR } from '@/lib/mockData';
import ListingCard from '@/app/components/ListingCard';
import { Play, Pause, MapPin, Eye, Heart, ShoppingCart, MessageCircle, CheckCircle2, Star, ShieldCheck, Ticket, UserPlus, Music, Send, Box, X, Calendar, ChevronRight, ChevronLeft, PhoneCall, Share2, Volume2, Flag, AlertTriangle } from 'lucide-react';
import VideoPlayer from '@/app/components/VideoPlayer';
import Image from 'next/image';
import gsap from 'gsap';
import { submitReport } from '@/app/actions/report';

export default function ProductClient({
    initialListing,
    initialReviews,
    initialSimilar
}: {
    initialListing: any,
    initialReviews: any[],
    initialSimilar: any[]
}) {
    const router = useRouter();
    const [listing, setListing] = useState(initialListing);
    const reviews = initialReviews;
    const similar = initialSimilar;

    const [activeTab, setActiveTab] = useState<'desc' | 'seller' | 'reviews'>('desc');
    const [playing, setPlaying] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMsg, setChatMsg] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [activeImg, setActiveImg] = useState(0);
    const [isVideoCalling, setIsVideoCalling] = useState(false);
    const [isLiked, setIsLiked] = useState(listing.isFavorited);
    const [sharing, setSharing] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportDetails, setReportDetails] = useState('');
    const [isReporting, setIsReporting] = useState(false);

    const audioBtnRef = useRef<HTMLButtonElement>(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const toggleLike = async () => {
        const prevState = isLiked;
        setIsLiked(!prevState);
        const { toggleFavorite } = await import('@/app/actions/favorite');
        const res = await toggleFavorite(listing.id);
        if (res.error) {
            setIsLiked(prevState);
            alert(res.error);
        }
    };

    const handleShare = async () => {
        setSharing(true);
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Product link copied to clipboard! 🎸');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        setTimeout(() => setSharing(false), 2000);
    };

    const handleReport = async () => {
        if (!reportReason) return alert('Please select a reason for reporting.');
        setIsReporting(true);
        const res = await submitReport(listing.id, reportReason, reportDetails);
        setIsReporting(false);
        if (res.success) {
            alert('Thank you. The listing has been flagged for review.');
            setReportModalOpen(false);
        } else {
            alert(res.error || 'Failed to submit report.');
        }
    };

    const conditionColors: Record<string, string> = { mint: '#4ade80', good: '#60a5fa', fair: '#fbbf24', repair: '#f87171' };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

            {/* Breadcrumb */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
                <div className="container" style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link> /
                    <Link href="/browse" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Search</Link> /
                    <span style={{ color: 'var(--text-primary)' }}>{listing.title.slice(0, 40)}...</span>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 24px' }}>
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 40, alignItems: 'flex-start' }}>

                    {/* Left: Media & Details */}
                    <div>
                        {/* Image Carousel */}
                        <div style={{ position: 'relative', marginBottom: 32 }}>
                            <div style={{
                                background: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)',
                                aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-card)'
                            }}>
                                {listing.images && listing.images.length > 0 ? (
                                    <Image
                                        src={listing.images[activeImg]}
                                        alt={listing.title}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        style={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <Music size={64} color="var(--text-muted)" />
                                )}

                                {/* Nav Arrows */}
                                {(listing.images?.length || 0) > 1 && (
                                    <>
                                        <button onClick={() => setActiveImg(prev => (prev > 0 ? prev - 1 : listing.images.length - 1))} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(10px)' }}><ChevronLeft size={24} /></button>
                                        <button onClick={() => setActiveImg(prev => (prev < listing.images.length - 1 ? prev + 1 : 0))} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(10px)' }}><ChevronRight size={24} /></button>
                                    </>
                                )}
                            </div>

                            {/* Carousel Indicators */}
                            {(listing.images?.length || 0) > 1 && (
                                <div style={{
                                    display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16
                                }}>
                                    {listing.images?.map((img: string, i: number) => (
                                        <div key={i} onClick={() => setActiveImg(i)} style={{
                                            width: 60, height: 40, borderRadius: 'var(--radius-sm)',
                                            border: `2px solid ${i === activeImg ? 'var(--brand-primary)' : 'transparent'}`,
                                            overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s ease', opacity: i === activeImg ? 1 : 0.6,
                                            position: 'relative'
                                        }}>
                                            <Image src={img} alt={`${listing.title} thumbnail ${i}`} fill sizes="60px" style={{ objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description & Key Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            <div>
                                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.4rem', marginBottom: 12, lineHeight: 1.1 }}>{listing.title}</h1>
                                <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: 'var(--brand-secondary)' }}>{formatINR(listing.price)}</div>
                                    <div className={`badge ${conditionColors[listing.condition] ? 'badge-good' : 'badge-mint'}`} style={{ background: conditionColors[listing.condition] + '20', color: conditionColors[listing.condition] }}>{listing.condition.toUpperCase()}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={16} /> {listing.location}</div>
                                    <div style={{ color: 'var(--brand-primary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--brand-primary)10', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
                                        <Eye size={16} /> {listing.views + 1} visits
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                                <button
                                    onClick={toggleLike}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                                        background: isLiked ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-glass)',
                                        border: `1px solid ${isLiked ? '#ef4444' : 'var(--border)'}`,
                                        borderRadius: 'var(--radius-lg)', color: isLiked ? '#ef4444' : 'var(--text-primary)',
                                        cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: 600
                                    }}
                                >
                                    <Heart fill={isLiked ? '#ef4444' : 'none'} size={18} />
                                    {isLiked ? 'Interested' : 'Add to Wishlist'}
                                </button>
                                <button
                                    onClick={handleShare}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                                        background: 'var(--bg-glass)', border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-lg)', color: 'var(--text-primary)',
                                        cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: 600
                                    }}
                                >
                                    <Share2 size={18} />
                                    {sharing ? 'Link Copied!' : 'Share'}
                                </button>
                                <button
                                    onClick={() => setReportModalOpen(true)}
                                    title="Report this listing"
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44,
                                        background: 'var(--bg-glass)', border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)',
                                        cursor: 'pointer', transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                >
                                    <Flag size={18} />
                                </button>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 20 }}>Quick Specs</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    {[
                                        { label: 'Brand', val: listing.brand },
                                        { label: 'Year', val: listing.yearMade || 'N/A' },
                                        { label: 'Category', val: listing.category },
                                        { label: 'Type', val: listing.type }
                                    ].map((spec, i) => (
                                        <div key={i} style={{ display: 'flex', borderBottom: '1px solid var(--border)', paddingBottom: 12, justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{spec.label}</span>
                                            <span style={{ fontWeight: 600 }}>{spec.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 16 }}>Description</h2>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem', whiteSpace: 'pre-line' }}>{listing.description}</p>
                            </div>

                            {/* Sound Check Section */}
                            {(listing.videoUrl || listing.audioUrl) && (
                                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                        <div style={{ padding: '8px', background: 'var(--brand-primary)20', borderRadius: '10px', color: 'var(--brand-primary)' }}>
                                            <Volume2 size={24} />
                                        </div>
                                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem' }}>Sound Check</h2>
                                    </div>

                                    {listing.videoUrl && (
                                        <div style={{ marginBottom: 24 }}>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>Watch the demo video for this exact instrument</div>
                                            <VideoPlayer url={listing.videoUrl} />
                                        </div>
                                    )}

                                    {listing.audioUrl && (
                                        <div style={{
                                            background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-lg)',
                                            border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16
                                        }}>
                                            <button
                                                ref={audioBtnRef}
                                                onClick={() => setPlaying(!playing)}
                                                style={{
                                                    width: 44, height: 44, borderRadius: '50%', background: 'var(--brand-primary)',
                                                    border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    cursor: 'pointer', transition: 'all 0.2s ease',
                                                    boxShadow: playing ? '0 0 20px var(--brand-primary)80' : 'none'
                                                }}
                                            >
                                                {playing ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                                            </button>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Audio Sample</div>
                                                <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, marginTop: 8, position: 'relative' }}>
                                                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '30%', background: 'var(--brand-primary)', borderRadius: 2 }}></div>
                                                </div>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>0:45</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                {[
                                    'Used 1 year, no major scratches',
                                    '100% functional, checked by experts',
                                    'Original packaging included',
                                    'Available for immediate pickup/shipping'
                                ].map((bullet, i) => (
                                    <div key={i} style={{ background: 'var(--bg-glass)', padding: '8px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        • {bullet}
                                    </div>
                                ))}
                            </div>

                            <button style={{ color: 'var(--text-muted)', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline', width: 'fit-content' }}>
                                Report this listing
                            </button>
                        </div>
                    </div>

                    {/* Right: Actions & Seller */}
                    <div style={{ position: 'sticky', top: 100 }}>
                        <div style={{
                            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-xl)', padding: '32px', marginBottom: 24,
                            boxShadow: 'var(--shadow-card)'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {listing.rentPrice ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                        <Link href={`/checkout?id=${listing.id}&type=buy`} className="btn btn-primary" style={{ justifyContent: 'center', height: 56 }}>
                                            Buy Now
                                        </Link>
                                        <Link href={`/checkout?id=${listing.id}&type=rent`} className="btn btn-outline" style={{ justifyContent: 'center', height: 56, borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}>
                                            Rent Now
                                        </Link>
                                    </div>
                                ) : (
                                    <Link href={`/checkout?id=${listing.id}&type=buy`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: 56, fontSize: '1.1rem' }}>
                                        Buy Now
                                    </Link>
                                )}
                                <button onClick={() => setChatOpen(true)} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', height: 52 }}>
                                    <MessageCircle size={20} /> Message Seller
                                </button>
                                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', height: 52, color: '#4ade80', borderColor: '#4ade8030' }}>
                                    <Play size={20} /> Video Call Seller
                                </button>
                            </div>

                            <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '1.2rem' }}>{listing.seller.avatar}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            {listing.seller.name}
                                            <button
                                                onClick={handleFollow}
                                                style={{
                                                    fontSize: '0.75rem', padding: '4px 12px', borderRadius: 'var(--radius-full)',
                                                    background: isFollowing ? 'var(--bg-card)' : 'var(--brand-primary)',
                                                    border: `1px solid ${isFollowing ? 'var(--border)' : 'var(--brand-primary)'}`,
                                                    color: isFollowing ? 'var(--text-primary)' : 'white', fontWeight: 700, cursor: 'pointer'
                                                }}
                                            >
                                                {isFollowing ? 'Following' : '+ Follow'}
                                            </button>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Seller Level 4 · {listing.seller.city}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div style={{ background: 'var(--bg-glass)', padding: '12px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                                        <div style={{ color: '#fbbf24', fontWeight: 800 }}>★ {listing.seller.rating}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Rating</div>
                                    </div>
                                    <div style={{ background: 'var(--bg-glass)', padding: '12px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                                        <div style={{ fontWeight: 800 }}>{listing.seller.reviewCount}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Deals</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div style={{ marginTop: 48 }}>
                    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
                        {[['desc', 'Description'], ['seller', 'Seller History'], ['reviews', `Reviews (${reviews.length})`]].map(([tab, label]) => (
                            <button key={tab} onClick={() => setActiveTab(tab as any)} style={{
                                padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer',
                                fontWeight: 700, fontSize: '0.9rem',
                                color: activeTab === tab ? 'var(--brand-secondary)' : 'var(--text-muted)',
                                borderBottom: activeTab === tab ? '2px solid var(--brand-primary)' : '2px solid transparent',
                                marginBottom: -1, transition: 'all 0.2s ease'
                            }}>{label}</button>
                        ))}
                    </div>

                    <div className="tab-content animate-fade-up">
                        {activeTab === 'desc' && (
                            <div style={{ maxWidth: 800 }}>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 2, fontSize: '1rem', whiteSpace: 'pre-line' }}>{listing.description}</p>
                            </div>
                        )}

                        {activeTab === 'seller' && (
                            <div style={{ maxWidth: 600 }}>
                                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
                                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{listing.seller.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                                {listing.seller.name}
                                                {listing.seller.verified && (
                                                    <div title="Verified Musician" style={{ display: 'flex', alignItems: 'center', color: 'var(--brand-primary)' }}>
                                                        <ShieldCheck size={18} />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{listing.seller.verified ? 'Verified Musician' : 'Community Member'} in {listing.seller.city}</div>
                                        </div>
                                    </div>
                                    {[
                                        { k: 'Member Since', v: listing.seller.memberSince },
                                        { k: 'Response Rate', v: `${listing.seller.responseRate}%` },
                                        { k: 'Response Time', v: '< 1 hour' },
                                        { k: 'Total Deals', v: '48 successful sales' }
                                    ].map((row, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: i === 3 ? 'none' : '1px solid var(--border)', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>{row.k}</span>
                                            <span style={{ fontWeight: 600 }}>{row.v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div style={{ maxWidth: 700 }}>
                                {/* Leave a Review Form (Only if eligible) */}
                                {initialListing.eligibleOrder && (
                                    <div className="glass-card" style={{ padding: 24, marginBottom: 32, border: '1px solid var(--brand-primary)', background: 'rgba(124,92,252,0.03)' }}>
                                        <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 16 }}>Rate your purchase</h3>
                                        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button key={star} onClick={() => setReviewRating(star)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                    <Star size={32} fill={reviewRating >= star ? '#fbbf24' : 'none'} color={reviewRating >= star ? '#fbbf24' : 'var(--text-muted)'} />
                                                </button>
                                            ))}
                                        </div>
                                        <textarea
                                            value={reviewText}
                                            onChange={e => setReviewText(e.target.value)}
                                            placeholder="How was the gear? Describe the tone, condition, and seller experience..."
                                            className="input-field"
                                            style={{ width: '100%', minHeight: 100, marginBottom: 16, background: 'var(--bg-secondary)' }}
                                        />
                                        <button
                                            onClick={async () => {
                                                if (!reviewRating) return alert('Please select a star rating');
                                                const { submitReview } = await import('@/app/actions/review');
                                                const res = await submitReview(initialListing.eligibleOrder.id, reviewRating, reviewText);
                                                if (res.success) {
                                                    alert('Review submitted! Thank you for building trust.');
                                                    router.refresh();
                                                } else {
                                                    alert(res.error || 'Failed to submit review');
                                                }
                                            }}
                                            className="btn btn-primary"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                )}

                                {reviews.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                        <Star size={48} color="var(--border)" style={{ marginBottom: 16 }} />
                                        <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to secure this gear and leave feedback!</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                        {reviews.map(r => (
                                            <div key={r.id} className="glass-card" style={{ padding: 24 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>{r.user?.name?.[0]}</div>
                                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{r.user?.name || 'Anonymous'}</div>
                                                    </div>
                                                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                                                        {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                                    </div>
                                                </div>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{r.comment}</p>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 16 }}>{new Date(r.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Gear */}
                {similar.length > 0 && (
                    <div style={{ marginTop: 80 }}>
                        <h2 className="section-title" style={{ marginBottom: 32 }}>Similar <span className="gradient-text">Gear</span></h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                            {similar.map(l => <ListingCard key={l.id} listing={l} />)}
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Drawer */}
            {chatOpen && (
                <>
                    <div className="overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100 }} onClick={() => setChatOpen(false)} />
                    <div style={{
                        position: 'fixed', right: 0, top: 0, bottom: 0, width: 400, maxWidth: '90vw',
                        background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)',
                        zIndex: 200, display: 'flex', flexDirection: 'column',
                        animation: 'slideRight 0.3s ease-reverse',
                    }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 800 }}>Chat with {listing.seller.name}</div>
                                <div style={{ color: '#4ade80', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></div> Online</div>
                            </div>
                            <button onClick={() => setChatOpen(false)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 8, borderRadius: '50%', cursor: 'pointer', display: 'flex' }}><X size={18} /></button>
                        </div>

                        <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>Inquiry regarding</div>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
                                        <Image src={listing.images[0]} alt={listing.title} fill sizes="44px" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{listing.title}</div>
                                        <div style={{ color: 'var(--brand-primary)', fontWeight: 800, fontSize: '0.9rem' }}>{formatINR(listing.price)}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                                {['Is it available?', 'Best price?', 'Can I rent?', 'Self pickup?'].map(q => (
                                    <button key={q} onClick={() => setChatMsg(q)} style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', background: 'var(--bg-glass)', border: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>{q}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ padding: 20, borderTop: '1px solid var(--border)', display: 'flex', gap: 12 }}>
                            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} placeholder="Type a message..." className="input-field" style={{ flex: 1 }} />
                            <button
                                onClick={async () => {
                                    if (!chatMsg.trim()) return;
                                    const { sendMessage } = await import('@/app/actions/message');
                                    const res = await sendMessage(listing.seller.id, chatMsg, listing.id);
                                    if (res.success) {
                                        setChatMsg('');
                                        router.push('/messages');
                                    } else {
                                        alert(res.error || 'Failed to send message');
                                    }
                                }}
                                className="btn btn-primary" style={{ padding: '0 16px', borderRadius: 'var(--radius-md)' }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </>
            )}
            {/* Video Call Overlay */}
            {isVideoCalling && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{
                        width: 120, height: 120, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                        marginBottom: 32, boxShadow: '0 0 40px rgba(74,222,128,0.4)',
                        animation: 'pulse 1.5s infinite'
                    }}>
                        <PhoneCall size={48} />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>Connecting...</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Initiating secure video call with {listing.seller.name}</p>
                    <button onClick={() => setIsVideoCalling(false)} className="btn btn-outline" style={{ marginTop: 40, borderColor: '#f87171', color: '#f87171' }}>Cancel Call</button>
                </div>
            )}

            {/* Report Modal */}
            {reportModalOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', padding: 24 }}>
                    <div className="glass-card animate-zoom-in" style={{ width: '100%', maxWidth: 500, padding: 32 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <AlertTriangle size={24} color="#f87171" />
                                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>Report Listing</h2>
                            </div>
                            <button onClick={() => setReportModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>Reason for reporting</label>
                                <select
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                    style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', color: 'var(--text-primary)' }}
                                >
                                    <option value="">Select a reason...</option>
                                    <option value="spam">Spam or Misleading</option>
                                    <option value="scam">Scam or Fraudulent</option>
                                    <option value="prohibited">Prohibited Item</option>
                                    <option value="offensive">Offensive Content</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>Additional Details (Optional)</label>
                                <textarea
                                    value={reportDetails}
                                    onChange={(e) => setReportDetails(e.target.value)}
                                    placeholder="Tell us more about what's wrong..."
                                    style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', color: 'var(--text-primary)', minHeight: 100, resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                <button
                                    onClick={() => setReportModalOpen(false)}
                                    className="btn btn-outline"
                                    style={{ flex: 1, padding: '12px' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReport}
                                    className="btn btn-primary"
                                    disabled={isReporting}
                                    style={{ flex: 1, padding: '12px', background: '#f87171', borderColor: '#f87171' }}
                                >
                                    {isReporting ? 'Submitting...' : 'Submit Report'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .product-grid { grid-template-columns: 1.4fr 1fr; }
                @media (max-width: 992px) {
                    .product-grid { grid-template-columns: 1fr; }
                }
                .quick-specs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; }
            `}</style>
        </div>
    );
}
