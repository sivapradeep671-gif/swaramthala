import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Users, ShoppingBag, IndianRupee, TrendingUp } from 'lucide-react';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch real counts from DB
  const [{ count: productsCount }, { count: ordersCount }, { count: customersCount }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    { name: 'Total Revenue', value: '₹12,45,000', icon: IndianRupee, trend: '+14.2%' },
    { name: 'Orders', value: ordersCount || 0, icon: ShoppingBag, trend: '+5.4%' },
    { name: 'Customers', value: customersCount || 0, icon: Users, trend: '+12.1%' },
    { name: 'Products', value: productsCount || 0, icon: TrendingUp, trend: '0.0%' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-heading font-black uppercase tracking-widest mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-secondary/20 border border-border p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-background rounded-lg border border-border">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-1">{stat.name}</h3>
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-secondary/10 border border-border rounded-3xl p-8 min-h-[400px]">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6">Revenue Overview</h2>
          <div className="flex items-center justify-center h-64 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            [Chart Area Placeholder - Integrates with Recharts]
          </div>
        </div>
        
        <div className="lg:col-span-1 bg-secondary/10 border border-border rounded-3xl p-8">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6">Recent Orders</h2>
          <div className="flex items-center justify-center h-64 text-muted-foreground text-center px-4">
            Order feed will appear here as purchases are completed.
          </div>
        </div>
      </div>
    </div>
  );
}
