'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(productId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/products');
  return { success: true };
}

export async function updateInventory(inventoryId: string, quantity: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('inventory')
    .update({ quantity })
    .eq('id', inventoryId);

  if (error) {
    console.error('Error updating inventory:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/inventory');
  return { success: true };
}
