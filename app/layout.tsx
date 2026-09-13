import type { Metadata, Viewport } from 'next';
import './globals.css';
import './raj-delight-final.css';
import './ux-upgrade.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://raj-delight-shashanks19102010-hues-projects.vercel.app'),
  title: 'Raj Delight | Vegetarian Restaurant in Chandausi',
  description: 'Raj Delight Restaurant in Chandausi — explore the complete public menu, discover the dining experience, view the gallery and order online.',
  keywords: ['Raj Delight', 'Raj Delight Chandausi', 'Raj Delight menu', 'restaurant in Chandausi', 'vegetarian restaurant Chandausi', 'food delivery Chandausi'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Raj Delight | Chandausi',
    description: 'Vegetarian dining, complete public menu and online ordering in Chandausi.',
    type: 'website',
    siteName: 'Raj Delight',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#17130f',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
