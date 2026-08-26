/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
 
 
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Search, Eye, Truck, Package } from 'lucide-react';
import { format } from 'date-fns';

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      profile:profiles(first_name, last_name, email),
      order_items(count)
    `)
    .order('created_at', { ascending: false });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-widest">Orders</h1>
      </div>

      <div className="bg-secondary/10 border border-border rounded-3xl overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders?.map((order: any) => {
                return (
                  <tr key={order.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-primary">
                      #{order.id.split('-')[0].toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold">{order.profile?.first_name || 'Guest'} {order.profile?.last_name || ''}</p>
                      <p className="text-xs text-muted-foreground">{order.profile?.email || 'No email'}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {formatPrice(order.total_amount)}
                      <p className="text-xs text-muted-foreground font-normal">
                        {/* @ts-ignore */}
                        {order.order_items?.[0]?.count || 0} items
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <Package className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <Truck className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
