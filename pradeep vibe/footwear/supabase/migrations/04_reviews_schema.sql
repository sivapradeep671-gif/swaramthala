-- 04_reviews_schema.sql
-- Create reviews table for products

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(product_id, user_id) -- Prevent multiple reviews per product per user
);

-- Set up Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public reviews are viewable by everyone." ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews." ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews." ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews." ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Optional: Create an index to speed up querying reviews by product
CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON public.reviews(product_id);
