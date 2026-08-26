-- 06_search_optimizations.sql
-- Adds fuzzy search and recommendation RPCs

-- 1. Search Function (combining name, description, and category)
CREATE OR REPLACE FUNCTION search_products(search_term TEXT)
RETURNS SETOF products AS $$
BEGIN
  RETURN QUERY
  SELECT p.*
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  WHERE 
    p.name ILIKE '%' || search_term || '%'
    OR p.description ILIKE '%' || search_term || '%'
    OR c.name ILIKE '%' || search_term || '%'
  ORDER BY 
    -- Exact match on name gets highest priority
    (p.name ILIKE search_term) DESC,
    -- Starts with match gets second priority
    (p.name ILIKE search_term || '%') DESC,
    -- Otherwise normal sort
    p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Related Products Function (same category, excluding current)
CREATE OR REPLACE FUNCTION get_related_products(current_product_id UUID, limit_count INT DEFAULT 4)
RETURNS SETOF products AS $$
DECLARE
  target_category_id UUID;
BEGIN
  -- Find the category of the current product
  SELECT category_id INTO target_category_id 
  FROM products 
  WHERE id = current_product_id;

  RETURN QUERY
  SELECT p.*
  FROM products p
  WHERE p.category_id = target_category_id
    AND p.id != current_product_id
  ORDER BY RANDOM() -- Randomize to show different recommendations each time
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
