import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import './raj-delight-tweaks.css';
import './raj-delight-theme-fix.css';
import './raj-delight-final-polish.css';

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

const siteUrl = 'https://raj-delight-three.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Raj Delight | Vegetarian Restaurant in Chandausi',
  description: 'Raj Delight in Chandausi — discover the complete vegetarian menu, signature flavours, gallery and direct ordering links.',
  keywords: ['Raj Delight', 'Raj Delight Chandausi', 'Raj Delight menu', 'restaurant in Chandausi', 'vegetarian restaurant Chandausi', 'food delivery Chandausi'],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Raj Delight | Chandausi',
    description: 'Vegetarian dining, signature flavours, complete public menu and online ordering in Chandausi.',
    type: 'website',
    siteName: 'Raj Delight',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Delight | Chandausi',
    description: 'Explore Raj Delight’s vegetarian menu, gallery and ordering links.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#17120e',
};

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Raj Delight',
  url: siteUrl,
  telephone: '+91 79831 48985',
  servesCuisine: ['Indian', 'North Indian', 'South Indian', 'Indo-Chinese', 'Continental', 'Italian'],
  menu: `${siteUrl}/#menu`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '15 Lathi Bazar',
    addressLocality: 'Chandausi',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/raj_delight/',
    'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order',
    'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${ui.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var key = 'raj-delight-theme';
                  var saved = localStorage.getItem(key);
                  var theme = saved === 'dark' || saved === 'light' ? saved : 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
