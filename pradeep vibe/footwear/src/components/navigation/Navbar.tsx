"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore(state => state.totalItems());
  const toggleCart = useCartStore(state => state.toggleCart);
  
  const wishlistItems = useWishlistStore(state => state.items);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'New Arrivals', href: '/shop?sort=newest' },
    { name: 'Sneakers', href: '/shop?category=sneakers' },
    { name: 'Sports', href: '/shop?category=sports' },
    { name: 'Men', href: '/shop?gender=men' },
    { name: 'Women', href: '/shop?gender=women' },
    { name: 'Sale', href: '/shop?sale=true', className: 'text-destructive' },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled 
            ? "glass py-4 shadow-md" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-10 h-10 overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="SOLEVA Logo" className="w-full h-full object-contain invert dark:invert-0" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-heading font-black tracking-tighter"
            >
              SOLEVA
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold tracking-wide uppercase hover:text-primary/70 transition-colors relative group",
                    link.className,
                    pathname === link.href ? "text-primary" : "text-primary/90"
                  )}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6 relative z-50">
            <motion.button 
              onClick={() => setIsSearchOpen(true)}
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }} 
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <button onClick={toggleWishlist} className="hidden sm:block relative">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Wishlist">
                <Heart className={cn("w-5 h-5 transition-colors", wishlistItems.length > 0 ? "fill-current text-primary" : "")} />
              </motion.div>
              <AnimatePresence>
                {isMounted && wishlistItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center pointer-events-none"
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <Link href="/account" className="hidden sm:block">
              <motion.button whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} aria-label="Account">
                <User className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 5 }} 
              whileTap={{ scale: 0.9, rotate: -5 }} 
              onClick={toggleCart}
              className="relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {isMounted && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button 
              className="lg:hidden"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col pt-24 px-6 lg:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-heading font-bold uppercase tracking-tight">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={link.className}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="h-px bg-border my-4" />
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col gap-4 text-lg font-sans font-medium"
              >
                <Link href="/account" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-5 h-5" /> Account
                </Link>
                <button className="flex items-center gap-2" onClick={() => { setIsMobileMenuOpen(false); toggleWishlist(); }}>
                  <Heart className={cn("w-5 h-5", wishlistItems.length > 0 ? "fill-current text-primary" : "")} /> Wishlist {isMounted && wishlistItems.length > 0 && `(${wishlistItems.length})`}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
