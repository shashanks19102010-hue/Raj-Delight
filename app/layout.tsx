import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const ui = DM_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://raj-delight-shashanks19102010-hues-projects.vercel.app'),
  title: 'Raj Delight | Vegetarian Restaurant in Chandausi',
  description: 'Raj Delight in Chandausi — discover the complete vegetarian menu, signature flavours, gallery and direct ordering links.',
  keywords: ['Raj Delight', 'Raj Delight Chandausi', 'Raj Delight menu', 'restaurant in Chandausi', 'vegetarian restaurant Chandausi', 'food delivery Chandausi'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Raj Delight | Chandausi',
    description: 'Vegetarian dining, signature flavours, complete public menu and online ordering in Chandausi.',
    type: 'website',
    siteName: 'Raj Delight',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#17120e',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${ui.variable}`}>
      <body>{children}</body>
    </html>
  );
}
