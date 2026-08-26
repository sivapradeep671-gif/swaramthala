-- SOLEVA Seed Data

-- 1. Create Categories
INSERT INTO categories (id, name, slug, description) VALUES 
('11111111-1111-1111-1111-111111111111', 'Sneakers', 'sneakers', 'Premium lifestyle and performance sneakers.'),
('22222222-2222-2222-2222-222222222222', 'Running', 'running', 'High-performance running shoes built for speed and endurance.'),
('33333333-3333-3333-3333-333333333333', 'Sports', 'sports', 'Specialized footwear for basketball, tennis, and more.'),
('44444444-4444-4444-4444-444444444444', 'Formal', 'formal', 'Elegant oxfords, brogues, and loafers for formal occasions.'),
('55555555-5555-5555-5555-555555555555', 'Casual', 'casual', 'Everyday casual shoes for ultimate comfort.'),
('66666666-6666-6666-6666-666666666666', 'Sandals', 'sandals', 'Breathable slides, flip-flops, and sports sandals.'),
('77777777-7777-7777-7777-777777777777', 'Boots', 'boots', 'Durable chelsea, chukka, and hiking boots.'),
('88888888-8888-8888-8888-888888888888', 'Traditional', 'traditional', 'Ethnic Indian footwear including Jutti and Kolhapuri.');

-- 1.5 Create Brands
INSERT INTO brands (id, name, slug, description) VALUES
('b1111111-1111-1111-1111-111111111111', 'SOLEVA', 'soleva', 'The original SOLEVA brand.');

-- 1.6 Create Collections
INSERT INTO collections (id, name, slug, description) VALUES
('c1111111-1111-1111-1111-111111111111', 'New Arrivals', 'new-arrivals', 'Latest drops this season.');

-- 2. Create Products
INSERT INTO products (id, name, slug, sku, brand_id, category_id, collection_id, gender, description, price, compare_at_price, discount_price, features, rating, review_count) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'SOLEVA AeroGlide 1', 'soleva-aeroglide-1', 'SOL-AG1', 'b1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 'Men', 'Engineered for speed. The AeroGlide 1 features our ultra-lightweight foam and a carbon fiber plate for maximum energy return.', 10999.00, 12999.00, 10999.00, '["Carbon Fiber Plate", "Ultra-lightweight Foam", "Breathable Mesh Upper", "High Traction Outsole"]', 4.8, 124),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'SOLEVA Core Element', 'soleva-core-element', 'SOL-CE1', 'b1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'Unisex', 'A minimal, futuristic lifestyle sneaker. Crafted with premium vegan leather and a transparent shock-absorbing heel.', 9500.00, NULL, NULL, '["Vegan Leather", "Shock-Absorbing Heel", "Minimalist Design", "All-day Comfort"]', 4.9, 312),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'SOLEVA Executive Oxford', 'soleva-executive-oxford', 'SOL-EO1', 'b1111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', NULL, 'Men', 'Handcrafted from full-grain Italian leather, featuring a timeless silhouette and unexpected comfort engineering hidden within the sole.', 15000.00, NULL, NULL, '["Full-grain Leather", "Memory Foam Insole", "Hand-stitched Details", "Leather Sole with Rubber Inserts"]', 4.7, 56),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'SOLEVA Terra Trekker', 'soleva-terra-trekker', 'SOL-TT1', 'b1111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', NULL, 'Women', 'Built for the elements. Waterproof, rugged, and remarkably light. The Terra Trekker takes you from city streets to mountain peaks.', 12500.00, 14500.00, 12500.00, '["GORE-TEX Waterproofing", "Vibram Outsole", "Ankle Support", "Lightweight Construction"]', 4.6, 89),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'SOLEVA Horizon Slide', 'soleva-horizon-slide', 'SOL-HS1', 'b1111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', 'c1111111-1111-1111-1111-111111111111', 'Unisex', 'The ultimate recovery slide. Featuring deep contouring and dual-density EVA foam to relieve foot fatigue instantly.', 2999.00, 3500.00, 2999.00, '["Dual-density EVA", "Deep Footbed", "Arch Support", "Slip-resistant"]', 4.9, 542),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'SOLEVA Court Pro', 'soleva-court-pro', 'SOL-CP1', 'b1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', NULL, 'Men', 'Dominate the court. Designed for explosive multi-directional movement with a lockdown fit and responsive cushioning.', 11000.00, NULL, NULL, '["Lateral Support", "Zoom Cushioning", "Herringbone Traction", "Ankle Lockdown"]', 4.5, 78);

