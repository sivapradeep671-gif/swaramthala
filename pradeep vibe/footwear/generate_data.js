/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

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

const products = [];

for (let i = 1; i <= 50; i++) {
  const cat = randomElement(categories);
  const brand = randomElement(brands);
  const adj = randomElement(adjs);
  const name = `${brand} ${cat.name.replace('s','')} ${adj}`;
  
  const basePrice = randomNumber(30, 250) * 100 + 99; // 3099 to 25099
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
      if (Math.random() > 0.2) { // 80% chance to have size in stock
        inventory.push({
          id: `inv-${i}-${v}-${size.replace(' ', '')}`,
          variant_id: `var-${i}-${v}`,
          size: size,
          quantity: randomNumber(5, 50)
        });
      }
    });

    variants.push({
      id: `var-${i}-${v}`,
      product_id: `prod-${i}`,
      sku: `${cat.prefix}-${i}-${color.name.substring(0,3).toUpperCase()}`,
      color_name: color.name,
      color_hex: color.hex,
      price_adjustment: 0,
      images: [],
      inventory: inventory
    });
  }

  const img = randomElement(cat.images) + '?auto=format&fit=crop&q=80&w=1000';

  products.push({
    id: `prod-${i}`,
    name: name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    sku: `${cat.prefix}-${i}-BASE`,
    brand_id: 'b1111111-1111-1111-1111-111111111111',
    collection_id: 'c1111111-1111-1111-1111-111111111111',
    short_description: `Premium ${cat.name.toLowerCase()} footwear by ${brand}.`,
    description: `Experience unparalleled comfort and style with the ${name}. Designed specifically for ${cat.name.toLowerCase()} enthusiasts, it features advanced materials and premium construction.`,
    price: basePrice,
    compare_at_price: Math.floor(basePrice * 1.2),
    discount_price: discountPrice,
    currency: 'INR',
    category_id: `cat-${cat.slug}`,
    tags: [cat.name, brand, adj],
    badges: ['Premium'],
    is_featured: Math.random() > 0.8,
    is_new_arrival: Math.random() > 0.7,
    is_best_seller: Math.random() > 0.8,
    is_trending: Math.random() > 0.8,
    is_limited_edition: Math.random() > 0.9,
    is_sustainable: Math.random() > 0.7,
    launch_date: new Date().toISOString(),
    specifications: { weight: '300g', material: 'premium' },
    care_instructions: 'Wipe clean with a damp cloth.',
    shipping_info: 'Free shipping on orders over ₹1,999.',
    return_info: '30-day easy returns.',
    status: 'published',
    created_at: new Date(Date.now() - randomNumber(0, 90) * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    gender: Math.random() > 0.5 ? 'Unisex' : 'Men',
    brand: { name: brand, slug: brand.toLowerCase() },
    collection: { name: 'Summer 24', slug: 'summer-24' },
    category: { name: cat.name, slug: cat.slug },
    media: [
      { id: `m-${i}-1`, type: 'hero', url: img, alt_text: name, sort_order: 1 }
    ],
    variants: variants,
    model3d: i === 1 ? {
      id: '3d-1', product_id: 'prod-1', model_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb', environment_map: null, camera_settings: null
    } : null,
    rating: (randomNumber(35, 50) / 10).toFixed(1),
    review_count: randomNumber(5, 500)
  });
}

const fileContent = `/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductWithDetails } from './services';

export const mockProducts: ProductWithDetails[] = ${JSON.stringify(products, null, 2)} as unknown as ProductWithDetails[];
`;

fs.writeFileSync('src/lib/mockData.ts', fileContent);
console.log('Successfully generated 50 products in src/lib/mockData.ts');
