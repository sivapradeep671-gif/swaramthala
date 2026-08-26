/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserClient } from '@supabase/ssr'

let client: ReturnType<typeof createBrowserClient<any>> | undefined;

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("CODE FIX COMPLETE — VERCEL ENVIRONMENT CONFIGURATION REQUIRED: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined in your Vercel Environment Variables.");
  }
  
  if (client) return client;
  
  client = createBrowserClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  return client;
}
