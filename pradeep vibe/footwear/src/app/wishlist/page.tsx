"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/hooks/useToast';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 'shoe-001',
      name: 'SOLEVA Runner X',
      slug: 'soleva-runner-x',
      price: 12999,
      discount_price: 9999,
      category: 'Running',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    }
  ]);

  const addItem = useCartStore(state => state.addItem);
  const addToast = useToast(state => state.addToast);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    addToast("Removed from wishlist", 'success');
  };

  type WishlistItem = typeof wishlistItems[0];
  const moveToCart = (item: WishlistItem) => {
    addItem({
      productId: item.id,
      variantId: 'default',
      name: item.name,
      color: 'Default',
      size: 'UK 9',
      price: item.discount_price || item.price,
      quantity: 1,
      image: item.image,
    });
    addToast(`Moved ${item.name} to cart`, 'success');
    removeFromWishlist(item.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 container mx-auto px-4 md:px-8">
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
          <Heart className="w-12 h-12" /> WISHLIST
        </h1>
        <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
          <Heart className="w-24 h-24 text-muted-foreground opacity-20" />
          <h2 className="text-2xl font-bold uppercase tracking-widest">Your wishlist is empty</h2>
          <p className="text-muted-foreground max-w-md">Save items you love to your wishlist. Review them anytime and easily move them to your cart.</p>
          <Link href="/shop" className="mt-4 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary/90 transition-colors">
            Explore Collection <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col gap-4"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/20 flex items-center justify-center p-8">
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 z-20 bg-background/50 backdrop-blur-md p-2 rounded-full hover:bg-background hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-110" />
                
                <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button 
                    onClick={() => moveToCart(item)}
                    className="w-full bg-primary/90 backdrop-blur-md text-primary-foreground py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Move to Cart
                  </button>
                </div>
              </div>
              
              <Link href={`/product/${item.slug}`} className="flex flex-col gap-1">
                <h3 className="font-bold text-lg leading-tight hover:text-primary/70 transition-colors">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-black text-xl">{formatPrice(item.discount_price || item.price)}</span>
                  {item.discount_price && (
                    <span className="text-muted-foreground line-through text-sm font-medium">{formatPrice(item.price)}</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
