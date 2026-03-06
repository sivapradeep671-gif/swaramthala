import { prisma } from '@/lib/db';
import { toggleUserBlock } from '@/app/actions/admin';
import { requireAdmin } from '@/lib/auth';

export default async function AdminUsersPage() {
    await requireAdmin();
    const users = await prisma.user.findMany({
        orderBy: { memberSince: 'desc' }
    });

    return (
        <div className="animate-fade-up">
            <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 24 }}>Manage Users</h1>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '16px 20px', fontWeight: 600 }}>User</th>
                            <th style={{ padding: '16px 20px', fontWeight: 600 }}>City</th>
                            <th style={{ padding: '16px 20px', fontWeight: 600 }}>Role</th>
                            <th style={{ padding: '16px 20px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '16px 20px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u: any) => (
                            <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        {u.avatar}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{u.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone: {u.id}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{u.city}</td>
                                <td style={{ padding: '16px 20px' }}>
                                    <span className={`badge ${u.role === 'admin' ? 'badge-good' : 'badge-rent'}`} style={{ fontSize: '0.75rem' }}>
                                        {u.role.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 20px' }}>
                                    <span className={`badge ${u.isBlocked ? 'badge-repair' : 'badge-mint'}`} style={{ fontSize: '0.75rem' }}>
                                        {u.isBlocked ? 'Blocked 🚫' : 'Active ✅'}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                    {u.role !== 'admin' && (
                                        <form action={toggleUserBlock.bind(null, u.id, u.isBlocked) as any}>
                                            <button type="submit" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                                                {u.isBlocked ? 'Unblock' : 'Block User'}
                                            </button>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</div>
                )}
            </div>
        </div>
    );
}
