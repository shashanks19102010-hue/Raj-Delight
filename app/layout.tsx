import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

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
    'Raj Delight Restaurant in Chandausi. Explore the menu, find the restaurant, and order online through Zomato or Swiggy.',
  keywords: [
    'Raj Delight',
    'Raj Delight Chandausi',
    'restaurant in Chandausi',
    'vegetarian restaurant Chandausi',
    'Raj Delight menu',
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
