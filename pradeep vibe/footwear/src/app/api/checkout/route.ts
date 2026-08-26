import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ProductService } from '@/lib/services';
import { logger } from '@/lib/logger';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2026-07-29.dahlia' as any,
});

const RATE_LIMIT = 10;

// Initialize Upstash Redis and Ratelimit only if configured
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT, '1 m'),
    analytics: true,
  });
}

// Fallback in-memory rate limiter for local dev
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const TIME_WINDOW_MS = 60000;

async function checkRateLimit(ip: string): Promise<boolean> {
  // Use distributed Redis rate limiter if configured
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(ip);
      return success;
    } catch (error) {
      logger.error('Redis rate limit error, falling back to memory', error);
      // Fall through to memory limiter if Redis fails
    }
  }

  // Fallback memory limiter
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || (now - record.timestamp > TIME_WINDOW_MS)) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
      logger.warn('Rate limit exceeded', { ip });
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { items, promoCode } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Try to get authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key') {
      logger.warn("Stripe secret key missing, returning mock session.");
      return NextResponse.json({ url: '/checkout?success=true&mock=true' });
    }

    interface CheckoutItem {
      productId: string;
      variantId: string;
      size: string;
      quantity: number;
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const metadataItems: { v: string, s: string, q: number, p: number }[] = [];

    for (const item of items as CheckoutItem[]) {
      // Securely fetch price and validate stock from the database
      const product = await ProductService.getProductById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      const variant = product.variants.find(v => v.id === item.variantId);
      if (!variant) {
        throw new Error(`Variant ${item.variantId} not found`);
      }

      // Check stock
      const inventory = variant.inventory.find((i: { size: string; quantity: number }) => i.size === item.size);
      if (!inventory || inventory.quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name} (Size: ${item.size})`);
      }

      // Calculate correct price
      const basePrice = product.discount_price || product.price;
      const priceAdjustment = variant.price_adjustment || 0;
      const finalPrice = basePrice + priceAdjustment;

      // Extract primary image
      const primaryImage = product.media?.find(m => m.type === 'hero')?.url || product.media?.[0]?.url || 'https://via.placeholder.com/150';

      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.name,
            images: [primaryImage],
            description: `Variant: ${variant.color_name} | Size: ${item.size}`,
          },
          unit_amount: Math.round(finalPrice * 100),
        },
        quantity: item.quantity,
      });

      metadataItems.push({
        v: variant.id,
        s: item.size,
        q: item.quantity,
        p: finalPrice
      });
    }

    // Calculate Subtotal
    const subtotal = lineItems.reduce((acc, item) => acc + (item.price_data?.unit_amount || 0) * (item.quantity || 1), 0);
    
    // Shipping Logic
    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [];
    if (subtotal >= 200000) { // 2000 INR in paise
      shippingOptions.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'inr' },
          display_name: 'Free Premium Delivery',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 5 },
          },
        },
      });
    } else {
      shippingOptions.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 15000, currency: 'inr' }, // 150 INR
          display_name: 'Standard Delivery',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 5 },
          },
        },
      });
    }

    // Discounts
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (promoCode === 'SOLEVA10') {
      // In a real app, you would create this coupon in the Stripe dashboard beforehand.
      // We pass the coupon ID here.
      discounts.push({ coupon: 'SOLEVA10' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['IN', 'US', 'GB', 'AE', 'AU', 'CA'],
      },
      shipping_options: shippingOptions,
      discounts: discounts.length > 0 ? discounts : undefined,
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(metadataItems)
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout?canceled=true`,
      client_reference_id: user?.id || undefined,
    });

    logger.info('Checkout session created', { sessionId: session.id, ip });
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    logger.error('Error creating Stripe session', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
