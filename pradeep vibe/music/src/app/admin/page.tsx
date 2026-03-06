import { prisma } from '@/lib/db';
import { formatINR } from '@/lib/mockData';

export default async function AdminDashboard() {
    const totalUsers = await prisma.user.count();
    const totalListings = await prisma.listing.count();
    const totalOrders = await prisma.order.count();
    const pendingReports = await prisma.report.count({ where: { status: 'pending' } });

    // Calculate GMV (Gross Merchandise Value) from all completed orders
    const orders = await prisma.order.findMany({
        where: { status: 'completed' },
        select: { amount: true }
    });

    const gmv = orders.reduce((sum: number, order: any) => sum + order.amount, 0);
    const platformRevenue = gmv * 0.05; // Assuming 5% platform fee

    const stats = [
        { label: 'Total Users', value: totalUsers.toLocaleString('en-IN'), icon: '👥' },
        { label: 'Active Listings', value: totalListings.toLocaleString('en-IN'), icon: '🎸' },
        { label: 'Total Orders', value: totalOrders.toLocaleString('en-IN'), icon: '📦' },
        { label: 'Pending Reports', value: pendingReports.toLocaleString('en-IN'), icon: '⚖️', highlight: pendingReports > 0 },
    ];

    return (
        <div className="animate-fade-up">
            <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 8 }}>Overview</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Welcome to the Swaramthala Admin Control Center.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
                {stats.map(s => (
                    <div key={s.label} style={{
                        background: 'var(--bg-card)',
                        border: s.highlight ? '1px solid #f59e0b' : '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 24, display: 'flex', alignItems: 'center', gap: 20,
                        boxShadow: s.highlight ? '0 0 20px rgba(245, 158, 11, 0.1)' : 'none'
                    }}>
                        <div style={{ fontSize: '2.5rem' }}>{s.icon}</div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 4 }}>{s.label}</div>
                            <div style={{ fontWeight: 800, fontSize: '1.5rem', color: s.highlight ? '#f59e0b' : 'var(--text-primary)' }}>{s.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
                <h2 style={{ fontWeight: 700, marginBottom: 16 }}>Admin Shortcuts</h2>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a href="/admin/users" className="btn btn-outline">Review Pending Users</a>
                    <a href="/admin/moderation" className="btn btn-primary" style={{ background: '#f59e0b', borderColor: '#f59e0b' }}>Moderation Queue ({pendingReports})</a>
                    <a href="/admin/listings" className="btn btn-outline">Manage Listings</a>
                    <a href="/admin/verifications" className="btn btn-outline">KYC Requests</a>
                </div>
            </div>
        </div>
    );
}
