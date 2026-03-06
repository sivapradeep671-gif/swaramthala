'use client';

import React from 'react';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

export const Skeleton = ({ width, height, borderRadius = '4px', className = '', style }: SkeletonProps) => {
    return (
        <div
            className={`skeleton-base ${className}`}
            style={{
                width: width || '100%',
                height: height || '20px',
                borderRadius: borderRadius,
                background: 'linear-gradient(90deg, var(--bg-secondary) 25%, var(--border) 50%, var(--bg-secondary) 75%)',
                backgroundSize: '200% 100%',
                animation: 'skeleton-loading 1.5s infinite linear',
                ...style
            }}
        />
    );
};

export const ListingSkeleton = () => (
    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <Skeleton height="200px" borderRadius="0" />
        <div style={{ padding: '16px' }}>
            <Skeleton width="40%" height="12px" style={{ marginBottom: '8px' }} />
            <Skeleton width="80%" height="20px" style={{ marginBottom: '12px' }} />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <Skeleton width="60px" height="24px" borderRadius="12px" />
                <Skeleton width="100px" height="24px" borderRadius="12px" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="60px" height="24px" />
                <Skeleton width="40px" height="24px" />
            </div>
        </div>
    </div>
);

export const DashboardStatsSkeleton = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-card" style={{ padding: '24px' }}>
                <Skeleton width="40px" height="40px" borderRadius="12px" style={{ marginBottom: '16px' }} />
                <Skeleton width="60%" height="12px" style={{ marginBottom: '8px' }} />
                <Skeleton width="80%" height="32px" style={{ marginBottom: '8px' }} />
                <Skeleton width="40%" height="12px" />
            </div>
        ))}
    </div>
);
