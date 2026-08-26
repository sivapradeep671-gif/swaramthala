/* eslint-disable @typescript-eslint/no-unused-vars */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')
  
  let user = null;
  if (isPlaceholder) {
    // Mock user behavior if placeholder
    user = null; // or mock a user if needed
  } else {
    const { data } = await supabase.auth.getUser()
    user = data.user
  }

  // Protect account routes
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/account')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Protect admin routes (In production, verify role from profiles table)
  if (
    request.nextUrl.pathname.startsWith('/admin')
  ) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
    
    // For demo purposes, we will allow any logged-in user to see /admin,
    // but in a real app you'd fetch the role or use RLS
  }

  // Redirect logged in users away from auth pages
  if (
    user &&
    request.nextUrl.pathname.startsWith('/auth/login')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/account'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
