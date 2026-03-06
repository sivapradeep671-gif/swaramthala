import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'session';

// Routes that require authentication (any signed-in user)
const AUTH_REQUIRED = [
    '/dashboard',
    '/settings',
    '/sell',
    '/checkout',
    '/messages',
    '/favorites',
    '/cart',
];

// Routes that require admin role — full role check is in the page (DB needed)
// Middleware only checks cookie presence here; page does the DB role check
const ADMIN_REQUIRED = ['/admin'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(SESSION_COOKIE)?.value;

    const needsAdmin = ADMIN_REQUIRED.some(r => pathname.startsWith(r));
    const needsAuth = AUTH_REQUIRED.some(r => pathname.startsWith(r));

    let response = NextResponse.next();

    if ((needsAdmin || needsAuth) && !token) {
        const loginUrl = new URL('/auth', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        response = NextResponse.redirect(loginUrl);
    }

    // ─── Security Headers (single source of truth) ────────────────────────────
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https://picsum.photos https://images.unsplash.com https://source.unsplash.com https://i.imgur.com https://res.cloudinary.com https://storage.googleapis.com",
            "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join('; ')
    );

    return response;
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard',
        '/settings',
        '/sell',
        '/checkout',
        '/messages',
        '/favorites',
        '/cart',
    ],
};

