/* eslint-disable @typescript-eslint/no-explicit-any */
export type Json =

  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: { id: string; name: string; slug: string; logo_url: string | null; description: string | null; created_at: string }
        Insert: any; Update: any;
      }
      collections: {
        Row: { id: string; name: string; slug: string; description: string | null; image_url: string | null; created_at: string }
        Insert: any; Update: any;
      }
      categories: {
        Row: { id: string; name: string; slug: string; parent_id: string | null; description: string | null; created_at: string }
        Insert: any; Update: any;
      }
      products: {
        Row: { id: string; name: string; slug: string; sku: string | null; brand_id: string | null; category_id: string | null; collection_id: string | null; gender: string | null; short_description: string | null; description: string | null; price: number; compare_at_price: number | null; discount_price: number | null; currency: string | null; tags: string[] | null; badges: string[] | null; is_new_arrival: boolean | null; is_best_seller: boolean | null; is_trending: boolean | null; is_limited_edition: boolean | null; is_sustainable: boolean | null; is_featured: boolean | null; launch_date: string | null; specifications: Json | null; care_instructions: string | null; shipping_info: string | null; return_info: string | null; features: Json | null; rating: number | null; review_count: number | null; created_at: string; updated_at: string; category?: any; variants?: any; model3d?: any; brand?: any; collection?: any }
        Insert: any; Update: any;
      }
      product_360_frames: {
        Row: { id: string; product_id: string | null; frame_urls: string[]; created_at: string }
        Insert: any; Update: any;
      }
      product_3d_models: {
        Row: { id: string; product_id: string | null; model_url: string; material_config: Json | null; camera_target: Json | null; created_at: string; product?: any }
        Insert: any; Update: any;
      }
      product_variants: {
        Row: { id: string; product_id: string | null; color_name: string; color_hex: string; material: string | null; created_at: string; images?: any; inventory?: any }
        Insert: any; Update: any;
      }
      product_media: {
        Row: { id: string; product_id: string | null; product_variant_id: string | null; type: string; url: string; alt_text: string | null; sort_order: number | null; width: number | null; height: number | null; created_at: string }
        Insert: any; Update: any;
      }
      inventory: {
        Row: { id: string; product_variant_id: string | null; size: string; quantity: number; sku: string; created_at: string; product_variant?: any }
        Insert: any; Update: any;
      }
      profiles: {
        Row: { id: string; first_name: string | null; last_name: string | null; phone: string | null; created_at: string; updated_at: string }
        Insert: any; Update: any;
      }
      addresses: {
        Row: { id: string; profile_id: string | null; address_line_1: string; address_line_2: string | null; city: string; state: string; postal_code: string; country: string; is_default: boolean | null; created_at: string }
        Insert: any; Update: any;
      }
      carts: {
        Row: { id: string; profile_id: string | null; session_id: string | null; created_at: string; updated_at: string }
        Insert: any; Update: any;
      }
      cart_items: {
        Row: { id: string; cart_id: string | null; inventory_id: string | null; quantity: number; created_at: string }
        Insert: any; Update: any;
      }
      wishlists: {
        Row: { id: string; profile_id: string | null; created_at: string }
        Insert: any; Update: any;
      }
      wishlist_items: {
        Row: { id: string; wishlist_id: string | null; product_id: string | null; created_at: string }
        Insert: any; Update: any;
      }
      coupons: {
        Row: { id: string; code: string; discount_type: string | null; discount_value: number; min_order_value: number | null; valid_from: string | null; valid_until: string | null; is_active: boolean | null; created_at: string }
        Insert: any; Update: any;
      }
      orders: {
        Row: { id: string; profile_id: string | null; session_id: string | null; status: string; total_amount: number; discount_amount: number | null; shipping_address_id: string | null; billing_address_id: string | null; coupon_id: string | null; payment_method: string | null; payment_status: string | null; tracking_number: string | null; created_at: string; updated_at: string; profile?: any; order_items?: any }
        Insert: any; Update: any;
      }
      order_items: {
        Row: { id: string; order_id: string | null; inventory_id: string | null; product_name: string; color_name: string; size: string; quantity: number; price: number; created_at: string }
        Insert: any; Update: any;
      }
      reviews: {
        Row: { id: string; product_id: string | null; profile_id: string | null; rating: number; title: string | null; content: string | null; is_verified_purchase: boolean | null; created_at: string; product?: any; profile?: any }
        Insert: any; Update: any;
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
