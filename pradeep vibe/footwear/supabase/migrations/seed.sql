-- SOLEVA 2.0 Database Schema & Seed Data

-- Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    features TEXT[], -- Array of strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Product Variants Table (Colors)
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    color_name TEXT NOT NULL,
    color_hex TEXT NOT NULL,
    model_url TEXT, -- 3D model URL
    images JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of image objects {url, alt}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Inventory Table (Sizes)
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    size TEXT NOT NULL,
    stock_quantity INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(variant_id, size)
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id), -- Connects to Supabase Auth
    status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
    total_amount DECIMAL(10,2) NOT NULL,
    stripe_session_id TEXT,
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id),
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- Public read access for catalog
CREATE POLICY "Public profiles are viewable by everyone." ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone." ON public.products FOR SELECT USING (true);
CREATE POLICY "Public variants are viewable by everyone." ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Public inventory is viewable by everyone." ON public.inventory FOR SELECT USING (true);

-- Authenticated users can view their own orders
CREATE POLICY "Users can view their own orders." ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders." ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own order items." ON public.order_items FOR SELECT USING (
    order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert their own order items." ON public.order_items FOR INSERT WITH CHECK (
    order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);


-- SEED DATA (MOCK DATA)
-- Categories
INSERT INTO public.categories (id, name, slug) VALUES 
('c0000000-0000-0000-0000-000000000001', 'Performance Sneakers', 'sneakers'),
('c0000000-0000-0000-0000-000000000002', 'Running Shoes', 'running')
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO public.products (id, category_id, name, slug, description, price, is_featured, is_new, features) VALUES 
('p0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'SOLEVA Alpha', 'soleva-alpha', 'Next generation adaptive performance sneaker featuring kinetic energy return systems and 3D woven upper.', 299.99, true, true, ARRAY['Kinetic energy return foam', 'Adaptive 3D woven upper', 'Carbon fiber propulsion plate']),
('p0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'SOLEVA Core', 'soleva-core', 'Everyday performance reimagined. The Core provides all-day comfort with a sleek, minimalist silhouette.', 199.99, true, false, ARRAY['Cloud comfort midsole', 'Breathable mesh upper', 'Durable rubber outsole'])
ON CONFLICT (id) DO NOTHING;

-- Variants
INSERT INTO public.product_variants (id, product_id, color_name, color_hex, model_url, images) VALUES 
('v0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'Crimson Red', '#DC143C', 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb', '[{"url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=3840&q=100", "alt": "Crimson Red Alpha"}]'),
('v0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000001', 'Midnight Black', '#1A1A1A', 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb', '[{"url": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=3840&q=100", "alt": "Midnight Black Alpha"}]'),
('v0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000002', 'Arctic White', '#F8F9FA', 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb', '[{"url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=3840&q=100", "alt": "Arctic White Core"}]')
ON CONFLICT (id) DO NOTHING;

-- Inventory
INSERT INTO public.inventory (variant_id, size, stock_quantity) VALUES 
('v0000000-0000-0000-0000-000000000001', 'UK 7', 15),
('v0000000-0000-0000-0000-000000000001', 'UK 8', 22),
('v0000000-0000-0000-0000-000000000001', 'UK 9', 10),
('v0000000-0000-0000-0000-000000000001', 'UK 10', 5),

('v0000000-0000-0000-0000-000000000002', 'UK 7', 20),
('v0000000-0000-0000-0000-000000000002', 'UK 8', 30),
('v0000000-0000-0000-0000-000000000002', 'UK 9', 25),

('v0000000-0000-0000-0000-000000000003', 'UK 8', 12),
('v0000000-0000-0000-0000-000000000003', 'UK 9', 18)
ON CONFLICT (variant_id, size) DO NOTHING;
