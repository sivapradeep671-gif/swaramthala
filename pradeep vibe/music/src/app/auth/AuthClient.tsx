'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { verifyOtp } from '../actions/auth';
import { Music, CheckCircle2, CreditCard, ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react';
import { toastSuccess, toastError } from '../components/Toast';
type AuthMode = 'login' | 'register';

export default function AuthPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [mode, setMode] = useState<AuthMode>('login');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);

    const handleOtpChange = (val: string, idx: number) => {
        if (!/^\d*$/.test(val)) return;
        const next = [...otp];
        next[idx] = val.slice(-1);
        setOtp(next);
        if (val && idx < 5) {
            const nextInput = document.getElementById(`otp-${idx + 1}`);
            if (nextInput) (nextInput as HTMLInputElement).focus();
        }
        if (!val && idx > 0) {
            const prevInput = document.getElementById(`otp-${idx - 1}`);
            if (prevInput) (prevInput as HTMLInputElement).focus();
        }
    };

    const submitOtp = async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length !== 6) return;
        setLoading(true);
        try {
            const res = await verifyOtp(phone, mode);
            if (res.success) {
                toastSuccess(mode === 'login' ? 'Welcome back!' : 'Account created!');
                router.push(callbackUrl);
                router.refresh();
            } else {
                toastError(res.error || 'Verification failed');
            }
        } catch {
            toastError('Something went wrong. Try again.');
        }
        setLoading(false);
    };


    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'stretch' }}>
            {/* Left Panel (hidden on mobile) */}
            <div style={{
                flex: 1, minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f0a1f, #0a1020)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: 48, position: 'relative', overflow: 'hidden',
            }} className="auth-left">
                {/* Background orbs */}
                <div style={{ position: 'absolute', top: '20%', left: '20%', width: 300, height: 300, borderRadius: '50%', background: '#7c5cfc', opacity: 0.08, filter: 'blur(80px)', animation: 'float 5s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 200, height: 200, borderRadius: '50%', background: '#f59e0b', opacity: 0.07, filter: 'blur(60px)', animation: 'float 4s ease-in-out infinite 1s' }} />

                <div style={{ position: 'relative', textAlign: 'center', maxWidth: 400 }}>
                    <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', color: 'var(--brand-primary)' }}><Music size={80} /></div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.2rem', marginBottom: 16, lineHeight: 1.2 }}>
                        The Sound of a <span className="gradient-text">Great Deal</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40, fontSize: '0.95rem' }}>
                        Join 18,000+ musicians buying, selling, and trading gear across India. From Chennai to Kashmir.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { text: '25,000+ instruments listed', icon: <Music size={16} /> },
                            { text: 'Verified sellers only', icon: <ShieldCheck size={16} /> },
                            { text: 'Safe UPI & card payments', icon: <CreditCard size={16} /> },
                            { text: 'Buyer protection on all orders', icon: <CheckCircle2 size={16} /> }
                        ].map(f => (
                            <div key={f.text} style={{
                                background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-md)',
                                padding: '12px 16px', textAlign: 'left', fontSize: '0.88rem',
                                color: 'var(--text-secondary)', border: '1px solid var(--border)',
                                display: 'flex', alignItems: 'center', gap: 12
                            }}>{f.icon} {f.text}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div style={{ width: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', background: 'var(--bg-secondary)' }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7c5cfc, #c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Music size={20} /></div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', background: 'linear-gradient(135deg, #7c5cfc, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Swaramthala</span>
                </div>

                {/* Mode toggle */}
                <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 4, marginBottom: 32, width: '100%' }}>
                    {(['login', 'register'] as AuthMode[]).map(m => (
                        <button key={m} onClick={() => setMode(m)} style={{
                            flex: 1, padding: '10px', borderRadius: 'var(--radius-full)',
                            background: mode === m ? 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' : 'transparent',
                            border: 'none', color: mode === m ? 'white' : 'var(--text-muted)',
                            fontWeight: mode === m ? 700 : 500, cursor: 'pointer', transition: 'all var(--t-fast)', fontSize: '0.9rem',
                        }}>{m === 'login' ? 'Sign In' : 'Sign Up'}</button>
                    ))}
                </div>

                <div style={{ width: '100%' }}>
                    {step === 'phone' && (
                        <div className="animate-fade-up">
                            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: 6 }}>{mode === 'login' ? 'Welcome back!' : 'Create account'}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.88rem' }}>Enter your phone number to continue</p>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.88rem' }}>Mobile Number</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 14px', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}><Globe size={16} /> +91</div>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" className="input-field" maxLength={10} style={{ flex: 1 }} />
                                </div>
                            </div>

                            <button
                                onClick={async () => {
                                    if (phone.length !== 10) return;
                                    setLoading(true);
                                    // Mock delay for UX
                                    await new Promise(r => setTimeout(r, 800));
                                    setStep('otp');
                                    setLoading(false);
                                }}
                                disabled={phone.length !== 10 || loading}
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: (phone.length !== 10 || loading) ? 0.5 : 1, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}
                            >
                                {loading ? 'Sending...' : <>Send OTP <Zap size={18} /></>}
                            </button>

                            <Link href="/browse" style={{ display: 'block', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none' }}>
                                Continue as Guest (limited access)
                            </Link>
                        </div>
                    )}

                    {step === 'otp' && (
                        <div className="animate-fade-up">
                            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: 6 }}>Enter OTP</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.88rem' }}>Sent to +91 {phone}</p>

                            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
                                {otp.map((val, idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-${idx}`}
                                        value={val}
                                        onChange={e => handleOtpChange(e.target.value, idx)}
                                        maxLength={1}
                                        style={{
                                            width: 48, height: 56, textAlign: 'center',
                                            background: 'var(--bg-card)', border: `2px solid ${val ? 'var(--brand-primary)' : 'var(--border)'}`,
                                            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
                                            fontSize: '1.4rem', fontWeight: 700, outline: 'none',
                                            transition: 'border-color var(--t-fast)',
                                        }}
                                    />
                                ))}
                            </div>

                            <button onClick={submitOtp} disabled={otp.join('').length !== 6 || loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, opacity: otp.join('').length !== 6 ? 0.5 : 1 }}>
                                {loading ? 'Verifying...' : <>Verify & {mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>}
                            </button>
                            <button onClick={() => setStep('phone')} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}>
                                ← Change number
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .auth-left { display: none !important; }
        }
      `}</style>
        </div>
    );
}
