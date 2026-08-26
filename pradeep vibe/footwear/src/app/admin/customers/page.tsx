/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
 
 
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Search, Mail } from 'lucide-react';
import { format } from 'date-fns';

export default async function AdminCustomersPage() {
  const supabase = await createClient();
  
  const { data: customers } = await supabase
    .from('profiles')
    .select(`
      *,
      orders(count)
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-widest">Customers</h1>
      </div>

      <div className="bg-secondary/10 border border-border rounded-3xl overflow-hidden">
        
        <div className="p-4 border-b border-border flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Phone</th>
                <th className="px-6 py-4 font-bold">Joined</th>
                <th className="px-6 py-4 font-bold">Total Orders</th>
                <th className="px-6 py-4 font-bold text-right">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers?.map((customer: any) => {
                return (
                  <tr key={customer.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold">{customer.first_name || 'Anonymous'} {customer.last_name || ''}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {customer.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(customer.created_at), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {/* @ts-ignore */}
                      {customer.orders?.[0]?.count || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                        <Mail className="w-4 h-4" />
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
