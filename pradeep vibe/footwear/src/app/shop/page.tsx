"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductService, ProductWithDetails } from '@/lib/services';
import { Filter, ArrowDownUp } from 'lucide-react';
import { SplitText } from '@/components/motion/SplitText';
import { FilterSidebar } from '@/components/ecommerce/FilterSidebar';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { AnimatePresence, motion } from 'framer-motion';

function ShopContent() {
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const params = {
        category: searchParams.get('category') || undefined,
        brand: searchParams.get('brand') || undefined,
        gender: searchParams.get('gender') || undefined,
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
        sale: searchParams.get('sale') === 'true',
        sort: searchParams.get('sort') || undefined,
        colors: searchParams.get('colors')?.split(','),
        sizes: searchParams.get('sizes')?.split(','),
      };

      const data = await ProductService.searchProducts(params);
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [searchParams]);

  const updateSort = (val: string | null) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const current = new URLSearchParams(Array.from(searchParams.entries()) as any);
    if (val) current.set('sort', val);
    else current.delete('sort');
    router.push(`${window.location.pathname}?${current.toString()}`, { scroll: false });
    setShowSortDropdown(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8">
      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky top-32 h-[calc(100vh-8rem)] shrink-0">
        <FilterSidebar />
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            className="fixed inset-0 z-[100] bg-background md:hidden"
          >
            <FilterSidebar isMobile onClose={() => setShowMobileFilter(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-border pb-8 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-4">
              <SplitText text="ALL FOOTWEAR" />
            </h1>
            <p className="text-muted-foreground">{products.length} Products</p>
          </div>
          
          <div className="flex gap-4 relative">
            <button 
              onClick={() => setShowMobileFilter(true)}
              className="md:hidden flex items-center gap-2 border border-border px-4 py-2 rounded-full uppercase text-sm font-bold tracking-widest hover:bg-secondary transition-colors"
            >
              <Filter className="w-4 h-4" /> Filter
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 border border-border px-4 py-2 rounded-full uppercase text-sm font-bold tracking-widest hover:bg-secondary transition-colors"
              >
                <ArrowDownUp className="w-4 h-4" /> Sort
              </button>
              {showSortDropdown && (
                <div className="absolute top-full mt-2 right-0 bg-background border border-border rounded-xl p-4 shadow-xl z-50 w-48 flex flex-col gap-2">
                  <button onClick={() => updateSort(null)} className="text-left hover:text-primary transition-colors text-sm font-medium">Featured</button>
                  <button onClick={() => updateSort('newest')} className="text-left hover:text-primary transition-colors text-sm font-medium">Newest</button>
                  <button onClick={() => updateSort('price_asc')} className="text-left hover:text-primary transition-colors text-sm font-medium">Price: Low to High</button>
                  <button onClick={() => updateSort('price_desc')} className="text-left hover:text-primary transition-colors text-sm font-medium">Price: High to Low</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="bg-secondary/50 aspect-square rounded-2xl w-full" />
                <div className="bg-secondary/50 h-6 w-3/4 rounded-md" />
                <div className="bg-secondary/50 h-5 w-1/4 rounded-md" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria.</p>
            <button 
              onClick={() => router.push('/shop')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-widest text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-20 container mx-auto px-4 md:px-8 animate-pulse bg-secondary/20"></div>}>
      <ShopContent />
    </Suspense>
  );
}
