/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
 
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Plus, Box, Edit } from 'lucide-react';
import { format } from 'date-fns';

export default async function AdminModelsPage() {
  const supabase = await createClient();
  
  const { data: models } = await supabase
    .from('product_3d_models')
    .select(`
      *,
      product:products(name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-widest">3D Models</h1>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" /> Upload GLB
        </button>
      </div>

      <div className="bg-secondary/10 border border-border rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Preview</th>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Model URL</th>
                <th className="px-6 py-4 font-bold">Uploaded</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {models?.map((model: any) => {
                return (
                  <tr key={model.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center">
                        <Box className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {model.product?.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-muted-foreground truncate block max-w-[200px]" title={model.model_url}>
                        {model.model_url.split('/').pop()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(model.created_at), 'MMM dd, yyyy')}
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
