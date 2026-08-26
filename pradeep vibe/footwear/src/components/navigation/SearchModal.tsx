"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { ProductService, ProductWithDetails } from '@/lib/services';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductWithDetails[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('soleva_recent_searches');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRecentSearches(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const saveSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('soleva_recent_searches', JSON.stringify(updated));
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setQuery('');
        setResults([]);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSearching(true);
      const fetchResults = async () => {
        const products = await ProductService.searchProducts({ query });
        setResults(products.slice(0, 5)); // Limit to 5 results for preview
        setIsSearching(false);
      };
      
      const timeoutId = setTimeout(() => {
        fetchResults();
      }, 300); // Debounce
      
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex justify-center items-start pt-32 px-4"
        >
          <div className="w-full max-w-2xl bg-secondary/20 border border-border p-6 rounded-3xl relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Search SOLEVA</h2>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full bg-background/50 border border-border p-4 pl-12 rounded-xl focus:border-primary outline-none text-lg font-medium"
              />
            </div>

            {query.length > 1 ? (
              <div className="mt-8 max-h-[50vh] overflow-y-auto pr-2 hide-scrollbar">
                {isSearching ? (
                  <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : results.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Products</span>
                      <Link onClick={onClose} href={`/shop?query=${encodeURIComponent(query)}`} className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
                        View All
                      </Link>
                    </div>
                    {results.map(product => {
                      const image = product.media?.find((m: { type: string, url: string }) => m.type === 'hero')?.url || product.media?.[0]?.url || 'https://via.placeholder.com/150';
                      return (
                        <Link 
                          key={product.id} 
                          href={`/product/${product.slug}`}
                          onClick={() => {
                            saveSearch(query);
                            onClose();
                          }}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border"
                        >
                          <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                          </div>
                          <div className="font-bold">
                            ₹{product.discount_price || product.price}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>
            ) : (
              recentSearches.length > 0 && (
                <div className="mt-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">Recent Searches</span>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-primary transition-colors flex items-center gap-2"
                      >
                        <Search className="w-3 h-3 text-muted-foreground" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
