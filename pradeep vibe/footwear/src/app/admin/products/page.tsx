import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { deleteProduct } from '../actions';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      variants:product_variants(
        images:product_images(url)
      )
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-widest">Products</h1>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-secondary/10 border border-border rounded-3xl overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products?.map((product: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                const primaryImage = product.variants?.[0]?.images?.[0]?.url;
                
                return (
                  <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0">
                          {primaryImage && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={primaryImage} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {product.category?.name || '-'}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-500/20 text-green-500">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <Edit className="w-4 h-4" />
                        </button>
                        <form action={async () => {
                          'use server';
                          await deleteProduct(product.id);
                        }}>
                          <button type="submit" className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
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
