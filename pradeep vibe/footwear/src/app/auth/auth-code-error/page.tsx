import React from 'react';
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 flex items-center justify-center container mx-auto px-4 text-center">
      <div>
        <h1 className="text-4xl font-heading font-black uppercase tracking-tighter mb-4 text-destructive">
          Authentication Error
        </h1>
        <p className="text-muted-foreground mb-8">
          There was a problem signing you in. The magic link may have expired or is invalid.
        </p>
        <Link href="/auth/login" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm">
          Try Again
        </Link>
      </div>
    </main>
  );
}
