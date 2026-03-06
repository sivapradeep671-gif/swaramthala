'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/app/actions/user';
import { addAddress, deleteAddress, setDefaultAddress } from '@/app/actions/address';
import { logout } from '@/app/actions/auth';
import { User, MapPin, Shield, LogOut, Plus, Trash2, Star, CheckCircle, Save, ChevronRight } from 'lucide-react';

const TABS = ['Profile', 'Addresses', 'Account'] as const;
type Tab = typeof TABS[number];

const AVATARS = ['👤', '🎸', '🎹', '🥁', '🎵', '🎤', '🎧', '🎺', '🎻', '🪘', '🎷', '🪕', '👑', '🦁', '🐯', '🦊'];

export default function SettingsClient({ user, initialAddresses }: { user: any, initialAddresses: any[] }) {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>('Profile');
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [city, setCity] = useState(user.city || '');
    const [avatar, setAvatar] = useState(user.avatar || '👤');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Address form
    const [addresses, setAddresses] = useState(initialAddresses);
    const [showAddForm, setShowAddForm] = useState(false);
    const [addrForm, setAddrForm] = useState({ street: '', city: '', state: '', pincode: '', isDefault: false });
    const [addingAddr, setAddingAddr] = useState(false);

    const validateEmail = (email: string) => {
        if (!email) return true; // Optional
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSaveProfile = async () => {
        if (email && !validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError('');
        setSaving(true);
        const fd = new FormData();
        fd.append('name', name);
        fd.append('email', email);
        fd.append('city', city);
        fd.append('avatar', avatar);
        const res = await updateProfile(fd);
        if (res.success) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
            router.refresh();
        } else {
            alert(res.error || 'Failed to save');
        }
        setSaving(false);
    };

    const handleAddAddress = async () => {
        setAddingAddr(true);
        const fd = new FormData();
        fd.append('street', addrForm.street);
        fd.append('city', addrForm.city);
        fd.append('state', addrForm.state);
        fd.append('pincode', addrForm.pincode);
        if (addrForm.isDefault) fd.append('isDefault', 'on');

        const res = await addAddress(fd);
        if (res.success) {
            setShowAddForm(false);
            setAddrForm({ street: '', city: '', state: '', pincode: '', isDefault: false });
            router.refresh();
            // Optimistic update
            if (res.address) {
                setAddresses(prev => addrForm.isDefault
                    ? [res.address, ...prev.map((a: any) => ({ ...a, isDefault: false }))]
                    : [...prev, res.address]
                );
            }
        } else {
            alert(res.error || 'Failed to add address');
        }
        setAddingAddr(false);
    };

    const handleDeleteAddress = async (id: string) => {
        const res = await deleteAddress(id);
        if (res.success) {
            setAddresses(prev => prev.filter((a: any) => a.id !== id));
        }
    };

    const handleSetDefault = async (id: string) => {
        const res = await setDefaultAddress(id);
        if (res.success) {
            setAddresses(prev => prev.map((a: any) => ({ ...a, isDefault: a.id === id })));
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Header */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem', fontWeight: 700, color: 'white',
                        boxShadow: '0 8px 24px var(--brand-glow)', flexShrink: 0,
                    }}>{avatar}</div>
                    <div>
                        <h1 style={{
                            fontFamily: 'var(--font-display)', fontWeight: 800,
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 4,
                        }}>
                            <span className="gradient-text">Settings</span>
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            {user.name} · {user.city} · {user.verified ? '✓ Verified' : 'Member'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '32px 24px' }}>
                <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                    {/* Sidebar Tabs */}
                    <div style={{ width: 220, flexShrink: 0 }} className="settings-sidebar">
                        <div style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                        }}>
                            {TABS.map(t => (
                                <button key={t} onClick={() => setTab(t)} style={{
                                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                                    padding: '14px 16px', border: 'none', cursor: 'pointer',
                                    background: tab === t ? 'rgba(124,92,252,0.12)' : 'transparent',
                                    color: tab === t ? 'var(--brand-secondary)' : 'var(--text-secondary)',
                                    fontWeight: tab === t ? 700 : 500, fontSize: '0.9rem',
                                    borderLeft: tab === t ? '3px solid var(--brand-primary)' : '3px solid transparent',
                                    transition: 'all 0.2s ease', textAlign: 'left',
                                }}>
                                    {t === 'Profile' && <User size={18} />}
                                    {t === 'Addresses' && <MapPin size={18} />}
                                    {t === 'Account' && <Shield size={18} />}
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* Quick Links */}
                        <div style={{ marginTop: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                            <Link href="/settings/verification" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                gap: 12, padding: '14px 16px', color: 'var(--text-secondary)',
                                textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                                transition: 'all 0.2s',
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>🛡️ KYC Verification</span>
                                <ChevronRight size={16} />
                            </Link>
                            <Link href="/dashboard" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                gap: 12, padding: '14px 16px', color: 'var(--text-secondary)',
                                textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                                borderTop: '1px solid var(--border)', transition: 'all 0.2s',
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>📊 Dashboard</span>
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Profile Tab */}
                        {tab === 'Profile' && (
                            <div className="animate-fade-up">
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-xl)', padding: 32,
                                }}>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', marginBottom: 32 }}>
                                        Edit Profile
                                    </h2>

                                    {/* Avatar Picker */}
                                    <div style={{ marginBottom: 32 }}>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Choose Avatar</label>
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {AVATARS.map(a => (
                                                <button key={a} onClick={() => setAvatar(a)} style={{
                                                    width: 48, height: 48, borderRadius: '50%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '1.4rem', cursor: 'pointer',
                                                    border: avatar === a ? '2px solid var(--brand-primary)' : '2px solid var(--border)',
                                                    background: avatar === a ? 'rgba(124,92,252,0.15)' : 'var(--bg-secondary)',
                                                    transition: 'all 0.15s ease',
                                                    transform: avatar === a ? 'scale(1.1)' : 'scale(1)',
                                                    boxShadow: avatar === a ? '0 4px 12px var(--brand-glow)' : 'none',
                                                }}>{a}</button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div style={{ marginBottom: 24 }}>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Display Name</label>
                                        <input
                                            value={name} onChange={e => setName(e.target.value)}
                                            placeholder="Your name"
                                            className="input-field"
                                            style={{ maxWidth: 400 }}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div style={{ marginBottom: 24 }}>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address (for notifications)</label>
                                        <input
                                            value={email}
                                            onChange={e => {
                                                setEmail(e.target.value);
                                                if (emailError) setEmailError('');
                                            }}
                                            placeholder="you@example.com"
                                            className={`input-field ${emailError ? 'error' : ''}`}
                                            style={{ maxWidth: 400, border: emailError ? '1px solid #f87171' : '1px solid var(--border)' }}
                                        />
                                        {emailError && (
                                            <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: 4 }}>{emailError}</p>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div style={{ marginBottom: 32 }}>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>City / Location</label>
                                        <input
                                            value={city} onChange={e => setCity(e.target.value)}
                                            placeholder="e.g. Chennai, TN"
                                            className="input-field"
                                            style={{ maxWidth: 400 }}
                                        />
                                    </div>

                                    {/* Save */}
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={saving}
                                            className="btn btn-primary"
                                            style={{ padding: '12px 32px', fontSize: '0.95rem' }}
                                        >
                                            {saving ? 'Saving...' : saved ? (
                                                <><CheckCircle size={18} /> Saved!</>
                                            ) : (
                                                <><Save size={18} /> Save Changes</>
                                            )}
                                        </button>
                                        {saved && (
                                            <span className="animate-fade-up" style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 600 }}>
                                                Profile updated successfully
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Account Stats */}
                                <div style={{
                                    marginTop: 24, background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-xl)', padding: 32,
                                }}>
                                    <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: '1rem' }}>Account Overview</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
                                        {[
                                            { label: 'Member Since', value: user.memberSince },
                                            { label: 'Rating', value: user.rating > 0 ? `★ ${user.rating}` : 'No ratings yet' },
                                            { label: 'Reviews', value: user.reviewCount.toString() },
                                            { label: 'Response Rate', value: `${user.responseRate}%` },
                                        ].map(s => (
                                            <div key={s.label} style={{
                                                background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)',
                                                padding: '16px', textAlign: 'center',
                                            }}>
                                                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--brand-secondary)', marginBottom: 4 }}>{s.value}</div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Addresses Tab */}
                        {tab === 'Addresses' && (
                            <div className="animate-fade-up">
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-xl)', padding: 32,
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem' }}>
                                            Saved Addresses
                                        </h2>
                                        <button onClick={() => setShowAddForm(true)} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                            <Plus size={16} /> Add New
                                        </button>
                                    </div>

                                    {/* Add Address Form */}
                                    {showAddForm && (
                                        <div className="animate-fade-up" style={{
                                            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 24,
                                        }}>
                                            <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.95rem' }}>New Address</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                                <input
                                                    value={addrForm.street} onChange={e => setAddrForm({ ...addrForm, street: e.target.value })}
                                                    placeholder="Street address, flat/house no."
                                                    className="input-field"
                                                />
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                                    <input
                                                        value={addrForm.city} onChange={e => setAddrForm({ ...addrForm, city: e.target.value })}
                                                        placeholder="City"
                                                        className="input-field"
                                                    />
                                                    <input
                                                        value={addrForm.state} onChange={e => setAddrForm({ ...addrForm, state: e.target.value })}
                                                        placeholder="State"
                                                        className="input-field"
                                                    />
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                                    <input
                                                        value={addrForm.pincode} onChange={e => setAddrForm({ ...addrForm, pincode: e.target.value })}
                                                        placeholder="Pincode"
                                                        className="input-field"
                                                    />
                                                    <label style={{
                                                        display: 'flex', alignItems: 'center', gap: 8,
                                                        fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer',
                                                    }}>
                                                        <input
                                                            type="checkbox" checked={addrForm.isDefault}
                                                            onChange={e => setAddrForm({ ...addrForm, isDefault: e.target.checked })}
                                                            style={{ accentColor: 'var(--brand-primary)' }}
                                                        />
                                                        Set as default
                                                    </label>
                                                </div>
                                                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                                    <button
                                                        onClick={handleAddAddress}
                                                        disabled={addingAddr || !addrForm.street || !addrForm.city || !addrForm.state || !addrForm.pincode}
                                                        className="btn btn-primary"
                                                        style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                                                    >
                                                        {addingAddr ? 'Saving...' : 'Save Address'}
                                                    </button>
                                                    <button onClick={() => setShowAddForm(false)} className="btn btn-outline" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Address List */}
                                    {addresses.length === 0 && !showAddForm ? (
                                        <div style={{
                                            textAlign: 'center', padding: '48px 24px',
                                            background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)',
                                            border: '1px dashed var(--border)',
                                        }}>
                                            <MapPin size={48} color="var(--border)" style={{ marginBottom: 16 }} />
                                            <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: '1.1rem' }}>No addresses saved</h3>
                                            <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.9rem' }}>
                                                Add your delivery address for a smoother checkout experience.
                                            </p>
                                            <button onClick={() => setShowAddForm(true)} className="btn btn-primary" style={{ padding: '10px 24px' }}>
                                                <Plus size={16} /> Add Your First Address
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            {addresses.map((addr: any) => (
                                                <div key={addr.id} style={{
                                                    background: 'var(--bg-secondary)', border: `1px solid ${addr.isDefault ? 'var(--brand-primary)' : 'var(--border)'}`,
                                                    borderRadius: 'var(--radius-lg)', padding: '20px',
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                    transition: 'all 0.2s ease',
                                                }}>
                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                                            <MapPin size={16} color={addr.isDefault ? 'var(--brand-primary)' : 'var(--text-muted)'} />
                                                            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{addr.street}</span>
                                                            {addr.isDefault && (
                                                                <span style={{
                                                                    background: 'rgba(124,92,252,0.15)', color: 'var(--brand-secondary)',
                                                                    padding: '2px 10px', borderRadius: 'var(--radius-full)',
                                                                    fontSize: '0.7rem', fontWeight: 700,
                                                                }}>Default</span>
                                                            )}
                                                        </div>
                                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: 24 }}>
                                                            {addr.city}, {addr.state} — {addr.pincode}
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 8 }}>
                                                        {!addr.isDefault && (
                                                            <button
                                                                onClick={() => handleSetDefault(addr.id)}
                                                                style={{
                                                                    background: 'none', border: '1px solid var(--border)',
                                                                    borderRadius: 'var(--radius-md)', padding: '6px 12px',
                                                                    color: 'var(--text-secondary)', fontSize: '0.75rem',
                                                                    cursor: 'pointer', fontWeight: 600,
                                                                }}
                                                                title="Set as default"
                                                            >
                                                                <Star size={14} />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteAddress(addr.id)}
                                                            style={{
                                                                background: 'none', border: '1px solid rgba(248,113,113,0.2)',
                                                                borderRadius: 'var(--radius-md)', padding: '6px 12px',
                                                                color: '#f87171', fontSize: '0.75rem',
                                                                cursor: 'pointer',
                                                            }}
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Account Tab */}
                        {tab === 'Account' && (
                            <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {/* Account Info */}
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-xl)', padding: 32,
                                }}>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', marginBottom: 24 }}>
                                        Account Details
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        {[
                                            { label: 'User ID', value: user.id },
                                            { label: 'Role', value: user.role === 'admin' ? '👑 Admin' : '🎵 Musician' },
                                            { label: 'KYC Status', value: user.kycStatus === 'verified' ? '✅ Verified' : user.kycStatus === 'pending' ? '⏳ Pending' : '❌ Not submitted' },
                                            { label: 'Member Since', value: user.memberSince },
                                        ].map(row => (
                                            <div key={row.label} style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                padding: '12px 0', borderBottom: '1px solid var(--border)',
                                            }}>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{row.label}</span>
                                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{row.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-xl)', padding: 32,
                                }}>
                                    <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '1rem' }}>Quick Actions</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                                        {[
                                            { href: '/settings/verification', label: 'KYC Verification', icon: '🛡️', desc: 'Verify your identity' },
                                            { href: '/sell', label: 'Sell an Instrument', icon: '🎸', desc: 'List gear for sale' },
                                            { href: '/dashboard', label: 'My Dashboard', icon: '📊', desc: 'Orders & listings' },
                                            { href: '/favorites', label: 'Favorites', icon: '❤️', desc: 'Saved instruments' },
                                        ].map(item => (
                                            <Link key={item.href} href={item.href} style={{
                                                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius-lg)', padding: '16px',
                                                textDecoration: 'none', transition: 'all 0.2s ease',
                                                display: 'flex', flexDirection: 'column', gap: 6,
                                            }}>
                                                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                                                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.label}</span>
                                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid rgba(248,113,113,0.15)',
                                    borderRadius: 'var(--radius-xl)', padding: 32,
                                }}>
                                    <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: '1rem', color: '#f87171' }}>Danger Zone</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.9rem' }}>
                                        Sign out of your account. You can always sign back in with your phone number.
                                    </p>
                                    <button
                                        onClick={async () => {
                                            await logout();
                                            window.location.href = '/';
                                        }}
                                        className="btn btn-outline"
                                        style={{
                                            borderColor: '#f8717130', color: '#f87171',
                                            padding: '12px 28px', fontSize: '0.9rem',
                                        }}
                                    >
                                        <LogOut size={18} /> Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .settings-sidebar { display: none !important; }
                }
            `}</style>
        </div>
    );
}
