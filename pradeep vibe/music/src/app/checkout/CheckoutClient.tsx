'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatINR } from '@/lib/mockData';
import { placeOrder, processMockPayment, updateOrderStatus } from '@/app/actions/order';
import { CheckCircle, Music, Zap, CreditCard, Wallet, MapPin, ShieldCheck, ChevronLeft, Plus, Loader2, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toastError } from '@/app/components/Toast';
import { Listing, User } from '@prisma/client';

type Address = { id: string; street: string; city: string; state: string; pincode: string; isDefault: boolean };

export default function CheckoutClient({ listing, type, user, initialAddresses }: {
    listing: Listing;
    type: 'buy' | 'rent';
    user: User;
    initialAddresses: Address[];
}) {
    const router = useRouter();
    const [payMethod, setPayMethod] = useState('upi');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [ordered, setOrdered] = useState(false);
    const [payDetails, setPayDetails] = useState('');

    const defaultAddr = initialAddresses.find(a => a.isDefault) ?? initialAddresses[0] ?? null;
    const [selectedAddr, setSelectedAddr] = useState<Address | null>(defaultAddr);

    const amount = type === 'rent' ? (listing.rentPrice || 0) : listing.price;
    const platformFee = Math.round(amount * 0.05);
    const total = amount + platformFee;

    const handleConfirmOrder = async () => {
        if (!selectedAddr) {
            toastError('Please add a delivery address.');
            return;
        }
        if (!payDetails && payMethod !== 'upi') {
            toastError('Please enter payment details.');
            return;
        }

        setIsSubmitting(true);
        // Step 1: Place Initial Order (Pending)
        const res = await placeOrder([{ id: listing.id, type }]);

        if (res.success && res.orderIds) {
            // Step 2: Show "Processing Gateway" Simulation
            setIsProcessing(true);

            // Step 3: Atomic Mock Payment
            const payRes = await processMockPayment(res.orderIds as string[]);

            setTimeout(async () => {
                setIsProcessing(false);
                if (payRes.success) {
                    setOrdered(true);
                } else {
                    toastError(payRes.error || 'Payment failed.');
                    setIsSubmitting(false);
                }
            }, 3000);
        } else {
            toastError(res.error || 'Failed to place order.');
            setIsSubmitting(false);
        }
    };

    if (ordered) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
                <div className="animate-scale-in">
                    <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '2px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2s infinite' }}>
                            <CheckCircle size={64} color="#4ade80" />
                        </div>
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '3rem', marginBottom: 16, letterSpacing: '-0.03em' }}>
                        Success! <span className="gradient-text">Gear Secured.</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 8, fontSize: '1.2rem', maxWidth: 500, margin: '0 auto 32px' }}>
                        Your {type === 'rent' ? 'rental' : 'order'} for <strong style={{ color: 'var(--text-primary)' }}>{listing.title}</strong> is confirmed. The seller has been notified.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                        <Link href="/dashboard" className="btn btn-primary" style={{ padding: '14px 28px' }}>View Dashboard</Link>
                        <Link href="/browse" className="btn btn-outline" style={{ padding: '14px 28px' }}>Browse More Gear</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: 100 }}>
            {/* Processing Overlay */}
            {isProcessing && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                        <Loader2 className="animate-spin" size={40} color="var(--brand-primary)" />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Verifying <span className="gradient-text">Payment</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Securely communicating with your bank...</p>
                    <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        <Lock size={14} /> 256-bit SSL Encrypted
                    </div>
                </div>
            )}

            {/* Header */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button onClick={() => router.back()} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '8px 10px', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', color: 'var(--text-primary)' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem' }}>Checkout</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 2 }}>Secure Transaction · Buyer Shield Enabled</p>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 24px' }}>
                <div className="checkout-grid">
                    {/* Left Col */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {/* Order Preview */}
                        <div className="glass-card" style={{ padding: 24 }}>
                            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Music size={18} color="var(--brand-primary)" /> Order Summary
                            </h2>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <div style={{ width: 100, height: 100, borderRadius: 'var(--radius-lg)', background: 'var(--bg-secondary)', overflow: 'hidden', flexShrink: 0 }}>
                                    {listing.images?.[0]
                                        ? <div style={{ position: 'relative', width: '100%', height: '100%' }}><Image src={listing.images[0]} alt={listing.title} fill style={{ objectFit: 'cover' }} /></div>
                                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Music size={36} color="var(--text-muted)" /></div>
                                    }
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 4 }}>{listing.title}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>{listing.brand} · {listing.condition}</div>
                                    <span style={{ display: 'inline-flex', padding: '4px 12px', background: 'rgba(124,92,252,0.12)', color: 'var(--brand-primary)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                        {type === 'rent' ? '📅 Rental Request' : '🛒 Direct Purchase'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="glass-card" style={{ padding: 24 }}>
                            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <MapPin size={18} color="var(--brand-primary)" /> Delivery Address
                            </h2>
                            {initialAddresses.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '24px', border: '1.5px dashed var(--border)', borderRadius: 'var(--radius-lg)' }}>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: '0.9rem' }}>No saved addresses. Add one in Settings.</p>
                                    <Link href="/settings" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                        <Plus size={16} /> Add Address
                                    </Link>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {initialAddresses.map(addr => (
                                        <button key={addr.id} onClick={() => setSelectedAddr(addr)} style={{
                                            padding: 16, textAlign: 'left', borderRadius: 'var(--radius-lg)',
                                            background: selectedAddr?.id === addr.id ? 'rgba(124,92,252,0.08)' : 'var(--bg-secondary)',
                                            border: `1.5px solid ${selectedAddr?.id === addr.id ? 'var(--brand-primary)' : 'var(--border)'}`,
                                            cursor: 'pointer', transition: 'all 0.2s ease', width: '100%',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{addr.street}</span>
                                                {addr.isDefault && <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand-primary)' }}>DEFAULT</span>}
                                            </div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                                                {addr.city}, {addr.state} — {addr.pincode}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Payment */}
                        <div className="glass-card" style={{ padding: 24 }}>
                            <h2 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <CreditCard size={18} color="var(--brand-primary)" /> Payment Method
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 24 }}>
                                {[
                                    { id: 'upi', icon: <Zap size={20} />, label: 'UPI / GPay' },
                                    { id: 'card', icon: <CreditCard size={20} />, label: 'Card' },
                                    { id: 'wallet', icon: <Wallet size={20} />, label: 'Transfer' },
                                ].map(m => (
                                    <button key={m.id} onClick={() => setPayMethod(m.id)} style={{
                                        padding: 16, textAlign: 'left', borderRadius: 'var(--radius-lg)',
                                        background: payMethod === m.id ? 'rgba(124,92,252,0.08)' : 'var(--bg-secondary)',
                                        border: `1.5px solid ${payMethod === m.id ? 'var(--brand-primary)' : 'var(--border)'}`,
                                        cursor: 'pointer', transition: 'all 0.2s ease',
                                    }}>
                                        <div style={{ color: payMethod === m.id ? 'var(--brand-primary)' : 'var(--text-muted)', marginBottom: 10 }}>{m.icon}</div>
                                        <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{m.label}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="animate-fade-up">
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
                                    {payMethod === 'upi' ? 'UPI ID' : payMethod === 'card' ? 'Card Details' : 'Account Identifier'}
                                </label>
                                <input
                                    className="input-field"
                                    placeholder={payMethod === 'upi' ? 'musician@upi' : '1234 5678 9101 1121'}
                                    value={payDetails}
                                    onChange={e => setPayDetails(e.target.value)}
                                    style={{ width: '100%', background: 'var(--bg-secondary)' }}
                                />
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <ShieldCheck size={12} /> Encrypted and handled by secure gateway
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Sticky Summary */}
                    <div className="checkout-sticky">
                        <div className="glass-card" style={{ padding: 32, boxShadow: 'var(--shadow-card)' }}>
                            <h3 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 24 }}>Price Breakdown</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                                {[
                                    { label: 'Item Price', value: formatINR(amount), green: false },
                                    { label: 'Platform Handling (5%)', value: formatINR(platformFee), green: false },
                                    { label: 'Shipping', value: 'FREE', green: true },
                                ].map(r => (
                                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>{r.label}</span>
                                        <span style={{ fontWeight: 600, color: r.green ? '#4ade80' : 'var(--text-primary)' }}>{r.value}</span>
                                    </div>
                                ))}
                                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>Total</span>
                                    <span style={{ fontWeight: 900, fontSize: '1.6rem', color: 'var(--brand-secondary)' }}>{formatINR(total)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmOrder}
                                disabled={isSubmitting || !selectedAddr || !payDetails}
                                className="btn btn-primary"
                                style={{ width: '100%', height: 56, justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, opacity: (!selectedAddr || !payDetails) ? 0.6 : 1, transition: 'all 0.3s' }}
                            >
                                {isSubmitting ? 'Confirming...' : `Complete ${type === 'rent' ? 'Rental' : 'Purchase'}`}
                            </button>

                            <div style={{ marginTop: 24, fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#4ade80', fontWeight: 700 }}>
                                    <ShieldCheck size={14} /> Swaramthala Buyer Protection
                                </div>
                                <p>We hold your payment in escrow until you receive and verify the instrument.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .glass-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-xl);
                }
                .checkout-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 32;
                }
                .checkout-sticky {
                    position: sticky;
                    top: 24px;
                    height: fit-content;
                }
                @media (max-width: 992px) {
                    .checkout-grid { grid-template-columns: 1fr; }
                    .checkout-sticky { position: static; }
                }
            `}</style>
        </div>
    );
}
