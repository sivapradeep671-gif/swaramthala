import React from 'react';
import { getReports } from '@/app/actions/report';
import ModerationClient from './ModerationClient';
import Link from 'next/link';
import { ChevronRight, ShieldAlert } from 'lucide-react';

export default async function ModerationPage() {
    const { reports, error } = await getReports();

    if (error) {
        return (
            <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <h1 style={{ color: '#ef4444' }}>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '40px 24px' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Link href="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin</Link>
                    <ChevronRight size={14} />
                    <span>Moderation</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <ShieldAlert size={32} color="#f59e0b" /> Moderation Queue
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Review and act on reported listings and user behavior.</p>
                    </div>
                </div>

                <ModerationClient initialReports={reports || []} />
            </div>
        </div>
    );
}
