/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
 
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Package, MapPin, Heart, Settings } from 'lucide-react';
import { MagneticButton } from '@/components/motion/MagneticButton';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch profile if exists (mocking standard Supabase setup)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: any };

  return (
    <main className="min-h-screen pt-32 pb-20 container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-10">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-2">
            <Link href="/account" className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl font-bold uppercase tracking-widest text-sm border-l-4 border-primary">
              <Settings className="w-4 h-4" /> Profile
            </Link>
            <Link href="/account/orders" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <Package className="w-4 h-4" /> Orders
            </Link>
            <Link href="/account/addresses" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <MapPin className="w-4 h-4" /> Addresses
            </Link>
            <Link href="/wishlist" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <Heart className="w-4 h-4" /> Wishlist
            </Link>

            <form action="/auth/signout" method="post" className="mt-8">
              <button className="flex items-center gap-3 p-4 text-destructive hover:bg-destructive/10 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors w-full text-left">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </form>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 flex flex-col gap-8">
            <div className="bg-secondary/10 border border-border p-8 rounded-3xl">
              <h2 className="text-2xl font-bold uppercase tracking-widest mb-6">Profile Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                  <p className="font-medium p-4 bg-background/50 rounded-xl border border-border">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Name</p>
                  <p className="font-medium p-4 bg-background/50 rounded-xl border border-border">{profile?.first_name || 'Not set'} {profile?.last_name || ''}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium p-4 bg-background/50 rounded-xl border border-border">{profile?.phone || 'Not set'}</p>
                </div>
              </div>

              <MagneticButton className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm">
                Edit Profile
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
