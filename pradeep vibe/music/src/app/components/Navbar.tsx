'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { logout } from '../actions/auth';
import { Music, Search, ShoppingCart, MessageCircle, Menu, X, Home, Compass, Calendar, ArrowLeftRight, Users, LayoutDashboard, Tag, Mic, Languages } from 'lucide-react';
import { translations, Language } from '@/lib/translations';
import NotificationBell from './NotificationBell';

export default function Navbar({ user }: { user: any }) {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [lang, setLang] = useState<Language>('en');
    const [isListening, setIsListening] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedLang = localStorage.getItem('lang') as Language;
        if (savedLang) setLang(savedLang);

        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toggleLang = () => {
        const newLang = lang === 'en' ? 'ta' : 'en';
        setLang(newLang);
        localStorage.setItem('lang', newLang);
    };

    const t = translations[lang];

    const startVoiceSearch = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition not supported in this browser.');
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            router.push(`/browse?q=${encodeURIComponent(transcript)}`);
            setSearchOpen(false);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    useEffect(() => {
        if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    return (
        <>
            <nav className={scrolled ? 'glass-header' : ''} style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                transition: 'all 0.3s ease',
                background: scrolled ? undefined : 'linear-gradient(to bottom, rgba(10,10,15,0.8), transparent)',
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: '12px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}>
                            <Image src="/logo.png" alt="Swaramthala Logo" width={32} height={32} style={{ objectFit: 'contain' }} />
                        </div>
                        <span style={{
                            fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900,
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>Swaramthala</span>
                    </Link>

                    {/* Desktop Links */}
                    <div style={{ display: 'flex', gap: 4, marginLeft: 8, flex: 1 }} className="desktop-nav">
                        {[
                            { href: '/', label: t.nav.home },
                            { href: '/browse', label: t.nav.search },
                            { href: '/browse?type=rent', label: t.nav.rent },
                            { href: '/browse?type=trade', label: t.nav.trade },
                            { href: '/community', label: t.nav.community },
                        ].map(link => (
                            <Link key={link.label} href={link.href} style={{
                                padding: '6px 14px', borderRadius: 'var(--radius-full)',
                                color: 'var(--text-secondary)', textDecoration: 'none',
                                fontSize: '0.9rem', fontWeight: 500,
                                transition: 'all var(--t-fast)',
                            }}
                                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--text-primary)'; (e.target as HTMLElement).style.background = 'var(--bg-glass)'; }}
                                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--text-secondary)'; (e.target as HTMLElement).style.background = 'transparent'; }}>{link.label}</Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        transition: 'all 0.3s ease',
                        width: searchOpen ? 320 : 44,
                        background: 'var(--bg-card)',
                        borderRadius: 'var(--radius-full)',
                        border: isListening ? '1px solid var(--brand-primary)' : '1px solid var(--border)',
                        boxShadow: isListening ? '0 0 15px var(--brand-glow)' : 'none',
                        overflow: 'hidden',
                        padding: '0 12px',
                        height: 40,
                    }}>
                        <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Open search" style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', flexShrink: 0,
                        }}><Search size={16} /></button>
                        <input
                            ref={searchRef}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
                                    setSearchOpen(false);
                                    setSearchQuery('');
                                }
                                if (e.key === 'Escape') setSearchOpen(false);
                            }}
                            placeholder={isListening ? (lang === 'ta' ? 'கவனித்துக் கொண்டிருக்கிறேன்...' : 'Listening...') : t.nav.placeholder}
                            style={{
                                background: 'none', border: 'none', outline: 'none',
                                color: 'var(--text-primary)', fontSize: '0.85rem',
                                width: '100%', padding: '0 8px',
                                opacity: searchOpen ? 1 : 0,
                                transition: 'opacity 0.2s',
                                fontFamily: 'var(--font-sans)',
                            }}
                        />
                        {searchOpen && (
                            <button
                                onClick={startVoiceSearch}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: isListening ? 'var(--brand-primary)' : 'var(--text-muted)',
                                    display: 'flex', alignItems: 'center', flexShrink: 0,
                                    padding: '0 4px',
                                    animation: isListening ? 'pulse 1.5s infinite' : 'none'
                                }}
                            >
                                <Mic size={16} />
                            </button>
                        )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            title={lang === 'en' ? 'தமிழ் பதிப்பிற்கு மாற்றவும்' : 'Switch to English'}
                            style={{
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-full)', width: 40, height: 40, color: 'var(--text-primary)',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all var(--t-fast)', fontSize: '0.85rem', fontWeight: 800,
                                fontFamily: 'var(--font-display)'
                            }}
                        >
                            {lang === 'en' ? 'TA' : 'EN'}
                        </button>

                        {/* Cart */}
                        <Link href="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
                            <button aria-label="Shopping cart" style={{
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-full)', width: 40, height: 40, color: 'var(--text-primary)',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all var(--t-fast)',
                            }}><ShoppingCart size={18} /></button>
                        </Link>

                        {/* Notifications */}
                        {user && <NotificationBell user={user} />}

                        {/* Messages */}
                        {user && (
                            <Link href="/messages" style={{ position: 'relative', textDecoration: 'none' }}>
                                <button aria-label="Messages" style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-full)', width: 40, height: 40, color: 'var(--text-primary)',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all var(--t-fast)',
                                }}><MessageCircle size={18} /></button>
                            </Link>
                        )}

                        {/* Sell CTA */}
                        <Link href="/sell" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                            + {t.nav.sell}
                        </Link>

                        {/* Profile */}
                        {user ? (
                            <div style={{ position: 'relative' }}>
                                {user.role === 'admin' && (
                                    <Link href="/admin" style={{ color: '#4ade80', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, padding: '4px 8px', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: 'var(--radius-sm)', marginRight: 8 }}>
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    style={{
                                        width: 36, height: 36, borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #7c5cfc, #c084fc)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.9rem', fontWeight: 700, color: 'white', cursor: 'pointer',
                                        transition: 'all var(--t-fast)', border: 'none',
                                        boxShadow: menuOpen ? '0 0 0 3px var(--brand-glow)' : 'none',
                                    }}
                                    title={user.name}
                                >{user.avatar}</button>

                                {/* Dropdown Menu */}
                                {menuOpen && (
                                    <>
                                        <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                                        <div style={{
                                            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                                            width: 240, background: 'var(--bg-card)',
                                            border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
                                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)', zIndex: 50,
                                            animation: 'scaleIn 0.15s ease both',
                                            transformOrigin: 'top right', overflow: 'hidden'
                                        }}>
                                            <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)' }}>
                                                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>{user.name}</div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{user.city} · {user.verified ? '✓ Verified' : 'Member'}</div>
                                            </div>
                                            <div style={{ padding: '8px' }}>
                                                {[
                                                    { href: '/dashboard', label: t.nav.dashboard, icon: '📊' },
                                                    { href: '/favorites', label: t.nav.favorites, icon: '❤️' },
                                                    { href: '/messages', label: t.nav.messages, icon: '💬' },
                                                    { href: '/settings', label: t.nav.settings, icon: '⚙️' },
                                                ].map(item => (
                                                    <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
                                                        display: 'flex', alignItems: 'center', gap: 12,
                                                        padding: '10px 12px', borderRadius: 'var(--radius-md)',
                                                        color: 'var(--text-secondary)', textDecoration: 'none',
                                                        fontSize: '0.88rem', fontWeight: 500,
                                                        transition: 'all 0.15s ease',
                                                    }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                                    >
                                                        <span style={{ fontSize: '1rem' }}>{item.icon}</span> {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div style={{ borderTop: '1px solid var(--border)', padding: '8px' }}>
                                                <button onClick={async () => {
                                                    await logout();
                                                    router.push('/');
                                                    router.refresh();
                                                }} style={{
                                                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                                                    padding: '10px 12px', borderRadius: 'var(--radius-md)',
                                                    background: 'none', border: 'none', color: '#f87171',
                                                    fontSize: '0.88rem', fontWeight: 500, cursor: 'pointer',
                                                    transition: 'all 0.15s ease',
                                                }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                                                >
                                                    <span style={{ fontSize: '1rem' }}>🚪</span> {t.nav.signOut}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth" style={{ textDecoration: 'none' }}>
                                <div style={{
                                    width: 'auto', height: 40, borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--border)', padding: '0 20px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer',
                                    transition: 'all var(--t-fast)',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-primary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>{t.nav.signIn}</div>
                            </Link>
                        )}

                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            style={{
                                display: 'none', background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)', width: 40, height: 40, cursor: 'pointer',
                                fontSize: 18, color: 'var(--text-primary)', alignItems: 'center', justifyContent: 'center',
                            }}
                            className="mobile-search-btn"
                        ><Search size={20} /></button>
                    </div>
                </div>

            </nav>

            {/* Space below navbar */}
            <div style={{ height: 64 }} />

            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-search-btn { display: flex !important; }
                    .search-container { display: none !important; }
                }
            `}</style>
        </>
    );
}
