import { prisma } from '@/lib/db';
import { toggleListingApproval, deleteListingAdmin } from '@/app/actions/admin';
import { formatINR } from '@/lib/mockData';
import Image from 'next/image';

export default async function AdminListingsPage() {
    const listings = await prisma.listing.findMany({
        orderBy: { createdAt: 'desc' },
        include: { seller: true }
    });

    return (
        <div className="animate-fade-up">
            <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 24 }}>Moderate Listings</h1>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '16px 20px', fontWeight: 600 }}>Item</th>
                            <th style={{ padding: '16px 20px', fontWeight: 600 }}>Seller</th>
                            <th style={{ padding: '16px 20px', fontWeight: 600 }}>Price</th>
                            <th style={{ padding: '16px 20px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '16px 20px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings.map((l: any) => (
                            <tr key={l.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, position: 'relative' }}>
                                        {l.images ? <Image src={JSON.parse(l.images)[0]} alt="thumbnail" fill sizes="44px" style={{ objectFit: 'cover' }} /> : '🎸'}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.category.toUpperCase()} • {l.type.toUpperCase()}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <div>{l.seller.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.seller.id}</div>
                                </td>
                                <td style={{ padding: '16px 20px', fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-secondary)' }}>
                                    {formatINR(l.price)}
                                </td>
                                <td style={{ padding: '16px 20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <span className={`badge ${l.isApproved ? 'badge-good' : 'badge-repair'}`} style={{ fontSize: '0.7rem' }}>
                                            {l.isApproved ? 'Approved ✅' : 'Pending ⏳'}
                                        </span>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                        <a href={`/product/${l.id}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>View</a>
                                        <form action={toggleListingApproval.bind(null, l.id, l.isApproved) as any}>
                                            <button type="submit" className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '0.75rem', background: l.isApproved ? 'transparent' : 'rgba(74, 222, 128, 0.1)', borderColor: l.isApproved ? 'var(--border)' : '#4ade80', color: l.isApproved ? 'var(--text-secondary)' : '#4ade80' }}>
                                                {l.isApproved ? 'Revoke Approval' : 'Approve'}
                                            </button>
                                        </form>
                                        <form action={deleteListingAdmin.bind(null, l.id) as any}>
                                            <button type="submit" className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '0.75rem', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.3)' }}>
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {listings.length === 0 && (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No listings found.</div>
                )}
            </div>
        </div>
    );
}
