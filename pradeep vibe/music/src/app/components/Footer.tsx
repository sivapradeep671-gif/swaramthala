'use client';
import Link from 'next/link';
import { Music, ShieldCheck, Zap, CheckCircle2, PhoneCall, Lock, Twitter, Github, Facebook, Youtube } from 'lucide-react';


export default function Footer() {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border)',
            marginTop: 80,
        }}>
            {/* Trust Bar */}
            <div style={{
                borderBottom: '1px solid var(--border)',
                padding: '24px 0',
                background: 'rgba(124,92,252,0.04)',
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', alignItems: 'center' }}>
                    {[
                        { icon: <Lock size={18} />, label: 'SSL Secured' },
                        { icon: <Zap size={18} />, label: 'UPI Payments' },
                        { icon: <CheckCircle2 size={18} />, label: 'Verified Sellers' },
                        { icon: <ShieldCheck size={18} />, label: 'Buyer Protection' },
                        { icon: <PhoneCall size={18} />, label: '24/7 Support' },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                            <span style={{ display: 'flex' }}>{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Footer */}
            <div className="container" style={{ padding: '60px 24px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>

                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #7c5cfc, #c084fc)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                        }}><Music size={16} /></div>
                        <span style={{
                            fontFamily: 'var(--font-display)', fontWeight: 800,
                            background: 'linear-gradient(135deg, #7c5cfc, #c084fc)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            fontSize: '1.1rem',
                        }}>Swaramthala</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 20 }}>
                        India&apos;s most immersive musical instrument marketplace. Born in Tamil Nadu, built for every musician in India. Swaramthala blends tradition with technology.
                    </p>
                    <div style={{ display: 'flex', gap: 10 }}>
                        {[
                            { icon: <Twitter size={14} />, label: 'X', href: 'https://twitter.com/swaramthala' },
                            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>, label: 'Spotify', href: 'https://open.spotify.com/swaramthala' },
                            { icon: <Github size={14} />, label: 'GitHub', href: 'https://github.com/swaramthala' },
                            { icon: <Facebook size={14} />, label: 'Facebook', href: 'https://facebook.com/swaramthala' },
                            { icon: <Youtube size={14} />, label: 'YouTube', href: 'https://youtube.com/swaramthala' }
                        ].map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover-lift" style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: 'var(--bg-glass)', border: '1px solid var(--border)',
                                color: 'var(--text-secondary)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all var(--t-fast)',
                                textDecoration: 'none'
                            }}
                                onMouseEnter={e => { (e.currentTarget.style.borderColor = 'var(--brand-primary)'); (e.currentTarget.style.color = 'var(--brand-primary)'); }}
                                onMouseLeave={e => { (e.currentTarget.style.borderColor = 'var(--border)'); (e.currentTarget.style.color = 'var(--text-secondary)'); }}
                            ><span className="scale-icon" style={{ display: 'flex' }}>{s.icon}</span></a>
                        ))}
                    </div>
                </div>

                {/* Instrument Categories */}
                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Search</h4>
                    {[
                        { href: '/browse?cat=guitar', label: '🎸 Guitars' },
                        { href: '/browse?cat=keys', label: '🎹 Keyboards & Synths' },
                        { href: '/browse?cat=drums', label: '🥁 Drums & Percussion' },
                        { href: '/browse?cat=studio', label: '🎙️ Studio Gear' },
                        { href: '/browse?cat=strings', label: '🎻 Indian Strings' },
                        { href: '/browse?cat=folk', label: '🪘 Folk Instruments' },
                    ].map(link => (
                        <Link key={link.href} href={link.href} style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 10, transition: 'color var(--t-fast)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>{link.label}</Link>
                    ))}
                </div>

                {/* Company */}
                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Company</h4>
                    {[
                        { href: '#', label: 'About Us' },
                        { href: '#', label: 'Careers' },
                        { href: '#', label: 'Blog' },
                        { href: '#', label: 'Press Kit' },
                        { href: '#', label: 'Partner with Us' },
                    ].map(link => (
                        <Link key={link.label} href={link.href} style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 10, transition: 'color var(--t-fast)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>{link.label}</Link>
                    ))}
                </div>

                {/* Support */}
                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Support</h4>
                    {[
                        { href: '#', label: 'Help Center' },
                        { href: '#', label: 'Buyer Protection' },
                        { href: '#', label: 'Dispute Resolution' },
                        { href: '/privacy', label: 'Privacy Policy' },
                        { href: '/terms', label: 'Terms of Service' },
                    ].map(link => (
                        <Link key={link.label} href={link.href} style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: 10, transition: 'color var(--t-fast)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>{link.label}</Link>
                    ))}

                    {/* Newsletter */}
                    <div style={{ marginTop: 20 }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 10 }}>Get deals in your inbox</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input placeholder="you@email.com" className="input-field" style={{ flex: 1, fontSize: '0.8rem', padding: '9px 12px' }} />
                            <button className="btn btn-primary" style={{ padding: '9px 16px', fontSize: '0.8rem', borderRadius: 'var(--radius-md)' }}>→</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{ borderTop: '1px solid var(--border)', padding: '20px 24px' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        © 2026 Swaramthala Technologies Pvt. Ltd. · Chennai, Tamil Nadu · GST: 33AABCS1234A1Z5
                    </p>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <span style={{ fontSize: 20 }} title="UPI Accepted">💳</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>UPI · Razorpay · Cards · Wallets</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
