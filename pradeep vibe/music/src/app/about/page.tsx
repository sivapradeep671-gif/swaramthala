import Link from 'next/link';
import Image from 'next/image';
import { Music, Users, ShieldCheck, Globe, Zap, MapPin, Heart, Award, Headphones, BookOpen } from 'lucide-react';

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Hero */}
            <section style={{
                position: 'relative', padding: 'clamp(60px, 10vw, 120px) 0 80px',
                background: 'linear-gradient(135deg, rgba(124,92,252,0.12) 0%, rgba(192,132,252,0.08) 50%, transparent 100%)',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '40%', height: '50%', background: 'radial-gradient(circle, var(--brand-glow) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                        <div style={{
                            width: 80, height: 80, borderRadius: 24,
                            background: 'var(--bg-glass)', border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)', overflow: 'hidden'
                        }}>
                            <Image src="/logo.png" alt="Swaramthala" width={68} height={68} style={{ objectFit: 'contain' }} />
                        </div>
                    </div>
                    <h1 className="animate-fade-up stagger-1" style={{
                        fontFamily: 'var(--font-display)', fontWeight: 800,
                        fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.1, marginBottom: 20
                    }}>
                        About <span className="gradient-text">Swaramthala</span>
                    </h1>
                    <p className="animate-fade-up stagger-2" style={{
                        color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        maxWidth: 640, margin: '0 auto', lineHeight: 1.7
                    }}>
                        India&apos;s most immersive musical instrument marketplace. Born in Tamil Nadu, built for every musician across the nation.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
                        <div className="animate-fade-up">
                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: 20 }}>
                                Our <span className="gradient-text">Mission</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, fontSize: '1rem' }}>
                                We believe every musician deserves access to quality instruments at fair prices. Swaramthala connects buyers, sellers, and renters in a trusted community built specifically for musicians.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
                                From a student in Chennai looking for their first guitar to a professional in Mumbai upgrading their studio setup — we make it simple, safe, and musical.
                            </p>
                        </div>
                        <div className="animate-fade-up stagger-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {[
                                { num: '18,000+', label: 'Active Musicians', icon: Users },
                                { num: '25,000+', label: 'Instruments Listed', icon: Music },
                                { num: '500+', label: 'Cities Covered', icon: MapPin },
                                { num: '4.8★', label: 'Avg. Rating', icon: Award },
                            ].map(stat => (
                                <div key={stat.label} style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-lg)', padding: '24px 20px', textAlign: 'center',
                                    transition: 'all var(--t-normal)',
                                }}>
                                    <stat.icon size={24} color="var(--brand-primary)" style={{ marginBottom: 8 }} />
                                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--brand-primary)', marginBottom: 4 }}>{stat.num}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <h2 className="section-title animate-fade-up">What We <span className="gradient-text">Stand For</span></h2>
                        <p className="section-subtitle animate-fade-up stagger-1">Built by musicians, for musicians.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
                        {[
                            { icon: ShieldCheck, title: 'Trust & Safety', desc: 'Every seller is KYC-verified. Every transaction is protected. Buyer protection on all orders.' },
                            { icon: Zap, title: 'Lightning Fast', desc: 'List your instrument in under 3 minutes. Our AI suggests the best price so you sell faster.' },
                            { icon: Globe, title: 'Pan-India Reach', desc: 'From Kashmir to Kanyakumari — 500+ cities connected. Local pickups or secure shipping.' },
                            { icon: Heart, title: 'Community First', desc: 'We are not just a marketplace. We are a community of passionate musicians helping each other grow.' },
                            { icon: Headphones, title: 'Sound Demo', desc: 'Hear before you buy. Listings with audio demos help you judge tone and quality remotely.' },
                            { icon: BookOpen, title: 'Fair Pricing', desc: 'Our AI analyzes market data to recommend fair prices. No overcharging, no lowballing.' },
                        ].map((val, i) => (
                            <div key={val.title} className={`animate-fade-up stagger-${i + 1}`} style={{
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-lg)', padding: '28px 24px',
                                transition: 'all var(--t-normal)',
                            }}>
                                <val.icon size={28} color="var(--brand-primary)" style={{ marginBottom: 16 }} />
                                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10, color: 'var(--text-primary)' }}>{val.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title animate-fade-up">Built in <span className="gradient-text">Chennai</span></h2>
                    <p className="section-subtitle animate-fade-up stagger-1">A small team with big dreams for Indian music.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, maxWidth: 800, margin: '0 auto' }}>
                        {[
                            { name: 'Pradeep S.', role: 'Founder & CEO', emoji: '🎸' },
                            { name: 'Siva K.', role: 'Lead Engineer', emoji: '💻' },
                            { name: 'Ananya R.', role: 'Design Lead', emoji: '🎨' },
                        ].map((member, i) => (
                            <div key={member.name} className={`animate-fade-up stagger-${i + 1}`} style={{
                                background: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-xl)', padding: '32px 24px',
                            }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.8rem', margin: '0 auto 16px',
                                }}>{member.emoji}</div>
                                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{member.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ paddingBottom: 0 }}>
                <div className="container">
                    <div style={{
                        borderRadius: 'var(--radius-xl)', padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)',
                        background: 'linear-gradient(135deg, rgba(124,92,252,0.2), rgba(192,132,252,0.15), rgba(244,114,182,0.15))',
                        border: '1px solid rgba(124,92,252,0.3)', textAlign: 'center',
                    }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: 16 }}>
                            Ready to join the <span className="gradient-text">community?</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
                            Whether you&apos;re buying your first instrument or selling your collection, Swaramthala is where musicians connect.
                        </p>
                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/browse" className="btn btn-primary" style={{ padding: '14px 36px' }}>Explore Instruments</Link>
                            <Link href="/sell" className="btn btn-outline" style={{ padding: '14px 36px' }}>Start Selling</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
