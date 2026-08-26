"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductService } from '@/lib/services';
import { cn } from '@/lib/utils';
import { X, Check } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  brands: string[];
  genders: string[];
  colors: string[];
  sizes: string[];
}

export function FilterSidebar({ isMobile = false, onClose }: { isMobile?: boolean, onClose?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [options, setOptions] = useState<FilterOptions | null>(null);

  useEffect(() => {
    async function loadOptions() {
      const data = await ProductService.getFilterOptions();
      setOptions(data);
    }
    loadOptions();
  }, []);

  const updateParam = (key: string, value: string | null, multi = false) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const current = new URLSearchParams(Array.from(searchParams.entries()) as any);
    
    if (multi) {
      const existing = current.get(key)?.split(',') || [];
      if (value === null) {
        current.delete(key);
      } else if (existing.includes(value)) {
        const next = existing.filter(v => v !== value);
        if (next.length > 0) current.set(key, next.join(','));
        else current.delete(key);
      } else {
        existing.push(value);
        current.set(key, existing.join(','));
      }
    } else {
      if (value) current.set(key, value);
      else current.delete(key);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${window.location.pathname}${query}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  if (!options) {
    return <div className="w-64 animate-pulse bg-secondary/50 h-[80vh] rounded-3xl"></div>;
  }

  const activeCategories = searchParams.get('category')?.split(',') || [];
  const activeBrands = searchParams.get('brand')?.split(',') || [];
  const activeColors = searchParams.get('colors')?.split(',') || [];
  const activeSizes = searchParams.get('sizes')?.split(',') || [];
  const activeGender = searchParams.get('gender');
  const activeSale = searchParams.get('sale') === 'true';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const setPriceRange = (min: string | null, max: string | null) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const current = new URLSearchParams(Array.from(searchParams.entries()) as any);
    if (min) current.set('minPrice', min); else current.delete('minPrice');
    if (max) current.set('maxPrice', max); else current.delete('maxPrice');
    const search = current.toString();
    router.push(`${window.location.pathname}${search ? `?${search}` : ""}`, { scroll: false });
  };

  const isPriceActive = (min: string | null, max: string | null) => minPrice === min && maxPrice === max;

  return (
    <div className={cn("flex flex-col h-full", isMobile ? "p-6" : "w-64 pr-8")}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading font-black text-2xl uppercase tracking-tighter">Filters</h2>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-8 pb-20">
        
        {/* Gender */}
        <div>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Gender</h3>
          <div className="flex flex-col gap-2">
            {['Men', 'Women', 'Unisex'].map(g => (
              <label key={g} className="flex items-center gap-3 cursor-pointer group">
                <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", activeGender === g.toLowerCase() ? "bg-primary border-primary text-primary-foreground" : "border-border group-hover:border-primary")}>
                  {activeGender === g.toLowerCase() && <Check className="w-3 h-3" />}
                </div>
                <input type="checkbox" className="hidden" checked={activeGender === g.toLowerCase()} onChange={() => updateParam('gender', activeGender === g.toLowerCase() ? null : g.toLowerCase())} />
                <span className="text-sm font-medium">{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        {options.categories.length > 0 && (
          <div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Category</h3>
            <div className="flex flex-col gap-2">
              {options.categories.map(c => (
                <label key={c} className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", activeCategories.includes(c) ? "bg-primary border-primary text-primary-foreground" : "border-border group-hover:border-primary")}>
                    {activeCategories.includes(c) && <Check className="w-3 h-3" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={activeCategories.includes(c)} onChange={() => updateParam('category', c, true)} />
                  <span className="text-sm font-medium">{c}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Brands */}
        {options.brands.length > 0 && (
          <div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Brand</h3>
            <div className="flex flex-col gap-2">
              {options.brands.map(b => (
                <label key={b} className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", activeBrands.includes(b) ? "bg-primary border-primary text-primary-foreground" : "border-border group-hover:border-primary")}>
                    {activeBrands.includes(b) && <Check className="w-3 h-3" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={activeBrands.includes(b)} onChange={() => updateParam('brand', b, true)} />
                  <span className="text-sm font-medium">{b}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div>
          <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Price Range</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Under ₹2,000', min: null, max: '2000' },
              { label: '₹2,000 - ₹5,000', min: '2000', max: '5000' },
              { label: '₹5,000 - ₹10,000', min: '5000', max: '10000' },
              { label: 'Over ₹10,000', min: '10000', max: null },
            ].map(range => (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", isPriceActive(range.min, range.max) ? "bg-primary border-primary text-primary-foreground" : "border-border group-hover:border-primary")}>
                  {isPriceActive(range.min, range.max) && <Check className="w-3 h-3" />}
                </div>
                <input type="checkbox" className="hidden" checked={isPriceActive(range.min, range.max)} onChange={() => {
                  if (isPriceActive(range.min, range.max)) setPriceRange(null, null);
                  else setPriceRange(range.min, range.max);
                }} />
                <span className="text-sm font-medium">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        {options.colors.length > 0 && (
          <div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Color</h3>
            <div className="flex flex-wrap gap-2">
              {options.colors.map(c => (
                <button
                  key={c}
                  onClick={() => updateParam('colors', c, true)}
                  className={cn("px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors", activeColors.includes(c) ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-primary")}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {options.sizes.length > 0 && (
          <div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Size (UK)</h3>
            <div className="grid grid-cols-4 gap-2">
              {options.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => updateParam('sizes', s, true)}
                  className={cn("py-2 rounded-lg border text-sm font-bold transition-colors", activeSizes.includes(s) ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-primary")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sale */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", activeSale ? "bg-destructive border-destructive text-destructive-foreground" : "border-border group-hover:border-destructive")}>
              {activeSale && <Check className="w-3 h-3" />}
            </div>
            <input type="checkbox" className="hidden" checked={activeSale} onChange={() => updateParam('sale', activeSale ? null : 'true')} />
            <span className="text-sm font-bold text-destructive uppercase tracking-widest">Sale Items Only</span>
          </label>
        </div>

      </div>

      <div className="pt-4 border-t border-border mt-auto">
        <button 
          onClick={clearFilters}
          className="w-full py-3 rounded-xl border border-border font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
