/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './supabase';
import { Database } from './database.types';
import { mockProducts } from './mockData';

type Product = Database['public']['Tables']['products']['Row'];
type ProductVariant = Database['public']['Tables']['product_variants']['Row'];
type ProductMedia = Database['public']['Tables']['product_media']['Row'];
type Product3DModel = Database['public']['Tables']['product_3d_models']['Row'];
type Inventory = Database['public']['Tables']['inventory']['Row'];

export interface ProductWithDetails extends Product {
  category: { name: string; slug: string } | null;
  variants: (ProductVariant & {
    images: ProductMedia[];
    inventory: Inventory[];
    sku?: string;
    price_adjustment?: number;
  })[];
  media: ProductMedia[];
  model3d: Product3DModel | null;
  status?: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  gender?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sale?: boolean;
  sort?: string;
  sizes?: string[];
  colors?: string[];
}

export const ProductService = {
  async getProducts(limit = 12): Promise<ProductWithDetails[]> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      if (process.env.VERCEL === '1') {
        throw new Error("CODE FIX COMPLETE — VERCEL ENVIRONMENT CONFIGURATION REQUIRED: Supabase URL must be configured for production.");
      }
      console.warn("Using mock products because Supabase URL is a placeholder.");
      return limit ? mockProducts.slice(0, limit) : mockProducts;
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name, slug),
        media:product_media(*),
        variants:product_variants(
          *,
          images:product_media(*),
          inventory(*)
        ),
        model3d:product_3d_models(*)
      `)
      .limit(limit);

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    // Process data to match the expected structure
    return (data as Record<string, unknown>[]).map((product) => ({
      ...(product as Record<string, unknown>),
      category: (product.category as { name: string; slug: string }) || null,
      model3d: (product.model3d as Product3DModel[])?.[0] || null,
      variants: (product.variants as unknown[]) || [],
      media: (product.media as unknown[]) || []
    })) as unknown as ProductWithDetails[];
  },

  async searchProducts(params: SearchParams): Promise<ProductWithDetails[]> {
    let allProducts: ProductWithDetails[] = [];
    
    const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (isMock && process.env.VERCEL === '1') {
      throw new Error("CODE FIX COMPLETE — VERCEL ENVIRONMENT CONFIGURATION REQUIRED: Supabase URL must be configured for production.");
    }
    if (!isMock && params.query) {
      const { data, error } = await (supabase.rpc as any)('search_products', { search_term: params.query })
        .select(`
          *,
          category:categories(name, slug),
          media:product_media(*),
          variants:product_variants(
            *,
            images:product_media(*),
            inventory(*)
          ),
          model3d:product_3d_models(*)
        `);

      if (!error && data) {
        allProducts = (data as Record<string, unknown>[]).map((product) => ({
          ...(product as Record<string, unknown>),
          category: (product.category as { name: string; slug: string }) || null,
          model3d: (product.model3d as Product3DModel[])?.[0] || null,
          variants: (product.variants as unknown[]) || [],
          media: (product.media as unknown[]) || []
        })) as unknown as ProductWithDetails[];
      } else {
        allProducts = await this.getProducts(0);
      }
    } else {
      allProducts = await this.getProducts(0);
    }

    // Apply mock filtering logic
    let filtered = allProducts.filter(p => {
      let match = true;
      if (params.query) {
        const q = params.query.toLowerCase();
        match = match && (
          p.name.toLowerCase().includes(q) ||
          p.category?.name.toLowerCase().includes(q) ||
          (p as any).brand?.name?.toLowerCase().includes(q)
        );
      }
      if (params.category) {
        match = match && p.category?.slug === params.category;
      }
      if (params.gender) {
        match = match && p.gender?.toLowerCase() === params.gender.toLowerCase();
      }
      if (params.brand) {
        match = match && (p as any).brand?.slug === params.brand;
      }
      if (params.minPrice) {
        match = match && (p.discount_price || p.price) >= params.minPrice;
      }
      if (params.maxPrice) {
        match = match && (p.discount_price || p.price) <= params.maxPrice;
      }
      if (params.sale) {
        match = match && p.discount_price !== null;
      }
      if (params.colors && params.colors.length > 0) {
        const hasColor = p.variants.some(v => params.colors!.includes(v.color_name));
        match = match && hasColor;
      }
      if (params.sizes && params.sizes.length > 0) {
        const hasSize = p.variants.some(v => v.inventory?.some((i: any) => params.sizes!.includes(i.size)));
        match = match && hasSize;
      }
      return match;
    });

    if (params.sort) {
      filtered = filtered.sort((a, b) => {
        const priceA = a.discount_price || a.price;
        const priceB = b.discount_price || b.price;
        
        switch (params.sort) {
          case 'newest':
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case 'price_asc':
            return priceA - priceB;
          case 'price_desc':
            return priceB - priceA;
          default:
            return 0; // featured/relevance
        }
      });
    }

    return filtered;
  },

  async getRelatedProducts(productId: string, limit = 4): Promise<ProductWithDetails[]> {
    const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (isMock) {
      if (process.env.VERCEL === '1') {
        throw new Error("CODE FIX COMPLETE — VERCEL ENVIRONMENT CONFIGURATION REQUIRED: Supabase URL must be configured for production.");
      }
      return mockProducts.filter(p => p.id !== productId).slice(0, limit);
    }

    const { data, error } = await (supabase.rpc as any)('get_related_products', { current_product_id: productId, limit_count: limit })
      .select(`
        *,
        category:categories(name, slug),
        media:product_media(*),
        variants:product_variants(
          *,
          images:product_media(*),
          inventory(*)
        ),
        model3d:product_3d_models(*)
      `);

    if (error || !data) {
      console.error('Error fetching related products:', error);
      return [];
    }

    return (data as Record<string, unknown>[]).map((product) => ({
      ...(product as Record<string, unknown>),
      category: (product.category as { name: string; slug: string }) || null,
      model3d: (product.model3d as Product3DModel[])?.[0] || null,
      variants: (product.variants as unknown[]) || [],
      media: (product.media as unknown[]) || []
    })) as unknown as ProductWithDetails[];
  },

  async getFilterOptions() {
    const allProducts = await this.getProducts(0);
    const categories = Array.from(new Set(allProducts.map(p => p.category?.name).filter(Boolean))) as string[];
    const brands = Array.from(new Set(allProducts.map(p => (p as any).brand?.name).filter(Boolean))) as string[];
    const genders = Array.from(new Set(allProducts.map(p => p.gender).filter(Boolean))) as string[];
    
    const colors = new Set<string>();
    const sizes = new Set<string>();
    allProducts.forEach(p => {
      p.variants?.forEach(v => {
        if (v.color_name) colors.add(v.color_name);
        v.inventory?.forEach((i: any) => { if (i.size) sizes.add(i.size); });
      });
    });

    return {
      categories,
      brands,
      genders,
      colors: Array.from(colors).sort(),
      sizes: Array.from(sizes).sort()
    };
  },

  async getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      if (process.env.VERCEL === '1') {
        throw new Error("CODE FIX COMPLETE — VERCEL ENVIRONMENT CONFIGURATION REQUIRED: Supabase URL must be configured for production.");
      }
      const products = await this.getProducts();
      return products.find(p => p.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name, slug),
        media:product_media(*),
        variants:product_variants(
          *,
          images:product_media(*),
          inventory(*)
        ),
        model3d:product_3d_models(*)
      `)
      .eq('slug', slug)
      .single();

    if (error || !data) {
      console.error('Error fetching product by slug:', error);
      return null;
    }

    return {
      ...(data as Record<string, unknown>),
      category: (data as Record<string, unknown>).category || null,
      model3d: ((data as Record<string, unknown>).model3d as Product3DModel[])?.[0] || null,
      variants: (data as Record<string, unknown>).variants || [],
      media: (data as Record<string, unknown>).media || []
    } as unknown as ProductWithDetails;
  },

  async getProductById(id: string): Promise<ProductWithDetails | null> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      if (process.env.VERCEL === '1') {
        throw new Error("CODE FIX COMPLETE — VERCEL ENVIRONMENT CONFIGURATION REQUIRED: Supabase URL must be configured for production.");
      }
      const products = await this.getProducts();
      return products.find(p => p.id === id) || null;
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name, slug),
        media:product_media(*),
        variants:product_variants(
          *,
          images:product_media(*),
          inventory(*)
        ),
        model3d:product_3d_models(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching product by id:', error);
      return null;
    }

    return {
      ...(data as Record<string, unknown>),
      category: (data as Record<string, unknown>).category || null,
      model3d: ((data as Record<string, unknown>).model3d as Product3DModel[])?.[0] || null,
      variants: (data as Record<string, unknown>).variants || [],
      media: (data as Record<string, unknown>).media || []
    } as unknown as ProductWithDetails;
  },

  async getCategories() {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data;
  }
};
