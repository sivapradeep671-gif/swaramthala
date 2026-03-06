'use server';

import { prisma } from '@/lib/db';
import { createSession, setSessionCookie, deleteSession, getSession } from '@/lib/auth';

const PHONE_REGEX = /^\d{10}$/;

// ─── In-memory rate limiter ───────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const otpAttempts = new Map<string, { count: number; firstAttempt: number }>();

function checkRateLimit(phone: string): boolean {
    const now = Date.now();
    const record = otpAttempts.get(phone);

    if (!record || now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
        otpAttempts.set(phone, { count: 1, firstAttempt: now });
        return true; // allowed
    }

    if (record.count >= MAX_ATTEMPTS) {
        return false; // blocked
    }

    record.count++;
    return true; // allowed
}

// ─── OTP bypass flag (development only) ───────────────────────────────────────
// Set SKIP_OTP_VERIFICATION=true in .env.local for local development.
// In production, integrate a real SMS OTP provider (Twilio, MSG91, etc.).
const SKIP_OTP = process.env.SKIP_OTP_VERIFICATION === 'true';

export async function verifyOtp(phone: string, mode: 'login' | 'register') {
    // ── Server-side validation ───────────────────────────────────────
    if (!PHONE_REGEX.test(phone)) {
        return { success: false, error: 'Phone number must be exactly 10 digits.' };
    }

    // ── Rate limiting ────────────────────────────────────────────────
    if (!checkRateLimit(phone)) {
        return { success: false, error: 'Too many attempts. Please wait 15 minutes and try again.' };
    }

    // ── OTP verification gate ────────────────────────────────────────
    // In production, this is where you'd verify the OTP with your SMS provider.
    // For now, OTP is mocked only if SKIP_OTP_VERIFICATION=true.
    if (!SKIP_OTP) {
        // TODO: Replace with real OTP verification (e.g., Twilio Verify API)
        // const isValid = await twilioVerify(phone, otp);
        // if (!isValid) return { success: false, error: 'Invalid OTP. Please try again.' };
        console.warn('[verifyOtp] OTP verification is not configured. Set SKIP_OTP_VERIFICATION=true for dev or integrate an SMS provider.');
    }

    const mockName = `Musician_${phone.slice(-4)}`;

    try {
        // ── Find existing user by phone field ────────────────────────
        let user = await prisma.user.findFirst({
            where: { phone },
        });

        // Backcompat: also check if phone was used as old user id (legacy rows)
        if (!user) {
            user = await prisma.user.findUnique({ where: { id: phone } });
            // Migrate legacy user: stamp phone onto the phone field
            if (user && !user.phone) {
                user = await prisma.user.update({
                    where: { id: phone },
                    data: { phone },
                });
            }
        }

        if (mode === 'register' && user) {
            return { success: false, error: 'An account with this number already exists. Please sign in.' };
        }

        if (!user) {
            // New user — create with a proper UUID (default) and store phone separately
            user = await prisma.user.create({
                data: {
                    name: mockName,
                    avatar: '🎵',
                    city: 'India',
                    memberSince: new Date().getFullYear().toString(),
                    verified: false,
                    role: 'user',
                    phone,
                },
            });
        }

        // ── Create a secure session ──────────────────────────────────
        const token = await createSession(user.id);
        setSessionCookie(token);

        return { success: true };
    } catch (err) {
        console.error('[verifyOtp]', err);
        return { success: false, error: 'Something went wrong. Please try again.' };
    }
}

/** Get the currently logged-in user (safe to call from server components) */
export async function getUser() {
    return await getSession();
}

export async function logout() {
    await deleteSession();
    return { success: true };
}
