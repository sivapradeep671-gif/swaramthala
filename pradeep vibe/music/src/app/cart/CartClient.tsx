'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatINR } from '@/lib/mockData';
import { CheckCircle, Music, Trash2, Zap, CreditCard, Wallet, QrCode, ShieldCheck, IndianRupee } from 'lucide-react';

export default function CartClient({ initialCartItems }: { initialCartItems: any[] }) {
    const cartItems = initialCartItems;
    const [payMethod, setPayMethod] = useState('upi');
    const [ordered, setOrdered] = useState(false);
    const [upiId, setUpiId] = useState('');

    const subtotal = cartItems.reduce((s, i) => s + i.price, 0);
    const platform = Math.round(subtotal * 0.02);
    const total = subtotal + platform;

    if (ordered) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
                <div className="animate-scale-in">
                    <div style={{ marginBottom: 20, animation: 'float 3s ease-in-out infinite', display: 'flex', justifyContent: 'center' }}><CheckCircle size={80} color="#4ade80" /></div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>
                        Order <span className="gradient-text">Confirmed!</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Payment of <strong>{formatINR(total)}</strong> was successful.</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 32 }}>The seller has been notified. Track your order in Dashboard.</p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/dashboard" className="btn btn-primary">Track Order</Link>
                        <Link href="/browse" className="btn btn-outline">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
                <div className="container">
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem' }}>Your <span className="gradient-text">Cart</span></h1>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 32, alignItems: 'flex-start' }}>

                    {/* Items */}
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                                <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0, position: 'relative' }}>
                                    {item.images && item.images[0] ? <Image src={item.images[0]} alt={item.title} fill style={{ objectFit: 'cover' }} /> : <Music size={32} color="var(--text-muted)" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, marginBottom: 4, fontSize: '0.95rem' }}>{item.title}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>{item.seller.name} · {item.location}</div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--brand-secondary)' }}>{formatINR(item.price)}</div>
                                </div>
                                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4, transition: 'color var(--t-fast)' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}><Trash2 size={18} /></button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 24, position: 'sticky', top: 80 }}>
                        <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Order Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                            {[['Subtotal', formatINR(subtotal)], ['Platform Fee (2%)', formatINR(platform)], ['Delivery', 'Arranged with seller']].map(([k, v]) => (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                                    <span>{v}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.05rem' }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--brand-secondary)' }}>{formatINR(total)}</span>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div style={{ marginBottom: 20 }}>
                            <p style={{ fontWeight: 600, marginBottom: 12, fontSize: '0.9rem' }}>Payment Method</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[['upi', <Zap key="zap" size={16} />, 'UPI / QR Code', 'PhonePe, GPay, Paytm'], ['card', <CreditCard key="card" size={16} />, 'Debit / Credit Card', 'Visa, Mastercard, RuPay'], ['wallet', <Wallet key="wallet" size={16} />, 'Mobile Wallets', 'Paytm, Amazon Pay']].map(([val, icon, label, sub]) => (
                                    <button key={val as string} onClick={() => setPayMethod(val as string)} style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                                        padding: '12px 14px', borderRadius: 'var(--radius-md)',
                                        background: payMethod === val ? 'rgba(124,92,252,0.12)' : 'var(--bg-secondary)',
                                        border: `1.5px solid ${payMethod === val ? 'var(--brand-primary)' : 'var(--border)'}`,
                                        cursor: 'pointer', transition: 'all var(--t-fast)',
                                    }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: payMethod === val ? 'var(--brand-secondary)' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>{icon} {label}</span>
                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sub as string}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* UPI Input */}
                        {payMethod === 'upi' && (
                            <div style={{ marginBottom: 20 }}>
                                <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@okaxis or UPI ID" className="input-field" style={{ marginBottom: 10 }} />
                                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 16, textAlign: 'center' }}>
                                    <div style={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}><QrCode size={48} color="var(--text-muted)" /></div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>QR code will appear here when UPI payment is initiated</p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={async () => {
                                const { placeOrder } = await import('@/app/actions/order');
                                const cartPayload = cartItems.map(i => ({ id: i.id, type: i.type || 'buy' }));
                                const res = await placeOrder(cartPayload);
                                if (res.success) {
                                    setOrdered(true);
                                } else {
                                    alert(res.error || 'Failed to place order');
                                }
                            }}
                            className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 14 }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><IndianRupee size={18} /> Pay {formatINR(total)}</span>
                        </button>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                            <ShieldCheck size={14} color="#4ade80" /> Protected by Swaramthala Buyer Protection · GST invoice will be provided
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
