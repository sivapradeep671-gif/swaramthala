-- 05_admin_roles.sql
-- Add role column to profiles for RBAC (Role-Based Access Control)

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

-- Ensure only accepted roles are used
ALTER TABLE public.profiles ADD CONSTRAINT check_valid_role CHECK (role IN ('user', 'admin'));

-- Update RLS policies to allow admins to read all profiles (optional, for admin dashboard)
CREATE POLICY "Admins can view all profiles." ON public.profiles FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Update orders RLS so admins can view all orders
CREATE POLICY "Admins can view all orders." ON public.orders FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Note: Because Supabase evaluates policies with OR logic, the existing 
-- "Users can view their own orders." policy and this new one will both work.
