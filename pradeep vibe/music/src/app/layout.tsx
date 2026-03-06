import type { Metadata, Viewport } from 'next';


import { Inter, Syne, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import MusicPlayer from './components/MusicPlayer';
import PageTransition from './components/PageTransition';
import { getUser } from './actions/auth';
import ToastProvider from './components/Toast';
import AOSInit from './components/AOSInit';
import LocomotiveInit from './components/LocomotiveInit';
import AiAssistant from './components/AiAssistant';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Swaramthala – India\'s Premier Musical Instrument Marketplace',
  description: 'Buy, sell, rent, and trade musical instruments. From vintage guitars to modern studio gear, find your sound on Swaramthala. Verified sellers, secure payments, and nationwide shipping.',
  keywords: 'musical instruments, buy guitar India, sell keyboard, rent drums, music gear marketplace, Swaramthala, used instruments India',
  manifest: '/manifest.json',
  authors: [{ name: 'Swaramthala Team' }],
  creator: 'Swaramthala',
  publisher: 'Swaramthala',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Swaramthala',
  },
  openGraph: {
    title: 'Swaramthala – Musical Instrument Marketplace',
    description: 'India\'s largest community-driven marketplace for musicians. Buy, Sell, Rent & Trade gear with confidence.',
    url: 'https://swaramthala.in',
    siteName: 'Swaramthala',
    images: [
      {
        url: '/images/og-main.png',
        width: 1200,
        height: 630,
        alt: 'Swaramthala – Find Your Sound',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swaramthala – Musical Instrument Marketplace',
    description: 'Buy, Sell, Rent & Trade musical instruments across India.',
    images: ['/images/og-main.png'],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://swaramthala.in'),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('SW registered');
                }, function(err) {
                  console.log('SW registration failed: ', err);
                });
              });
            }
          `
        }} />
        <LocomotiveInit />
        <AOSInit />
        <Navbar user={user} />
        <main style={{ minHeight: '100vh', position: 'relative' }}>
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <MusicPlayer />
        <AiAssistant />
        <Footer />
        <BottomNav user={user} />
        <ToastProvider />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
