'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getMessagesWithUser, sendMessage } from '@/app/actions/message';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ShieldCheck, Tag, Info, Send, Clock, MapPin, ChevronLeft } from 'lucide-react';
import { User, Message, Listing } from '@prisma/client';
import { toastError } from '@/app/components/Toast';
import { markAsRead } from '@/app/actions/message';

type Conversation = {
    otherUser: User;
    lastMessage: Message & { listing?: Listing };
    unreadCount: number;
};

export default function MessagesClient({
    currentUser,
    initialConversations
}: {
    currentUser: User,
    initialConversations: Conversation[]
}) {
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Refresh conversations every few seconds
    useEffect(() => {
        if (!selectedUser) return;

        let interval = setInterval(async () => {
            const msgs = await getMessagesWithUser(selectedUser.id);
            setMessages(msgs);
            // Auto-read if we are looking at it
            if (msgs.some((m: any) => m.receiverId === currentUser.id && !m.isRead)) {
                await markAsRead(selectedUser.id);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedUser, currentUser.id]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const selectConversation = async (otherUser: User) => {
        setSelectedUser(otherUser);
        setLoading(true);
        const msgs = await getMessagesWithUser(otherUser.id);
        setMessages(msgs);

        // Mark as read in DB
        await markAsRead(otherUser.id);

        // Update unread count locally
        setConversations(prev => prev.map(c =>
            c.otherUser.id === otherUser.id ? { ...c, unreadCount: 0 } : c
        ));
        setLoading(false);
    };

    const currentListing = messages.find(m => m.listing)?.listing;

    const quickReplies = [
        'Is this still available? 🎸',
        'What is your best price? 💰',
        'Can I come and see it today? 🚗',
        'Are there any scratches? 🧐',
        'Is the original bill available? 📄'
    ];

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        const content = newMessage;
        setNewMessage('');

        // Optimistic update
        const optimisticMsg = {
            id: 'temp-' + Date.now(),
            content,
            senderId: currentUser.id,
            receiverId: selectedUser.id,
            createdAt: new Date(),
            sender: currentUser,
        };
        setMessages(prev => [...prev, optimisticMsg]);

        const res = await sendMessage(selectedUser.id, content);
        if (res.success) {
            // Replace with real message to ensure consistency, though id mismatch might occur
            // we will just rely on the next poll to fix it, or we can just append.
        } else {
            toastError('Failed to send message');
        }
    };

    return (
        <div className="messages-layout" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>

            {/* Sidebar List */}
            <div style={{ borderRight: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem' }}>Messages</h2>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {conversations.length === 0 ? (
                        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            No conversations yet.<br />Contact sellers from their listings!
                        </div>
                    ) : (
                        conversations.map(c => (
                            <div
                                key={c.otherUser.id}
                                onClick={() => selectConversation(c.otherUser)}
                                style={{
                                    padding: '16px 20px',
                                    borderBottom: '1px solid var(--border)',
                                    cursor: 'pointer',
                                    background: selectedUser?.id === c.otherUser.id ? 'var(--bg-card)' : 'transparent',
                                    transition: 'background var(--t-fast)',
                                    display: 'flex', gap: 12, alignItems: 'center'
                                }}
                            >
                                <div style={{
                                    width: 44, height: 44, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: 700, flexShrink: 0
                                }}>
                                    {c.otherUser.avatar}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.otherUser.name}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            {formatDistanceToNow(new Date(c.lastMessage.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.85rem', color: c.unreadCount > 0 ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: c.unreadCount > 0 ? 600 : 400 }}>
                                            {c.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                                            {c.lastMessage.content}
                                        </span>
                                        {c.unreadCount > 0 && (
                                            <span style={{ background: '#f87171', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '2px 6px', borderRadius: 10 }}>
                                                {c.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
                {!selectedUser ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexDirection: 'column', gap: 16 }}>
                        <div style={{ marginBottom: 12 }}><MessageSquare size={64} color="var(--border)" /></div>
                        <p>Select a conversation to start chatting</p>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: 700
                                }}>
                                    {selectedUser.avatar}
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{selectedUser.name}</h3>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedUser.city} • Verified</p>
                                </div>
                            </div>

                            {currentListing && (
                                <div style={{
                                    background: 'var(--bg-glass)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-md)', padding: '6px 12px',
                                    display: 'flex', alignItems: 'center', gap: 10, maxWidth: 240
                                }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 4, overflow: 'hidden', background: 'var(--bg-secondary)', flexShrink: 0, position: 'relative' }}>
                                        <Image src={JSON.parse(currentListing.images)[0]} alt={currentListing.title} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentListing.title}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--brand-secondary)', fontWeight: 800 }}>₹{currentListing.price.toLocaleString('en-IN')}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Messages List */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {loading ? (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 40 }}>Loading messages...</div>
                            ) : (
                                messages.map(m => {
                                    const isMe = m.senderId === currentUser.id;
                                    return (
                                        <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                                            {m.listing && (
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    Discussing: <strong style={{ color: 'var(--brand-secondary)' }}>{m.listing.title}</strong>
                                                </div>
                                            )}
                                            <div style={{
                                                background: isMe ? 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))' : 'var(--bg-card)',
                                                color: isMe ? 'white' : 'var(--text-primary)',
                                                border: isMe ? 'none' : '1px solid var(--border)',
                                                padding: '10px 16px', borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                                maxWidth: '70%', fontSize: '0.95rem', lineHeight: 1.4
                                            }}>
                                                {m.content}
                                            </div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                                {formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input Area */}
                        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 12, overflowX: 'auto', paddingBottom: 4 }} className="hide-scrollbar">
                                {quickReplies.map(reply => (
                                    <button
                                        key={reply}
                                        onClick={() => setNewMessage(reply)}
                                        style={{
                                            whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: 'var(--radius-full)',
                                            background: 'var(--bg-glass)', border: '1px solid var(--border)',
                                            fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-primary)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                            <form onSubmit={handleSend} style={{ display: 'flex', gap: 12 }}>
                                <input
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="input-field"
                                    style={{ flex: 1, borderRadius: 'var(--radius-full)', padding: '12px 20px' }}
                                />
                                <button type="submit" disabled={!newMessage.trim()} className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Send size={18} /> Send
                                </button>
                            </form>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                                <ShieldCheck size={14} color="#4ade80" /> Never share financial details or pay outside of Swaramthala checkout.
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
