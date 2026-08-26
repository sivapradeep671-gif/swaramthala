/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
 
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default async function AdminCouponsPage() {
  const supabase = await createClient();
  
  const { data: coupons } = await supabase
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-widest">Coupons</h1>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="bg-secondary/10 border border-border rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Code</th>
                <th className="px-6 py-4 font-bold">Discount</th>
                <th className="px-6 py-4 font-bold">Min Order</th>
                <th className="px-6 py-4 font-bold">Valid Until</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {coupons?.map((coupon: any) => {
                const isActive = coupon.is_active && (!coupon.valid_until || new Date(coupon.valid_until) > new Date());
                
                return (
                  <tr key={coupon.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">{coupon.code}</span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {coupon.min_order_value ? `₹${coupon.min_order_value}` : 'None'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {coupon.valid_until ? format(new Date(coupon.valid_until), 'MMM dd, yyyy') : 'No expiry'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        isActive ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'
                      }`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
