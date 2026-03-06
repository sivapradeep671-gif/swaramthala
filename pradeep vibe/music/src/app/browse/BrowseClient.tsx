'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { CATEGORIES, formatINR, Listing } from '@/lib/mockData';
import ListingCard from '@/app/components/ListingCard';
import { Search, X, Music, Tag, Calendar, RefreshCw, Ticket, Users, MapPin, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { useGeolocation } from '@/lib/hooks/useGeolocation';
import { getBrowseListings } from '../actions/query';
import { ListingSkeleton } from '@/app/components/Skeleton';

type SortKey = 'recent' | 'price-asc' | 'price-desc' | 'popular' | 'distance';

export default function BrowseClient({ initialListings }: { initialListings: any[] }) {
    const searchParams = useSearchParams();
    const { latitude, longitude, loading: locLoading, getLocation } = useGeolocation();

    const [listings, setListings] = useState(initialListings);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedCondition, setSelectedCondition] = useState<string>('all');
    const [soundDemo, setSoundDemo] = useState(false);
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    const [maxPrice, setMaxPrice] = useState(500000);
    const [sort, setSort] = useState<SortKey>('recent');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cat = searchParams.get('cat');
        const type = searchParams.get('type');
        if (cat) setSelectedCat(cat);
        if (type) setSelectedType(type);
    }, [searchParams]);

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            const filters = {
                category: selectedCat === 'all' ? null : selectedCat,
                type: selectedType === 'all' ? null : selectedType,
                condition: selectedCondition === 'all' ? null : selectedCondition,
                maxPrice,
                soundDemo,
                verified: verifiedOnly,
                sortBy: sort
            };
            const userLatLng = latitude && longitude ? { lat: latitude, lng: longitude } : undefined;
            const res = await getBrowseListings(filters, userLatLng);
            setListings(res);
            setLoading(false);
        };

        const timeoutId = setTimeout(fetchListings, 300);
        return () => clearTimeout(timeoutId);
    }, [selectedCat, selectedType, selectedCondition, maxPrice, soundDemo, verifiedOnly, sort, latitude, longitude]);

    useEffect(() => {
        if (!headerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.gsap-browse-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.1 }
            );
        }, headerRef);
        return () => ctx.revert();
    }, []);

    const filtered = useMemo(() => {
        return listings.filter(l => {
            const matchSearch = !search ||
                l.title.toLowerCase().includes(search.toLowerCase()) ||
                l.brand.toLowerCase().includes(search.toLowerCase());
            return matchSearch;
        });
    }, [listings, search]);

    const activeFilters = [
        selectedCat !== 'all' && CATEGORIES.find(c => c.id === selectedCat)?.label,
        selectedType !== 'all' && selectedType,
        selectedCondition !== 'all' && selectedCondition,
    ].filter(Boolean) as string[];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Page Header */}
            <div ref={headerRef} style={{
                position: 'relative',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '64px 0',
                background: 'var(--bg-secondary)',
                backgroundImage: 'url("https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=2000")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(4px)' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 className="gsap-browse-anim" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 8, color: 'var(--text-primary)' }}>
                        Search <span className="gradient-text">Instruments</span>
                    </h1>
                    <p className="gsap-browse-anim" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{initialListings.length.toLocaleString('en-IN')}+ premium listings across India</p>

                    {/* Search Input */}
                    <div className="gsap-browse-anim" style={{
                        marginTop: 32, display: 'flex', gap: 12, maxWidth: 640,
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(16px)', borderRadius: 'var(--radius-full)',
                        padding: '8px 8px 8px 24px', alignItems: 'center',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)', transition: 'all 0.3s ease'
                    }}>
                        <Search size={20} color="var(--brand-secondary)" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Find your dream gear by name, brand, or city..."
                            className="input-field"
                            style={{ background: 'none', border: 'none', boxShadow: 'none', flex: 1, padding: '8px 0', fontSize: '1rem', color: 'white' }}
                        />
                        {search && (
                            <button className="hover-lift" onClick={() => setSearch('')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%' }}>
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '32px 24px' }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

                    {/* Sidebar */}
                    <aside style={{
                        width: sidebarOpen ? 280 : 0, flexShrink: 0, overflow: 'hidden',
                        transition: 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                    }}>
                        <div style={{ width: 280, paddingRight: 20 }} data-aos="fade-right">
                            {/* Category */}
                            <div className="glass-panel" style={{ padding: 24, marginBottom: 20 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Category</h3>
                                {[{ id: 'all', label: 'All Categories', icon: Music }, ...CATEGORIES].map(cat => (
                                    <button key={cat.id} className="hover-lift" onClick={() => setSelectedCat(cat.id)} style={{
                                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                                        padding: '10px 12px', borderRadius: 'var(--radius-md)', marginBottom: 6,
                                        background: selectedCat === cat.id ? 'rgba(124,92,252,0.15)' : 'transparent',
                                        border: selectedCat === cat.id ? '1px solid var(--brand-primary)' : '1px solid transparent',
                                        color: selectedCat === cat.id ? 'var(--brand-secondary)' : 'var(--text-primary)',
                                        cursor: 'pointer', fontSize: '0.9rem', fontWeight: selectedCat === cat.id ? 600 : 400,
                                        transition: 'all 0.2s ease', textAlign: 'left',
                                    }}>
                                        <cat.icon size={18} className="scale-icon" />
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {/* Listing Type */}
                            <div className="glass-panel" style={{ padding: 24, marginBottom: 20 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Listing Type</h3>
                                {[
                                    { id: 'all', label: 'All Types', icon: Music },
                                    { id: 'sale', label: 'For Sale', icon: Tag },
                                    { id: 'rent', label: 'For Rent', icon: Calendar },
                                    { id: 'trade', label: 'Trade', icon: RefreshCw },
                                    { id: 'event', label: 'Event Tickets', icon: Ticket },
                                    { id: 'service', label: 'Musician Hire', icon: Users }
                                ].map(type => (
                                    <button key={type.id} className="hover-lift" onClick={() => setSelectedType(type.id)} style={{
                                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                                        padding: '10px 12px', borderRadius: 'var(--radius-md)', marginBottom: 6,
                                        background: selectedType === type.id ? 'rgba(124,92,252,0.15)' : 'transparent',
                                        border: selectedType === type.id ? '1px solid var(--brand-primary)' : '1px solid transparent',
                                        color: selectedType === type.id ? 'var(--brand-secondary)' : 'var(--text-primary)',
                                        cursor: 'pointer', fontSize: '0.9rem', fontWeight: selectedType === type.id ? 600 : 400,
                                        transition: 'all 0.2s ease', textAlign: 'left',
                                    }}>
                                        <type.icon size={18} className="scale-icon" />
                                        {type.label}
                                    </button>
                                ))}
                            </div>

                            {/* Condition */}
                            <div className="glass-panel" style={{ padding: 24, marginBottom: 20 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Condition</h3>
                                {[['all', 'All'], ['mint', 'Mint ✨'], ['good', 'Good 👍'], ['fair', 'Fair 🙂'], ['repair', 'Needs Repair 🔧']].map(([val, label]) => (
                                    <button key={val} className="hover-lift" onClick={() => setSelectedCondition(val)} style={{
                                        display: 'block', width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', marginBottom: 6,
                                        background: selectedCondition === val ? 'rgba(124,92,252,0.15)' : 'transparent',
                                        border: selectedCondition === val ? '1px solid var(--brand-primary)' : '1px solid transparent',
                                        color: selectedCondition === val ? 'var(--brand-secondary)' : 'var(--text-primary)',
                                        cursor: 'pointer', fontSize: '0.9rem', fontWeight: selectedCondition === val ? 600 : 400,
                                        transition: 'all 0.2s ease', textAlign: 'left',
                                    }}>{label}</button>
                                ))}
                            </div>

                            {/* Max Price */}
                            <div className="glass-panel" style={{ padding: 24, marginBottom: 20 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Max Price</h3>
                                <p style={{ color: 'var(--brand-secondary)', fontWeight: 800, fontSize: '1.2rem', marginBottom: 16 }}>{formatINR(maxPrice)}</p>
                                <input type="range" min={500} max={500000} step={500} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'grab' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 8, fontWeight: 500 }}>
                                    <span>₹500</span><span>₹5,00,000</span>
                                </div>
                            </div>

                            {/* Additional Filters */}
                            <div className="glass-panel" style={{ padding: 24 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Features</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.9rem' }}>
                                        <input type="checkbox" checked={soundDemo} onChange={e => setSoundDemo(e.target.checked)} style={{ accentColor: 'var(--brand-primary)' }} />
                                        Sound Check Available
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.9rem' }}>
                                        <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} style={{ accentColor: 'var(--brand-primary)' }} />
                                        Verified Sellers Only
                                    </label>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Listing Area */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Toolbar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                <button className="hover-lift" onClick={() => setSidebarOpen(!sidebarOpen)} style={{
                                    background: 'var(--bg-glass)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-full)', padding: '8px 16px', cursor: 'pointer',
                                    color: 'var(--text-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6,
                                    fontWeight: 600, backdropFilter: 'blur(12px)',
                                }}>
                                    <span style={{ fontSize: '1.2em' }}>☰</span> {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
                                </button>

                                <button
                                    className="hover-lift"
                                    onClick={getLocation}
                                    disabled={locLoading}
                                    style={{
                                        background: latitude ? 'rgba(74,222,128,0.1)' : 'var(--bg-glass)',
                                        border: `1px solid ${latitude ? '#4ade80' : 'var(--border)'}`,
                                        borderRadius: 'var(--radius-full)', padding: '8px 16px', cursor: 'pointer',
                                        color: latitude ? '#4ade80' : 'var(--text-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6,
                                        fontWeight: 600, backdropFilter: 'blur(12px)',
                                    }}
                                >
                                    <MapPin size={16} />
                                    {locLoading ? 'Locating...' : latitude ? 'Near Me Active' : 'Find Nearby'}
                                </button>

                                {activeFilters.map(f => (
                                    <span key={f} style={{
                                        background: 'rgba(124,92,252,0.15)', border: '1px solid var(--brand-primary)',
                                        borderRadius: 'var(--radius-full)', padding: '4px 12px',
                                        fontSize: '0.75rem', color: 'var(--brand-secondary)', fontWeight: 600,
                                    }}>{f} ×</span>
                                ))}

                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                    {loading ? 'Updating...' : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`}
                                </span>
                            </div>

                            <select value={sort} onChange={e => setSort(e.target.value as SortKey)} style={{
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)', padding: '8px 12px',
                                color: 'var(--text-primary)', fontSize: '0.85rem', cursor: 'pointer', outline: 'none',
                            }}>
                                <option value="recent">Most Recent</option>
                                <option value="popular">Most Popular</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                {latitude && <option value="distance">Distance: Nearest First</option>}
                            </select>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="listing-grid">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                    <ListingSkeleton key={i} />
                                ))}
                            </div>
                        ) : filtered.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '100px 24px', color: 'var(--text-muted)' }} data-aos="zoom-in">
                                <div style={{ fontSize: 72, marginBottom: 16 }}>🎵</div>
                                <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: '1.5rem', color: 'var(--text-primary)' }}>No listings found</h3>
                                <p style={{ fontSize: '1.1rem', marginBottom: 24 }}>Try adjusting your filters or search query.</p>
                                <button onClick={() => { setSearch(''); setSelectedCat('all'); setSelectedType('all'); setSelectedCondition('all'); setMaxPrice(500000); }}
                                    className="btn btn-primary hover-lift">Clear All Filters</button>
                            </div>
                        ) : (
                            <div className="listing-grid">
                                {filtered.map((listing: any, i: number) => (
                                    <div key={listing.id} data-aos="fade-up" data-aos-delay={(i % 8) * 50}>
                                        <ListingCard listing={listing} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
