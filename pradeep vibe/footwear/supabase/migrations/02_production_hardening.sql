-- 02_production_hardening.sql
-- Implements idempotency for webhooks and concurrency-safe inventory allocation

-- 1. Create Webhook Events Table for Idempotency
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id TEXT PRIMARY KEY, -- Stripe Event ID
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
-- No public policies needed; only the service_role key backend will read/write to this table.

-- 2. Concurrency-Safe Inventory Decrement Procedure
-- This function atomically decreases the stock of a variant/size combination.
-- Returns TRUE if successful, FALSE if there was not enough stock.
CREATE OR REPLACE FUNCTION public.decrement_inventory(p_variant_id UUID, p_size TEXT, p_quantity INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with elevated privileges
AS $$
DECLARE
    v_current_stock INTEGER;
BEGIN
    -- Use SELECT ... FOR UPDATE to lock the row and prevent race conditions
    SELECT stock_quantity INTO v_current_stock
    FROM public.inventory
    WHERE variant_id = p_variant_id AND size = p_size
    FOR UPDATE;

    -- Check if the row exists and has enough stock
    IF v_current_stock IS NULL OR v_current_stock < p_quantity THEN
        RETURN FALSE;
    END IF;

    -- Perform the decrement
    UPDATE public.inventory
    SET stock_quantity = stock_quantity - p_quantity
    WHERE variant_id = p_variant_id AND size = p_size;

    RETURN TRUE;
END;
$$;
