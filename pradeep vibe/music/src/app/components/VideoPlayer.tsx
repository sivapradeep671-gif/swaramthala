'use client';

import { Play, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
    url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
    const getEmbedUrl = (url: string) => {
        // YouTube
        const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&"'>]+)/);
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

        // Vimeo
        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

        return null;
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) {
        return (
            <div style={{
                padding: '24px', background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                textAlign: 'center'
            }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Preview not available directly. Open link to view:
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ gap: 8 }}
                >
                    Watch Video <ExternalLink size={14} />
                </a>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative', width: '100%', paddingTop: '56.25%', // 16:9 Aspect Ratio
            background: 'black', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>
            <iframe
                src={embedUrl}
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Instrument Demo"
            />
        </div>
    );
}
