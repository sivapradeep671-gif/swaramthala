"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { MagneticButton } from '@/components/motion/MagneticButton';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

function CheckoutContent() {
  const { items, clearCart, subtotal, finalTotal, shippingCost, discountAmount, promoCode } = useCartStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // States to handle post-checkout success
  const isSuccess = searchParams.get('success') === 'true';
  const isCanceled = searchParams.get('canceled') === 'true';
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrderNumber(Math.floor(Math.random() * 100000).toString());
      clearCart();
    }
  }, [isSuccess, clearCart]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, promoCode }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        router.push(data.url);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center bg-secondary/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-background rounded-3xl p-12 border border-border flex flex-col items-center text-center max-w-xl mx-auto shadow-2xl"
        >
          <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-heading font-black uppercase tracking-tighter mb-4">Order Confirmed</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order number is <strong className="text-foreground">#SOL-{orderNumber}</strong>. We will send you an email with shipping details shortly.
          </p>
          <Link href="/shop">
            <MagneticButton className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-widest">
              Continue Shopping
            </MagneticButton>
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center bg-secondary/10">
        <h1 className="text-4xl font-heading font-black mb-4 uppercase">Checkout Unavailable</h1>
        <p className="text-muted-foreground mb-8">Your cart is empty.</p>
        <Link href="/shop">
          <MagneticButton as="div" className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold">
            Return to Shop
          </MagneticButton>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-black uppercase tracking-tighter">Order Review</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2 text-sm">
            <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Checkout via Stripe
          </div>
        </div>

        {isCanceled && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive flex items-center gap-3 font-bold">
            <AlertCircle className="w-5 h-5" />
            Payment was canceled. You can try again below.
          </div>
        )}

        <div className="bg-background rounded-3xl p-6 md:p-10 border border-border shadow-2xl">
          <h3 className="font-bold uppercase tracking-widest mb-6 border-b border-border pb-4">Your Items</h3>
          
          <div className="flex flex-col gap-6 mb-8 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
            {items.map(item => (
              <div key={item.id} className="flex gap-6 items-center">
                <div className="w-20 h-20 bg-secondary rounded-xl overflow-hidden shrink-0 border border-border/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg leading-tight line-clamp-1">{item.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Variant: {item.color} | Size: {item.size}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatPrice(item.price)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 flex flex-col gap-3">
            <div className="flex justify-between text-muted-foreground font-medium">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal())}</span>
            </div>
            
            {discountAmount > 0 && (
              <div className="flex justify-between text-primary font-bold">
                <span>Discount ({promoCode})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-muted-foreground font-medium">
              <span>Shipping (Calculated for India)</span>
              <span>{shippingCost() === 0 ? 'Free' : formatPrice(shippingCost())}</span>
            </div>
            
            <div className="flex justify-between font-black text-2xl mt-4 pt-4 border-t border-border">
              <span className="uppercase tracking-tighter">Total</span>
              <span>{formatPrice(finalTotal())}</span>
            </div>
          </div>

          {error && (
            <div className="mt-8 p-4 bg-destructive/10 text-destructive rounded-xl text-sm font-bold text-center border border-destructive/20">
              {error}
            </div>
          )}

          <div className="mt-10">
            <button 
              onClick={handleCheckout} 
              disabled={isProcessing}
              className="w-full bg-foreground text-background py-5 rounded-full font-bold uppercase tracking-widest text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg"
            >
              {isProcessing ? 'Connecting to Stripe...' : `Proceed to Secure Payment`}
              {!isProcessing && <ShieldCheck className="w-5 h-5" />}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-4 uppercase tracking-widest">
              You will be redirected to Stripe to securely complete your purchase.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 flex items-center justify-center uppercase tracking-widest font-bold text-muted-foreground">Initializing Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
