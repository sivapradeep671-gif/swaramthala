import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | SOLEVA',
    default: 'SOLEVA | Form. Function. Future.',
  },
  description: "Next Generation Footwear. Engineered for motion, designed for the future. Shop the latest performance and lifestyle sneakers.",
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'SOLEVA',
    title: 'SOLEVA | Form. Function. Future.',
    description: 'Next Generation Footwear. Engineered for motion, designed for the future.',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for OG image
        width: 1200,
        height: 630,
        alt: 'SOLEVA Footwear',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLEVA | Form. Function. Future.',
    description: 'Next Generation Footwear. Engineered for motion, designed for the future.',
    images: ['/og-image.jpg'],
  },
};

import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { LenisWrapper } from "@/components/motion/LenisWrapper";
import { Cursor } from "@/components/motion/Cursor";
import { CartDrawer } from "@/components/ecommerce/CartDrawer";
import { WishlistDrawer } from "@/components/navigation/WishlistDrawer";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground`}>
        <LenisWrapper>
          <Cursor />
          <Navbar />
          <CartDrawer />
          <WishlistDrawer />
          <ToastProvider />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Analytics />
        </LenisWrapper>
      </body>
    </html>
  );
}
