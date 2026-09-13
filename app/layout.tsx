import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import './premium-overrides.css';
import './raj-delight-v3.css';
import './raj-delight-godlevel.css';

const displayFont = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });
const bodyFont = Manrope({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://raj-delight-three.vercel.app'),
  title: 'Raj Delight | Vegetarian Restaurant in Chandausi',
  description: 'Raj Delight Restaurant in Chandausi. Explore the menu, discover the dining experience, find directions and order online.',
  keywords: ['Raj Delight', 'Raj Delight Chandausi', 'vegetarian restaurant Chandausi', 'Raj Delight menu'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Raj Delight | Chandausi',
    description: 'A taste worth remembering. Explore the menu and order online.',
    type: 'website',
    siteName: 'Raj Delight',
    url: 'https://raj-delight-three.vercel.app',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#171411',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body></html>;
}
