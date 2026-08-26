"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

export function CartDrawer() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, subtotal, shippingCost, discountAmount, promoCode, applyPromoCode, removePromoCode, finalTotal } = useCartStore();
  
  const [promoInput, setPromoInput] = React.useState('');
  const [promoError, setPromoError] = React.useState('');

  const currentSubtotal = subtotal();
  const freeShippingThreshold = 2000;
  const amountToFreeShipping = freeShippingThreshold - currentSubtotal;
  const progressPercentage = Math.min(100, (currentSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (!success) {
      setPromoError('Invalid or expired code');
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background border-l border-border z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-heading font-black uppercase flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" /> Your Cart
              </h2>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Shipping Progress */}
            {items.length > 0 && (
              <div className="bg-secondary/30 p-4 border-b border-border flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                  <span>Shipping</span>
                  <span>{amountToFreeShipping > 0 ? `Add ${formatPrice(amountToFreeShipping)} for FREE` : 'Unlocked!'}</span>
                </div>
                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground gap-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="text-lg">Your cart is empty.</p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 border-b border-current hover:text-primary transition-colors uppercase font-bold tracking-widest text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-secondary/30 border border-border"
                  >
                    {/* Item Image */}
                    <div className="relative w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      {/* Using standard img for fallback if remote patterns aren't set in next.config yet */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="object-cover w-full h-full mix-blend-multiply" 
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold leading-tight line-clamp-2 pr-4">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.color} | Size: {item.size}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-3 border border-border rounded-full px-3 py-1 bg-background">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-background flex flex-col gap-4">
                
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="Promo Code" 
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError('');
                      }}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm font-bold uppercase placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      disabled={!!promoCode}
                    />
                    {promoError && <p className="text-destructive text-xs font-bold mt-1 uppercase">{promoError}</p>}
                  </div>
                  {promoCode ? (
                    <button 
                      onClick={removePromoCode}
                      className="bg-destructive/10 text-destructive border border-destructive/20 px-4 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button 
                      onClick={handleApplyPromo}
                      className="bg-foreground text-background px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
                    >
                      Apply
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2 py-4 border-t border-border border-dashed">
                  <div className="flex justify-between items-center text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>{formatPrice(currentSubtotal)}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-sm font-bold text-primary uppercase tracking-widest">
                      <span>Discount ({promoCode})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Shipping</span>
                    <span>{shippingCost() === 0 ? 'Free' : formatPrice(shippingCost())}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="uppercase tracking-widest font-black">Total</span>
                  <span className="text-2xl font-black">{formatPrice(finalTotal())}</span>
                </div>
                
                <Link href="/checkout" onClick={toggleCart}>
                  <button className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors group">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
