import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const title = searchParams.get('title') || 'Swaramthala';
        const price = searchParams.get('price') || '';
        const image = searchParams.get('image');
        const seller = searchParams.get('seller') || 'Verified Seller';
        const category = searchParams.get('category') || 'Musical Instrument';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0a0a0f',
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0a0a0f 100%)',
                        padding: '40px',
                    }}
                >
                    {/* Background Overlay */}
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            gap: '40px',
                        }}
                    >
                        {/* Image Side */}
                        {image && (
                            <div style={{ display: 'flex', borderRadius: '24px', overflow: 'hidden', border: '4px solid #7c5cfc', boxShadow: '0 20px 40px rgba(124, 92, 252, 0.3)' }}>
                                <img
                                    src={image}
                                    style={{
                                        width: '400px',
                                        height: '400px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        )}

                        {/* Text Side */}
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, color: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c5cfc', fontSize: '20px', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                🎸 {category}
                            </div>
                            <h1 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-2px' }}>
                                {title}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ fontSize: '40px', fontWeight: 900, color: '#c084fc' }}>
                                    {price}
                                </div>
                                <div style={{ height: '30px', width: '2px', backgroundColor: '#3f3f46' }} />
                                <div style={{ fontSize: '24px', color: '#a1a1aa', fontWeight: 600 }}>
                                    by {seller}
                                </div>
                            </div>
                            <div style={{ display: 'flex', padding: '12px 32px', borderRadius: '40px', background: 'linear-gradient(to right, #7c5cfc, #c084fc)', color: 'white', fontSize: '24px', fontWeight: 800, width: 'fit-content' }}>
                                View on Swaramthala →
                            </div>
                        </div>
                    </div>

                    {/* Branding */}
                    <div style={{ position: 'absolute', bottom: '40px', right: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '28px', fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>
                            Swaramthala<span style={{ color: '#7c5cfc' }}>.in</span>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
