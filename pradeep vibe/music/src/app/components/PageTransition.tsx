'use client';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, scale: 0.98, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                style={{ minHeight: '100vh', width: '100%' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
