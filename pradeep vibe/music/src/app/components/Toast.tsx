'use client';
import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

// Global singleton event bus
const listeners: Set<(toast: Omit<Toast, 'id'>) => void> = new Set();

export function toast(type: ToastType, message: string) {
    listeners.forEach(fn => fn({ type, message }));
}
export const toastSuccess = (msg: string) => toast('success', msg);
export const toastError = (msg: string) => toast('error', msg);
export const toastInfo = (msg: string) => toast('info', msg);

const ICONS: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    info: <Info size={18} />,
};

const COLORS: Record<ToastType, { bg: string; border: string; color: string }> = {
    success: { bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.3)', color: '#4ade80' },
    error: { bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.3)', color: '#f87171' },
    info: { bg: 'rgba(124,92,252,0.1)', border: 'rgba(124,92,252,0.3)', color: '#a78bfa' },
};

export default function ToastProvider() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((t: Omit<Toast, 'id'>) => {
        const id = crypto.randomUUID();
        setToasts(prev => [...prev, { ...t, id }]);
        setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 3500);
    }, []);

    const remove = (id: string) => setToasts(prev => prev.filter(x => x.id !== id));

    useEffect(() => {
        listeners.add(addToast);
        return () => { listeners.delete(addToast); };
    }, [addToast]);

    if (toasts.length === 0) return null;

    return (
        <div style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
            display: 'flex', flexDirection: 'column', gap: 10,
            pointerEvents: 'none',
        }}>
            {toasts.map(t => {
                const c = COLORS[t.type];
                return (
                    <div key={t.id} className="animate-fade-up" style={{
                        pointerEvents: 'auto',
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '14px 18px',
                        background: `var(--bg-card)`,
                        border: `1px solid ${c.border}`,
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${c.border}`,
                        backdropFilter: 'blur(20px)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem', fontWeight: 500,
                        maxWidth: 360, minWidth: 260,
                        animation: 'fadeUp 0.3s ease both',
                    }}>
                        <span style={{ color: c.color, flexShrink: 0 }}>{ICONS[t.type]}</span>
                        <span style={{ flex: 1 }}>{t.message}</span>
                        <button onClick={() => remove(t.id)} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-muted)', display: 'flex', padding: 2,
                            borderRadius: 4, flexShrink: 0,
                        }}><X size={16} /></button>
                    </div>
                );
            })}
        </div>
    );
}
