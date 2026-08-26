/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
 
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Star, Trash2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default async function AdminReviewsPage() {
  const supabase = await createClient();
  
  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      profile:profiles(first_name, last_name),
      product:products(name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-black uppercase tracking-widest">Reviews</h1>
      </div>

      <div className="bg-secondary/10 border border-border rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Rating</th>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Review</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reviews?.map((review: any) => {
                return (
                  <tr key={review.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold">{review.rating}/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-muted-foreground">
                      {review.product?.name}
                    </td>
                    <td className="px-6 py-4">
                      {review.profile?.first_name} {review.profile?.last_name}
                      {review.is_verified_purchase && (
                        <span className="flex items-center gap-1 text-[10px] text-green-500 mt-1 uppercase tracking-widest font-bold">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-bold mb-1">{review.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{review.content}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(review.created_at), 'MMM dd, yyyy')}
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
