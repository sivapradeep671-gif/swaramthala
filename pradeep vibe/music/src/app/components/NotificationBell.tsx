'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, ExternalLink, Inbox } from 'lucide-react';
import { getNotifications, markAsRead, markAllAsRead } from '@/app/actions/notifications';
import Link from 'next/link';

export default function NotificationBell({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        setLoading(true);
        const res = await getNotifications();
        if (res.notifications) {
            setNotifications(res.notifications);
            setUnreadCount(res.unreadCount || 0);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (user) {
            fetchNotifications();
            // Poll every 30 seconds for new notifications
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAsRead = async (id: string) => {
        const res = await markAsRead(id);
        if (res.success) {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
    };

    const handleMarkAllRead = async () => {
        const res = await markAllAsRead();
        if (res.success) {
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        }
    };

    if (!user) return null;

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isOpen ? 'var(--brand-primary)' : 'var(--text-primary)',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                }}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: -4,
                        right: -4,
                        background: 'var(--brand-secondary)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 900,
                        padding: '2px 6px',
                        borderRadius: '10px',
                        border: '2px solid var(--bg-primary)',
                        boxShadow: '0 4px 12px rgba(244,114,182,0.4)',
                        animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none'
                    }}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: 0,
                    width: '320px',
                    maxHeight: '480px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-xl)',
                    zIndex: 1000,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backdropFilter: 'blur(20px)'
                }} className="animate-zoom-in">
                    <div style={{
                        padding: '16px',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--brand-primary)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div style={{ overflowY: 'auto', flex: 1 }}>
                        {loading && notifications.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <div className="spinner" style={{ margin: '0 auto 12px' }} />
                                Loading...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <Inbox size={40} strokeWidth={1} style={{ marginBottom: 16, opacity: 0.5 }} />
                                <p style={{ fontSize: '0.9rem' }}>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    style={{
                                        padding: '16px',
                                        borderBottom: '1px solid var(--border)',
                                        background: n.isRead ? 'transparent' : 'rgba(124, 92, 252, 0.05)',
                                        position: 'relative',
                                        transition: 'background 0.2s ease',
                                        cursor: n.link ? 'pointer' : 'default'
                                    }}
                                    onClick={() => n.link && setIsOpen(false)}
                                >
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 4 }}>
                                        <div style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: n.isRead ? 'transparent' : 'var(--brand-primary)',
                                            marginTop: 6,
                                            flexShrink: 0
                                        }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                                                {n.title}
                                                {!n.isRead && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleMarkAsRead(n.id); }}
                                                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                                        title="Mark as read"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                )}
                                            </div>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                                                {n.content}
                                            </p>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                {new Date(n.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                {n.link && (
                                                    <Link href={n.link} style={{ color: 'var(--brand-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        View <ExternalLink size={10} />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div style={{ padding: '12px', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
                        <Link href="/dashboard" onClick={() => setIsOpen(false)} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
                            See full activity history
                        </Link>
                    </div>
                </div>
            )}
            <style jsx>{`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); box-shadow: 0 4px 20px rgba(244,114,182,0.6); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
