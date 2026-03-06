import React from 'react';

export const metadata = { title: 'Privacy Policy | Swaramthala' };

export default function PrivacyPolicyPage() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '64px 24px' }}>
            <div className="container" style={{ maxWidth: 800 }}>
                <div style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)', padding: '48px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', marginBottom: 24 }}>
                        Privacy <span className="gradient-text">Policy</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: '0.95rem' }}>Last Updated: March 2026</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>1. Introduction</h2>
                            <p>Welcome to Swaramthala. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>2. Information We Collect</h2>
                            <p>We collect personal information that you voluntarily provide to us when registering at the Services, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Services or otherwise contacting us.</p>
                            <ul style={{ paddingLeft: 20, marginTop: 12, listStyleType: 'disc' }}>
                                <li>Name and Contact Data</li>
                                <li>Credentials and Auth Data</li>
                                <li>Payment Data (Processed securely via our partners)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>3. How We Use Your Information</h2>
                            <p>We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>4. Will Your Information Be Shared?</h2>
                            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell your personal data to third parties.</p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>5. Contact Us</h2>
                            <p>If you have questions or comments about this policy, you may email us at privacy@swaramthala.in or by post to our registered office in Chennai, Tamil Nadu, India.</p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
