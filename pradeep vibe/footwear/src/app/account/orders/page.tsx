/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Settings, Package, MapPin, Heart, ChevronRight, Truck } from 'lucide-react';
import { format } from 'date-fns';

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch orders
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-10">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-2">
            <Link href="/account" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <Settings className="w-4 h-4" /> Profile
            </Link>
            <Link href="/account/orders" className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl font-bold uppercase tracking-widest text-sm border-l-4 border-primary">
              <Package className="w-4 h-4" /> Orders
            </Link>
            <Link href="/account/addresses" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <MapPin className="w-4 h-4" /> Addresses
            </Link>
            <Link href="/wishlist" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <Heart className="w-4 h-4" /> Wishlist
            </Link>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">Order History</h2>
            
            {(!orders || orders.length === 0) ? (
              <div className="bg-secondary/10 border border-border p-12 rounded-3xl text-center flex flex-col items-center">
                <Package className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-lg font-bold">You haven't placed any orders yet.</p>
                <Link href="/shop" className="mt-6 text-primary hover:underline font-bold uppercase tracking-widest text-sm">
                  Start Shopping
                </Link>
              </div>
            ) : (
              orders.map((order: any) => (
                <div key={order.id} className="bg-secondary/10 border border-border p-6 rounded-3xl flex flex-col gap-6 hover:border-primary/30 transition-colors">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Order ID</p>
                      <p className="font-mono text-sm mt-1">{order.id.split('-')[0].toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date Placed</p>
                      <p className="font-medium text-sm mt-1">{format(new Date(order.created_at), 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Amount</p>
                      <p className="font-bold text-sm mt-1">{formatPrice(order.total_amount)}</p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-4">
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-secondary/30 rounded-xl flex items-center justify-center shrink-0">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{item.product_name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.color_name} | Size: {item.size} | Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-bold text-sm">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Button */}
                  <div className="pt-4 border-t border-border flex justify-end">
                    <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                      <Truck className="w-4 h-4" /> Track Order <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

          </div>

        </div>
      </div>
    </main>
  );
}
