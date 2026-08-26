"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useWishlistStore } from '@/lib/store';

export function WishlistDrawer() {
  const { items, isOpen, toggleWishlist, removeItem } = useWishlistStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleWishlist}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                Wishlist
                <span className="text-muted-foreground text-sm">({items.length})</span>
              </h2>
              <button 
                onClick={toggleWishlist}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                    <X className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground max-w-[250px] mx-auto">
                      Discover your next favorite pair and save them here for later.
                    </p>
                  </div>
                  <button 
                    onClick={toggleWishlist}
                    className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4 p-4 rounded-2xl bg-secondary/20 border border-transparent hover:border-border transition-colors group relative">
                      
                      <div className="w-24 h-24 bg-white rounded-xl overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover mix-blend-multiply" 
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <Link href={`/product/${item.slug}`} onClick={toggleWishlist} className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">
                            {item.name}
                          </Link>
                          <div className="font-bold mt-1">
                            ₹{item.price}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Link 
                            href={`/product/${item.slug}`} 
                            onClick={toggleWishlist}
                            className="flex-1 text-center bg-primary text-primary-foreground py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
                          >
                            View Product
                          </Link>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-secondary/10 backdrop-blur-xl">
                 <button 
                    onClick={toggleWishlist}
                    className="w-full mt-4 bg-foreground text-background font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Continue Shopping
                  </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
