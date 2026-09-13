import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import './premium-overrides.css';

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Raj Delight | Vegetarian Restaurant in Chandausi',
  description:
    'Raj Delight Restaurant in Chandausi. Explore the full public menu, find the restaurant, and order online through Zomato or Swiggy.',
  keywords: [
    'Raj Delight',
    'Raj Delight Chandausi',
    'Raj Delight menu',
    'restaurant in Chandausi',
    'vegetarian restaurant Chandausi',
    'food delivery Chandausi',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Raj Delight | Chandausi',
    description: 'Explore the menu, discover the dining experience and order online.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
