import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { ProductWithDetails } from '@/lib/services';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: ProductWithDetails;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useToast((state) => state.addToast);
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const primaryImage = product.media?.find((m) => m.type === 'hero')?.url || product.media?.[0]?.url;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();

    // Use first variant and size for quick add
    const defaultVariant = product.variants?.[0];
    const defaultInventory = defaultVariant?.inventory?.[0];
    const defaultImage = primaryImage || 'https://via.placeholder.com/150';

    if (defaultVariant && defaultInventory) {
      addItem({
        productId: product.id,
        variantId: defaultVariant.id,
        name: product.name,
        color: defaultVariant.color_name,
        size: defaultInventory.size,
        price: product.discount_price || product.price,
        quantity: 1,
        image: defaultImage,
      });
      addToast(`Added ${product.name} to cart`, 'success');
    } else {
      addToast('This product is currently out of stock.', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        {/* Image Container */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/20 mb-4 flex items-center justify-center p-8">
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.discount_price && (
              <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Sale
              </div>
            )}
            {product.is_new_arrival && (
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                New
              </div>
            )}
            {product.is_best_seller && (
              <div className="bg-foreground text-background px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Best Seller
              </div>
            )}
          </div>
          
          {/* Wishlist Button */}
          {isMounted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isInWishlist(product.id)) {
                  removeWishlist(product.id);
                  addToast(`Removed ${product.name} from wishlist`);
                } else {
                  addWishlist({
                    productId: product.id,
                    name: product.name,
                    price: product.discount_price || product.price,
                    image: primaryImage || 'https://via.placeholder.com/150',
                    slug: product.slug || ''
                  });
                  addToast(`Added ${product.name} to wishlist`, 'success');
                }
              }}
              className="absolute top-4 right-4 z-20 p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground hover:bg-background transition-colors"
              aria-label="Toggle Wishlist"
            >
              <Heart className={cn("w-5 h-5 transition-colors", isInWishlist(product.id) ? "fill-primary text-primary" : "")} />
            </button>
          )}

          {/* Quick Add overlay */}
          <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-primary/90 backdrop-blur-md text-primary-foreground py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary transition-colors text-sm"
            >
              Quick Add
            </button>
          </div>

          {primaryImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal"
              loading={index < 4 ? 'eager' : 'lazy'}
              fetchPriority={index < 4 ? 'high' : 'auto'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary/70 transition-colors line-clamp-1">
              {product.name}
            </h3>
            {product.rating && (
              <div className="flex items-center gap-1 text-sm font-bold shrink-0 text-muted-foreground">
                <Star className="w-3 h-3 fill-current text-yellow-500" />
                {product.rating}
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground truncate">
            {product.category?.name || 'Footwear'}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <span className="font-black text-xl">
              {formatPrice(product.discount_price || product.price)}
            </span>
            {product.discount_price && (
              <span className="text-muted-foreground line-through font-medium text-sm">
                {formatPrice(product.compare_at_price || product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
