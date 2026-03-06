export default function Loading() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '80px 24px' }}>
            <div className="container" style={{ maxWidth: 1280, margin: '0 auto' }}>
                {/* Top Bar Loader */}
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 9999,
                    background: 'linear-gradient(90deg, transparent, var(--brand-primary) 30%, var(--brand-secondary) 70%, transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.2s ease infinite',
                }} />

                {/* Hero Skeleton */}
                <div style={{ textAlign: 'center', marginBottom: 64, paddingTop: 40 }}>
                    <div className="skeleton" style={{ width: 60, height: 60, borderRadius: 16, margin: '0 auto 20px' }} />
                    <div className="skeleton" style={{ width: '60%', maxWidth: 400, height: 20, borderRadius: 10, margin: '0 auto 16px' }} />
                    <div className="skeleton" style={{ width: '80%', maxWidth: 600, height: 48, borderRadius: 14, margin: '0 auto 20px' }} />
                    <div className="skeleton" style={{ width: '50%', maxWidth: 300, height: 16, borderRadius: 8, margin: '0 auto' }} />
                </div>

                {/* Grid Skeleton */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                            animationDelay: `${i * 0.1}s`
                        }}>
                            <div className="skeleton" style={{ width: '100%', height: 200, borderRadius: 0 }} />
                            <div style={{ padding: 20 }}>
                                <div className="skeleton" style={{ width: '70%', height: 16, marginBottom: 12 }} />
                                <div className="skeleton" style={{ width: '40%', height: 14, marginBottom: 16 }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="skeleton" style={{ width: '30%', height: 20 }} />
                                    <div className="skeleton" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
