'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { resolveReport } from '@/app/actions/report';
import { AlertCircle, CheckCircle2, XCircle, ExternalLink, User, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import { formatINR } from '@/lib/mockData';

export default function ModerationClient({ initialReports }: { initialReports: any[] }) {
    const [reports, setReports] = useState(initialReports);
    const [actioning, setActioning] = useState<string | null>(null);

    const handleResolve = async (id: string, status: 'resolved' | 'dismissed') => {
        setActioning(id);
        const res = await resolveReport(id, status);
        if (res.success) {
            setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
        }
        setActioning(null);
    };

    const pending = reports.filter(r => r.status === 'pending');
    const processed = reports.filter(r => r.status !== 'pending');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Summary Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>Pending Review</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: pending.length > 0 ? '#f59e0b' : 'var(--text-primary)' }}>{pending.length}</div>
                </div>
                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>Total Reports</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900 }}>{reports.length}</div>
                </div>
            </div>

            {/* Main Table */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Active Reports</h2>
                </div>

                {pending.length === 0 ? (
                    <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <CheckCircle2 size={48} color="#4ade80" style={{ marginBottom: 16, opacity: 0.5 }} />
                        <p>All reports have been addressed. Great job!</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '16px 24px' }}>Listing</th>
                                    <th style={{ padding: '16px 24px' }}>Reason</th>
                                    <th style={{ padding: '16px 24px' }}>Reporter</th>
                                    <th style={{ padding: '16px 24px' }}>Date</th>
                                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pending.map((r) => (
                                    <tr key={r.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
                                                    <Image src={r.listing.images[0] || '/images/placeholder.png'} alt="" fill sizes="40px" style={{ objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.listing.title}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatINR(r.listing.price)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <AlertCircle size={14} /> {r.reason}
                                                </span>
                                                {r.details && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.details}</span>}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                                                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>{r.reporter.avatar}</div>
                                                {r.reporter.name}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <Clock size={12} /> {new Date(r.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => handleResolve(r.id, 'dismissed')}
                                                    disabled={actioning === r.id}
                                                    className="btn hover-lift"
                                                    style={{ padding: '6px 12px', fontSize: '0.75rem', border: '1px solid var(--border)', background: 'transparent' }}
                                                >
                                                    Dismiss
                                                </button>
                                                <button
                                                    onClick={() => handleResolve(r.id, 'resolved')}
                                                    disabled={actioning === r.id}
                                                    className="btn btn-primary hover-lift"
                                                    style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#ef4444' }}
                                                >
                                                    Resolve
                                                </button>
                                                <Link href={`/product/${r.listing.id}`} target="_blank" className="btn hover-lift" style={{ padding: '6px 8px', background: 'var(--bg-secondary)' }}>
                                                    <ExternalLink size={14} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Archive */}
            {processed.length > 0 && (
                <div style={{ opacity: 0.6 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 20 }}>Archive</h3>
                    <div className="glass-card" style={{ padding: 0 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                            <tbody>
                                {processed.map(r => (
                                    <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '12px 24px' }}>{r.listing.title}</td>
                                        <td style={{ padding: '12px 24px' }}>{r.reason}</td>
                                        <td style={{ padding: '12px 24px' }}>
                                            <span style={{
                                                padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                                                background: r.status === 'resolved' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                                                color: r.status === 'resolved' ? '#ef4444' : 'var(--text-muted)'
                                            }}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 24px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                            {new Date(r.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
