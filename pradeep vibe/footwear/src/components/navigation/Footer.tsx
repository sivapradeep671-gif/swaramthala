"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Share2, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../motion/MagneticButton';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 px-4 md:px-8 overflow-hidden relative">
      <div className="container mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="lg:col-span-1">
            <div className="relative w-12 h-12 overflow-hidden mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="SOLEVA Logo" className="w-full h-full object-contain filter invert opacity-90" />
            </div>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Engineered for every step. Premium footwear designed for those who move differently.
            </p>
            <div className="flex gap-4">
              <MagneticButton magneticStrength={0.2} className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground hover:text-primary">
                <Share2 className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton magneticStrength={0.2} className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground hover:text-primary">
                <MessageCircle className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton magneticStrength={0.2} className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground hover:text-primary">
                <Mail className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6">Shop</h4>
            <ul className="flex flex-col gap-4 text-primary-foreground/70">
              <li><Link href="/shop?category=sneakers" className="hover:text-primary-foreground transition-colors">Sneakers</Link></li>
              <li><Link href="/shop?category=sports" className="hover:text-primary-foreground transition-colors">Sports</Link></li>
              <li><Link href="/shop?gender=men" className="hover:text-primary-foreground transition-colors">Men</Link></li>
              <li><Link href="/shop?gender=women" className="hover:text-primary-foreground transition-colors">Women</Link></li>
              <li><Link href="/shop?sale=true" className="hover:text-primary-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6">Support</h4>
            <ul className="flex flex-col gap-4 text-primary-foreground/70">
              <li><Link href="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/track" className="hover:text-primary-foreground transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/size-guide" className="hover:text-primary-foreground transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6">Stay Connected</h4>
            <p className="text-primary-foreground/70 mb-4">Subscribe for exclusive drops & early access.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-primary-foreground/30 py-3 pr-10 focus:outline-none focus:border-primary-foreground transition-colors text-sm uppercase placeholder:text-primary-foreground/30"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-1 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        {/* Massive Typography Section */}
        <div className="w-full border-t border-primary-foreground/10 pt-10 overflow-hidden flex justify-center">
          <motion.div 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-[12vw] font-heading font-black leading-none tracking-tighter whitespace-nowrap opacity-10 select-none text-center"
          >
            FORM. FUNCTION. FUTURE.
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50 mt-10">
          <p>&copy; {currentYear} SOLEVA. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
