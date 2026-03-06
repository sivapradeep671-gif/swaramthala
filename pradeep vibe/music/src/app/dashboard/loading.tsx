'use client';

import React from 'react';
import { DashboardStatsSkeleton, ListingSkeleton } from '@/app/components/Skeleton';

export default function DashboardLoading() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '40px 24px' }}>
            <div className="container">
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ width: '200px', height: '32px', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '12px', animation: 'skeleton-loading 1.5s infinite linear', backgroundSize: '200% 100%' }} />
                    <div style={{ width: '300px', height: '16px', background: 'var(--bg-secondary)', borderRadius: '4px', animation: 'skeleton-loading 1.5s infinite linear', backgroundSize: '200% 100%' }} />
                </div>

                <DashboardStatsSkeleton />

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '40px' }}>
                    <div>
                        <div style={{ width: '150px', height: '24px', background: 'var(--bg-secondary)', borderRadius: '6px', marginBottom: '24px', animation: 'skeleton-loading 1.5s infinite linear', backgroundSize: '200% 100%' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                            {[1, 2, 3, 4].map(i => <ListingSkeleton key={i} />)}
                        </div>
                    </div>
                    <div>
                        <div style={{ width: '150px', height: '24px', background: 'var(--bg-secondary)', borderRadius: '6px', marginBottom: '24px', animation: 'skeleton-loading 1.5s infinite linear', backgroundSize: '200% 100%' }} />
                        <div className="glass-card" style={{ height: '400px', padding: '24px' }}>
                            <div style={{ width: '100%', height: '100%', background: 'var(--bg-secondary)', borderRadius: '8px', animation: 'skeleton-loading 1.5s infinite linear', backgroundSize: '200% 100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
