import React from 'react';

export const metadata = { title: 'Terms of Service | Swaramthala' };

export default function TermsOfServicePage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '64px 24px' }}>
            <div className="container" style={{ maxWidth: 800 }}>
                <div style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)', padding: '48px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', marginBottom: 24 }}>
                        Terms of <span className="gradient-text">Service</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: '0.95rem' }}>Effective Date: March 2026</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>1. Agreement to Terms</h2>
                            <p>By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using the application.</p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>2. Marketplace Rules</h2>
                            <p>Swaramthala acts solely as an intermediary matching buyers with sellers. We are not responsible for the ultimate quality, safety, or legality of the musical instruments listed. Sellers are expected to represent their items honestly and ship them promptly upon payment.</p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>3. User Accounts</h2>
                            <p>You are responsible for safeguarding the password or OTP mechanism that you use to access the Service and for any activities or actions under your password. Swaramthala cannot and will not be liable for any loss or damage arising from your failure to comply with the above.</p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>4. Prohibited Uses</h2>
                            <p>You may not use the Service for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>5. Dispute Resolution</h2>
                            <p>Any disputes arising out of the use of Swaramthala will be resolved in accordance with the laws of India, strictly governed by the jurisdiction of the courts in Chennai, Tamil Nadu.</p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
