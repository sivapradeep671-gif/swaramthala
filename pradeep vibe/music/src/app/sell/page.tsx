'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES, formatINR } from '@/lib/mockData';
import { createListing } from '../actions/listing';
import { generateListingDetails } from '../actions/ai';
import { Camera, Plus, Music, Bot, CheckCircle, UploadCloud, PartyPopper } from 'lucide-react';

const STEPS = ['Basics', 'Details', 'Media', 'Pricing'];

export default function SellPage() {
    const [step, setStep] = useState(0);
    const [selectedCat, setSelectedCat] = useState('');
    const [form, setForm] = useState<{
        title: string;
        brand: string;
        condition: string;
        description: string;
        price: string;
        type: string;
        year: string;
        city: string;
        eventDate: string;
        videoUrl: string;
        audioUrl: string;
    }>({ title: '', brand: '', condition: 'good', description: '', price: '', type: 'sale', year: '', city: '', eventDate: '', videoUrl: '', audioUrl: '' });
    const [published, setPublished] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPrice, setGeneratedPrice] = useState<number | null>(null);

    const aiSuggestedPrice = generatedPrice !== null ? generatedPrice : (form.title.toLowerCase().includes('fender') ? 62000 : form.title.toLowerCase().includes('roland') ? 55000 : 35000);

    const handleGenerateAI = async () => {
        if (!form.title || !form.brand) return;
        setIsGenerating(true);
        const res = await generateListingDetails({
            title: form.title,
            brand: form.brand,
            category: selectedCat,
            condition: form.condition
        });
        if (res.success) {
            if (res.price) setGeneratedPrice(res.price);
            if (res.description) setForm(prev => ({ ...prev, description: res.description }));
        }
        setIsGenerating(false);
    };

    const handlePublish = async () => {
        setIsPublishing(true);
        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('brand', form.brand);
        fd.append('price', form.price);
        fd.append('category', selectedCat);
        fd.append('condition', form.condition);
        fd.append('description', form.description);
        fd.append('eventDate', form.eventDate);

        fd.append('location', form.city || 'Chennai, TN');
        fd.append('yearMade', form.year);
        fd.append('type', form.type);
        fd.append('videoUrl', form.videoUrl);
        fd.append('audioUrl', form.audioUrl);

        const res = await createListing(fd);
        if (res.success) setPublished(true);
        else alert(res.error || 'Failed to publish');
        setIsPublishing(false);
    };

    if (published) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
                <div className="animate-scale-in" style={{ maxWidth: 480 }}>
                    <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}><PartyPopper size={80} color="#f472b6" /></div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', marginBottom: 16 }}>
                        Your listing is <span className="gradient-text">Live!</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.7 }}>
                        Musicians across India can now discover your gear. We&apos;ll notify you when someone shows interest.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/browse" className="btn btn-primary">Search More Gear</Link>
                        <Link href="/dashboard" className="btn btn-outline">Go to Dashboard</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Header */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
                <div className="container">
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 8 }}>
                        List Your <span className="gradient-text">Instrument</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Reach 18,000+ musicians across India. It&apos;s free to list.</p>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 24px', maxWidth: 760 }}>
                {/* Step Indicator */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
                    {STEPS.map((s, i) => (
                        <div key={s} style={{ flex: 1, position: 'relative' }}>
                            <div style={{
                                height: 6, borderRadius: 'var(--radius-full)',
                                background: step >= i ? 'var(--brand-primary)' : 'var(--border)',
                                transition: 'all 0.4s ease'
                            }} />
                            <div style={{
                                marginTop: 12, fontSize: '0.75rem', fontWeight: 700,
                                color: step >= i ? 'var(--text-primary)' : 'var(--text-muted)',
                                textTransform: 'uppercase', letterSpacing: '0.05em'
                            }}>{s}</div>
                        </div>
                    ))}
                </div>

                {/* Step 0: Basics */}
                {step === 0 && (
                    <div className="animate-fade-up">
                        <div style={{ background: 'var(--bg-secondary)', padding: 32, borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', marginBottom: 32 }}>
                            <h2 style={{ fontWeight: 700, marginBottom: 8, fontSize: '1.25rem' }}>Select Category</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '0.9rem' }}>What kind of instrument or service are you listing?</p>
                            <div className="category-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12 }}>
                                {CATEGORIES.map(cat => (
                                    <button key={cat.id} onClick={() => setSelectedCat(cat.id)} style={{
                                        background: selectedCat === cat.id ? 'rgba(124,92,252,0.1)' : 'var(--bg-card)',
                                        border: `2px solid ${selectedCat === cat.id ? 'var(--brand-primary)' : 'var(--border)'}`,
                                        borderRadius: 'var(--radius-lg)', padding: '16px 8px', textAlign: 'center',
                                        cursor: 'pointer', transition: 'all var(--t-normal)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                                    }}>
                                        <cat.icon size={24} color={selectedCat === cat.id ? 'var(--brand-primary)' : 'var(--text-muted)'} />
                                        <div style={{ fontWeight: 700, fontSize: '0.75rem', color: selectedCat === cat.id ? 'var(--text-primary)' : 'var(--text-muted)' }}>{cat.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Listing Title *</label>
                                <input
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Gibson Les Paul Standard '50s Heritage Cherry Sunburst"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Brand *</label>
                                <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} placeholder="e.g. Gibson, Fender, Ibanez" className="input-field" />
                            </div>
                            <button onClick={() => setStep(1)} disabled={!selectedCat || !form.title || !form.brand} className="btn btn-primary" style={{ height: 56, justifyContent: 'center' }}>
                                Next: Listing Details →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 1: Details */}
                {step === 1 && (
                    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Condition *</label>
                                <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })} className="input-field">
                                    <option value="mint">Mint (Like New)</option>
                                    <option value="good">Good (Minor Wear)</option>
                                    <option value="fair">Fair (Visible Wear)</option>
                                    <option value="repair">Needs Repair</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Listing Type *</label>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="input-field">
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                    <option value="trade">Open for Trade</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>City / Location *</label>
                                    <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="e.g. Bangalore" className="input-field" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Year Made</label>
                                    <input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="e.g. 2021" className="input-field" type="number" />
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Description</label>
                                    <button onClick={handleGenerateAI} disabled={isGenerating} style={{ color: 'var(--brand-secondary)', background: 'none', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Bot size={16} /> {isGenerating ? 'Analyzing...' : 'Auto-fill with AI'}
                                    </button>
                                </div>
                                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the sound, playability, and any upgrades..." className="input-field" rows={8} />
                            </div>

                            <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                                <button onClick={() => setStep(0)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                                <button onClick={() => setStep(2)} className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Next: Upload Media →</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Media */}
                {step === 2 && (
                    <div className="animate-fade-up">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} style={{ aspectRatio: '1', background: 'var(--bg-secondary)', border: '2px dashed var(--border)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <Camera size={32} />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{i === 0 ? 'Main Photo' : 'Add Photo'}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 32 }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                                    <div style={{ padding: '8px', background: 'var(--brand-primary)20', borderRadius: '10px', color: 'var(--brand-primary)' }}>
                                        <Music size={24} />
                                    </div>
                                    <h3 style={{ fontWeight: 800 }}>Sound Check Details</h3>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Demo Video URL (YouTube / Vimeo)</label>
                                        <input
                                            value={form.videoUrl}
                                            onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="input-field"
                                        />
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 6 }}>Paste a link to a video of you playing the instrument.</p>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Audio Sample URL (Direct link to MP3/WAV)</label>
                                        <input
                                            value={form.audioUrl}
                                            onChange={e => setForm({ ...form, audioUrl: e.target.value })}
                                            placeholder="https://example.com/demo.mp3"
                                            className="input-field"
                                        />
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 6 }}>Optional: Provide a direct link to an audio file.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <button onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                            <button onClick={() => setStep(3)} className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Next: Pricing →</button>
                        </div>
                    </div>
                )}

                {/* Step 3: Pricing */}
                {step === 3 && (
                    <div className="animate-fade-up">
                        <div style={{ background: 'var(--bg-secondary)', padding: 32, borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', marginBottom: 32 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <label style={{ fontWeight: 800, fontSize: '1.1rem' }}>Set Your Price</label>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--brand-secondary)' }}>{form.price ? formatINR(+form.price) : '₹0'}</div>
                            </div>
                            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Enter amount in ₹" className="input-field" style={{ fontSize: '1.25rem', padding: '20px' }} />
                        </div>

                        <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius-xl)', padding: 24, marginBottom: 40 }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                                <Bot size={20} color="#4ade80" />
                                <span style={{ fontWeight: 700, color: '#4ade80' }}>Smart Pricing Recommendation</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 16 }}>Based on similar {form.brand} instruments in {form.condition} condition, we recommend listing between <strong>{formatINR(aiSuggestedPrice * 0.9)}</strong> and <strong>{formatINR(aiSuggestedPrice * 1.1)}</strong>.</p>
                            <button onClick={() => setForm({ ...form, price: String(aiSuggestedPrice) })} className="btn btn-outline" style={{ borderColor: '#4ade8050', color: '#4ade80' }}>Apply Recommended Price</button>
                        </div>

                        <div style={{ display: 'flex', gap: 16 }}>
                            <button onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                            <button onClick={handlePublish} disabled={isPublishing || !form.price} className="btn btn-primary" style={{ flex: 2, justifyContent: 'center', fontSize: '1.1rem' }}>
                                {isPublishing ? 'Publishing...' : 'Confirm & Publish Listing'}
                            </button>
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
}
