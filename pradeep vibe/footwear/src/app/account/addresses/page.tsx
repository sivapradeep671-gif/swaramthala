import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Settings, Package, MapPin, Heart, Plus } from 'lucide-react';
import { MagneticButton } from '@/components/motion/MagneticButton';

export default async function AddressesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // In a complete production app, addresses would be fetched from a dedicated 'addresses' table
  // Here we mock the view to show the layout and structure for Phase 7
  const mockAddresses = [
    {
      id: '1',
      isDefault: true,
      name: 'Home',
      street: '123 Sol Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      country: 'India',
      phone: '+91 9876543210'
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-10">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-2">
            <Link href="/account" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <Settings className="w-4 h-4" /> Profile
            </Link>
            <Link href="/account/orders" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <Package className="w-4 h-4" /> Orders
            </Link>
            <Link href="/account/addresses" className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl font-bold uppercase tracking-widest text-sm border-l-4 border-primary">
              <MapPin className="w-4 h-4" /> Addresses
            </Link>
            <Link href="/wishlist" className="flex items-center gap-3 p-4 hover:bg-secondary/20 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors text-muted-foreground hover:text-foreground">
              <Heart className="w-4 h-4" /> Wishlist
            </Link>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold uppercase tracking-widest">Saved Addresses</h2>
              <button className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:opacity-80 transition-opacity">
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAddresses.map(address => (
                <div key={address.id} className={`bg-secondary/10 border ${address.isDefault ? 'border-primary' : 'border-border'} p-8 rounded-3xl relative flex flex-col justify-between`}>
                  {address.isDefault && (
                    <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      Default
                    </span>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-black uppercase mb-4">{address.name}</h3>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground font-medium">
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} {address.zip}</p>
                      <p>{address.country}</p>
                      <p className="mt-4 pt-4 border-t border-border">{address.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <MagneticButton as="button" className="px-6 py-2 bg-foreground text-background font-bold uppercase tracking-widest text-xs rounded-xl hover:opacity-90 transition-opacity">
                      Edit
                    </MagneticButton>
                    <button className="text-destructive font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
