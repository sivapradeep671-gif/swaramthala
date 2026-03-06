import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Users, Music } from 'lucide-react';

export default async function EventPage({ params }: { params: { id: string } }) {
    const event = await prisma.event.findUnique({
        where: { id: params.id },
        include: {
            attendees: { include: { user: true } },
            club: true,
            _count: { select: { attendees: true } }
        }
    });

    if (!event) notFound();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '60px 0' }}>
            <div className="container" style={{ maxWidth: 800 }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    <div style={{ height: 300, background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Music size={80} color="white" style={{ opacity: 0.3 }} />
                        <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                            <span className="badge badge-mint" style={{ marginBottom: 8 }}>{event.type.toUpperCase()}</span>
                            <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>{event.title}</h1>
                        </div>
                    </div>

                    <div style={{ padding: 40 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Calendar color="var(--brand-primary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date & Time</div>
                                    <div style={{ fontWeight: 700 }}>{new Date(event.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MapPin color="var(--brand-primary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location</div>
                                    <div style={{ fontWeight: 700 }}>{event.location}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Users color="var(--brand-primary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attendees</div>
                                    <div style={{ fontWeight: 700 }}>{event._count.attendees} musicians</div>
                                </div>
                            </div>
                        </div>

                        <h3 style={{ fontWeight: 800, marginBottom: 16 }}>About this Event</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: 32 }}>{event.description}</p>

                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0, fontWeight: 700 }}>RSVP Status</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--brand-secondary)' }}>Interested? Let the organizer know!</p>
                            </div>
                            <button className="btn btn-primary" style={{ padding: '12px 32px' }}>RSVP Going</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
