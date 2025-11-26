import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/animations.css";
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farm2Global - Transform Your Farm into a Global Brand",
  description: "World's first all-in-one platform combining AI-powered farming consultation, value-added processing, and global marketplace. Increase your farm income by 3-5x.",
  keywords: [
    'agriculture',
    'farming',
    'AI farming',
    'global marketplace',
    'value-added agriculture',
    'organic farming',
    'crop consultation',
    'farm exports',
    'agricultural technology',
    'sustainable farming',
  ],
  authors: [{ name: 'Farm2Global Team' }],
  creator: 'Farm2Global',
  publisher: 'Farm2Global',
  metadataBase: new URL('https://farm2global.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://farm2global.com',
    title: 'Farm2Global - Transform Your Farm into a Global Brand',
    description: "World's first all-in-one platform combining AI-powered farming consultation, value-added processing, and global marketplace. Increase your farm income by 3-5x.",
    siteName: 'Farm2Global',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Farm2Global Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farm2Global - Transform Your Farm into a Global Brand',
    description: "AI-powered platform to grow and export your farm products globally. Increase income by 3-5x.",
    images: ['/opengraph-image.png'],
    creator: '@farm2global',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
