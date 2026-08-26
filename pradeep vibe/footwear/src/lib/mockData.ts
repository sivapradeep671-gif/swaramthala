import { ProductWithDetails } from './services';

export const mockProducts: ProductWithDetails[] = [
  {
    "id": "prod-1",
    "name": "Apex Sneaker Ultra",
    "slug": "apex-sneaker-ultra",
    "sku": "SNK-1-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Apex.",
    "description": "Experience unparalleled comfort and style with the Apex Sneaker Ultra. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 15299,
    "compare_at_price": 18358,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Apex",
      "Ultra"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.409Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-24T18:02:25.427Z",
    "updated_at": "2026-08-23T18:02:25.427Z",
    "gender": "Men",
    "brand": {
      "name": "Apex",
      "slug": "apex"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-1-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ec61b9752?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Apex Sneaker Ultra",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-1-1",
        "product_id": "prod-1",
        "sku": "SNK-1-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-1-1-UK6",
            "variant_id": "var-1-1",
            "size": "UK 6",
            "quantity": 42
          },
          {
            "id": "inv-1-1-UK7",
            "variant_id": "var-1-1",
            "size": "UK 7",
            "quantity": 34
          },
          {
            "id": "inv-1-1-UK8",
            "variant_id": "var-1-1",
            "size": "UK 8",
            "quantity": 22
          },
          {
            "id": "inv-1-1-UK9",
            "variant_id": "var-1-1",
            "size": "UK 9",
            "quantity": 33
          },
          {
            "id": "inv-1-1-UK10",
            "variant_id": "var-1-1",
            "size": "UK 10",
            "quantity": 7
          },
          {
            "id": "inv-1-1-UK11",
            "variant_id": "var-1-1",
            "size": "UK 11",
            "quantity": 33
          }
        ]
      }
    ],
    "model3d": {
      "id": "3d-1",
      "product_id": "prod-1",
      "model_url": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
      "environment_map": null,
      "camera_settings": null
    },
    "rating": "5.0",
    "review_count": 327
  },
  {
    "id": "prod-2",
    "name": "Apex Sneaker Pro",
    "slug": "apex-sneaker-pro",
    "sku": "SNK-2-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Apex.",
    "description": "Experience unparalleled comfort and style with the Apex Sneaker Pro. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 15199,
    "compare_at_price": 18238,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Apex",
      "Pro"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.428Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-16T18:02:25.428Z",
    "updated_at": "2026-08-23T18:02:25.428Z",
    "gender": "Unisex",
    "brand": {
      "name": "Apex",
      "slug": "apex"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-2-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ec61b9752?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Apex Sneaker Pro",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-2-1",
        "product_id": "prod-2",
        "sku": "SNK-2-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-2-1-UK6",
            "variant_id": "var-2-1",
            "size": "UK 6",
            "quantity": 42
          },
          {
            "id": "inv-2-1-UK7",
            "variant_id": "var-2-1",
            "size": "UK 7",
            "quantity": 35
          },
          {
            "id": "inv-2-1-UK8",
            "variant_id": "var-2-1",
            "size": "UK 8",
            "quantity": 46
          },
          {
            "id": "inv-2-1-UK9",
            "variant_id": "var-2-1",
            "size": "UK 9",
            "quantity": 20
          },
          {
            "id": "inv-2-1-UK10",
            "variant_id": "var-2-1",
            "size": "UK 10",
            "quantity": 12
          },
          {
            "id": "inv-2-1-UK11",
            "variant_id": "var-2-1",
            "size": "UK 11",
            "quantity": 6
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.0",
    "review_count": 83
  },
  {
    "id": "prod-3",
    "name": "Apex Sneaker Boost",
    "slug": "apex-sneaker-boost",
    "sku": "SNK-3-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Apex.",
    "description": "Experience unparalleled comfort and style with the Apex Sneaker Boost. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 9999,
    "compare_at_price": 11998,
    "discount_price": 8599,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Apex",
      "Boost"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_trending": true,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.428Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-12T18:02:25.428Z",
    "updated_at": "2026-08-23T18:02:25.428Z",
    "gender": "Unisex",
    "brand": {
      "name": "Apex",
      "slug": "apex"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-3-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Apex Sneaker Boost",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-3-1",
        "product_id": "prod-3",
        "sku": "SNK-3-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-3-1-UK6",
            "variant_id": "var-3-1",
            "size": "UK 6",
            "quantity": 36
          },
          {
            "id": "inv-3-1-UK7",
            "variant_id": "var-3-1",
            "size": "UK 7",
            "quantity": 24
          },
          {
            "id": "inv-3-1-UK9",
            "variant_id": "var-3-1",
            "size": "UK 9",
            "quantity": 8
          },
          {
            "id": "inv-3-1-UK10",
            "variant_id": "var-3-1",
            "size": "UK 10",
            "quantity": 36
          },
          {
            "id": "inv-3-1-UK11",
            "variant_id": "var-3-1",
            "size": "UK 11",
            "quantity": 46
          }
        ]
      },
      {
        "id": "var-3-2",
        "product_id": "prod-3",
        "sku": "SNK-3-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-3-2-UK6",
            "variant_id": "var-3-2",
            "size": "UK 6",
            "quantity": 8
          },
          {
            "id": "inv-3-2-UK7",
            "variant_id": "var-3-2",
            "size": "UK 7",
            "quantity": 22
          },
          {
            "id": "inv-3-2-UK8",
            "variant_id": "var-3-2",
            "size": "UK 8",
            "quantity": 32
          },
          {
            "id": "inv-3-2-UK11",
            "variant_id": "var-3-2",
            "size": "UK 11",
            "quantity": 11
          }
        ]
      },
      {
        "id": "var-3-3",
        "product_id": "prod-3",
        "sku": "SNK-3-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-3-3-UK6",
            "variant_id": "var-3-3",
            "size": "UK 6",
            "quantity": 30
          },
          {
            "id": "inv-3-3-UK7",
            "variant_id": "var-3-3",
            "size": "UK 7",
            "quantity": 42
          },
          {
            "id": "inv-3-3-UK9",
            "variant_id": "var-3-3",
            "size": "UK 9",
            "quantity": 18
          },
          {
            "id": "inv-3-3-UK11",
            "variant_id": "var-3-3",
            "size": "UK 11",
            "quantity": 43
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.6",
    "review_count": 341
  },
  {
    "id": "prod-4",
    "name": "Velocity Formal Ultra",
    "slug": "velocity-formal-ultra",
    "sku": "FRM-4-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Formal Ultra. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 7299,
    "compare_at_price": 8758,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "Velocity",
      "Ultra"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.428Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-03T18:02:25.428Z",
    "updated_at": "2026-08-23T18:02:25.428Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-4-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Formal Ultra",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-4-1",
        "product_id": "prod-4",
        "sku": "FRM-4-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-4-1-UK8",
            "variant_id": "var-4-1",
            "size": "UK 8",
            "quantity": 7
          },
          {
            "id": "inv-4-1-UK9",
            "variant_id": "var-4-1",
            "size": "UK 9",
            "quantity": 43
          }
        ]
      },
      {
        "id": "var-4-2",
        "product_id": "prod-4",
        "sku": "FRM-4-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-4-2-UK6",
            "variant_id": "var-4-2",
            "size": "UK 6",
            "quantity": 47
          },
          {
            "id": "inv-4-2-UK7",
            "variant_id": "var-4-2",
            "size": "UK 7",
            "quantity": 9
          },
          {
            "id": "inv-4-2-UK8",
            "variant_id": "var-4-2",
            "size": "UK 8",
            "quantity": 17
          },
          {
            "id": "inv-4-2-UK9",
            "variant_id": "var-4-2",
            "size": "UK 9",
            "quantity": 37
          },
          {
            "id": "inv-4-2-UK10",
            "variant_id": "var-4-2",
            "size": "UK 10",
            "quantity": 18
          },
          {
            "id": "inv-4-2-UK11",
            "variant_id": "var-4-2",
            "size": "UK 11",
            "quantity": 45
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "5.0",
    "review_count": 176
  },
  {
    "id": "prod-5",
    "name": "Apex Sneaker Ultra",
    "slug": "apex-sneaker-ultra",
    "sku": "SNK-5-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Apex.",
    "description": "Experience unparalleled comfort and style with the Apex Sneaker Ultra. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 24799,
    "compare_at_price": 29758,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Apex",
      "Ultra"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.428Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-05T18:02:25.428Z",
    "updated_at": "2026-08-23T18:02:25.428Z",
    "gender": "Unisex",
    "brand": {
      "name": "Apex",
      "slug": "apex"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-5-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Apex Sneaker Ultra",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-5-1",
        "product_id": "prod-5",
        "sku": "SNK-5-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-5-1-UK7",
            "variant_id": "var-5-1",
            "size": "UK 7",
            "quantity": 36
          },
          {
            "id": "inv-5-1-UK8",
            "variant_id": "var-5-1",
            "size": "UK 8",
            "quantity": 21
          },
          {
            "id": "inv-5-1-UK11",
            "variant_id": "var-5-1",
            "size": "UK 11",
            "quantity": 23
          }
        ]
      },
      {
        "id": "var-5-2",
        "product_id": "prod-5",
        "sku": "SNK-5-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-5-2-UK6",
            "variant_id": "var-5-2",
            "size": "UK 6",
            "quantity": 21
          },
          {
            "id": "inv-5-2-UK7",
            "variant_id": "var-5-2",
            "size": "UK 7",
            "quantity": 49
          },
          {
            "id": "inv-5-2-UK8",
            "variant_id": "var-5-2",
            "size": "UK 8",
            "quantity": 28
          },
          {
            "id": "inv-5-2-UK9",
            "variant_id": "var-5-2",
            "size": "UK 9",
            "quantity": 11
          },
          {
            "id": "inv-5-2-UK10",
            "variant_id": "var-5-2",
            "size": "UK 10",
            "quantity": 20
          }
        ]
      },
      {
        "id": "var-5-3",
        "product_id": "prod-5",
        "sku": "SNK-5-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-5-3-UK6",
            "variant_id": "var-5-3",
            "size": "UK 6",
            "quantity": 35
          },
          {
            "id": "inv-5-3-UK7",
            "variant_id": "var-5-3",
            "size": "UK 7",
            "quantity": 15
          },
          {
            "id": "inv-5-3-UK8",
            "variant_id": "var-5-3",
            "size": "UK 8",
            "quantity": 10
          },
          {
            "id": "inv-5-3-UK11",
            "variant_id": "var-5-3",
            "size": "UK 11",
            "quantity": 38
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.6",
    "review_count": 112
  },
  {
    "id": "prod-6",
    "name": "Velocity Slide X",
    "slug": "velocity-slide-x",
    "sku": "SLD-6-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium slides footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Slide X. Designed specifically for slides enthusiasts, it features advanced materials and premium construction.",
    "price": 6599,
    "compare_at_price": 7918,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-slides",
    "tags": [
      "Slides",
      "Velocity",
      "X"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-14T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Slides",
      "slug": "slides"
    },
    "media": [
      {
        "id": "m-6-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Slide X",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-6-1",
        "product_id": "prod-6",
        "sku": "SLD-6-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-6-1-UK6",
            "variant_id": "var-6-1",
            "size": "UK 6",
            "quantity": 28
          },
          {
            "id": "inv-6-1-UK7",
            "variant_id": "var-6-1",
            "size": "UK 7",
            "quantity": 22
          },
          {
            "id": "inv-6-1-UK8",
            "variant_id": "var-6-1",
            "size": "UK 8",
            "quantity": 44
          },
          {
            "id": "inv-6-1-UK10",
            "variant_id": "var-6-1",
            "size": "UK 10",
            "quantity": 9
          }
        ]
      },
      {
        "id": "var-6-2",
        "product_id": "prod-6",
        "sku": "SLD-6-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-6-2-UK6",
            "variant_id": "var-6-2",
            "size": "UK 6",
            "quantity": 37
          },
          {
            "id": "inv-6-2-UK8",
            "variant_id": "var-6-2",
            "size": "UK 8",
            "quantity": 29
          },
          {
            "id": "inv-6-2-UK9",
            "variant_id": "var-6-2",
            "size": "UK 9",
            "quantity": 35
          },
          {
            "id": "inv-6-2-UK10",
            "variant_id": "var-6-2",
            "size": "UK 10",
            "quantity": 16
          }
        ]
      },
      {
        "id": "var-6-3",
        "product_id": "prod-6",
        "sku": "SLD-6-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-6-3-UK6",
            "variant_id": "var-6-3",
            "size": "UK 6",
            "quantity": 26
          },
          {
            "id": "inv-6-3-UK7",
            "variant_id": "var-6-3",
            "size": "UK 7",
            "quantity": 11
          },
          {
            "id": "inv-6-3-UK8",
            "variant_id": "var-6-3",
            "size": "UK 8",
            "quantity": 37
          },
          {
            "id": "inv-6-3-UK9",
            "variant_id": "var-6-3",
            "size": "UK 9",
            "quantity": 45
          },
          {
            "id": "inv-6-3-UK10",
            "variant_id": "var-6-3",
            "size": "UK 10",
            "quantity": 24
          },
          {
            "id": "inv-6-3-UK11",
            "variant_id": "var-6-3",
            "size": "UK 11",
            "quantity": 26
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.0",
    "review_count": 413
  },
  {
    "id": "prod-7",
    "name": "Velocity Running Max",
    "slug": "velocity-running-max",
    "sku": "RUN-7-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium running footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Running Max. Designed specifically for running enthusiasts, it features advanced materials and premium construction.",
    "price": 15399,
    "compare_at_price": 18478,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-running",
    "tags": [
      "Running",
      "Velocity",
      "Max"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-03T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Running",
      "slug": "running"
    },
    "media": [
      {
        "id": "m-7-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Running Max",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-7-1",
        "product_id": "prod-7",
        "sku": "RUN-7-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-7-1-UK6",
            "variant_id": "var-7-1",
            "size": "UK 6",
            "quantity": 17
          },
          {
            "id": "inv-7-1-UK8",
            "variant_id": "var-7-1",
            "size": "UK 8",
            "quantity": 9
          },
          {
            "id": "inv-7-1-UK9",
            "variant_id": "var-7-1",
            "size": "UK 9",
            "quantity": 45
          },
          {
            "id": "inv-7-1-UK10",
            "variant_id": "var-7-1",
            "size": "UK 10",
            "quantity": 24
          },
          {
            "id": "inv-7-1-UK11",
            "variant_id": "var-7-1",
            "size": "UK 11",
            "quantity": 11
          }
        ]
      },
      {
        "id": "var-7-2",
        "product_id": "prod-7",
        "sku": "RUN-7-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-7-2-UK6",
            "variant_id": "var-7-2",
            "size": "UK 6",
            "quantity": 43
          },
          {
            "id": "inv-7-2-UK7",
            "variant_id": "var-7-2",
            "size": "UK 7",
            "quantity": 28
          },
          {
            "id": "inv-7-2-UK8",
            "variant_id": "var-7-2",
            "size": "UK 8",
            "quantity": 23
          },
          {
            "id": "inv-7-2-UK9",
            "variant_id": "var-7-2",
            "size": "UK 9",
            "quantity": 8
          },
          {
            "id": "inv-7-2-UK11",
            "variant_id": "var-7-2",
            "size": "UK 11",
            "quantity": 9
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.7",
    "review_count": 108
  },
  {
    "id": "prod-8",
    "name": "Nimbus Sneaker Max",
    "slug": "nimbus-sneaker-max",
    "sku": "SNK-8-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Nimbus.",
    "description": "Experience unparalleled comfort and style with the Nimbus Sneaker Max. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 23599,
    "compare_at_price": 28318,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Nimbus",
      "Max"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-05-27T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Nimbus",
      "slug": "nimbus"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-8-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Nimbus Sneaker Max",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-8-1",
        "product_id": "prod-8",
        "sku": "SNK-8-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-8-1-UK7",
            "variant_id": "var-8-1",
            "size": "UK 7",
            "quantity": 33
          },
          {
            "id": "inv-8-1-UK8",
            "variant_id": "var-8-1",
            "size": "UK 8",
            "quantity": 38
          },
          {
            "id": "inv-8-1-UK10",
            "variant_id": "var-8-1",
            "size": "UK 10",
            "quantity": 24
          },
          {
            "id": "inv-8-1-UK11",
            "variant_id": "var-8-1",
            "size": "UK 11",
            "quantity": 32
          }
        ]
      },
      {
        "id": "var-8-2",
        "product_id": "prod-8",
        "sku": "SNK-8-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-8-2-UK6",
            "variant_id": "var-8-2",
            "size": "UK 6",
            "quantity": 13
          },
          {
            "id": "inv-8-2-UK8",
            "variant_id": "var-8-2",
            "size": "UK 8",
            "quantity": 10
          },
          {
            "id": "inv-8-2-UK9",
            "variant_id": "var-8-2",
            "size": "UK 9",
            "quantity": 40
          },
          {
            "id": "inv-8-2-UK10",
            "variant_id": "var-8-2",
            "size": "UK 10",
            "quantity": 41
          },
          {
            "id": "inv-8-2-UK11",
            "variant_id": "var-8-2",
            "size": "UK 11",
            "quantity": 11
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.1",
    "review_count": 497
  },
  {
    "id": "prod-9",
    "name": "Aura Boot Air",
    "slug": "aura-boot-air",
    "sku": "BOT-9-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium boots footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Boot Air. Designed specifically for boots enthusiasts, it features advanced materials and premium construction.",
    "price": 24699,
    "compare_at_price": 29638,
    "discount_price": 20747,
    "currency": "INR",
    "category_id": "cat-boots",
    "tags": [
      "Boots",
      "Aura",
      "Air"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-01T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Boots",
      "slug": "boots"
    },
    "media": [
      {
        "id": "m-9-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Boot Air",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-9-1",
        "product_id": "prod-9",
        "sku": "BOT-9-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-9-1-UK6",
            "variant_id": "var-9-1",
            "size": "UK 6",
            "quantity": 5
          },
          {
            "id": "inv-9-1-UK8",
            "variant_id": "var-9-1",
            "size": "UK 8",
            "quantity": 8
          },
          {
            "id": "inv-9-1-UK10",
            "variant_id": "var-9-1",
            "size": "UK 10",
            "quantity": 33
          },
          {
            "id": "inv-9-1-UK11",
            "variant_id": "var-9-1",
            "size": "UK 11",
            "quantity": 17
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "5.0",
    "review_count": 490
  },
  {
    "id": "prod-10",
    "name": "SOLEVA Sneaker Boost",
    "slug": "soleva-sneaker-boost",
    "sku": "SNK-10-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Sneaker Boost. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 9699,
    "compare_at_price": 11638,
    "discount_price": 7953,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "SOLEVA",
      "Boost"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": true,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-18T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-10-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ec61b9752?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Sneaker Boost",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-10-1",
        "product_id": "prod-10",
        "sku": "SNK-10-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-10-1-UK6",
            "variant_id": "var-10-1",
            "size": "UK 6",
            "quantity": 11
          },
          {
            "id": "inv-10-1-UK7",
            "variant_id": "var-10-1",
            "size": "UK 7",
            "quantity": 7
          },
          {
            "id": "inv-10-1-UK8",
            "variant_id": "var-10-1",
            "size": "UK 8",
            "quantity": 50
          },
          {
            "id": "inv-10-1-UK10",
            "variant_id": "var-10-1",
            "size": "UK 10",
            "quantity": 50
          },
          {
            "id": "inv-10-1-UK11",
            "variant_id": "var-10-1",
            "size": "UK 11",
            "quantity": 11
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.1",
    "review_count": 81
  },
  {
    "id": "prod-11",
    "name": "SOLEVA Running Next Gen",
    "slug": "soleva-running-next-gen",
    "sku": "RUN-11-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium running footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Running Next Gen. Designed specifically for running enthusiasts, it features advanced materials and premium construction.",
    "price": 24999,
    "compare_at_price": 29998,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-running",
    "tags": [
      "Running",
      "SOLEVA",
      "Next Gen"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-27T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Running",
      "slug": "running"
    },
    "media": [
      {
        "id": "m-11-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Running Next Gen",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-11-1",
        "product_id": "prod-11",
        "sku": "RUN-11-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-11-1-UK6",
            "variant_id": "var-11-1",
            "size": "UK 6",
            "quantity": 8
          },
          {
            "id": "inv-11-1-UK7",
            "variant_id": "var-11-1",
            "size": "UK 7",
            "quantity": 16
          },
          {
            "id": "inv-11-1-UK8",
            "variant_id": "var-11-1",
            "size": "UK 8",
            "quantity": 29
          },
          {
            "id": "inv-11-1-UK10",
            "variant_id": "var-11-1",
            "size": "UK 10",
            "quantity": 47
          }
        ]
      },
      {
        "id": "var-11-2",
        "product_id": "prod-11",
        "sku": "RUN-11-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-11-2-UK6",
            "variant_id": "var-11-2",
            "size": "UK 6",
            "quantity": 33
          },
          {
            "id": "inv-11-2-UK7",
            "variant_id": "var-11-2",
            "size": "UK 7",
            "quantity": 36
          },
          {
            "id": "inv-11-2-UK8",
            "variant_id": "var-11-2",
            "size": "UK 8",
            "quantity": 28
          },
          {
            "id": "inv-11-2-UK10",
            "variant_id": "var-11-2",
            "size": "UK 10",
            "quantity": 49
          },
          {
            "id": "inv-11-2-UK11",
            "variant_id": "var-11-2",
            "size": "UK 11",
            "quantity": 17
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.5",
    "review_count": 178
  },
  {
    "id": "prod-12",
    "name": "Nimbus Sneaker Ultra",
    "slug": "nimbus-sneaker-ultra",
    "sku": "SNK-12-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Nimbus.",
    "description": "Experience unparalleled comfort and style with the Nimbus Sneaker Ultra. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 15699,
    "compare_at_price": 18838,
    "discount_price": 11774,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Nimbus",
      "Ultra"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-27T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Nimbus",
      "slug": "nimbus"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-12-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Nimbus Sneaker Ultra",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-12-1",
        "product_id": "prod-12",
        "sku": "SNK-12-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-12-1-UK6",
            "variant_id": "var-12-1",
            "size": "UK 6",
            "quantity": 49
          },
          {
            "id": "inv-12-1-UK7",
            "variant_id": "var-12-1",
            "size": "UK 7",
            "quantity": 29
          },
          {
            "id": "inv-12-1-UK8",
            "variant_id": "var-12-1",
            "size": "UK 8",
            "quantity": 11
          },
          {
            "id": "inv-12-1-UK9",
            "variant_id": "var-12-1",
            "size": "UK 9",
            "quantity": 11
          }
        ]
      },
      {
        "id": "var-12-2",
        "product_id": "prod-12",
        "sku": "SNK-12-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-12-2-UK6",
            "variant_id": "var-12-2",
            "size": "UK 6",
            "quantity": 20
          },
          {
            "id": "inv-12-2-UK8",
            "variant_id": "var-12-2",
            "size": "UK 8",
            "quantity": 50
          },
          {
            "id": "inv-12-2-UK10",
            "variant_id": "var-12-2",
            "size": "UK 10",
            "quantity": 9
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.2",
    "review_count": 245
  },
  {
    "id": "prod-13",
    "name": "Velocity Slide Prime",
    "slug": "velocity-slide-prime",
    "sku": "SLD-13-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium slides footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Slide Prime. Designed specifically for slides enthusiasts, it features advanced materials and premium construction.",
    "price": 4899,
    "compare_at_price": 5878,
    "discount_price": 3723,
    "currency": "INR",
    "category_id": "cat-slides",
    "tags": [
      "Slides",
      "Velocity",
      "Prime"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-17T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Slides",
      "slug": "slides"
    },
    "media": [
      {
        "id": "m-13-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Slide Prime",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-13-1",
        "product_id": "prod-13",
        "sku": "SLD-13-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-13-1-UK6",
            "variant_id": "var-13-1",
            "size": "UK 6",
            "quantity": 46
          },
          {
            "id": "inv-13-1-UK7",
            "variant_id": "var-13-1",
            "size": "UK 7",
            "quantity": 38
          },
          {
            "id": "inv-13-1-UK8",
            "variant_id": "var-13-1",
            "size": "UK 8",
            "quantity": 5
          },
          {
            "id": "inv-13-1-UK9",
            "variant_id": "var-13-1",
            "size": "UK 9",
            "quantity": 25
          },
          {
            "id": "inv-13-1-UK10",
            "variant_id": "var-13-1",
            "size": "UK 10",
            "quantity": 47
          },
          {
            "id": "inv-13-1-UK11",
            "variant_id": "var-13-1",
            "size": "UK 11",
            "quantity": 32
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.0",
    "review_count": 466
  },
  {
    "id": "prod-14",
    "name": "Velocity Sport Essential",
    "slug": "velocity-sport-essential",
    "sku": "SPT-14-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sports footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Sport Essential. Designed specifically for sports enthusiasts, it features advanced materials and premium construction.",
    "price": 3699,
    "compare_at_price": 4438,
    "discount_price": 2811,
    "currency": "INR",
    "category_id": "cat-sports",
    "tags": [
      "Sports",
      "Velocity",
      "Essential"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": true,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-05-25T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sports",
      "slug": "sports"
    },
    "media": [
      {
        "id": "m-14-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Sport Essential",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-14-1",
        "product_id": "prod-14",
        "sku": "SPT-14-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-14-1-UK6",
            "variant_id": "var-14-1",
            "size": "UK 6",
            "quantity": 7
          },
          {
            "id": "inv-14-1-UK8",
            "variant_id": "var-14-1",
            "size": "UK 8",
            "quantity": 12
          },
          {
            "id": "inv-14-1-UK9",
            "variant_id": "var-14-1",
            "size": "UK 9",
            "quantity": 24
          },
          {
            "id": "inv-14-1-UK10",
            "variant_id": "var-14-1",
            "size": "UK 10",
            "quantity": 46
          },
          {
            "id": "inv-14-1-UK11",
            "variant_id": "var-14-1",
            "size": "UK 11",
            "quantity": 11
          }
        ]
      },
      {
        "id": "var-14-2",
        "product_id": "prod-14",
        "sku": "SPT-14-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-14-2-UK6",
            "variant_id": "var-14-2",
            "size": "UK 6",
            "quantity": 33
          },
          {
            "id": "inv-14-2-UK8",
            "variant_id": "var-14-2",
            "size": "UK 8",
            "quantity": 36
          },
          {
            "id": "inv-14-2-UK9",
            "variant_id": "var-14-2",
            "size": "UK 9",
            "quantity": 10
          },
          {
            "id": "inv-14-2-UK11",
            "variant_id": "var-14-2",
            "size": "UK 11",
            "quantity": 10
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.7",
    "review_count": 426
  },
  {
    "id": "prod-15",
    "name": "Nimbus Formal Ultra",
    "slug": "nimbus-formal-ultra",
    "sku": "FRM-15-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by Nimbus.",
    "description": "Experience unparalleled comfort and style with the Nimbus Formal Ultra. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 7999,
    "compare_at_price": 9598,
    "discount_price": 5519,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "Nimbus",
      "Ultra"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-25T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Nimbus",
      "slug": "nimbus"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-15-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Nimbus Formal Ultra",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-15-1",
        "product_id": "prod-15",
        "sku": "FRM-15-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-15-1-UK7",
            "variant_id": "var-15-1",
            "size": "UK 7",
            "quantity": 6
          },
          {
            "id": "inv-15-1-UK10",
            "variant_id": "var-15-1",
            "size": "UK 10",
            "quantity": 14
          }
        ]
      },
      {
        "id": "var-15-2",
        "product_id": "prod-15",
        "sku": "FRM-15-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-15-2-UK6",
            "variant_id": "var-15-2",
            "size": "UK 6",
            "quantity": 49
          },
          {
            "id": "inv-15-2-UK7",
            "variant_id": "var-15-2",
            "size": "UK 7",
            "quantity": 36
          },
          {
            "id": "inv-15-2-UK9",
            "variant_id": "var-15-2",
            "size": "UK 9",
            "quantity": 13
          },
          {
            "id": "inv-15-2-UK10",
            "variant_id": "var-15-2",
            "size": "UK 10",
            "quantity": 37
          }
        ]
      },
      {
        "id": "var-15-3",
        "product_id": "prod-15",
        "sku": "FRM-15-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-15-3-UK8",
            "variant_id": "var-15-3",
            "size": "UK 8",
            "quantity": 20
          },
          {
            "id": "inv-15-3-UK9",
            "variant_id": "var-15-3",
            "size": "UK 9",
            "quantity": 43
          },
          {
            "id": "inv-15-3-UK10",
            "variant_id": "var-15-3",
            "size": "UK 10",
            "quantity": 25
          },
          {
            "id": "inv-15-3-UK11",
            "variant_id": "var-15-3",
            "size": "UK 11",
            "quantity": 5
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.6",
    "review_count": 232
  },
  {
    "id": "prod-16",
    "name": "Stride Running V2",
    "slug": "stride-running-v2",
    "sku": "RUN-16-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium running footwear by Stride.",
    "description": "Experience unparalleled comfort and style with the Stride Running V2. Designed specifically for running enthusiasts, it features advanced materials and premium construction.",
    "price": 21099,
    "compare_at_price": 25318,
    "discount_price": 15824,
    "currency": "INR",
    "category_id": "cat-running",
    "tags": [
      "Running",
      "Stride",
      "V2"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": true,
    "is_limited_edition": true,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-27T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Stride",
      "slug": "stride"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Running",
      "slug": "running"
    },
    "media": [
      {
        "id": "m-16-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Stride Running V2",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-16-1",
        "product_id": "prod-16",
        "sku": "RUN-16-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-16-1-UK7",
            "variant_id": "var-16-1",
            "size": "UK 7",
            "quantity": 44
          },
          {
            "id": "inv-16-1-UK8",
            "variant_id": "var-16-1",
            "size": "UK 8",
            "quantity": 48
          },
          {
            "id": "inv-16-1-UK9",
            "variant_id": "var-16-1",
            "size": "UK 9",
            "quantity": 38
          },
          {
            "id": "inv-16-1-UK10",
            "variant_id": "var-16-1",
            "size": "UK 10",
            "quantity": 29
          },
          {
            "id": "inv-16-1-UK11",
            "variant_id": "var-16-1",
            "size": "UK 11",
            "quantity": 37
          }
        ]
      },
      {
        "id": "var-16-2",
        "product_id": "prod-16",
        "sku": "RUN-16-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-16-2-UK6",
            "variant_id": "var-16-2",
            "size": "UK 6",
            "quantity": 31
          },
          {
            "id": "inv-16-2-UK7",
            "variant_id": "var-16-2",
            "size": "UK 7",
            "quantity": 45
          },
          {
            "id": "inv-16-2-UK9",
            "variant_id": "var-16-2",
            "size": "UK 9",
            "quantity": 37
          },
          {
            "id": "inv-16-2-UK10",
            "variant_id": "var-16-2",
            "size": "UK 10",
            "quantity": 35
          },
          {
            "id": "inv-16-2-UK11",
            "variant_id": "var-16-2",
            "size": "UK 11",
            "quantity": 7
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.2",
    "review_count": 202
  },
  {
    "id": "prod-17",
    "name": "Nimbus Sport Ultra",
    "slug": "nimbus-sport-ultra",
    "sku": "SPT-17-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sports footwear by Nimbus.",
    "description": "Experience unparalleled comfort and style with the Nimbus Sport Ultra. Designed specifically for sports enthusiasts, it features advanced materials and premium construction.",
    "price": 12499,
    "compare_at_price": 14998,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sports",
    "tags": [
      "Sports",
      "Nimbus",
      "Ultra"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-14T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Nimbus",
      "slug": "nimbus"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sports",
      "slug": "sports"
    },
    "media": [
      {
        "id": "m-17-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Nimbus Sport Ultra",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-17-1",
        "product_id": "prod-17",
        "sku": "SPT-17-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-17-1-UK7",
            "variant_id": "var-17-1",
            "size": "UK 7",
            "quantity": 19
          },
          {
            "id": "inv-17-1-UK8",
            "variant_id": "var-17-1",
            "size": "UK 8",
            "quantity": 49
          },
          {
            "id": "inv-17-1-UK9",
            "variant_id": "var-17-1",
            "size": "UK 9",
            "quantity": 35
          },
          {
            "id": "inv-17-1-UK10",
            "variant_id": "var-17-1",
            "size": "UK 10",
            "quantity": 10
          },
          {
            "id": "inv-17-1-UK11",
            "variant_id": "var-17-1",
            "size": "UK 11",
            "quantity": 16
          }
        ]
      },
      {
        "id": "var-17-2",
        "product_id": "prod-17",
        "sku": "SPT-17-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-17-2-UK6",
            "variant_id": "var-17-2",
            "size": "UK 6",
            "quantity": 44
          },
          {
            "id": "inv-17-2-UK7",
            "variant_id": "var-17-2",
            "size": "UK 7",
            "quantity": 16
          },
          {
            "id": "inv-17-2-UK8",
            "variant_id": "var-17-2",
            "size": "UK 8",
            "quantity": 20
          },
          {
            "id": "inv-17-2-UK9",
            "variant_id": "var-17-2",
            "size": "UK 9",
            "quantity": 43
          },
          {
            "id": "inv-17-2-UK10",
            "variant_id": "var-17-2",
            "size": "UK 10",
            "quantity": 16
          },
          {
            "id": "inv-17-2-UK11",
            "variant_id": "var-17-2",
            "size": "UK 11",
            "quantity": 14
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.1",
    "review_count": 82
  },
  {
    "id": "prod-18",
    "name": "Velocity Formal Classic",
    "slug": "velocity-formal-classic",
    "sku": "FRM-18-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Formal Classic. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 22199,
    "compare_at_price": 26638,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "Velocity",
      "Classic"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-04T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-18-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1614252236316-f2f3016a3a41?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Formal Classic",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-18-1",
        "product_id": "prod-18",
        "sku": "FRM-18-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-18-1-UK6",
            "variant_id": "var-18-1",
            "size": "UK 6",
            "quantity": 36
          },
          {
            "id": "inv-18-1-UK7",
            "variant_id": "var-18-1",
            "size": "UK 7",
            "quantity": 45
          },
          {
            "id": "inv-18-1-UK9",
            "variant_id": "var-18-1",
            "size": "UK 9",
            "quantity": 46
          },
          {
            "id": "inv-18-1-UK11",
            "variant_id": "var-18-1",
            "size": "UK 11",
            "quantity": 16
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.1",
    "review_count": 351
  },
  {
    "id": "prod-19",
    "name": "Velocity Sneaker Core",
    "slug": "velocity-sneaker-core",
    "sku": "SNK-19-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Sneaker Core. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 21399,
    "compare_at_price": 25678,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Velocity",
      "Core"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-02T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-19-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Sneaker Core",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-19-1",
        "product_id": "prod-19",
        "sku": "SNK-19-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-19-1-UK6",
            "variant_id": "var-19-1",
            "size": "UK 6",
            "quantity": 6
          },
          {
            "id": "inv-19-1-UK7",
            "variant_id": "var-19-1",
            "size": "UK 7",
            "quantity": 10
          },
          {
            "id": "inv-19-1-UK8",
            "variant_id": "var-19-1",
            "size": "UK 8",
            "quantity": 43
          },
          {
            "id": "inv-19-1-UK9",
            "variant_id": "var-19-1",
            "size": "UK 9",
            "quantity": 50
          },
          {
            "id": "inv-19-1-UK10",
            "variant_id": "var-19-1",
            "size": "UK 10",
            "quantity": 21
          }
        ]
      },
      {
        "id": "var-19-2",
        "product_id": "prod-19",
        "sku": "SNK-19-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-19-2-UK6",
            "variant_id": "var-19-2",
            "size": "UK 6",
            "quantity": 8
          },
          {
            "id": "inv-19-2-UK7",
            "variant_id": "var-19-2",
            "size": "UK 7",
            "quantity": 16
          },
          {
            "id": "inv-19-2-UK8",
            "variant_id": "var-19-2",
            "size": "UK 8",
            "quantity": 35
          },
          {
            "id": "inv-19-2-UK9",
            "variant_id": "var-19-2",
            "size": "UK 9",
            "quantity": 13
          },
          {
            "id": "inv-19-2-UK10",
            "variant_id": "var-19-2",
            "size": "UK 10",
            "quantity": 42
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.6",
    "review_count": 148
  },
  {
    "id": "prod-20",
    "name": "Aura Formal React",
    "slug": "aura-formal-react",
    "sku": "FRM-20-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Formal React. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 7599,
    "compare_at_price": 9118,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "Aura",
      "React"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-17T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-20-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Formal React",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-20-1",
        "product_id": "prod-20",
        "sku": "FRM-20-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-20-1-UK7",
            "variant_id": "var-20-1",
            "size": "UK 7",
            "quantity": 34
          },
          {
            "id": "inv-20-1-UK8",
            "variant_id": "var-20-1",
            "size": "UK 8",
            "quantity": 44
          },
          {
            "id": "inv-20-1-UK9",
            "variant_id": "var-20-1",
            "size": "UK 9",
            "quantity": 16
          },
          {
            "id": "inv-20-1-UK10",
            "variant_id": "var-20-1",
            "size": "UK 10",
            "quantity": 13
          },
          {
            "id": "inv-20-1-UK11",
            "variant_id": "var-20-1",
            "size": "UK 11",
            "quantity": 13
          }
        ]
      },
      {
        "id": "var-20-2",
        "product_id": "prod-20",
        "sku": "FRM-20-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-20-2-UK6",
            "variant_id": "var-20-2",
            "size": "UK 6",
            "quantity": 15
          },
          {
            "id": "inv-20-2-UK7",
            "variant_id": "var-20-2",
            "size": "UK 7",
            "quantity": 27
          },
          {
            "id": "inv-20-2-UK8",
            "variant_id": "var-20-2",
            "size": "UK 8",
            "quantity": 45
          },
          {
            "id": "inv-20-2-UK10",
            "variant_id": "var-20-2",
            "size": "UK 10",
            "quantity": 50
          },
          {
            "id": "inv-20-2-UK11",
            "variant_id": "var-20-2",
            "size": "UK 11",
            "quantity": 22
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.2",
    "review_count": 113
  },
  {
    "id": "prod-21",
    "name": "SOLEVA Formal Core",
    "slug": "soleva-formal-core",
    "sku": "FRM-21-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Formal Core. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 19699,
    "compare_at_price": 23638,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "SOLEVA",
      "Core"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-06T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-21-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Formal Core",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-21-1",
        "product_id": "prod-21",
        "sku": "FRM-21-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-21-1-UK6",
            "variant_id": "var-21-1",
            "size": "UK 6",
            "quantity": 38
          },
          {
            "id": "inv-21-1-UK8",
            "variant_id": "var-21-1",
            "size": "UK 8",
            "quantity": 16
          },
          {
            "id": "inv-21-1-UK11",
            "variant_id": "var-21-1",
            "size": "UK 11",
            "quantity": 44
          }
        ]
      },
      {
        "id": "var-21-2",
        "product_id": "prod-21",
        "sku": "FRM-21-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-21-2-UK6",
            "variant_id": "var-21-2",
            "size": "UK 6",
            "quantity": 32
          },
          {
            "id": "inv-21-2-UK7",
            "variant_id": "var-21-2",
            "size": "UK 7",
            "quantity": 18
          },
          {
            "id": "inv-21-2-UK8",
            "variant_id": "var-21-2",
            "size": "UK 8",
            "quantity": 16
          },
          {
            "id": "inv-21-2-UK9",
            "variant_id": "var-21-2",
            "size": "UK 9",
            "quantity": 22
          },
          {
            "id": "inv-21-2-UK10",
            "variant_id": "var-21-2",
            "size": "UK 10",
            "quantity": 28
          },
          {
            "id": "inv-21-2-UK11",
            "variant_id": "var-21-2",
            "size": "UK 11",
            "quantity": 43
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.2",
    "review_count": 112
  },
  {
    "id": "prod-22",
    "name": "Velocity Slide Ultra",
    "slug": "velocity-slide-ultra",
    "sku": "SLD-22-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium slides footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Slide Ultra. Designed specifically for slides enthusiasts, it features advanced materials and premium construction.",
    "price": 22099,
    "compare_at_price": 26518,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-slides",
    "tags": [
      "Slides",
      "Velocity",
      "Ultra"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-20T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Slides",
      "slug": "slides"
    },
    "media": [
      {
        "id": "m-22-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Slide Ultra",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-22-1",
        "product_id": "prod-22",
        "sku": "SLD-22-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-22-1-UK6",
            "variant_id": "var-22-1",
            "size": "UK 6",
            "quantity": 37
          },
          {
            "id": "inv-22-1-UK7",
            "variant_id": "var-22-1",
            "size": "UK 7",
            "quantity": 40
          },
          {
            "id": "inv-22-1-UK8",
            "variant_id": "var-22-1",
            "size": "UK 8",
            "quantity": 44
          },
          {
            "id": "inv-22-1-UK9",
            "variant_id": "var-22-1",
            "size": "UK 9",
            "quantity": 6
          },
          {
            "id": "inv-22-1-UK10",
            "variant_id": "var-22-1",
            "size": "UK 10",
            "quantity": 22
          },
          {
            "id": "inv-22-1-UK11",
            "variant_id": "var-22-1",
            "size": "UK 11",
            "quantity": 39
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.9",
    "review_count": 449
  },
  {
    "id": "prod-23",
    "name": "Aura Sneaker Pro",
    "slug": "aura-sneaker-pro",
    "sku": "SNK-23-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Sneaker Pro. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 7699,
    "compare_at_price": 9238,
    "discount_price": 5928,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Aura",
      "Pro"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-27T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-23-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ec61b9752?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Sneaker Pro",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-23-1",
        "product_id": "prod-23",
        "sku": "SNK-23-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-23-1-UK6",
            "variant_id": "var-23-1",
            "size": "UK 6",
            "quantity": 34
          },
          {
            "id": "inv-23-1-UK7",
            "variant_id": "var-23-1",
            "size": "UK 7",
            "quantity": 31
          },
          {
            "id": "inv-23-1-UK8",
            "variant_id": "var-23-1",
            "size": "UK 8",
            "quantity": 45
          },
          {
            "id": "inv-23-1-UK9",
            "variant_id": "var-23-1",
            "size": "UK 9",
            "quantity": 37
          },
          {
            "id": "inv-23-1-UK10",
            "variant_id": "var-23-1",
            "size": "UK 10",
            "quantity": 9
          }
        ]
      },
      {
        "id": "var-23-2",
        "product_id": "prod-23",
        "sku": "SNK-23-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-23-2-UK6",
            "variant_id": "var-23-2",
            "size": "UK 6",
            "quantity": 25
          },
          {
            "id": "inv-23-2-UK7",
            "variant_id": "var-23-2",
            "size": "UK 7",
            "quantity": 19
          },
          {
            "id": "inv-23-2-UK8",
            "variant_id": "var-23-2",
            "size": "UK 8",
            "quantity": 29
          },
          {
            "id": "inv-23-2-UK11",
            "variant_id": "var-23-2",
            "size": "UK 11",
            "quantity": 49
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.7",
    "review_count": 280
  },
  {
    "id": "prod-24",
    "name": "Velocity Sneaker Classic",
    "slug": "velocity-sneaker-classic",
    "sku": "SNK-24-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Sneaker Classic. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 3699,
    "compare_at_price": 4438,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Velocity",
      "Classic"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-10T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-24-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ec61b9752?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Sneaker Classic",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-24-1",
        "product_id": "prod-24",
        "sku": "SNK-24-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-24-1-UK6",
            "variant_id": "var-24-1",
            "size": "UK 6",
            "quantity": 6
          },
          {
            "id": "inv-24-1-UK9",
            "variant_id": "var-24-1",
            "size": "UK 9",
            "quantity": 11
          },
          {
            "id": "inv-24-1-UK10",
            "variant_id": "var-24-1",
            "size": "UK 10",
            "quantity": 37
          },
          {
            "id": "inv-24-1-UK11",
            "variant_id": "var-24-1",
            "size": "UK 11",
            "quantity": 50
          }
        ]
      },
      {
        "id": "var-24-2",
        "product_id": "prod-24",
        "sku": "SNK-24-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-24-2-UK7",
            "variant_id": "var-24-2",
            "size": "UK 7",
            "quantity": 5
          },
          {
            "id": "inv-24-2-UK8",
            "variant_id": "var-24-2",
            "size": "UK 8",
            "quantity": 39
          },
          {
            "id": "inv-24-2-UK9",
            "variant_id": "var-24-2",
            "size": "UK 9",
            "quantity": 34
          },
          {
            "id": "inv-24-2-UK11",
            "variant_id": "var-24-2",
            "size": "UK 11",
            "quantity": 13
          }
        ]
      },
      {
        "id": "var-24-3",
        "product_id": "prod-24",
        "sku": "SNK-24-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-24-3-UK6",
            "variant_id": "var-24-3",
            "size": "UK 6",
            "quantity": 26
          },
          {
            "id": "inv-24-3-UK7",
            "variant_id": "var-24-3",
            "size": "UK 7",
            "quantity": 42
          },
          {
            "id": "inv-24-3-UK8",
            "variant_id": "var-24-3",
            "size": "UK 8",
            "quantity": 23
          },
          {
            "id": "inv-24-3-UK9",
            "variant_id": "var-24-3",
            "size": "UK 9",
            "quantity": 40
          },
          {
            "id": "inv-24-3-UK10",
            "variant_id": "var-24-3",
            "size": "UK 10",
            "quantity": 15
          },
          {
            "id": "inv-24-3-UK11",
            "variant_id": "var-24-3",
            "size": "UK 11",
            "quantity": 38
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.5",
    "review_count": 207
  },
  {
    "id": "prod-25",
    "name": "Velocity Slide Max",
    "slug": "velocity-slide-max",
    "sku": "SLD-25-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium slides footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Slide Max. Designed specifically for slides enthusiasts, it features advanced materials and premium construction.",
    "price": 9699,
    "compare_at_price": 11638,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-slides",
    "tags": [
      "Slides",
      "Velocity",
      "Max"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-21T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Slides",
      "slug": "slides"
    },
    "media": [
      {
        "id": "m-25-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Slide Max",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-25-1",
        "product_id": "prod-25",
        "sku": "SLD-25-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-25-1-UK6",
            "variant_id": "var-25-1",
            "size": "UK 6",
            "quantity": 20
          },
          {
            "id": "inv-25-1-UK10",
            "variant_id": "var-25-1",
            "size": "UK 10",
            "quantity": 26
          },
          {
            "id": "inv-25-1-UK11",
            "variant_id": "var-25-1",
            "size": "UK 11",
            "quantity": 39
          }
        ]
      },
      {
        "id": "var-25-2",
        "product_id": "prod-25",
        "sku": "SLD-25-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-25-2-UK6",
            "variant_id": "var-25-2",
            "size": "UK 6",
            "quantity": 14
          },
          {
            "id": "inv-25-2-UK7",
            "variant_id": "var-25-2",
            "size": "UK 7",
            "quantity": 46
          },
          {
            "id": "inv-25-2-UK10",
            "variant_id": "var-25-2",
            "size": "UK 10",
            "quantity": 49
          },
          {
            "id": "inv-25-2-UK11",
            "variant_id": "var-25-2",
            "size": "UK 11",
            "quantity": 45
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.0",
    "review_count": 436
  },
  {
    "id": "prod-26",
    "name": "SOLEVA Sport Essential",
    "slug": "soleva-sport-essential",
    "sku": "SPT-26-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sports footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Sport Essential. Designed specifically for sports enthusiasts, it features advanced materials and premium construction.",
    "price": 12499,
    "compare_at_price": 14998,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sports",
    "tags": [
      "Sports",
      "SOLEVA",
      "Essential"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-07T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sports",
      "slug": "sports"
    },
    "media": [
      {
        "id": "m-26-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Sport Essential",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-26-1",
        "product_id": "prod-26",
        "sku": "SPT-26-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-26-1-UK6",
            "variant_id": "var-26-1",
            "size": "UK 6",
            "quantity": 9
          },
          {
            "id": "inv-26-1-UK7",
            "variant_id": "var-26-1",
            "size": "UK 7",
            "quantity": 24
          },
          {
            "id": "inv-26-1-UK8",
            "variant_id": "var-26-1",
            "size": "UK 8",
            "quantity": 21
          },
          {
            "id": "inv-26-1-UK10",
            "variant_id": "var-26-1",
            "size": "UK 10",
            "quantity": 50
          },
          {
            "id": "inv-26-1-UK11",
            "variant_id": "var-26-1",
            "size": "UK 11",
            "quantity": 48
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.2",
    "review_count": 347
  },
  {
    "id": "prod-27",
    "name": "Aura Slide Elite",
    "slug": "aura-slide-elite",
    "sku": "SLD-27-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium slides footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Slide Elite. Designed specifically for slides enthusiasts, it features advanced materials and premium construction.",
    "price": 12599,
    "compare_at_price": 15118,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-slides",
    "tags": [
      "Slides",
      "Aura",
      "Elite"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-09T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Slides",
      "slug": "slides"
    },
    "media": [
      {
        "id": "m-27-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Slide Elite",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-27-1",
        "product_id": "prod-27",
        "sku": "SLD-27-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-27-1-UK7",
            "variant_id": "var-27-1",
            "size": "UK 7",
            "quantity": 41
          },
          {
            "id": "inv-27-1-UK8",
            "variant_id": "var-27-1",
            "size": "UK 8",
            "quantity": 33
          },
          {
            "id": "inv-27-1-UK9",
            "variant_id": "var-27-1",
            "size": "UK 9",
            "quantity": 16
          },
          {
            "id": "inv-27-1-UK10",
            "variant_id": "var-27-1",
            "size": "UK 10",
            "quantity": 19
          },
          {
            "id": "inv-27-1-UK11",
            "variant_id": "var-27-1",
            "size": "UK 11",
            "quantity": 18
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.6",
    "review_count": 200
  },
  {
    "id": "prod-28",
    "name": "Stride Sneaker Zoom",
    "slug": "stride-sneaker-zoom",
    "sku": "SNK-28-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Stride.",
    "description": "Experience unparalleled comfort and style with the Stride Sneaker Zoom. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 12599,
    "compare_at_price": 15118,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Stride",
      "Zoom"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-05-30T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Stride",
      "slug": "stride"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-28-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ec61b9752?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Stride Sneaker Zoom",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-28-1",
        "product_id": "prod-28",
        "sku": "SNK-28-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-28-1-UK6",
            "variant_id": "var-28-1",
            "size": "UK 6",
            "quantity": 23
          },
          {
            "id": "inv-28-1-UK7",
            "variant_id": "var-28-1",
            "size": "UK 7",
            "quantity": 46
          },
          {
            "id": "inv-28-1-UK8",
            "variant_id": "var-28-1",
            "size": "UK 8",
            "quantity": 38
          },
          {
            "id": "inv-28-1-UK10",
            "variant_id": "var-28-1",
            "size": "UK 10",
            "quantity": 9
          },
          {
            "id": "inv-28-1-UK11",
            "variant_id": "var-28-1",
            "size": "UK 11",
            "quantity": 29
          }
        ]
      },
      {
        "id": "var-28-2",
        "product_id": "prod-28",
        "sku": "SNK-28-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-28-2-UK6",
            "variant_id": "var-28-2",
            "size": "UK 6",
            "quantity": 48
          },
          {
            "id": "inv-28-2-UK8",
            "variant_id": "var-28-2",
            "size": "UK 8",
            "quantity": 18
          },
          {
            "id": "inv-28-2-UK10",
            "variant_id": "var-28-2",
            "size": "UK 10",
            "quantity": 23
          },
          {
            "id": "inv-28-2-UK11",
            "variant_id": "var-28-2",
            "size": "UK 11",
            "quantity": 41
          }
        ]
      },
      {
        "id": "var-28-3",
        "product_id": "prod-28",
        "sku": "SNK-28-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-28-3-UK6",
            "variant_id": "var-28-3",
            "size": "UK 6",
            "quantity": 29
          },
          {
            "id": "inv-28-3-UK8",
            "variant_id": "var-28-3",
            "size": "UK 8",
            "quantity": 9
          },
          {
            "id": "inv-28-3-UK9",
            "variant_id": "var-28-3",
            "size": "UK 9",
            "quantity": 45
          },
          {
            "id": "inv-28-3-UK10",
            "variant_id": "var-28-3",
            "size": "UK 10",
            "quantity": 9
          },
          {
            "id": "inv-28-3-UK11",
            "variant_id": "var-28-3",
            "size": "UK 11",
            "quantity": 45
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "5.0",
    "review_count": 169
  },
  {
    "id": "prod-29",
    "name": "Aura Sneaker Classic",
    "slug": "aura-sneaker-classic",
    "sku": "SNK-29-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Sneaker Classic. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 7899,
    "compare_at_price": 9478,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Aura",
      "Classic"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-09T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-29-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Sneaker Classic",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-29-1",
        "product_id": "prod-29",
        "sku": "SNK-29-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-29-1-UK6",
            "variant_id": "var-29-1",
            "size": "UK 6",
            "quantity": 12
          },
          {
            "id": "inv-29-1-UK7",
            "variant_id": "var-29-1",
            "size": "UK 7",
            "quantity": 12
          },
          {
            "id": "inv-29-1-UK9",
            "variant_id": "var-29-1",
            "size": "UK 9",
            "quantity": 9
          },
          {
            "id": "inv-29-1-UK10",
            "variant_id": "var-29-1",
            "size": "UK 10",
            "quantity": 41
          },
          {
            "id": "inv-29-1-UK11",
            "variant_id": "var-29-1",
            "size": "UK 11",
            "quantity": 48
          }
        ]
      },
      {
        "id": "var-29-2",
        "product_id": "prod-29",
        "sku": "SNK-29-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-29-2-UK6",
            "variant_id": "var-29-2",
            "size": "UK 6",
            "quantity": 45
          },
          {
            "id": "inv-29-2-UK7",
            "variant_id": "var-29-2",
            "size": "UK 7",
            "quantity": 28
          },
          {
            "id": "inv-29-2-UK11",
            "variant_id": "var-29-2",
            "size": "UK 11",
            "quantity": 22
          }
        ]
      },
      {
        "id": "var-29-3",
        "product_id": "prod-29",
        "sku": "SNK-29-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-29-3-UK6",
            "variant_id": "var-29-3",
            "size": "UK 6",
            "quantity": 33
          },
          {
            "id": "inv-29-3-UK7",
            "variant_id": "var-29-3",
            "size": "UK 7",
            "quantity": 39
          },
          {
            "id": "inv-29-3-UK8",
            "variant_id": "var-29-3",
            "size": "UK 8",
            "quantity": 16
          },
          {
            "id": "inv-29-3-UK9",
            "variant_id": "var-29-3",
            "size": "UK 9",
            "quantity": 30
          },
          {
            "id": "inv-29-3-UK10",
            "variant_id": "var-29-3",
            "size": "UK 10",
            "quantity": 22
          },
          {
            "id": "inv-29-3-UK11",
            "variant_id": "var-29-3",
            "size": "UK 11",
            "quantity": 6
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.5",
    "review_count": 411
  },
  {
    "id": "prod-30",
    "name": "Aura Slide X",
    "slug": "aura-slide-x",
    "sku": "SLD-30-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium slides footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Slide X. Designed specifically for slides enthusiasts, it features advanced materials and premium construction.",
    "price": 17199,
    "compare_at_price": 20638,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-slides",
    "tags": [
      "Slides",
      "Aura",
      "X"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-07T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Slides",
      "slug": "slides"
    },
    "media": [
      {
        "id": "m-30-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Slide X",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-30-1",
        "product_id": "prod-30",
        "sku": "SLD-30-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-30-1-UK6",
            "variant_id": "var-30-1",
            "size": "UK 6",
            "quantity": 37
          },
          {
            "id": "inv-30-1-UK7",
            "variant_id": "var-30-1",
            "size": "UK 7",
            "quantity": 5
          },
          {
            "id": "inv-30-1-UK8",
            "variant_id": "var-30-1",
            "size": "UK 8",
            "quantity": 44
          },
          {
            "id": "inv-30-1-UK9",
            "variant_id": "var-30-1",
            "size": "UK 9",
            "quantity": 12
          },
          {
            "id": "inv-30-1-UK11",
            "variant_id": "var-30-1",
            "size": "UK 11",
            "quantity": 11
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.5",
    "review_count": 402
  },
  {
    "id": "prod-31",
    "name": "SOLEVA Formal React",
    "slug": "soleva-formal-react",
    "sku": "FRM-31-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Formal React. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 6699,
    "compare_at_price": 8038,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "SOLEVA",
      "React"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-22T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-31-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1614252236316-f2f3016a3a41?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Formal React",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-31-1",
        "product_id": "prod-31",
        "sku": "FRM-31-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-31-1-UK6",
            "variant_id": "var-31-1",
            "size": "UK 6",
            "quantity": 12
          },
          {
            "id": "inv-31-1-UK7",
            "variant_id": "var-31-1",
            "size": "UK 7",
            "quantity": 42
          },
          {
            "id": "inv-31-1-UK8",
            "variant_id": "var-31-1",
            "size": "UK 8",
            "quantity": 31
          },
          {
            "id": "inv-31-1-UK9",
            "variant_id": "var-31-1",
            "size": "UK 9",
            "quantity": 26
          },
          {
            "id": "inv-31-1-UK10",
            "variant_id": "var-31-1",
            "size": "UK 10",
            "quantity": 47
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.4",
    "review_count": 373
  },
  {
    "id": "prod-32",
    "name": "Apex Sandal Classic",
    "slug": "apex-sandal-classic",
    "sku": "SND-32-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sandals footwear by Apex.",
    "description": "Experience unparalleled comfort and style with the Apex Sandal Classic. Designed specifically for sandals enthusiasts, it features advanced materials and premium construction.",
    "price": 9999,
    "compare_at_price": 11998,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sandals",
    "tags": [
      "Sandals",
      "Apex",
      "Classic"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-22T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Apex",
      "slug": "apex"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sandals",
      "slug": "sandals"
    },
    "media": [
      {
        "id": "m-32-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Apex Sandal Classic",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-32-1",
        "product_id": "prod-32",
        "sku": "SND-32-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-32-1-UK6",
            "variant_id": "var-32-1",
            "size": "UK 6",
            "quantity": 30
          },
          {
            "id": "inv-32-1-UK7",
            "variant_id": "var-32-1",
            "size": "UK 7",
            "quantity": 9
          },
          {
            "id": "inv-32-1-UK9",
            "variant_id": "var-32-1",
            "size": "UK 9",
            "quantity": 49
          },
          {
            "id": "inv-32-1-UK10",
            "variant_id": "var-32-1",
            "size": "UK 10",
            "quantity": 20
          },
          {
            "id": "inv-32-1-UK11",
            "variant_id": "var-32-1",
            "size": "UK 11",
            "quantity": 42
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.2",
    "review_count": 477
  },
  {
    "id": "prod-33",
    "name": "SOLEVA Slide Boost",
    "slug": "soleva-slide-boost",
    "sku": "SLD-33-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium slides footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Slide Boost. Designed specifically for slides enthusiasts, it features advanced materials and premium construction.",
    "price": 21199,
    "compare_at_price": 25438,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-slides",
    "tags": [
      "Slides",
      "SOLEVA",
      "Boost"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-23T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Slides",
      "slug": "slides"
    },
    "media": [
      {
        "id": "m-33-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Slide Boost",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-33-1",
        "product_id": "prod-33",
        "sku": "SLD-33-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-33-1-UK6",
            "variant_id": "var-33-1",
            "size": "UK 6",
            "quantity": 36
          },
          {
            "id": "inv-33-1-UK7",
            "variant_id": "var-33-1",
            "size": "UK 7",
            "quantity": 50
          },
          {
            "id": "inv-33-1-UK8",
            "variant_id": "var-33-1",
            "size": "UK 8",
            "quantity": 46
          },
          {
            "id": "inv-33-1-UK9",
            "variant_id": "var-33-1",
            "size": "UK 9",
            "quantity": 25
          },
          {
            "id": "inv-33-1-UK10",
            "variant_id": "var-33-1",
            "size": "UK 10",
            "quantity": 30
          }
        ]
      },
      {
        "id": "var-33-2",
        "product_id": "prod-33",
        "sku": "SLD-33-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-33-2-UK6",
            "variant_id": "var-33-2",
            "size": "UK 6",
            "quantity": 23
          },
          {
            "id": "inv-33-2-UK7",
            "variant_id": "var-33-2",
            "size": "UK 7",
            "quantity": 42
          },
          {
            "id": "inv-33-2-UK8",
            "variant_id": "var-33-2",
            "size": "UK 8",
            "quantity": 47
          },
          {
            "id": "inv-33-2-UK9",
            "variant_id": "var-33-2",
            "size": "UK 9",
            "quantity": 48
          },
          {
            "id": "inv-33-2-UK10",
            "variant_id": "var-33-2",
            "size": "UK 10",
            "quantity": 35
          },
          {
            "id": "inv-33-2-UK11",
            "variant_id": "var-33-2",
            "size": "UK 11",
            "quantity": 5
          }
        ]
      },
      {
        "id": "var-33-3",
        "product_id": "prod-33",
        "sku": "SLD-33-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-33-3-UK8",
            "variant_id": "var-33-3",
            "size": "UK 8",
            "quantity": 12
          },
          {
            "id": "inv-33-3-UK9",
            "variant_id": "var-33-3",
            "size": "UK 9",
            "quantity": 8
          },
          {
            "id": "inv-33-3-UK10",
            "variant_id": "var-33-3",
            "size": "UK 10",
            "quantity": 6
          },
          {
            "id": "inv-33-3-UK11",
            "variant_id": "var-33-3",
            "size": "UK 11",
            "quantity": 18
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.7",
    "review_count": 183
  },
  {
    "id": "prod-34",
    "name": "Aura Formal Air",
    "slug": "aura-formal-air",
    "sku": "FRM-34-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Formal Air. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 8999,
    "compare_at_price": 10798,
    "discount_price": 6479,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "Aura",
      "Air"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-21T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-34-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Formal Air",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-34-1",
        "product_id": "prod-34",
        "sku": "FRM-34-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-34-1-UK6",
            "variant_id": "var-34-1",
            "size": "UK 6",
            "quantity": 45
          },
          {
            "id": "inv-34-1-UK7",
            "variant_id": "var-34-1",
            "size": "UK 7",
            "quantity": 25
          },
          {
            "id": "inv-34-1-UK10",
            "variant_id": "var-34-1",
            "size": "UK 10",
            "quantity": 22
          },
          {
            "id": "inv-34-1-UK11",
            "variant_id": "var-34-1",
            "size": "UK 11",
            "quantity": 27
          }
        ]
      },
      {
        "id": "var-34-2",
        "product_id": "prod-34",
        "sku": "FRM-34-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-34-2-UK6",
            "variant_id": "var-34-2",
            "size": "UK 6",
            "quantity": 36
          },
          {
            "id": "inv-34-2-UK8",
            "variant_id": "var-34-2",
            "size": "UK 8",
            "quantity": 41
          },
          {
            "id": "inv-34-2-UK9",
            "variant_id": "var-34-2",
            "size": "UK 9",
            "quantity": 24
          },
          {
            "id": "inv-34-2-UK10",
            "variant_id": "var-34-2",
            "size": "UK 10",
            "quantity": 27
          },
          {
            "id": "inv-34-2-UK11",
            "variant_id": "var-34-2",
            "size": "UK 11",
            "quantity": 11
          }
        ]
      },
      {
        "id": "var-34-3",
        "product_id": "prod-34",
        "sku": "FRM-34-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-34-3-UK7",
            "variant_id": "var-34-3",
            "size": "UK 7",
            "quantity": 44
          },
          {
            "id": "inv-34-3-UK8",
            "variant_id": "var-34-3",
            "size": "UK 8",
            "quantity": 33
          },
          {
            "id": "inv-34-3-UK9",
            "variant_id": "var-34-3",
            "size": "UK 9",
            "quantity": 46
          },
          {
            "id": "inv-34-3-UK11",
            "variant_id": "var-34-3",
            "size": "UK 11",
            "quantity": 22
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.6",
    "review_count": 443
  },
  {
    "id": "prod-35",
    "name": "SOLEVA Sport Air",
    "slug": "soleva-sport-air",
    "sku": "SPT-35-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sports footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Sport Air. Designed specifically for sports enthusiasts, it features advanced materials and premium construction.",
    "price": 24699,
    "compare_at_price": 29638,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sports",
    "tags": [
      "Sports",
      "SOLEVA",
      "Air"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-19T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sports",
      "slug": "sports"
    },
    "media": [
      {
        "id": "m-35-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Sport Air",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-35-1",
        "product_id": "prod-35",
        "sku": "SPT-35-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-35-1-UK6",
            "variant_id": "var-35-1",
            "size": "UK 6",
            "quantity": 38
          },
          {
            "id": "inv-35-1-UK8",
            "variant_id": "var-35-1",
            "size": "UK 8",
            "quantity": 24
          },
          {
            "id": "inv-35-1-UK9",
            "variant_id": "var-35-1",
            "size": "UK 9",
            "quantity": 14
          },
          {
            "id": "inv-35-1-UK10",
            "variant_id": "var-35-1",
            "size": "UK 10",
            "quantity": 7
          },
          {
            "id": "inv-35-1-UK11",
            "variant_id": "var-35-1",
            "size": "UK 11",
            "quantity": 15
          }
        ]
      },
      {
        "id": "var-35-2",
        "product_id": "prod-35",
        "sku": "SPT-35-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-35-2-UK6",
            "variant_id": "var-35-2",
            "size": "UK 6",
            "quantity": 37
          },
          {
            "id": "inv-35-2-UK7",
            "variant_id": "var-35-2",
            "size": "UK 7",
            "quantity": 40
          },
          {
            "id": "inv-35-2-UK8",
            "variant_id": "var-35-2",
            "size": "UK 8",
            "quantity": 40
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.9",
    "review_count": 7
  },
  {
    "id": "prod-36",
    "name": "Aura Sandal Core",
    "slug": "aura-sandal-core",
    "sku": "SND-36-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sandals footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Sandal Core. Designed specifically for sandals enthusiasts, it features advanced materials and premium construction.",
    "price": 5199,
    "compare_at_price": 6238,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sandals",
    "tags": [
      "Sandals",
      "Aura",
      "Core"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-05T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sandals",
      "slug": "sandals"
    },
    "media": [
      {
        "id": "m-36-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1603487742131-41640b076307?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Sandal Core",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-36-1",
        "product_id": "prod-36",
        "sku": "SND-36-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-36-1-UK6",
            "variant_id": "var-36-1",
            "size": "UK 6",
            "quantity": 33
          },
          {
            "id": "inv-36-1-UK8",
            "variant_id": "var-36-1",
            "size": "UK 8",
            "quantity": 17
          },
          {
            "id": "inv-36-1-UK9",
            "variant_id": "var-36-1",
            "size": "UK 9",
            "quantity": 46
          },
          {
            "id": "inv-36-1-UK10",
            "variant_id": "var-36-1",
            "size": "UK 10",
            "quantity": 48
          },
          {
            "id": "inv-36-1-UK11",
            "variant_id": "var-36-1",
            "size": "UK 11",
            "quantity": 31
          }
        ]
      },
      {
        "id": "var-36-2",
        "product_id": "prod-36",
        "sku": "SND-36-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-36-2-UK6",
            "variant_id": "var-36-2",
            "size": "UK 6",
            "quantity": 47
          },
          {
            "id": "inv-36-2-UK7",
            "variant_id": "var-36-2",
            "size": "UK 7",
            "quantity": 13
          },
          {
            "id": "inv-36-2-UK8",
            "variant_id": "var-36-2",
            "size": "UK 8",
            "quantity": 43
          },
          {
            "id": "inv-36-2-UK9",
            "variant_id": "var-36-2",
            "size": "UK 9",
            "quantity": 24
          },
          {
            "id": "inv-36-2-UK10",
            "variant_id": "var-36-2",
            "size": "UK 10",
            "quantity": 49
          },
          {
            "id": "inv-36-2-UK11",
            "variant_id": "var-36-2",
            "size": "UK 11",
            "quantity": 16
          }
        ]
      },
      {
        "id": "var-36-3",
        "product_id": "prod-36",
        "sku": "SND-36-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-36-3-UK6",
            "variant_id": "var-36-3",
            "size": "UK 6",
            "quantity": 21
          },
          {
            "id": "inv-36-3-UK7",
            "variant_id": "var-36-3",
            "size": "UK 7",
            "quantity": 47
          },
          {
            "id": "inv-36-3-UK8",
            "variant_id": "var-36-3",
            "size": "UK 8",
            "quantity": 14
          },
          {
            "id": "inv-36-3-UK9",
            "variant_id": "var-36-3",
            "size": "UK 9",
            "quantity": 16
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.7",
    "review_count": 240
  },
  {
    "id": "prod-37",
    "name": "Stride Boot Elite",
    "slug": "stride-boot-elite",
    "sku": "BOT-37-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium boots footwear by Stride.",
    "description": "Experience unparalleled comfort and style with the Stride Boot Elite. Designed specifically for boots enthusiasts, it features advanced materials and premium construction.",
    "price": 18899,
    "compare_at_price": 22678,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-boots",
    "tags": [
      "Boots",
      "Stride",
      "Elite"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-30T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Stride",
      "slug": "stride"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Boots",
      "slug": "boots"
    },
    "media": [
      {
        "id": "m-37-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Stride Boot Elite",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-37-1",
        "product_id": "prod-37",
        "sku": "BOT-37-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-37-1-UK6",
            "variant_id": "var-37-1",
            "size": "UK 6",
            "quantity": 41
          },
          {
            "id": "inv-37-1-UK7",
            "variant_id": "var-37-1",
            "size": "UK 7",
            "quantity": 20
          },
          {
            "id": "inv-37-1-UK8",
            "variant_id": "var-37-1",
            "size": "UK 8",
            "quantity": 38
          },
          {
            "id": "inv-37-1-UK9",
            "variant_id": "var-37-1",
            "size": "UK 9",
            "quantity": 46
          },
          {
            "id": "inv-37-1-UK10",
            "variant_id": "var-37-1",
            "size": "UK 10",
            "quantity": 32
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.7",
    "review_count": 431
  },
  {
    "id": "prod-38",
    "name": "Aura Sneaker Max",
    "slug": "aura-sneaker-max",
    "sku": "SNK-38-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Sneaker Max. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 16699,
    "compare_at_price": 20038,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Aura",
      "Max"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-02T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-38-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595950653106-6c9ec61b9752?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Sneaker Max",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-38-1",
        "product_id": "prod-38",
        "sku": "SNK-38-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-38-1-UK6",
            "variant_id": "var-38-1",
            "size": "UK 6",
            "quantity": 49
          },
          {
            "id": "inv-38-1-UK7",
            "variant_id": "var-38-1",
            "size": "UK 7",
            "quantity": 33
          },
          {
            "id": "inv-38-1-UK9",
            "variant_id": "var-38-1",
            "size": "UK 9",
            "quantity": 18
          },
          {
            "id": "inv-38-1-UK10",
            "variant_id": "var-38-1",
            "size": "UK 10",
            "quantity": 16
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.6",
    "review_count": 459
  },
  {
    "id": "prod-39",
    "name": "Nimbus Formal Max",
    "slug": "nimbus-formal-max",
    "sku": "FRM-39-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by Nimbus.",
    "description": "Experience unparalleled comfort and style with the Nimbus Formal Max. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 16299,
    "compare_at_price": 19558,
    "discount_price": 12550,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "Nimbus",
      "Max"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-05-26T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Men",
    "brand": {
      "name": "Nimbus",
      "slug": "nimbus"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-39-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1614252236316-f2f3016a3a41?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Nimbus Formal Max",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-39-1",
        "product_id": "prod-39",
        "sku": "FRM-39-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-39-1-UK8",
            "variant_id": "var-39-1",
            "size": "UK 8",
            "quantity": 35
          },
          {
            "id": "inv-39-1-UK9",
            "variant_id": "var-39-1",
            "size": "UK 9",
            "quantity": 29
          },
          {
            "id": "inv-39-1-UK10",
            "variant_id": "var-39-1",
            "size": "UK 10",
            "quantity": 10
          },
          {
            "id": "inv-39-1-UK11",
            "variant_id": "var-39-1",
            "size": "UK 11",
            "quantity": 18
          }
        ]
      },
      {
        "id": "var-39-2",
        "product_id": "prod-39",
        "sku": "FRM-39-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-39-2-UK6",
            "variant_id": "var-39-2",
            "size": "UK 6",
            "quantity": 20
          },
          {
            "id": "inv-39-2-UK7",
            "variant_id": "var-39-2",
            "size": "UK 7",
            "quantity": 34
          },
          {
            "id": "inv-39-2-UK8",
            "variant_id": "var-39-2",
            "size": "UK 8",
            "quantity": 23
          },
          {
            "id": "inv-39-2-UK9",
            "variant_id": "var-39-2",
            "size": "UK 9",
            "quantity": 46
          },
          {
            "id": "inv-39-2-UK10",
            "variant_id": "var-39-2",
            "size": "UK 10",
            "quantity": 8
          },
          {
            "id": "inv-39-2-UK11",
            "variant_id": "var-39-2",
            "size": "UK 11",
            "quantity": 22
          }
        ]
      },
      {
        "id": "var-39-3",
        "product_id": "prod-39",
        "sku": "FRM-39-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-39-3-UK6",
            "variant_id": "var-39-3",
            "size": "UK 6",
            "quantity": 48
          },
          {
            "id": "inv-39-3-UK7",
            "variant_id": "var-39-3",
            "size": "UK 7",
            "quantity": 5
          },
          {
            "id": "inv-39-3-UK8",
            "variant_id": "var-39-3",
            "size": "UK 8",
            "quantity": 37
          },
          {
            "id": "inv-39-3-UK9",
            "variant_id": "var-39-3",
            "size": "UK 9",
            "quantity": 31
          },
          {
            "id": "inv-39-3-UK10",
            "variant_id": "var-39-3",
            "size": "UK 10",
            "quantity": 5
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.9",
    "review_count": 464
  },
  {
    "id": "prod-40",
    "name": "Velocity Sneaker Core",
    "slug": "velocity-sneaker-core",
    "sku": "SNK-40-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sneakers footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Sneaker Core. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.",
    "price": 22299,
    "compare_at_price": 26758,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sneakers",
    "tags": [
      "Sneakers",
      "Velocity",
      "Core"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": true,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.429Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-20T18:02:25.429Z",
    "updated_at": "2026-08-23T18:02:25.429Z",
    "gender": "Unisex",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sneakers",
      "slug": "sneakers"
    },
    "media": [
      {
        "id": "m-40-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Sneaker Core",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-40-1",
        "product_id": "prod-40",
        "sku": "SNK-40-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-40-1-UK6",
            "variant_id": "var-40-1",
            "size": "UK 6",
            "quantity": 6
          },
          {
            "id": "inv-40-1-UK7",
            "variant_id": "var-40-1",
            "size": "UK 7",
            "quantity": 12
          },
          {
            "id": "inv-40-1-UK8",
            "variant_id": "var-40-1",
            "size": "UK 8",
            "quantity": 40
          },
          {
            "id": "inv-40-1-UK10",
            "variant_id": "var-40-1",
            "size": "UK 10",
            "quantity": 43
          },
          {
            "id": "inv-40-1-UK11",
            "variant_id": "var-40-1",
            "size": "UK 11",
            "quantity": 16
          }
        ]
      },
      {
        "id": "var-40-2",
        "product_id": "prod-40",
        "sku": "SNK-40-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-40-2-UK6",
            "variant_id": "var-40-2",
            "size": "UK 6",
            "quantity": 41
          },
          {
            "id": "inv-40-2-UK7",
            "variant_id": "var-40-2",
            "size": "UK 7",
            "quantity": 32
          },
          {
            "id": "inv-40-2-UK8",
            "variant_id": "var-40-2",
            "size": "UK 8",
            "quantity": 10
          },
          {
            "id": "inv-40-2-UK9",
            "variant_id": "var-40-2",
            "size": "UK 9",
            "quantity": 22
          },
          {
            "id": "inv-40-2-UK10",
            "variant_id": "var-40-2",
            "size": "UK 10",
            "quantity": 50
          },
          {
            "id": "inv-40-2-UK11",
            "variant_id": "var-40-2",
            "size": "UK 11",
            "quantity": 38
          }
        ]
      },
      {
        "id": "var-40-3",
        "product_id": "prod-40",
        "sku": "SNK-40-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-40-3-UK6",
            "variant_id": "var-40-3",
            "size": "UK 6",
            "quantity": 7
          },
          {
            "id": "inv-40-3-UK7",
            "variant_id": "var-40-3",
            "size": "UK 7",
            "quantity": 30
          },
          {
            "id": "inv-40-3-UK8",
            "variant_id": "var-40-3",
            "size": "UK 8",
            "quantity": 23
          },
          {
            "id": "inv-40-3-UK9",
            "variant_id": "var-40-3",
            "size": "UK 9",
            "quantity": 27
          },
          {
            "id": "inv-40-3-UK10",
            "variant_id": "var-40-3",
            "size": "UK 10",
            "quantity": 26
          },
          {
            "id": "inv-40-3-UK11",
            "variant_id": "var-40-3",
            "size": "UK 11",
            "quantity": 28
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.7",
    "review_count": 256
  },
  {
    "id": "prod-41",
    "name": "Apex Sandal Ultra",
    "slug": "apex-sandal-ultra",
    "sku": "SND-41-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sandals footwear by Apex.",
    "description": "Experience unparalleled comfort and style with the Apex Sandal Ultra. Designed specifically for sandals enthusiasts, it features advanced materials and premium construction.",
    "price": 20899,
    "compare_at_price": 25078,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sandals",
    "tags": [
      "Sandals",
      "Apex",
      "Ultra"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": true,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-05-28T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Unisex",
    "brand": {
      "name": "Apex",
      "slug": "apex"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sandals",
      "slug": "sandals"
    },
    "media": [
      {
        "id": "m-41-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Apex Sandal Ultra",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-41-1",
        "product_id": "prod-41",
        "sku": "SND-41-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-41-1-UK6",
            "variant_id": "var-41-1",
            "size": "UK 6",
            "quantity": 25
          },
          {
            "id": "inv-41-1-UK7",
            "variant_id": "var-41-1",
            "size": "UK 7",
            "quantity": 50
          },
          {
            "id": "inv-41-1-UK8",
            "variant_id": "var-41-1",
            "size": "UK 8",
            "quantity": 44
          },
          {
            "id": "inv-41-1-UK10",
            "variant_id": "var-41-1",
            "size": "UK 10",
            "quantity": 46
          },
          {
            "id": "inv-41-1-UK11",
            "variant_id": "var-41-1",
            "size": "UK 11",
            "quantity": 45
          }
        ]
      },
      {
        "id": "var-41-2",
        "product_id": "prod-41",
        "sku": "SND-41-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-41-2-UK6",
            "variant_id": "var-41-2",
            "size": "UK 6",
            "quantity": 6
          },
          {
            "id": "inv-41-2-UK8",
            "variant_id": "var-41-2",
            "size": "UK 8",
            "quantity": 11
          },
          {
            "id": "inv-41-2-UK10",
            "variant_id": "var-41-2",
            "size": "UK 10",
            "quantity": 44
          },
          {
            "id": "inv-41-2-UK11",
            "variant_id": "var-41-2",
            "size": "UK 11",
            "quantity": 43
          }
        ]
      },
      {
        "id": "var-41-3",
        "product_id": "prod-41",
        "sku": "SND-41-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-41-3-UK6",
            "variant_id": "var-41-3",
            "size": "UK 6",
            "quantity": 22
          },
          {
            "id": "inv-41-3-UK7",
            "variant_id": "var-41-3",
            "size": "UK 7",
            "quantity": 7
          },
          {
            "id": "inv-41-3-UK8",
            "variant_id": "var-41-3",
            "size": "UK 8",
            "quantity": 49
          },
          {
            "id": "inv-41-3-UK9",
            "variant_id": "var-41-3",
            "size": "UK 9",
            "quantity": 47
          },
          {
            "id": "inv-41-3-UK10",
            "variant_id": "var-41-3",
            "size": "UK 10",
            "quantity": 40
          },
          {
            "id": "inv-41-3-UK11",
            "variant_id": "var-41-3",
            "size": "UK 11",
            "quantity": 31
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.6",
    "review_count": 51
  },
  {
    "id": "prod-42",
    "name": "Nimbus Boot Max",
    "slug": "nimbus-boot-max",
    "sku": "BOT-42-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium boots footwear by Nimbus.",
    "description": "Experience unparalleled comfort and style with the Nimbus Boot Max. Designed specifically for boots enthusiasts, it features advanced materials and premium construction.",
    "price": 4799,
    "compare_at_price": 5758,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-boots",
    "tags": [
      "Boots",
      "Nimbus",
      "Max"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": true,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-14T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Unisex",
    "brand": {
      "name": "Nimbus",
      "slug": "nimbus"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Boots",
      "slug": "boots"
    },
    "media": [
      {
        "id": "m-42-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Nimbus Boot Max",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-42-1",
        "product_id": "prod-42",
        "sku": "BOT-42-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-42-1-UK7",
            "variant_id": "var-42-1",
            "size": "UK 7",
            "quantity": 47
          },
          {
            "id": "inv-42-1-UK8",
            "variant_id": "var-42-1",
            "size": "UK 8",
            "quantity": 16
          },
          {
            "id": "inv-42-1-UK9",
            "variant_id": "var-42-1",
            "size": "UK 9",
            "quantity": 31
          },
          {
            "id": "inv-42-1-UK10",
            "variant_id": "var-42-1",
            "size": "UK 10",
            "quantity": 8
          },
          {
            "id": "inv-42-1-UK11",
            "variant_id": "var-42-1",
            "size": "UK 11",
            "quantity": 7
          }
        ]
      },
      {
        "id": "var-42-2",
        "product_id": "prod-42",
        "sku": "BOT-42-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-42-2-UK6",
            "variant_id": "var-42-2",
            "size": "UK 6",
            "quantity": 40
          },
          {
            "id": "inv-42-2-UK7",
            "variant_id": "var-42-2",
            "size": "UK 7",
            "quantity": 37
          },
          {
            "id": "inv-42-2-UK8",
            "variant_id": "var-42-2",
            "size": "UK 8",
            "quantity": 6
          },
          {
            "id": "inv-42-2-UK9",
            "variant_id": "var-42-2",
            "size": "UK 9",
            "quantity": 10
          },
          {
            "id": "inv-42-2-UK10",
            "variant_id": "var-42-2",
            "size": "UK 10",
            "quantity": 45
          },
          {
            "id": "inv-42-2-UK11",
            "variant_id": "var-42-2",
            "size": "UK 11",
            "quantity": 29
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.4",
    "review_count": 233
  },
  {
    "id": "prod-43",
    "name": "SOLEVA Boot Zoom",
    "slug": "soleva-boot-zoom",
    "sku": "BOT-43-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium boots footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Boot Zoom. Designed specifically for boots enthusiasts, it features advanced materials and premium construction.",
    "price": 7899,
    "compare_at_price": 9478,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-boots",
    "tags": [
      "Boots",
      "SOLEVA",
      "Zoom"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": true,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-05-27T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Men",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Boots",
      "slug": "boots"
    },
    "media": [
      {
        "id": "m-43-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Boot Zoom",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-43-1",
        "product_id": "prod-43",
        "sku": "BOT-43-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-43-1-UK6",
            "variant_id": "var-43-1",
            "size": "UK 6",
            "quantity": 39
          },
          {
            "id": "inv-43-1-UK8",
            "variant_id": "var-43-1",
            "size": "UK 8",
            "quantity": 17
          },
          {
            "id": "inv-43-1-UK9",
            "variant_id": "var-43-1",
            "size": "UK 9",
            "quantity": 9
          },
          {
            "id": "inv-43-1-UK10",
            "variant_id": "var-43-1",
            "size": "UK 10",
            "quantity": 15
          },
          {
            "id": "inv-43-1-UK11",
            "variant_id": "var-43-1",
            "size": "UK 11",
            "quantity": 35
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.3",
    "review_count": 335
  },
  {
    "id": "prod-44",
    "name": "Aura Sport Essential",
    "slug": "aura-sport-essential",
    "sku": "SPT-44-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sports footwear by Aura.",
    "description": "Experience unparalleled comfort and style with the Aura Sport Essential. Designed specifically for sports enthusiasts, it features advanced materials and premium construction.",
    "price": 24899,
    "compare_at_price": 29878,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sports",
    "tags": [
      "Sports",
      "Aura",
      "Essential"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-12T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Men",
    "brand": {
      "name": "Aura",
      "slug": "aura"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sports",
      "slug": "sports"
    },
    "media": [
      {
        "id": "m-44-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Aura Sport Essential",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-44-1",
        "product_id": "prod-44",
        "sku": "SPT-44-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-44-1-UK6",
            "variant_id": "var-44-1",
            "size": "UK 6",
            "quantity": 49
          },
          {
            "id": "inv-44-1-UK7",
            "variant_id": "var-44-1",
            "size": "UK 7",
            "quantity": 25
          },
          {
            "id": "inv-44-1-UK8",
            "variant_id": "var-44-1",
            "size": "UK 8",
            "quantity": 14
          },
          {
            "id": "inv-44-1-UK9",
            "variant_id": "var-44-1",
            "size": "UK 9",
            "quantity": 5
          },
          {
            "id": "inv-44-1-UK10",
            "variant_id": "var-44-1",
            "size": "UK 10",
            "quantity": 33
          }
        ]
      },
      {
        "id": "var-44-2",
        "product_id": "prod-44",
        "sku": "SPT-44-WHE",
        "color_name": "Wheat Brown",
        "color_hex": "#b45309",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-44-2-UK6",
            "variant_id": "var-44-2",
            "size": "UK 6",
            "quantity": 41
          },
          {
            "id": "inv-44-2-UK7",
            "variant_id": "var-44-2",
            "size": "UK 7",
            "quantity": 40
          },
          {
            "id": "inv-44-2-UK8",
            "variant_id": "var-44-2",
            "size": "UK 8",
            "quantity": 5
          },
          {
            "id": "inv-44-2-UK9",
            "variant_id": "var-44-2",
            "size": "UK 9",
            "quantity": 42
          },
          {
            "id": "inv-44-2-UK10",
            "variant_id": "var-44-2",
            "size": "UK 10",
            "quantity": 25
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.5",
    "review_count": 373
  },
  {
    "id": "prod-45",
    "name": "Stride Boot Elite",
    "slug": "stride-boot-elite",
    "sku": "BOT-45-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium boots footwear by Stride.",
    "description": "Experience unparalleled comfort and style with the Stride Boot Elite. Designed specifically for boots enthusiasts, it features advanced materials and premium construction.",
    "price": 10399,
    "compare_at_price": 12478,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-boots",
    "tags": [
      "Boots",
      "Stride",
      "Elite"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": true,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-05T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Unisex",
    "brand": {
      "name": "Stride",
      "slug": "stride"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Boots",
      "slug": "boots"
    },
    "media": [
      {
        "id": "m-45-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Stride Boot Elite",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-45-1",
        "product_id": "prod-45",
        "sku": "BOT-45-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-45-1-UK6",
            "variant_id": "var-45-1",
            "size": "UK 6",
            "quantity": 16
          },
          {
            "id": "inv-45-1-UK7",
            "variant_id": "var-45-1",
            "size": "UK 7",
            "quantity": 44
          },
          {
            "id": "inv-45-1-UK8",
            "variant_id": "var-45-1",
            "size": "UK 8",
            "quantity": 37
          },
          {
            "id": "inv-45-1-UK9",
            "variant_id": "var-45-1",
            "size": "UK 9",
            "quantity": 45
          },
          {
            "id": "inv-45-1-UK10",
            "variant_id": "var-45-1",
            "size": "UK 10",
            "quantity": 21
          },
          {
            "id": "inv-45-1-UK11",
            "variant_id": "var-45-1",
            "size": "UK 11",
            "quantity": 21
          }
        ]
      },
      {
        "id": "var-45-2",
        "product_id": "prod-45",
        "sku": "BOT-45-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-45-2-UK7",
            "variant_id": "var-45-2",
            "size": "UK 7",
            "quantity": 31
          },
          {
            "id": "inv-45-2-UK9",
            "variant_id": "var-45-2",
            "size": "UK 9",
            "quantity": 28
          },
          {
            "id": "inv-45-2-UK10",
            "variant_id": "var-45-2",
            "size": "UK 10",
            "quantity": 43
          },
          {
            "id": "inv-45-2-UK11",
            "variant_id": "var-45-2",
            "size": "UK 11",
            "quantity": 43
          }
        ]
      },
      {
        "id": "var-45-3",
        "product_id": "prod-45",
        "sku": "BOT-45-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-45-3-UK6",
            "variant_id": "var-45-3",
            "size": "UK 6",
            "quantity": 23
          },
          {
            "id": "inv-45-3-UK7",
            "variant_id": "var-45-3",
            "size": "UK 7",
            "quantity": 22
          },
          {
            "id": "inv-45-3-UK8",
            "variant_id": "var-45-3",
            "size": "UK 8",
            "quantity": 43
          },
          {
            "id": "inv-45-3-UK9",
            "variant_id": "var-45-3",
            "size": "UK 9",
            "quantity": 45
          },
          {
            "id": "inv-45-3-UK11",
            "variant_id": "var-45-3",
            "size": "UK 11",
            "quantity": 31
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.5",
    "review_count": 393
  },
  {
    "id": "prod-46",
    "name": "Nimbus Sandal Elite",
    "slug": "nimbus-sandal-elite",
    "sku": "SND-46-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sandals footwear by Nimbus.",
    "description": "Experience unparalleled comfort and style with the Nimbus Sandal Elite. Designed specifically for sandals enthusiasts, it features advanced materials and premium construction.",
    "price": 9699,
    "compare_at_price": 11638,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sandals",
    "tags": [
      "Sandals",
      "Nimbus",
      "Elite"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-08-08T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Unisex",
    "brand": {
      "name": "Nimbus",
      "slug": "nimbus"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sandals",
      "slug": "sandals"
    },
    "media": [
      {
        "id": "m-46-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Nimbus Sandal Elite",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-46-1",
        "product_id": "prod-46",
        "sku": "SND-46-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-46-1-UK6",
            "variant_id": "var-46-1",
            "size": "UK 6",
            "quantity": 7
          },
          {
            "id": "inv-46-1-UK7",
            "variant_id": "var-46-1",
            "size": "UK 7",
            "quantity": 28
          },
          {
            "id": "inv-46-1-UK8",
            "variant_id": "var-46-1",
            "size": "UK 8",
            "quantity": 23
          },
          {
            "id": "inv-46-1-UK9",
            "variant_id": "var-46-1",
            "size": "UK 9",
            "quantity": 16
          },
          {
            "id": "inv-46-1-UK10",
            "variant_id": "var-46-1",
            "size": "UK 10",
            "quantity": 44
          },
          {
            "id": "inv-46-1-UK11",
            "variant_id": "var-46-1",
            "size": "UK 11",
            "quantity": 34
          }
        ]
      },
      {
        "id": "var-46-2",
        "product_id": "prod-46",
        "sku": "SND-46-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-46-2-UK6",
            "variant_id": "var-46-2",
            "size": "UK 6",
            "quantity": 28
          },
          {
            "id": "inv-46-2-UK7",
            "variant_id": "var-46-2",
            "size": "UK 7",
            "quantity": 23
          },
          {
            "id": "inv-46-2-UK10",
            "variant_id": "var-46-2",
            "size": "UK 10",
            "quantity": 19
          },
          {
            "id": "inv-46-2-UK11",
            "variant_id": "var-46-2",
            "size": "UK 11",
            "quantity": 28
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.7",
    "review_count": 310
  },
  {
    "id": "prod-47",
    "name": "Velocity Sandal Zoom",
    "slug": "velocity-sandal-zoom",
    "sku": "SND-47-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sandals footwear by Velocity.",
    "description": "Experience unparalleled comfort and style with the Velocity Sandal Zoom. Designed specifically for sandals enthusiasts, it features advanced materials and premium construction.",
    "price": 8399,
    "compare_at_price": 10078,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sandals",
    "tags": [
      "Sandals",
      "Velocity",
      "Zoom"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": false,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-26T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Unisex",
    "brand": {
      "name": "Velocity",
      "slug": "velocity"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sandals",
      "slug": "sandals"
    },
    "media": [
      {
        "id": "m-47-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Velocity Sandal Zoom",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-47-1",
        "product_id": "prod-47",
        "sku": "SND-47-OLI",
        "color_name": "Olive Green",
        "color_hex": "#4d7c0f",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-47-1-UK6",
            "variant_id": "var-47-1",
            "size": "UK 6",
            "quantity": 25
          },
          {
            "id": "inv-47-1-UK7",
            "variant_id": "var-47-1",
            "size": "UK 7",
            "quantity": 34
          },
          {
            "id": "inv-47-1-UK8",
            "variant_id": "var-47-1",
            "size": "UK 8",
            "quantity": 15
          },
          {
            "id": "inv-47-1-UK9",
            "variant_id": "var-47-1",
            "size": "UK 9",
            "quantity": 22
          },
          {
            "id": "inv-47-1-UK10",
            "variant_id": "var-47-1",
            "size": "UK 10",
            "quantity": 32
          },
          {
            "id": "inv-47-1-UK11",
            "variant_id": "var-47-1",
            "size": "UK 11",
            "quantity": 6
          }
        ]
      },
      {
        "id": "var-47-2",
        "product_id": "prod-47",
        "sku": "SND-47-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-47-2-UK7",
            "variant_id": "var-47-2",
            "size": "UK 7",
            "quantity": 26
          },
          {
            "id": "inv-47-2-UK8",
            "variant_id": "var-47-2",
            "size": "UK 8",
            "quantity": 8
          },
          {
            "id": "inv-47-2-UK9",
            "variant_id": "var-47-2",
            "size": "UK 9",
            "quantity": 42
          },
          {
            "id": "inv-47-2-UK10",
            "variant_id": "var-47-2",
            "size": "UK 10",
            "quantity": 35
          },
          {
            "id": "inv-47-2-UK11",
            "variant_id": "var-47-2",
            "size": "UK 11",
            "quantity": 41
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.4",
    "review_count": 116
  },
  {
    "id": "prod-48",
    "name": "Apex Formal Boost",
    "slug": "apex-formal-boost",
    "sku": "FRM-48-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium formal footwear by Apex.",
    "description": "Experience unparalleled comfort and style with the Apex Formal Boost. Designed specifically for formal enthusiasts, it features advanced materials and premium construction.",
    "price": 4299,
    "compare_at_price": 5158,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-formal",
    "tags": [
      "Formal",
      "Apex",
      "Boost"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": true,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-06-21T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Unisex",
    "brand": {
      "name": "Apex",
      "slug": "apex"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Formal",
      "slug": "formal"
    },
    "media": [
      {
        "id": "m-48-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Apex Formal Boost",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-48-1",
        "product_id": "prod-48",
        "sku": "FRM-48-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-48-1-UK6",
            "variant_id": "var-48-1",
            "size": "UK 6",
            "quantity": 14
          },
          {
            "id": "inv-48-1-UK7",
            "variant_id": "var-48-1",
            "size": "UK 7",
            "quantity": 8
          },
          {
            "id": "inv-48-1-UK8",
            "variant_id": "var-48-1",
            "size": "UK 8",
            "quantity": 38
          },
          {
            "id": "inv-48-1-UK9",
            "variant_id": "var-48-1",
            "size": "UK 9",
            "quantity": 37
          },
          {
            "id": "inv-48-1-UK10",
            "variant_id": "var-48-1",
            "size": "UK 10",
            "quantity": 40
          },
          {
            "id": "inv-48-1-UK11",
            "variant_id": "var-48-1",
            "size": "UK 11",
            "quantity": 31
          }
        ]
      },
      {
        "id": "var-48-2",
        "product_id": "prod-48",
        "sku": "FRM-48-CRI",
        "color_name": "Crimson Red",
        "color_hex": "#dc2626",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-48-2-UK7",
            "variant_id": "var-48-2",
            "size": "UK 7",
            "quantity": 17
          },
          {
            "id": "inv-48-2-UK8",
            "variant_id": "var-48-2",
            "size": "UK 8",
            "quantity": 14
          },
          {
            "id": "inv-48-2-UK9",
            "variant_id": "var-48-2",
            "size": "UK 9",
            "quantity": 29
          },
          {
            "id": "inv-48-2-UK10",
            "variant_id": "var-48-2",
            "size": "UK 10",
            "quantity": 38
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "3.5",
    "review_count": 64
  },
  {
    "id": "prod-49",
    "name": "SOLEVA Sport Essential",
    "slug": "soleva-sport-essential",
    "sku": "SPT-49-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium sports footwear by SOLEVA.",
    "description": "Experience unparalleled comfort and style with the SOLEVA Sport Essential. Designed specifically for sports enthusiasts, it features advanced materials and premium construction.",
    "price": 10999,
    "compare_at_price": 13198,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-sports",
    "tags": [
      "Sports",
      "SOLEVA",
      "Essential"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": false,
    "is_new_arrival": false,
    "is_best_seller": false,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-07-28T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Men",
    "brand": {
      "name": "SOLEVA",
      "slug": "soleva"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Sports",
      "slug": "sports"
    },
    "media": [
      {
        "id": "m-49-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "SOLEVA Sport Essential",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-49-1",
        "product_id": "prod-49",
        "sku": "SPT-49-COR",
        "color_name": "Core Black",
        "color_hex": "#000000",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-49-1-UK6",
            "variant_id": "var-49-1",
            "size": "UK 6",
            "quantity": 28
          },
          {
            "id": "inv-49-1-UK7",
            "variant_id": "var-49-1",
            "size": "UK 7",
            "quantity": 25
          },
          {
            "id": "inv-49-1-UK8",
            "variant_id": "var-49-1",
            "size": "UK 8",
            "quantity": 39
          },
          {
            "id": "inv-49-1-UK9",
            "variant_id": "var-49-1",
            "size": "UK 9",
            "quantity": 40
          },
          {
            "id": "inv-49-1-UK11",
            "variant_id": "var-49-1",
            "size": "UK 11",
            "quantity": 6
          }
        ]
      },
      {
        "id": "var-49-2",
        "product_id": "prod-49",
        "sku": "SPT-49-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-49-2-UK6",
            "variant_id": "var-49-2",
            "size": "UK 6",
            "quantity": 15
          },
          {
            "id": "inv-49-2-UK7",
            "variant_id": "var-49-2",
            "size": "UK 7",
            "quantity": 27
          },
          {
            "id": "inv-49-2-UK8",
            "variant_id": "var-49-2",
            "size": "UK 8",
            "quantity": 40
          },
          {
            "id": "inv-49-2-UK11",
            "variant_id": "var-49-2",
            "size": "UK 11",
            "quantity": 27
          }
        ]
      },
      {
        "id": "var-49-3",
        "product_id": "prod-49",
        "sku": "SPT-49-MID",
        "color_name": "Midnight Navy",
        "color_hex": "#1e3a8a",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-49-3-UK6",
            "variant_id": "var-49-3",
            "size": "UK 6",
            "quantity": 44
          },
          {
            "id": "inv-49-3-UK7",
            "variant_id": "var-49-3",
            "size": "UK 7",
            "quantity": 8
          },
          {
            "id": "inv-49-3-UK8",
            "variant_id": "var-49-3",
            "size": "UK 8",
            "quantity": 19
          },
          {
            "id": "inv-49-3-UK9",
            "variant_id": "var-49-3",
            "size": "UK 9",
            "quantity": 11
          },
          {
            "id": "inv-49-3-UK10",
            "variant_id": "var-49-3",
            "size": "UK 10",
            "quantity": 42
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.0",
    "review_count": 218
  },
  {
    "id": "prod-50",
    "name": "Nimbus Boot Max",
    "slug": "nimbus-boot-max",
    "sku": "BOT-50-BASE",
    "brand_id": "b1111111-1111-1111-1111-111111111111",
    "collection_id": "c1111111-1111-1111-1111-111111111111",
    "short_description": "Premium boots footwear by Nimbus.",
    "description": "Experience unparalleled comfort and style with the Nimbus Boot Max. Designed specifically for boots enthusiasts, it features advanced materials and premium construction.",
    "price": 21399,
    "compare_at_price": 25678,
    "discount_price": null,
    "currency": "INR",
    "category_id": "cat-boots",
    "tags": [
      "Boots",
      "Nimbus",
      "Max"
    ],
    "badges": [
      "Premium"
    ],
    "is_featured": true,
    "is_new_arrival": true,
    "is_best_seller": true,
    "is_trending": false,
    "is_limited_edition": false,
    "is_sustainable": true,
    "launch_date": "2026-08-23T18:02:25.430Z",
    "specifications": {
      "weight": "300g",
      "material": "premium"
    },
    "care_instructions": "Wipe clean with a damp cloth.",
    "shipping_info": "Free shipping on orders over ₹1,999.",
    "return_info": "30-day easy returns.",
    "status": "published",
    "created_at": "2026-05-25T18:02:25.430Z",
    "updated_at": "2026-08-23T18:02:25.430Z",
    "gender": "Men",
    "brand": {
      "name": "Nimbus",
      "slug": "nimbus"
    },
    "collection": {
      "name": "Summer 24",
      "slug": "summer-24"
    },
    "category": {
      "name": "Boots",
      "slug": "boots"
    },
    "media": [
      {
        "id": "m-50-1",
        "type": "hero",
        "url": "https://images.unsplash.com/photo-1605340629542-f222955f1f7f?auto=format&fit=crop&q=80&w=1000",
        "alt_text": "Nimbus Boot Max",
        "sort_order": 1
      }
    ],
    "variants": [
      {
        "id": "var-50-1",
        "product_id": "prod-50",
        "sku": "BOT-50-COO",
        "color_name": "Cool Grey",
        "color_hex": "#9ca3af",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-50-1-UK6",
            "variant_id": "var-50-1",
            "size": "UK 6",
            "quantity": 25
          },
          {
            "id": "inv-50-1-UK8",
            "variant_id": "var-50-1",
            "size": "UK 8",
            "quantity": 6
          },
          {
            "id": "inv-50-1-UK11",
            "variant_id": "var-50-1",
            "size": "UK 11",
            "quantity": 50
          }
        ]
      },
      {
        "id": "var-50-2",
        "product_id": "prod-50",
        "sku": "BOT-50-TRI",
        "color_name": "Triple White",
        "color_hex": "#ffffff",
        "price_adjustment": 0,
        "images": [],
        "inventory": [
          {
            "id": "inv-50-2-UK7",
            "variant_id": "var-50-2",
            "size": "UK 7",
            "quantity": 14
          },
          {
            "id": "inv-50-2-UK8",
            "variant_id": "var-50-2",
            "size": "UK 8",
            "quantity": 12
          },
          {
            "id": "inv-50-2-UK9",
            "variant_id": "var-50-2",
            "size": "UK 9",
            "quantity": 48
          },
          {
            "id": "inv-50-2-UK10",
            "variant_id": "var-50-2",
            "size": "UK 10",
            "quantity": 14
          },
          {
            "id": "inv-50-2-UK11",
            "variant_id": "var-50-2",
            "size": "UK 11",
            "quantity": 46
          }
        ]
      }
    ],
    "model3d": null,
    "rating": "4.9",
    "review_count": 307
  }
] as unknown as ProductWithDetails[];
