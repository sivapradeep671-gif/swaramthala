import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // unique ID for cart item
  productId: string;
  variantId: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string | null;
  discountAmount: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  shippingCost: () => number;
  finalTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promoCode: null,
      discountAmount: 0,
      applyPromoCode: (code) => {
        // Mock promo code validation
        if (code.toUpperCase() === 'SOLEVA10') {
          const currentSubtotal = get().items.reduce((total, item) => total + item.price * item.quantity, 0);
          const discount = currentSubtotal * 0.10; // 10% off
          set({ promoCode: 'SOLEVA10', discountAmount: discount });
          return true;
        }
        return false;
      },
      removePromoCode: () => set({ promoCode: null, discountAmount: 0 }),
      addItem: (item) => {
        set((state) => {
          // Check if same variant & size exists
          const existingItemIndex = state.items.findIndex(
            (i) => i.variantId === item.variantId && i.size === item.size
          );
          
          let newItems = [...state.items];
          if (existingItemIndex >= 0) {
            newItems[existingItemIndex].quantity += item.quantity;
          } else {
            newItems = [...state.items, { ...item, id: crypto.randomUUID() }];
          }

          // Recalculate discount if promo is applied
          let newDiscount = state.discountAmount;
          if (state.promoCode === 'SOLEVA10') {
            const currentSubtotal = newItems.reduce((total, i) => total + i.price * i.quantity, 0);
            newDiscount = currentSubtotal * 0.10;
          }
          
          return { items: newItems, isOpen: true, discountAmount: newDiscount };
        });
      },
      removeItem: (id) => set((state) => {
        const newItems = state.items.filter((i) => i.id !== id);
        // Recalculate discount
        let newDiscount = state.discountAmount;
        if (state.promoCode === 'SOLEVA10') {
          const currentSubtotal = newItems.reduce((total, i) => total + i.price * i.quantity, 0);
          newDiscount = currentSubtotal * 0.10;
        }
        return { items: newItems, discountAmount: newDiscount };
      }),
      updateQuantity: (id, quantity) => 
        set((state) => {
          const newItems = state.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
          // Recalculate discount
          let newDiscount = state.discountAmount;
          if (state.promoCode === 'SOLEVA10') {
            const currentSubtotal = newItems.reduce((total, i) => total + i.price * i.quantity, 0);
            newDiscount = currentSubtotal * 0.10;
          }
          return { items: newItems, discountAmount: newDiscount };
        }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set({ items: [], promoCode: null, discountAmount: 0 }),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      subtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      shippingCost: () => {
        const currentSubtotal = get().items.reduce((total, item) => total + item.price * item.quantity, 0);
        if (currentSubtotal === 0) return 0;
        return currentSubtotal >= 2000 ? 0 : 150;
      },
      finalTotal: () => {
        const currentSubtotal = get().subtotal();
        const discount = get().discountAmount;
        const shipping = get().shippingCost();
        return currentSubtotal - discount + shipping;
      },
    }),
    {
      name: 'soleva-cart',
    }
  )
);

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface WishlistStore {
  items: WishlistItem[];
  isOpen: boolean;
  toggleWishlist: () => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (item) => {
        if (!get().isInWishlist(item.productId)) {
          set((state) => ({ items: [...state.items, item], isOpen: true }));
        }
      },
      removeItem: (productId) => 
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      isInWishlist: (productId) => get().items.some((i) => i.productId === productId),
    }),
    {
      name: 'soleva-wishlist',
    }
  )
);
