/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
 
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Search, Edit } from 'lucide-react';

export default async function AdminInventoryPage() {
  const supabase = await createClient();
  
  const { data: inventory } = await supabase
    .from('inventory')
    .select(`
      *,
      product_variant:product_variants(
        color_name,
        product:products(name, gender)
      )
    `)
    .order('quantity', { ascending: true }); // Show low stock first

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-widest">Inventory Management</h1>
      </div>

      <div className="bg-secondary/10 border border-border rounded-3xl overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by SKU or Product..." 
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">SKU</th>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Variant (Color)</th>
                <th className="px-6 py-4 font-bold">Size</th>
                <th className="px-6 py-4 font-bold">Quantity</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventory?.map((item: any) => {
                const isLowStock = item.quantity < 10;
                
                return (
                  <tr key={item.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-muted-foreground">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold">{item.product_variant?.product?.name}</p>
                      <p className="text-xs text-muted-foreground">{item.product_variant?.product?.gender}</p>
                    </td>
                    <td className="px-6 py-4">
                      {item.product_variant?.color_name}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {item.size}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        isLowStock ? 'bg-destructive/20 text-destructive' : 'bg-green-500/20 text-green-500'
                      }`}>
                        {item.quantity} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                        <Edit className="w-4 h-4" />
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