-- 3. Create Product Variants
INSERT INTO product_variants (id, product_id, color_name, color_hex, material) VALUES
('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Crimson Speed', '#DC143C', 'Engineered Mesh'),
('a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Stealth Black', '#1A1A1A', 'Engineered Mesh'),
('b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Cloud White', '#F5F5F5', 'Vegan Leather'),
('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Midnight Black', '#000000', 'Full-grain Leather'),
('d1d1d1d1-d1d1-d1d1-d1d1-d1d1d1d1d1d1', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Olive Drab', '#556B2F', 'Nylon / Leather'),
('e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Electric Blue', '#0000FF', 'EVA Foam'),
('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Optic White', '#FFFFFF', 'Synthetic Leather');

-- 4. Create Product Media (Using 8K Unsplash realistic images)
INSERT INTO product_media (product_id, product_variant_id, type, url, alt_text, sort_order, width, height) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'hero', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=100&w=2000&auto=format&fit=crop', 'AeroGlide 1 Crimson Speed Hero', 1, 2000, 1333),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2', 'hero', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=100&w=2000&auto=format&fit=crop', 'AeroGlide 1 Stealth Black Hero', 1, 2000, 1333),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'hero', 'https://images.unsplash.com/photo-1595950653106-6c9ec61b9752?q=100&w=2000&auto=format&fit=crop', 'Core Element Cloud White Hero', 1, 2000, 1333),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', 'hero', 'https://images.unsplash.com/photo-1614252236316-f2f3016a3a41?q=100&w=2000&auto=format&fit=crop', 'Executive Oxford Midnight Black Hero', 1, 2000, 1333),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'd1d1d1d1-d1d1-d1d1-d1d1-d1d1d1d1d1d1', 'hero', 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=100&w=2000&auto=format&fit=crop', 'Terra Trekker Olive Hero', 1, 2000, 1333),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1', 'hero', 'https://images.unsplash.com/photo-1603487742131-41640b076307?q=100&w=2000&auto=format&fit=crop', 'Horizon Slide Blue Hero', 1, 2000, 1333),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'hero', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=100&w=2000&auto=format&fit=crop', 'Court Pro White Hero', 1, 2000, 1333);

-- 5. Create Inventory
INSERT INTO inventory (product_variant_id, size, quantity, sku) VALUES
('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'UK 7', 10, 'AG1-CR-UK7'),
('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'UK 8', 15, 'AG1-CR-UK8'),
('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'UK 9', 20, 'AG1-CR-UK9'),
('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'UK 10', 5, 'AG1-CR-UK10'),
('a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2', 'UK 8', 12, 'AG1-BK-UK8'),
('a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2', 'UK 9', 18, 'AG1-BK-UK9'),
('b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'UK 7', 8, 'CE-WH-UK7'),
('b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'UK 8', 25, 'CE-WH-UK8'),
('b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'UK 9', 22, 'CE-WH-UK9'),
('b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'UK 10', 14, 'CE-WH-UK10'),
('b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', 'UK 11', 4, 'CE-WH-UK11');

-- 6. Add a placeholder 3D model for the AeroGlide 1 (Crimson Speed)
-- Note: Replace with actual hosted GLB URL later
INSERT INTO product_3d_models (product_id, model_url, material_config, camera_target) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb', '{"primary": "laces", "secondary": "sole"}', '[0, 0, 0]');
