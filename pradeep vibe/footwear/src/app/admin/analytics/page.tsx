/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

export default async function AdminAnalyticsPage() {
  // Demo analytics page
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-widest">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Conversion Rate', value: '4.2%', icon: Target },
          { label: 'Avg Order Value', value: '₹4,500', icon: TrendingUp },
          { label: 'Active Sessions', value: '1,240', icon: Users },
          { label: 'Total Sales', value: '₹12.4L', icon: BarChart3 },
        ].map(stat => (
          <div key={stat.label} className="bg-secondary/10 border border-border p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-secondary/10 border border-border rounded-3xl p-8 h-[400px] flex flex-col items-center justify-center text-center">
          <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold uppercase tracking-widest mb-2">Sales Over Time</h2>
          <p className="text-muted-foreground">Chart integration pending.</p>
        </div>
        <div className="bg-secondary/10 border border-border rounded-3xl p-8 h-[400px] flex flex-col items-center justify-center text-center">
          <Target className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold uppercase tracking-widest mb-2">Top Performing Categories</h2>
          <p className="text-muted-foreground">Chart integration pending.</p>
        </div>
      </div>
    </div>
  );
}
