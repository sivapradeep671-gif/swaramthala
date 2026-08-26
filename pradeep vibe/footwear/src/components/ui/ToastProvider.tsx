"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function ToastProvider() {
  const toasts = useToast((state) => state.toasts);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={cn(
              "px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md border pointer-events-auto min-w-[250px]",
              toast.type === 'success' ? "bg-green-500/10 border-green-500/20 text-green-500" :
              toast.type === 'error' ? "bg-destructive/10 border-destructive/20 text-destructive" :
              "bg-secondary border-border text-foreground"
            )}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {toast.type === 'info' && <Info className="w-5 h-5" />}
            <span className="font-medium text-sm">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
