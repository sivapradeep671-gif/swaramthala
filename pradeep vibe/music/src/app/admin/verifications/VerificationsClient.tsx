'use client';
import { useState } from 'react';
import { adminApproveVerification, adminRejectVerification } from '@/app/actions/kyc';
import { ShieldCheck, XCircle, ExternalLink, User, Calendar, Music, Instagram, Youtube } from 'lucide-react';
import { formatINR } from '@/lib/mockData';

export default function VerificationsClient({ initialRequests }: { initialRequests: any[] }) {
    const [requests, setRequests] = useState(initialRequests);

    const handleAction = async (requestId: string, action: 'approve' | 'reject') => {
        let res;
        if (action === 'approve') {
            res = await adminApproveVerification(requestId);
        } else {
            const reason = prompt('Reason for rejection:');
            if (!reason) return;
            res = await adminRejectVerification(requestId, reason);
        }

        if (res.success) {
            setRequests(prev => prev.filter(r => r.id !== requestId));
        } else {
            alert(res.error || 'Failed to update request');
        }
    };

    return (
        <div style={{ padding: '24px 0' }}>
            <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 32 }}>Verification <span className="gradient-text">Requests</span></h1>

            {requests.length === 0 ? (
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: "80px 40px", textAlign: 'center' }}>
                    <div style={{ color: 'var(--border)', marginBottom: 16 }}><ShieldCheck size={64} /></div>
                    <h3 style={{ fontWeight: 700 }}>All caught up!</h3>
                    <p style={{ color: 'var(--text-muted)' }}>No pending musician verification requests at this time.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {requests.map(req => {
                        const socialLinks = JSON.parse(req.socialLinks || '{}');
                        return (
                            <div key={req.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 32 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40 }}>

                                    {/* User Details */}
                                    <div>
                                        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
                                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>{req.user.avatar}</div>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{req.user.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{req.user.city} · Member since {req.user.memberSince}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                                            <div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Identiy Document ({req.documentType})</div>
                                                <a href={req.documentUrl} target="_blank" className="btn btn-outline" style={{ fontSize: '0.85rem', width: '100%', justifyContent: 'space-between' }}>
                                                    View Document <ExternalLink size={14} />
                                                </a>
                                            </div>
                                            <div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Requested On</div>
                                                <div style={{ fontWeight: 600 }}>{new Date(req.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>Musician Social Proof</div>
                                            <div style={{ display: 'flex', gap: 12 }}>
                                                {socialLinks.spotify && <a href={socialLinks.spotify} target="_blank" style={{ color: 'var(--brand-primary)' }}><Music size={20} /></a>}
                                                {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" style={{ color: '#E1306C' }}><Instagram size={20} /></a>}
                                                {socialLinks.youtube && <a href={socialLinks.youtube} target="_blank" style={{ color: '#FF0000' }}><Youtube size={20} /></a>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 40, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
                                        <button onClick={() => handleAction(req.id, 'approve')} className="btn btn-primary" style={{ height: 50, justifyContent: 'center' }}>
                                            Approve Musician
                                        </button>
                                        <button onClick={() => handleAction(req.id, 'reject')} className="btn btn-outline" style={{ height: 50, justifyContent: 'center', borderColor: '#f87171', color: '#f87171' }}>
                                            Reject Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
