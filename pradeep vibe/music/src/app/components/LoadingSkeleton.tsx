'use client';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = '1rem', borderRadius = 'var(--radius-md)', style }: SkeletonProps) {
    return (
        <div
            className="skeleton"
            style={{ width, height, borderRadius, flexShrink: 0, ...style }}
        />
    );
}

export function ListingCardSkeleton({ compact = false }: { compact?: boolean }) {
    return (
        <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
        }}>
            {/* Image */}
            <Skeleton height={compact ? '160px' : '200px'} borderRadius="0" />
            {/* Info */}
            <div style={{ padding: compact ? 12 : 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Skeleton width="40%" height="0.7rem" />
                <Skeleton width="85%" height="1rem" />
                <Skeleton width="60%" height="0.8rem" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <Skeleton width="35%" height="1.2rem" />
                    <Skeleton width="20%" height="0.8rem" />
                </div>
                {!compact && <Skeleton height="2.4rem" style={{ marginTop: 4 }} />}
            </div>
        </div>
    );
}

export function ListingGridSkeleton({ count = 6, compact = false }: { count?: number; compact?: boolean }) {
    return (
        <div className="listing-grid">
            {Array.from({ length: count }).map((_, i) => (
                <ListingCardSkeleton key={i} compact={compact} />
            ))}
        </div>
    );
}

export function DashboardStatSkeleton() {
    return (
        <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: 24,
            display: 'flex', flexDirection: 'column', gap: 12,
        }}>
            <Skeleton width="40%" height="0.8rem" />
            <Skeleton width="50%" height="2rem" />
            <Skeleton width="60%" height="0.7rem" />
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Skeleton width="80px" height="80px" borderRadius="50%" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Skeleton width="40%" height="1.2rem" />
                <Skeleton width="60%" height="0.9rem" />
                <Skeleton width="30%" height="0.8rem" />
            </div>
        </div>
    );
}

export default ListingCardSkeleton;
