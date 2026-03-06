'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Music } from 'lucide-react';
import { askGuru } from '../actions/ai';

export default function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<{ role: 'user' | 'guru'; content: string }[]>([
        { role: 'guru', content: 'Namaste! I am Guru. How can I help you with your musical journey today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chat, isOpen]);

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;

        const userMsg = message.trim();
        setMessage('');
        setChat(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        const response = await askGuru(userMsg, chat.map(c => ({
            role: c.role === 'guru' ? 'model' : 'user',
            content: c.content
        })));

        if (response.error) {
            setChat(prev => [...prev, { role: 'guru', content: response.error as string }]);
        } else {
            setChat(prev => [...prev, { role: 'guru', content: response.text as string }]);
        }
        setIsLoading(false);
    };

    return (
        <div style={{ position: 'fixed', bottom: 85, right: 24, zIndex: 1000 }}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                    border: 'none', cursor: 'pointer', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 32px var(--brand-glow)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: isOpen ? 'rotate(90deg)' : 'none'
                }}
            >
                {isOpen ? <X size={24} /> : <Sparkles size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    position: 'absolute', bottom: 76, right: 0,
                    width: 'min(90vw, 360px)', height: 'min(70vh, 500px)',
                    background: 'rgba(26, 26, 38, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'slideUpFade 0.3s ease-out'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '20px', background: 'rgba(255,255,255,0.03)',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: '12px',
                            background: 'var(--brand-primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white'
                        }}>
                            <Music size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Guru AI</div>
                            <div style={{ fontSize: '0.75rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}></span>
                                Online & Tuning...
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}
                    >
                        {chat.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                padding: '12px 16px',
                                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                background: msg.role === 'user' ? 'var(--brand-primary)' : 'rgba(255,255,255,0.05)',
                                color: 'white',
                                fontSize: '0.9rem',
                                lineHeight: 1.5,
                                border: msg.role === 'user' ? 'none' : '1px solid var(--border)'
                            }}>
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ alignSelf: 'flex-start', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                <Loader2 className="animate-spin" size={16} />
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div style={{ padding: '16px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask Guru anything..."
                                style={{
                                    width: '100%', padding: '12px 48px 12px 16px',
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-lg)', color: 'white',
                                    outline: 'none', fontSize: '0.9rem'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                                    background: 'var(--brand-primary)', border: 'none',
                                    width: 32, height: 32, borderRadius: 'var(--radius-md)',
                                    color: 'white', cursor: 'pointer', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
