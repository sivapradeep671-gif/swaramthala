import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_fallback', {
    apiVersion: '2026-02-25.clover' as any,
    appInfo: {
        name: 'Swaramthala Marketplace',
        version: '0.1.0',
    },
});
