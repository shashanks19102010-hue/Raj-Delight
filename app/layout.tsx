import type { Metadata, Viewport } from 'next';
import './globals.css';
import './raj-delight-premium.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://raj-delight-shashanks19102010-hues-projects.vercel.app'),
  title: 'Raj Delight | Vegetarian Restaurant in Chandausi',
  description: 'Raj Delight Restaurant in Chandausi — explore the menu, discover the dining experience, view the gallery and order online.',
  keywords: ['Raj Delight', 'Raj Delight Chandausi', 'Raj Delight menu', 'vegetarian restaurant Chandausi', 'restaurant Chandausi', 'food delivery Chandausi'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Raj Delight | Chandausi',
    description: 'Vegetarian dining, menu discovery and online ordering in Chandausi.',
    type: 'website',
    siteName: 'Raj Delight',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#11100e',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
