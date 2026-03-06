'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { STATS, HOW_IT_WORKS, COMMUNITY_POSTS, formatINR } from '@/lib/mockData';
import ListingCard from '@/app/components/ListingCard';
import CategoryGrid from '@/app/components/CategoryGrid';
import { Music, Box, Drum, Mic, Search, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [activeWord, setActiveWord] = useState(0);
  const words = ['Buy', 'Sell', 'Rent', 'Trade'];
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => setActiveWord(w => (w + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Background subtle zoom
      gsap.fromTo('.hero-bg',
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 0.8, duration: 2, ease: 'power2.out' }
      );

      // Floating, bouncy entry for text and buttons
      gsap.fromTo('.gsap-hero-anim',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 1.4,
          ease: 'back.out(1.4)',
          delay: 0.15
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} style={{
      position: 'relative', minHeight: '85vh',
      display: 'flex', alignItems: 'center', overflow: 'hidden',
      background: 'var(--bg-primary)',
      backgroundImage: 'url("https://images.unsplash.com/photo-1614605151528-9d4149021e51?auto=format&fit=crop&q=80&w=2000")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Background Dimmer/Overlay */}
      <div className="hero-bg" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 10, 15, 0.75)' }} />

      {/* Subtle Background Glows */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.6 }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '50%', height: '60%', background: 'radial-gradient(circle, var(--brand-glow) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '60%', height: '70%', background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="gsap-hero-anim" style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '24px',
            background: 'var(--bg-glass)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            overflow: 'hidden'
          }}>
            <Image
              src="/logo.png"
              alt="Swaramthala Logo"
              width={68}
              height={68}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-glass)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-full)', padding: '8px 20px',
            fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-secondary)',
          }}>
            🥁 India&apos;s Premium Music Marketplace
          </div>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 9vw, 6rem)',
          fontWeight: 800, lineHeight: 1, marginBottom: 28,
          letterSpacing: '-0.02em', color: 'var(--text-primary)'
        }} className="gsap-hero-anim">
          Your Next <span className="gradient-text">Instrument</span> <br />
          is One {words[activeWord]} Away
        </h1>

        <p className="gsap-hero-anim" style={{
          color: 'var(--text-secondary)', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
          maxWidth: 620, margin: '0 auto 48px', lineHeight: 1.6,
        }}>
          Find, judge, and book gear in seconds. Verified sellers, secure payments, and performance-first experience.
        </p>

        <div className="gsap-hero-anim" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/browse" className="btn btn-primary hover-lift hover-glow" style={{ padding: '16px 40px', fontSize: '1.1rem', boxShadow: '0 20px 40px var(--brand-glow)' }}>
            Start Searching Gear
          </Link>
          <Link href="/sell" className="btn btn-outline hover-lift" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
            List Your Instrument
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ──────────────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 className="section-title" data-aos="fade-up">How <span className="gradient-text">Swaramthala</span> Works</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Simple, safe, and musical.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.step} data-aos="fade-up" data-aos-delay={(i + 1) * 100} className="glass-card hover-lift" style={{
              padding: '32px 24px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -10, right: -10,
                fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900,
                color: 'rgba(124,92,252,0.06)', lineHeight: 1, pointerEvents: 'none',
              }}>{step.step}</div>
              <div style={{ marginBottom: 16, color: 'var(--brand-primary)', display: 'flex' }}><step.icon size={40} className="scale-icon" /></div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 10, color: 'var(--text-primary)' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Listings ─────────────────────────────────────────────────────────
function FeaturedListings({ initialListings }: { initialListings: any[] }) {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 className="section-title" data-aos="fade-up">Featured <span className="gradient-text">Listings</span></h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100" style={{ marginBottom: 0 }}>Handpicked quality gear from verified sellers.</p>
          </div>
          <Link href="/browse" className="btn btn-outline hover-lift" data-aos="fade-left">Search All Gear →</Link>
        </div>
        <div className="listing-grid">
          {initialListings.slice(0, 4).map((listing, i) => (
            <div key={listing.id} data-aos="fade-up" data-aos-delay={i * 100}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Community Spotlight ───────────────────────────────────────────────────────
function CommunitySpotlight() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 className="section-title" data-aos="fade-up">Community <span className="gradient-text">Feed</span></h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100" style={{ marginBottom: 0 }}>What musicians are saying and sharing.</p>
          </div>
          <Link href="/community" className="btn btn-outline hover-lift" data-aos="fade-left">Full Feed →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {COMMUNITY_POSTS.map((post, i) => (
            <div key={post.id} data-aos="fade-up" data-aos-delay={i * 100} className="glass-card hover-lift" style={{
              padding: '20px',
            }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 700, color: 'white',
                }}>{post.user.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    {post.user.name}
                    {post.user.verified && <ShieldCheck size={14} color="var(--brand-secondary)" />}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{post.user.city} · {post.time}</div>
                </div>
                <span className={`badge ${post.type === 'listing' ? 'badge-sale' : post.type === 'event' ? 'badge-mint' : post.type === 'trade' ? 'badge-trade' : 'badge-good'}`}
                  style={{ marginLeft: 'auto', fontSize: '0.62rem' }}>
                  {post.type === 'listing' ? 'Listing' : post.type === 'event' ? 'Event' : post.type === 'trade' ? 'Trade' : 'Tip'}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 14 }}>{post.content}</p>
              <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                <span style={{ cursor: 'pointer', transition: 'color var(--t-fast)', display: 'flex', alignItems: 'center', gap: 4 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <Heart size={14} fill="currentColor" color="currentColor" /> {post.likes}
                </span>
                <span style={{ cursor: 'pointer', transition: 'color var(--t-fast)', display: 'flex', alignItems: 'center', gap: 4 }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <MessageCircle size={14} /> {post.comments}
                </span>
                <span style={{ cursor: 'pointer', marginLeft: 'auto' }}>↗ Share</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container" data-aos="zoom-in">
        <div style={{
          borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative',
          padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)',
          background: 'linear-gradient(135deg, rgba(124,92,252,0.2) 0%, rgba(192,132,252,0.15) 50%, rgba(244,114,182,0.15) 100%)',
          border: '1px solid rgba(124,92,252,0.3)',
          textAlign: 'center',
        }}>
          {/* Background Grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}><Music size={48} className="scale-icon" color="var(--text-primary)" /></div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: 16,
              color: 'var(--text-primary)',
            }}>
              Have gear collecting dust?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
              List in under 3 minutes. Our AI suggests the best price so you sell faster.
              Join 18,000+ musicians who&#39;ve found their community on Swaramthala.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/sell" className="btn btn-primary hover-lift" style={{ padding: '14px 36px', fontSize: '1rem' }}>
                Start Selling Free
              </Link>
              <Link href="/auth" className="btn btn-outline hover-lift" style={{ padding: '14px 36px', fontSize: '1rem' }}>
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────
export default function HomePageClient({ initialListings }: { initialListings: any[] }) {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedListings initialListings={initialListings} />
      <HowItWorksSection />
      <CommunitySpotlight />
      <CTABanner />
    </>
  );
}
