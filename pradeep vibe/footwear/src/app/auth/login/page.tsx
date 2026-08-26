/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
 
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { SplitText } from '@/components/motion/SplitText';

export default function LoginPage() {
  const supabase = createClient();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/account');
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        if (error) throw error;
        
        if (data.user && data.user.identities && data.user.identities.length === 0) {
           setError("An account with this email already exists.");
        } else {
           alert("Check your email for the confirmation link!");
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 flex items-center justify-center container mx-auto px-4">
      <div className="w-full max-w-md bg-secondary/10 p-8 rounded-3xl border border-border backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/10 blur-[50px] -z-10 rounded-full" />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-black uppercase tracking-tighter mb-2">
            <SplitText text={isLogin ? 'WELCOME BACK' : 'JOIN SOLEVA'} />
          </h1>
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-5 relative z-10">
          <AnimatePresence mode="popLayout">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-destructive/10 text-destructive text-sm font-bold p-3 rounded-lg border border-destructive/20 text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 bg-background/50 rounded-xl border border-border focus:border-primary outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              {isLogin && <button type="button" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</button>}
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 bg-background/50 rounded-xl border border-border focus:border-primary outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <MagneticButton 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest mt-4 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </MagneticButton>
        </form>

        <div className="mt-8 text-center border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }} 
              className="text-foreground font-bold uppercase tracking-widest ml-2 hover:underline underline-offset-4"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

      </div>
    </main>
  );
}
