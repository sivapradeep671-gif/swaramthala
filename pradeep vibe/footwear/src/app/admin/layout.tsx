/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut, Tag, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware already protects this, but good to have double check
  if (!user) {
    redirect('/auth/login');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Inventory', href: '/admin/inventory', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: Tag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
    { name: '3D Models', href: '/admin/3d-models', icon: Package },
    { name: 'Analytics', href: '/admin/analytics', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-24">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-secondary/30 border-r border-border flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-heading font-black uppercase tracking-widest text-primary">Admin Panel</h2>
          <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
        </div>
        
        <nav className="flex-1 px-4 flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
              >
                <Icon className="w-4 h-4" /> {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <form action="/auth/signout" method="post">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs text-destructive hover:bg-destructive/10 transition-colors w-full">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
