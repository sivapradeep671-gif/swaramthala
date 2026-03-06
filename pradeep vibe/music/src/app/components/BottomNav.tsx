'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, ShoppingBag, User } from 'lucide-react';

export default function BottomNav({ user }: { user: any }) {
    const pathname = usePathname();

    const NAV_ITEMS = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/browse', label: 'Search', icon: Search },
        { href: '/sell', label: 'Sell', icon: PlusSquare },
        { href: '/dashboard', label: 'Orders', icon: ShoppingBag },
        { href: user ? '/dashboard' : '/auth', label: user ? 'Profile' : 'Sign In', icon: User },
    ];

    return (
        <nav className="mobile-bottom-nav">
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100%',
                padding: '0 8px'
            }}>
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4,
                            textDecoration: 'none',
                            color: isActive ? 'var(--brand-primary)' : 'var(--text-muted)',
                            flex: 1,
                            height: '100%',
                            transition: 'all var(--t-fast)',
                        }}>
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            <style jsx>{`
                .mobile-bottom-nav {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 64px;
                    background: rgba(10, 10, 15, 0.9);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid var(--border);
                    z-index: 1000;
                    display: none;
                    padding-bottom: env(safe-area-inset-bottom);
                }

                @media (max-width: 768px) {
                    .mobile-bottom-nav {
                        display: block;
                    }
                }
            `}</style>
        </nav>
    );
}
