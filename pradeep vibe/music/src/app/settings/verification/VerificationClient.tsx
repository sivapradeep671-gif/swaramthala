'use client';
import { useState } from 'react';
import { submitVerification } from '@/app/actions/kyc';
import {
    ShieldCheck,
    Upload,
    Music,
    Instagram,
    Youtube,
    ExternalLink,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function VerificationClient({
    user,
    initialStatus,
    latestRequest
}: {
    user: any,
    initialStatus: string,
    latestRequest: any
}) {
    const [status, setStatus] = useState(initialStatus);
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        documentType: 'Aadhaar',
        documentUrl: '',
        spotify: '',
        instagram: '',
        youtube: ''
    });

    const handleUploadSim = () => {
        setUploading(true);
        // Simulate upload delay
        setTimeout(() => {
            setFormData(prev => ({ ...prev, documentUrl: `https://storage.swaramthala.com/kyc/${user.id}-${Date.now()}.jpg` }));
            setUploading(false);
        }, 1500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.documentUrl) {
            alert('Please upload an identity document first.');
            return;
        }

        if (!formData.spotify && !formData.instagram && !formData.youtube) {
            alert('Please provide at least one social proof link.');
            return;
        }

        setIsSubmitting(true);

        const fd = new FormData();
        fd.append('documentType', formData.documentType);
        fd.append('documentUrl', formData.documentUrl);
        fd.append('spotify', formData.spotify);
        fd.append('instagram', formData.instagram);
        fd.append('youtube', formData.youtube);

        const res = await submitVerification(fd);
        if (res.success) {
            setStatus('pending');
        } else {
            alert(res.error || 'Failed to submit verification');
        }
        setIsSubmitting(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '40px 24px' }}>
            <div className="container" style={{ maxWidth: 800 }}>
                <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 32, fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>

                <div style={{ marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', marginBottom: 12 }}>
                        Musician <span className="gradient-text">Verification</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600 }}>
                        Get the &apos;Verified Musician&apos; badge to build trust, sell gear faster, and unlock premium seller features.
                    </p>
                </div>

                {status === 'verified' && (
                    <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--radius-xl)', padding: 40, textAlign: 'center' }} className="animate-scale-in">
                        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}><CheckCircle2 size={80} color="#4ade80" /></div>
                        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: 12 }}>You are a Verified Musician!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>Your profile now features the verification badge. Thank you for being a trusted part of Swaramthala.</p>
                    </div>
                )}

                {status === 'pending' && (
                    <div style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 'var(--radius-xl)', padding: 40, textAlign: 'center' }} className="animate-fade-up">
                        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}><Clock size={80} color="#60a5fa" /></div>
                        <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: 12 }}>Verification in Progress</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Our team is reviewing your documents and musical social proof. This usually takes 24-48 hours.</p>
                        <div style={{ display: 'inline-flex', padding: '12px 24px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            Submitted on {new Date(latestRequest?.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                )}

                {status === 'rejected' && (
                    <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 'var(--radius-xl)', padding: 40, marginBottom: 32 }} className="animate-fade-up">
                        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                            <div style={{ background: 'rgba(248,113,113,0.2)', padding: 12, borderRadius: 'var(--radius-lg)' }}><AlertCircle color="#f87171" size={32} /></div>
                            <div>
                                <h2 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: 8, color: '#f87171' }}>Verification Rejected</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 12, fontSize: '0.95rem' }}>Reason: {latestRequest?.rejectionReason || 'Documents provided were unclear.'}</p>
                                <button onClick={() => setStatus('none')} className="btn btn-outline" style={{ borderColor: '#f8717140', color: '#f87171', fontSize: '0.85rem' }}>Try Again</button>
                            </div>
                        </div>
                    </div>
                )}

                {(status === 'none' || status === 'rejected') && (
                    <form onSubmit={handleSubmit} className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        {/* Identity Section */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                                <ShieldCheck color="var(--brand-primary)" />
                                <h3 style={{ fontWeight: 800, fontSize: '1.2rem' }}>1. Identity Verification</h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32 }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>Document Type</label>
                                    <select
                                        value={formData.documentType}
                                        onChange={e => setFormData({ ...formData, documentType: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="Aadhaar">Aadhaar Card</option>
                                        <option value="PAN">PAN Card</option>
                                        <option value="Passport">Passport</option>
                                    </select>
                                </div>
                                <div
                                    onClick={handleUploadSim}
                                    style={{
                                        width: '100%',
                                        height: 56,
                                        border: formData.documentUrl ? '2px solid var(--brand-primary)' : '2px dashed var(--border)',
                                        background: formData.documentUrl ? 'rgba(124,92,252,0.05)' : 'transparent',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 12,
                                        cursor: uploading ? 'wait' : 'pointer',
                                        color: formData.documentUrl ? 'var(--brand-primary)' : 'var(--text-muted)',
                                        transition: 'all var(--t-normal)'
                                    }}
                                    onMouseEnter={e => !formData.documentUrl && (e.currentTarget.style.borderColor = 'var(--brand-primary)')}
                                    onMouseLeave={e => !formData.documentUrl && (e.currentTarget.style.borderColor = 'var(--border)')}>
                                    {uploading ? (
                                        <div className="spinner-sm" />
                                    ) : formData.documentUrl ? (
                                        <><CheckCircle2 size={20} /> Identity Captured</>
                                    ) : (
                                        <><Upload size={20} /> Upload Document</>
                                    )}
                                </div>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>* Documents are stored securely and only used for verification purposes.</p>
                        </div>

                        {/* Social Section */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                                <Music color="var(--brand-secondary)" />
                                <h3 style={{ fontWeight: 800, fontSize: '1.2rem' }}>2. Musician Social Proof</h3>
                            </div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '0.9rem' }}>Provide at least one link to verify you are an active musician.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <Music size={16} color="var(--brand-secondary)" />
                                        <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Spotify / SoundCloud Link</label>
                                    </div>
                                    <input
                                        value={formData.spotify}
                                        onChange={e => setFormData({ ...formData, spotify: e.target.value })}
                                        placeholder="https://open.spotify.com/artist/..."
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <Instagram size={16} style={{ color: '#E1306C' }} />
                                        <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Instagram Profile</label>
                                    </div>
                                    <input
                                        value={formData.instagram}
                                        onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                                        placeholder="https://instagram.com/musician_handle"
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <Youtube size={16} style={{ color: '#FF0000' }} />
                                        <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>YouTube Channel</label>
                                    </div>
                                    <input
                                        value={formData.youtube}
                                        onChange={e => setFormData({ ...formData, youtube: e.target.value })}
                                        placeholder="https://youtube.com/c/musician"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                            style={{ height: 60, justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800 }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
