import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { randomBytes, createHmac } from 'crypto';
import { prisma } from './db';

const SESSION_COOKIE = 'session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SESSION_SECRET = process.env.SESSION_SECRET || '';

if (!SESSION_SECRET && process.env.NODE_ENV === 'production') {
    console.error('[AUTH] CRITICAL: SESSION_SECRET is not set. Session tokens will not be signed!');
}

// ─── Token Signing ────────────────────────────────────────────────────────────

function signToken(token: string): string {
    if (!SESSION_SECRET) return token;
    const sig = createHmac('sha256', SESSION_SECRET).update(token).digest('hex');
    return `${token}.${sig}`;
}

function verifyAndExtractToken(signedToken: string): string | null {
    if (!SESSION_SECRET) return signedToken; // no signing configured

    const dotIdx = signedToken.lastIndexOf('.');
    if (dotIdx === -1) return null;

    const token = signedToken.substring(0, dotIdx);
    const sig = signedToken.substring(dotIdx + 1);

    const expectedSig = createHmac('sha256', SESSION_SECRET).update(token).digest('hex');

    // Constant-time comparison
    if (sig.length !== expectedSig.length) return null;
    let mismatch = 0;
    for (let i = 0; i < sig.length; i++) {
        mismatch |= sig.charCodeAt(i) ^ expectedSig.charCodeAt(i);
    }
    return mismatch === 0 ? token : null;
}

// ─── Session Management ───────────────────────────────────────────────────────

export async function createSession(userId: string): Promise<string> {
    const token = randomBytes(32).toString('hex'); // 64-char hex, cryptographically strong
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await prisma.session.create({ data: { token, userId, expiresAt } });
    return token;
}

export function setSessionCookie(token: string) {
    const signedValue = signToken(token);
    cookies().set(SESSION_COOKIE, signedValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

export async function getSession() {
    const rawCookie = cookies().get(SESSION_COOKIE)?.value;
    if (!rawCookie) return null;

    const token = verifyAndExtractToken(rawCookie);
    if (!token) {
        // Invalid signature — tampered cookie
        cookies().delete(SESSION_COOKIE);
        return null;
    }

    const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!session) return null;

    // Expired session — clean it up
    if (session.expiresAt < new Date()) {
        await prisma.session.delete({ where: { token } }).catch(() => null);
        cookies().delete(SESSION_COOKIE);
        return null;
    }

    return session.user;
}

export async function deleteSession() {
    const rawCookie = cookies().get(SESSION_COOKIE)?.value;
    if (rawCookie) {
        const token = verifyAndExtractToken(rawCookie);
        if (token) {
            await prisma.session.deleteMany({ where: { token } }).catch(() => null);
        }
    }
    cookies().delete(SESSION_COOKIE);
}

// ─── Route Guards (use in Server Components & Pages) ─────────────────────────

/** Requires an authenticated user. Redirects to /auth if not logged in. */
export async function requireAuth() {
    const user = await getSession();
    if (!user) redirect('/auth');
    if (user.isBlocked) redirect('/auth?error=blocked');
    return user;
}

/** Requires admin role. Redirects to / if not admin. */
export async function requireAdmin() {
    const user = await requireAuth();
    if (user.role !== 'admin') redirect('/');
    return user;
}

// ─── Action Guards (use in Server Actions — returns error instead of redirect) ─

/** Returns the user or an error object. Safe to use inside 'use server' actions. */
export async function getAuthUser(): Promise<{ user: Awaited<ReturnType<typeof getSession>> & object; error?: never } | { error: string; user?: never }> {
    const user = await getSession();
    if (!user) return { error: 'Unauthorized. Please sign in.' };
    if (user.isBlocked) return { error: 'Your account has been suspended.' };
    return { user };
}

/** Returns the admin user or an error object. */
export async function getAdminUser() {
    const result = await getAuthUser();
    if (result.error) return result;
    if (result.user!.role !== 'admin') return { error: 'Forbidden. Admin access required.' };
    return result;
}
