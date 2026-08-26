/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProductService, ProductWithDetails } from '@/lib/services';
import { useCartStore } from '@/lib/store';
import { SplitText } from '@/components/motion/SplitText';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ProductGallery } from '@/components/ecommerce/ProductGallery';
import { SizeGuide } from '@/components/ecommerce/SizeGuide';
import { Star, Truck, ShieldCheck, Undo2, ChevronRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';
import { useWishlistStore } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';
import { ReviewSection } from '@/components/ecommerce/ReviewSection';

export default function ProductClientPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<ProductWithDetails[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Selection state
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const quantity = 1;
  
  const [randomReviewCount, setRandomReviewCount] = useState(0);

  const addItem = useCartStore(state => state.addItem);
  const addToast = useToast(state => state.addToast);
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  
  const [isMounted, setIsMounted] = useState(false);



  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    async function loadData() {
      if (typeof slug === 'string') {
        const data = await ProductService.getProductBySlug(slug);
        setProduct(data);
        
        if (data) {
          if (data.variants.length > 0) {
            setSelectedVariantId(data.variants[0].id);
          }
          
          // Fetch related products
          const related = await ProductService.getRelatedProducts(data.id);
          setRelatedProducts(related);

          // Load auth state & reviews
          const supabaseClient = createClient();
          const { data: { session } } = await supabaseClient.auth.getSession();
          setIsAuthenticated(!!session);

          const { data: reviewsData } = await supabaseClient
            .from('reviews')
            .select(`
              id, rating, comment, created_at,
              profiles (first_name, last_name, avatar_url)
            `)
            .eq('product_id', data.id)
            .order('created_at', { ascending: false });
          
          if (reviewsData) {
            setReviews(reviewsData);
          }
        }
        
        setLoading(false);
      }
    }
    loadData();
    setRandomReviewCount(Math.floor(Math.random() * 500) + 50);
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-heading font-bold text-2xl uppercase tracking-widest animate-pulse">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-heading font-bold text-2xl uppercase tracking-widest">Product not found.</div>;
  }

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId) || product.variants?.[0];
  
  // Extract all unique sizes available for the selected variant
  const availableSizes = (selectedVariant?.inventory as any[])?.filter(inv => inv.quantity > 0).map(inv => inv.size) || [];
  // List of standard sizes to display even if out of stock
  const standardSizes = ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast("Please select a size first.", 'error');
      return;
    }

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      color: selectedVariant.color_name,
      size: selectedSize,
      price: product.discount_price || product.price,
      quantity,
      image: product.media?.find(m => m.type === 'hero')?.url || product.media?.[0]?.url || 'https://via.placeholder.com/150',
    });
    
    addToast(`Added ${product.name} - ${selectedSize} to cart`, 'success');
  };

  return (
    <main className="pt-24 min-h-screen bg-background">
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <span>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span>{product.category?.name || 'Shop'}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20 py-8 relative">
        
        {/* LEFT: Product Gallery / 3D */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <ProductGallery 
            product={product} 
            selectedVariantId={selectedVariantId} 
          />
        </div>

        {/* RIGHT: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-10 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase mb-4">
              <SplitText text={product.name} />
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-5 h-5", i < Math.floor(product.rating || 5) ? "fill-current" : "opacity-30")} />
                ))}
                <span className="text-foreground font-bold ml-2">{product.rating}</span>
                <span className="text-muted-foreground text-sm font-medium">({product.review_count} Reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-black">{formatPrice(product.discount_price || product.price)}</span>
              {product.discount_price && (
                <span className="text-xl text-muted-foreground line-through font-bold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-10">
              <h3 className="font-bold uppercase tracking-widest mb-4 flex justify-between text-sm">
                <span>Color</span>
                <span className="text-muted-foreground">{selectedVariant.color_name}</span>
              </h3>
              <div className="flex gap-4">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariantId(v.id);
                      setSelectedSize(''); // reset size on color change
                    }}
                    className={cn(
                      "w-12 h-12 rounded-full border-2 transition-all",
                      selectedVariantId === v.id ? "border-primary scale-110 p-1" : "border-transparent"
                    )}
                  >
                    <div 
                      className="w-full h-full rounded-full border border-border" 
                      style={{ backgroundColor: v.color_hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <h3 className="font-bold uppercase tracking-widest mb-4 flex justify-between text-sm">
                <span>Select Size</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Size Guide
                </button>
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {standardSizes.map((size) => {
                  const isAvailable = availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "py-3 rounded-lg border font-bold uppercase transition-all",
                        selectedSize === size 
                          ? "border-primary bg-primary text-primary-foreground" 
                          : "border-border hover:border-primary/50",
                        !isAvailable && "opacity-30 cursor-not-allowed bg-secondary/50 line-through"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-4 mb-8">
              <MagneticButton 
                className="flex-1 bg-primary text-primary-foreground py-5 rounded-full font-bold uppercase tracking-widest text-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </MagneticButton>
              
              {isMounted && (
                <button
                  onClick={() => {
                    if (isInWishlist(product.id)) {
                      removeWishlist(product.id);
                      addToast(`Removed ${product.name} from wishlist`);
                    } else {
                      addWishlist({
                        productId: product.id,
                        name: product.name,
                        price: product.discount_price || product.price,
                        image: product.media?.find(m => m.type === 'hero')?.url || product.media?.[0]?.url || 'https://via.placeholder.com/150',
                        slug: product.slug || ''
                      });
                      addToast(`Added ${product.name} to wishlist`, 'success');
                    }
                  }}
                  className="w-[68px] h-[68px] shrink-0 border border-border rounded-full flex items-center justify-center text-foreground hover:bg-secondary/50 transition-colors"
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={cn("w-6 h-6 transition-colors", isInWishlist(product.id) ? "fill-primary text-primary" : "")} />
                </button>
              )}
            </div>

            {/* Features Accordion (Simplified) */}
            <div className="border-t border-border pt-8 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold">Free Premium Delivery</h4>
                  <p className="text-sm text-muted-foreground mt-1">Based on {randomReviewCount} reviews</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Undo2 className="w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold">Free Returns</h4>
                  <p className="text-sm text-muted-foreground mt-1">30 days free return policy. No questions asked.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold">2 Year Warranty</h4>
                  <p className="text-sm text-muted-foreground mt-1">Quality guaranteed for all manufacturing defects.</p>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>

        {/* Reviews Section */}
        {product.id && (
          <ReviewSection 
            productId={product.id} 
            initialReviews={reviews} 
            isAuthenticated={isAuthenticated} 
          />
        )}

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-border pt-16">
            <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-widest text-center mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <div key={related.id} className="group cursor-pointer">
                  <div className="aspect-square bg-secondary/30 rounded-3xl overflow-hidden mb-4 relative flex items-center justify-center p-6">
                    {related.variants?.[0]?.images?.[0]?.url && (
                      <img 
                        src={related.variants[0].images[0].url} 
                        alt={related.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h3 className="font-bold">{related.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">₹{related.discount_price || related.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </main>
  );
}
