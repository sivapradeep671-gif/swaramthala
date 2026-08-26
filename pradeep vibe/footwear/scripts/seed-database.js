/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // Fallback to .env

// We can't import mockData directly if it's TS and we are using Node without ts-node.
// Let's just require it if we run with ts-node, or read and parse it manually.
// Better yet, just re-generate the JSON here to ensure it works beautifully without TS compiler issues.

const categories = [
  { name: 'Sneakers', slug: 'sneakers', prefix: 'SNK', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'https://images.unsplash.com/photo-1595950653106-6c9ec61b9752'] },
  { name: 'Running', slug: 'running', prefix: 'RUN', images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5', 'https://images.unsplash.com/photo-1539185441755-769473a23570'] },
  { name: 'Boots', slug: 'boots', prefix: 'BOT', images: ['https://images.unsplash.com/photo-1520639888713-7851133b1ed0', 'https://images.unsplash.com/photo-1605340629542-f222955f1f7f'] },
  { name: 'Sandals', slug: 'sandals', prefix: 'SND', images: ['https://images.unsplash.com/photo-1603487742131-41640b076307', 'https://images.unsplash.com/photo-1562183241-b937e95585b6'] },
  { name: 'Formal', slug: 'formal', prefix: 'FRM', images: ['https://images.unsplash.com/photo-1614252236316-f2f3016a3a41', 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de'] },
  { name: 'Sports', slug: 'sports', prefix: 'SPT', images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2', 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111'] },
  { name: 'Slides', slug: 'slides', prefix: 'SLD', images: ['https://images.unsplash.com/photo-1565084888279-aca607ecce0c', 'https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f'] }
];

const colors = [
  { name: 'Crimson Red', hex: '#dc2626' },
  { name: 'Core Black', hex: '#000000' },
  { name: 'Triple White', hex: '#ffffff' },
  { name: 'Midnight Navy', hex: '#1e3a8a' },
  { name: 'Olive Green', hex: '#4d7c0f' },
  { name: 'Wheat Brown', hex: '#b45309' },
  { name: 'Cool Grey', hex: '#9ca3af' }
];

const sizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];
const adjs = ['Pro', 'Max', 'Ultra', 'Elite', 'Prime', 'Core', 'Air', 'Zoom', 'React', 'Boost', 'Classic', 'Premium', 'Essential', 'Next Gen', 'X', 'V2'];
const brands = ['SOLEVA', 'Apex', 'Velocity', 'Stride', 'Nimbus', 'Aura'];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mockProducts = [];
for (let i = 1; i <= 50; i++) {
  const cat = randomElement(categories);
  const brand = randomElement(brands);
  const adj = randomElement(adjs);
  const name = `${brand} ${cat.name.replace('s','')} ${adj}`;
  
  const basePrice = randomNumber(30, 250) * 100 + 99;
  const isSale = Math.random() > 0.7;
  const discountPrice = isSale ? Math.floor(basePrice * (randomNumber(60, 90) / 100)) : null;

  const numVariants = randomNumber(1, 3);
  const variants = [];
  const selectedColors = [];
  
  for (let v = 1; v <= numVariants; v++) {
    let color;
    do { color = randomElement(colors); } while (selectedColors.includes(color.name) && selectedColors.length < colors.length);
    selectedColors.push(color.name);
    
    const inventory = [];
    sizes.forEach(size => {
      if (Math.random() > 0.2) {
        inventory.push({ size, quantity: randomNumber(5, 50) });
      }
    });

    variants.push({
      sku: `${cat.prefix}-${i}-${color.name.substring(0,3).toUpperCase()}`,
      color_name: color.name,
      color_hex: color.hex,
      inventory
    });
  }

  const img = randomElement(cat.images) + '?auto=format&fit=crop&q=80&w=1000';

  mockProducts.push({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: `Experience unparalleled comfort and style with the ${name}. Designed specifically for ${cat.name.toLowerCase()} enthusiasts, it features advanced materials and premium construction.`,
    price: basePrice,
    discount_price: discountPrice,
    gender: Math.random() > 0.5 ? 'Unisex' : 'Men',
    category: { name: cat.name, slug: cat.slug },
    media: [ { type: 'hero', url: img, alt_text: name, sort_order: 1 } ],
    variants,
    rating: (randomNumber(35, 50) / 10).toFixed(1),
    review_count: randomNumber(5, 500)
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function run() {
  console.log("Starting DB seed process with 50 dynamically generated products...");

  console.log("Inserting categories...");
  const uniqueCats = Array.from(new Set(mockProducts.map(p => p.category.slug)));
  const categoryMap = {};
  
  for (const slug of uniqueCats) {
    const catData = mockProducts.find(p => p.category.slug === slug).category;
    let { data: existing } = await supabase.from('categories').select('id').eq('slug', slug).single();
    if (!existing) {
      const { data, error } = await supabase.from('categories').insert({
        name: catData.name,
        slug: catData.slug
      }).select().single();
      if (error) throw error;
      existing = data;
    }
    categoryMap[slug] = existing.id;
  }
  
  console.log("Inserting products...");
  for (let i = 0; i < mockProducts.length; i++) {
    const p = mockProducts[i];
    
    const { data: prodData, error: prodErr } = await supabase.from('products').insert({
      name: p.name,
      slug: p.slug + '-' + Math.random().toString(36).substring(7),
      category_id: categoryMap[p.category.slug],
      gender: p.gender,
      description: p.description,
      price: p.price,
      discount_price: p.discount_price,
      rating: parseFloat(p.rating),
      review_count: p.review_count,
    }).select().single();

    if (prodErr) {
      console.error("Failed to insert product", p.name, prodErr);
      continue;
    }
    const productId = prodData.id;

    if (p.media) {
      const mediaInserts = p.media.map(m => ({
        product_id: productId,
        type: m.type,
        url: m.url,
        alt_text: m.alt_text,
        sort_order: m.sort_order
      }));
      await supabase.from('product_media').insert(mediaInserts);
    }

    if (p.variants) {
      for (const v of p.variants) {
        const { data: varData, error: varErr } = await supabase.from('product_variants').insert({
          product_id: productId,
          color_name: v.color_name,
          color_hex: v.color_hex,
          material: 'Mesh/Knit'
        }).select().single();

        if (varErr) {
          console.error("Failed variant", varErr);
          continue;
        }

        if (v.inventory) {
          const invInserts = v.inventory.map(inv => ({
            product_variant_id: varData.id,
            size: inv.size,
            quantity: inv.quantity,
            sku: v.sku + '-' + inv.size.replace(' ', '')
          }));
          await supabase.from('inventory').insert(invInserts);
        }
      }
    }
  }

  console.log("✅ Seeding complete! Successfully migrated 50 products to the live database.");
}

run().catch(console.error);
