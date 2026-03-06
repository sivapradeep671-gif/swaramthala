'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatINR } from '@/lib/mockData';
import ListingCard from '@/app/components/ListingCard';
import { IndianRupee, Package, ShoppingCart, Star, Music, Briefcase, ShieldCheck, Clock, Eye, Heart, TrendingUp, Trash2, Power, CheckCircle, ChevronRight, X, AlertCircle } from 'lucide-react';
import { updateListingStatus, deleteListing } from '@/app/actions/dashboard';
import { toastError } from '@/app/components/Toast';

const TABS = ['My Active Listings', 'Sold & Inactive', 'My Purchases', 'Orders Received (Sales)'];

export default function DashboardClient({
    user,
    initialListings,
    purchases,
    sales,
    analytics,
    advancedAnalytics
}: {
    user: any,
    initialListings: any[],
    purchases: any[],
    sales: any[],
    analytics: {
        totalViews: number,
        totalFavorites: number,
        totalMessages: number,
        topListings: any[]
    },
    advancedAnalytics: any
}) {
    const router = useRouter();
    const [tab, setTab] = useState('My Active Listings');
    const [loadingAction, setLoadingAction] = useState<string | null>(null);

    // Calculate dynamic stats
    const totalEarnings = sales.filter(s => s.status === 'completed').reduce((sum, order) => sum + order.amount, 0);
    const pendingOrders = sales.filter(s => s.status === 'pending').length;

    const activeListings = initialListings.filter(l => l.status === 'active');
    const inactiveListings = initialListings.filter(l => l.status !== 'active');

    const STATS = [
        { icon: <IndianRupee size={24} />, label: 'Total Earnings', value: formatINR(totalEarnings), sub: 'From completed orders', color: '#4ade80' },
        { icon: <Eye size={24} />, label: 'Total Views', value: analytics.totalViews.toLocaleString(), sub: 'Across all listings', color: '#60a5fa' },
        { icon: <TrendingUp size={24} />, label: 'Conversion Rate', value: analytics.totalViews > 0 ? `${((analytics.totalMessages / analytics.totalViews) * 100).toFixed(1)}%` : '0%', sub: 'Views to Inquiries', color: '#f472b6' },
        { icon: <Star size={24} />, label: 'Avg. Rating', value: user.rating.toFixed(1), sub: `From ${user.reviewCount} reviews`, color: '#fbbf24' },
    ];

    const handleUpdateStatus = async (id: string, status: string) => {
        setLoadingAction(id);
        const res = await updateListingStatus(id, status);
        if (res.error) toastError(res.error);
        setLoadingAction(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;
        setLoadingAction(id);
        const res = await deleteListing(id);
        if (res.error) toastError(res.error);
        setLoadingAction(null);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: 80 }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.15), rgba(192,132,252,0.1))', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
                    <div className="animate-fade-up">
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 8, fontWeight: 500 }}>Seller Hub</p>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', letterSpacing: '-0.02em' }}>Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            {user.name} · {user.city} · {user.verified && <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: 4 }}><ShieldCheck size={16} /> Verified</span>}
                        </p>
                    </div>
                    <Link href="/sell" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: 'var(--radius-full)', fontWeight: 700, boxShadow: '0 10px 30px rgba(124,92,252,0.3)' }}>+ Post New Gear</Link>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 24px' }}>
                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
                    {STATS.map((s, i) => (
                        <div key={s.label} className="glass-card animate-fade-up" style={{
                            padding: '24px', position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{ color: s.color, marginBottom: 16 }}>{s.icon}</div>
                            <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: 4 }}>{s.value}</div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 2 }}>{s.label}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.sub}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 32, marginBottom: 48 }} className="dashboard-main-grid">
                    {/* Left: Earnings Chart & Performance */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div className="glass-card animate-fade-up" style={{ padding: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>Earnings <span className="gradient-text">Trends</span></h2>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Last 30 Days</span>
                            </div>

                            {advancedAnalytics?.earningsData ? (
                                <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 4, paddingBottom: 20 }}>
                                    {advancedAnalytics.earningsData.map((d: any, i: number) => {
                                        const maxEarnings = Math.max(...advancedAnalytics.earningsData.map((day: any) => day.earnings), 1);
                                        const height = (d.earnings / maxEarnings) * 100;
                                        return (
                                            <div key={d.date} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8 }} title={`${d.date}: ${formatINR(d.earnings)}`}>
                                                <div style={{
                                                    height: `${height}%`,
                                                    background: 'linear-gradient(to top, var(--brand-primary), var(--brand-secondary))',
                                                    borderRadius: '4px 4px 0 0',
                                                    minHeight: d.earnings > 0 ? 4 : 0,
                                                    opacity: d.earnings > 0 ? 1 : 0.2,
                                                    transition: 'height 1s ease'
                                                }} />
                                                {i % 5 === 0 && <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center' }}>{d.date.split(' ')[1]}</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                    No transaction data available
                                </div>
                            )}
                        </div>

                        <div className="glass-card animate-fade-up" style={{ padding: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>Top <span className="gradient-text">Gear</span></h2>
                                <Eye size={18} color="var(--brand-primary)" />
                            </div>

                            {advancedAnalytics?.topListings?.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    {advancedAnalytics.topListings.map((l: any) => (
                                        <div key={l.title}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
                                                <span style={{ fontWeight: 600 }}>{l.title}</span>
                                                <span style={{ color: 'var(--text-muted)' }}>{l.views} views · {l.favorites} hearts</span>
                                            </div>
                                            <div style={{ height: 6, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${Math.min((l.views / (advancedAnalytics.topListings[0].views || 1)) * 100, 100)}%`,
                                                    height: '100%',
                                                    background: 'var(--brand-primary)',
                                                    borderRadius: 3
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No listing data yet</p>
                            )}
                        </div>
                    </div>

                    {/* Right: Notifications/Orders */}
                    <div className="glass-card animate-fade-up" style={{ padding: 24 }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 24 }}>Alerts & Tasks</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {pendingOrders > 0 && (
                                <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', padding: '12px 16px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <AlertCircle size={20} color="#fbbf24" />
                                    <div style={{ fontSize: '0.85rem' }}>
                                        <strong>{pendingOrders} Pending Orders</strong><br />Review and accept them in the Sales tab.
                                    </div>
                                </div>
                            )}
                            {user.kycStatus !== 'verified' && (
                                <div style={{ background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.2)', padding: '12px 16px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <ShieldCheck size={20} color="var(--brand-primary)" />
                                    <div style={{ fontSize: '0.85rem' }}>
                                        <strong>Trust Score Low</strong><br />Complete KYC to unlock &quot;Verified Seller&quot; badge.
                                    </div>
                                </div>
                            )}
                            {activeListings.length === 0 && (
                                <div style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', padding: '12px 16px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <Package size={20} color="#60a5fa" />
                                    <div style={{ fontSize: '0.85rem' }}>
                                        <strong>No Active Gear</strong><br />You don&apos;t have any items for sale right now.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, padding: 4, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', width: 'fit-content' }}>
                    {TABS.map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            padding: '10px 24px', borderRadius: 'var(--radius-full)',
                            background: tab === t ? 'var(--bg-card)' : 'transparent',
                            border: tab === t ? '1px solid var(--border)' : '1px solid transparent',
                            cursor: 'pointer',
                            color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)',
                            fontWeight: tab === t ? 700 : 500, fontSize: '0.9rem', transition: 'all 0.2s',
                        }}>{t}</button>
                    ))}
                </div>

                {/* Listing Grid with Management Controls */}
                {(tab === 'My Active Listings' || tab === 'Sold & Inactive') && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                        {(tab === 'My Active Listings' ? activeListings : inactiveListings).map(l => (
                            <div key={l.id} className="glass-card animate-fade-up" style={{ padding: 12, position: 'relative' }}>
                                <div style={{ height: 180, borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', marginBottom: 16 }}>
                                    <Image src={l.images[0]} alt={l.title} fill style={{ objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8, zIndex: 1 }}>
                                        <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', color: 'white', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Eye size={12} /> {l.views}
                                        </div>
                                        <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', color: 'white', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Heart size={12} /> {l.favoriteCount}
                                        </div>
                                    </div>
                                    {l.status !== 'active' && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase' }}>
                                            {l.status}
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '0 8px 12px' }}>
                                    <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</h3>
                                    <div style={{ color: 'var(--brand-primary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: 16 }}>{formatINR(l.price)}</div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                        {l.status === 'active' ? (
                                            <>
                                                <button
                                                    disabled={loadingAction === l.id || l.isPromoted}
                                                    onClick={() => handleUpdateStatus(l.id, 'promote')}
                                                    className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '10px', gridColumn: 'span 2', background: l.isPromoted ? 'var(--brand-secondary)' : 'var(--brand-primary)' }}
                                                >
                                                    {l.isPromoted ? '🚀 Gear Boosted' : '🔥 Boost Gear'}
                                                </button>
                                                <button
                                                    disabled={loadingAction === l.id}
                                                    onClick={() => handleUpdateStatus(l.id, 'sold')}
                                                    className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '10px', color: '#4ade80' }}
                                                >
                                                    <CheckCircle size={16} /> Mark Sold
                                                </button>
                                                <button
                                                    disabled={loadingAction === l.id}
                                                    onClick={() => handleUpdateStatus(l.id, 'inactive')}
                                                    className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '10px' }}
                                                >
                                                    <Power size={16} /> Deactivate
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                disabled={loadingAction === l.id}
                                                onClick={() => handleUpdateStatus(l.id, 'active')}
                                                className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '10px', gridColumn: 'span 2' }}
                                            >
                                                Relist Gear
                                            </button>
                                        )}
                                        <button
                                            disabled={loadingAction === l.id}
                                            onClick={() => handleDelete(l.id)}
                                            className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '10px', color: '#f87171', gridColumn: 'span 2', marginTop: 4 }}
                                        >
                                            <Trash2 size={16} /> Delete Forever
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Purchases Table (Simplified) */}
                {tab === 'My Purchases' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {purchases.map(p => (
                            <div key={p.id} className="glass-card animate-fade-up" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
                                <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                                    <Image src={p.listing.images[0]} alt={p.listing.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700 }}>{p.listing.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.seller.name} · {new Date(p.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 800 }}>{formatINR(p.amount)}</div>
                                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: p.status === 'completed' ? '#4ade80' : '#fbbf24' }}>{p.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Sales Table */}
                {tab === 'Orders Received (Sales)' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {sales.map(s => (
                            <div key={s.id} className="glass-card animate-fade-up" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                                    <Image src={s.listing.images[0]} alt={s.listing.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <div style={{ fontWeight: 700 }}>{s.listing.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Buyer: {s.buyer.name} · {new Date(s.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <div>
                                        <div style={{ fontWeight: 800 }}>{formatINR(s.amount)}</div>
                                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: s.status === 'completed' ? '#4ade80' : '#fbbf24' }}>{s.status}</div>
                                    </div>
                                    {s.status === 'pending' && (
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button onClick={() => handleUpdateStatus(s.id, 'completed')} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Accept</button>
                                            <button onClick={() => handleUpdateStatus(s.id, 'rejected')} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem', color: '#f87171' }}>Reject</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .glass-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-xl);
                    transition: all 0.3s ease;
                }
                .glass-card:hover {
                    border-color: var(--brand-primary);
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                .dashboard-main-grid {
                    grid-template-columns: 1.8fr 1fr;
                }
                @media (max-width: 992px) {
                    .dashboard-main-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
