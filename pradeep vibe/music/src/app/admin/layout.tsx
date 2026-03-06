import { redirect } from 'next/navigation';
import { getUser } from '@/app/actions/auth';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    if (!user || user.role !== 'admin') {
        redirect('/');
    }

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-primary)' }}>
            {/* Admin Sidebar */}
            <aside style={{ width: 260, background: 'var(--bg-card)', borderRight: '1px solid var(--border)', padding: '32px 24px', flexShrink: 0 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', marginBottom: 24 }}>
                    Admin <span className="gradient-text">Panel</span>
                </h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Link href="/admin" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', background: 'rgba(124,92,252,0.1)' }}>
                        📊 Dashboard
                    </Link>
                    <Link href="/admin/users" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
                        👥 Users
                    </Link>
                    <Link href="/admin/listings" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
                        🎸 Listings
                    </Link>
                    <Link href="/admin/orders" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
                        📦 Orders
                    </Link>
                </nav>
            </aside>

            {/* Admin Content */}
            <main style={{ flex: 1, padding: '40px' }}>
                {children}
            </main>
        </div>
    );
}
