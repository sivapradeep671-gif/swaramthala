import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2026-07-29.dahlia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Service role client bypasses RLS for secure backend operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      logger.warn('Webhook signature missing or secret unconfigured');
      return NextResponse.json({ error: 'Webhook signature missing' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      logger.error('Webhook signature verification failed', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Idempotency Check
    const { error: idempError } = await supabaseAdmin
      .from('webhook_events')
      .insert({ id: event.id, type: event.type });

    if (idempError) {
      if (idempError.code === '23505') { // Unique violation
        logger.info('Webhook already processed (idempotent)', { eventId: event.id });
        return NextResponse.json({ received: true });
      }
      logger.error('Error recording webhook idempotency', idempError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Handle checkout session completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const metadataItemsStr = session.metadata?.items;
      if (!metadataItemsStr) {
        logger.error('No metadata items found in session', { sessionId: session.id });
        return NextResponse.json({ error: 'No items in metadata' }, { status: 400 });
      }

      let items: { v: string, s: string, q: number, p: number }[];
      try {
        items = JSON.parse(metadataItemsStr);
      } catch (err) {
        logger.error('Failed to parse metadata items', err);
        return NextResponse.json({ error: 'Invalid metadata format' }, { status: 400 });
      }

      // Create Order
      const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          user_id: session.client_reference_id || null, // Allow guest checkout securely
          status: 'paid',
          total_amount: (session.amount_total || 0) / 100,
          stripe_session_id: session.id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          shipping_address: (session as any).shipping_details?.address || null,
        })
        .select('id')
        .single();

      if (orderError || !order) {
        logger.error('Failed to create order', orderError);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
      }

      const orderItemsToInsert = [];

      for (const item of items) {
        // Atomic Inventory Decrement
        const { data: decResult, error: decError } = await supabaseAdmin.rpc('decrement_inventory', {
          p_variant_id: item.v,
          p_size: item.s,
          p_quantity: item.q
        });

        if (decError) {
          logger.error('Inventory decrement RPC failed', decError);
          // In a robust system, we would queue a manual refund or DLQ here
        } else if (!decResult) {
          logger.warn('Insufficient inventory during fulfillment', { variantId: item.v, size: item.s });
          // In a robust system, we would queue a manual refund here
        }

        orderItemsToInsert.push({
          order_id: order.id,
          variant_id: item.v,
          size: item.s,
          quantity: item.q,
          price_at_time: item.p
        });
      }

      // Insert Order Items
      const { error: itemsError } = await supabaseAdmin
        .from('order_items')
        .insert(orderItemsToInsert);

      if (itemsError) {
        logger.error('Failed to insert order items', itemsError);
      }

      logger.info('Checkout session fulfilled successfully', { sessionId: session.id, orderId: order.id });
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    logger.error('Unhandled webhook error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
