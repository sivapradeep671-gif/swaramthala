'use client';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/mockData';

export default function CategoryGrid() {
    return (
        <section className="section">
            <div className="container">
                <div style={{ marginBottom: 40 }}>
                    <h2 className="section-title animate-fade-up">
                        Search by <span className="gradient-text">Instrument</span>
                    </h2>
                    <p className="section-subtitle animate-fade-up stagger-1">
                        From classic acoustics to cutting-edge studio gear — find your sound.
                    </p>
                </div>

                <div className="scroll-snap-x category-showcase" style={{ padding: '8px 0 24px', gap: 16 }}>
                    <style>{`
                        .category-showcase .glass-card:hover .cat-bg {
                            transform: scale(1.1);
                        }
                    `}</style>
                    {CATEGORIES.map((cat, i) => (
                        <Link key={cat.id} href={`/browse?cat=${cat.id}`} className="snap-child" style={{ textDecoration: 'none' }}>
                            <div
                                className="glass-card hover-lift"
                                data-aos="fade-up"
                                data-aos-delay={i * 50}
                                style={{
                                    position: 'relative',
                                    width: 240,
                                    height: 160,
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    padding: '16px',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                {/* Background Image */}
                                <div className="cat-bg" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: `url(${cat.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                                    zIndex: 0
                                }} />

                                {/* Gradient Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.1) 100%)',
                                    zIndex: 1
                                }} />

                                {/* Glass Content Plate */}
                                <div style={{
                                    position: 'relative',
                                    zIndex: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    background: 'rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    padding: '10px 14px',
                                    borderRadius: 'var(--radius-md)',
                                    width: '100%',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                                }}>
                                    <cat.icon size={20} color="var(--brand-secondary)" className="scale-icon" />
                                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', letterSpacing: '0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                        {cat.label}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
