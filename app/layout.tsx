import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import './menu-price.css';
import './raj-delight-theme.css';
import './raj-delight-polish.css';
import './raj-delight-final.css';

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const ui = DM_Sans({ subsets: ['latin'], variable: '--font-ui', display: 'swap' });
const siteUrl = 'https://raj-delight-three.vercel.app';
const logoPath = '/grok_1789624913553.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Raj Delight | Vegetarian Restaurant in Chandausi',
  description: 'Raj Delight in Chandausi — a broad vegetarian menu, gallery, direct calling and online ordering.',
  keywords: ['Raj Delight', 'Raj Delight Chandausi', 'Raj Delight menu', 'restaurant in Chandausi', 'vegetarian restaurant Chandausi'],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath,
  },
  openGraph: { title: 'Raj Delight | Chandausi', description: 'Vegetarian dining, gallery and online ordering in Chandausi.', type: 'website', siteName: 'Raj Delight', url: siteUrl, images: [{ url: logoPath, alt: 'Raj Delight logo' }] },
  twitter: { card: 'summary_large_image', title: 'Raj Delight | Chandausi', description: 'Explore Raj Delight’s vegetarian menu, gallery and ordering links.', images: [logoPath] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f6f1e8' };

const restaurantSchema = {
  '@context': 'https://schema.org', '@type': 'Restaurant', name: 'Raj Delight', url: siteUrl,
  telephone: '+91 79831 48985', servesCuisine: ['Indian', 'North Indian', 'South Indian', 'Indo-Chinese', 'Continental', 'Italian'],
  menu: `${siteUrl}/#menu`, address: { '@type': 'PostalAddress', streetAddress: '15 Lathi Bazar', addressLocality: 'Chandausi', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
  image: [`${siteUrl}${logoPath}`],
  sameAs: ['https://www.instagram.com/raj_delight/', 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order', 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497'],
};

const themeBoot = `
(function(){
  try{
    var t = localStorage.getItem('raj-delight-theme-v9') || localStorage.getItem('raj-delight-theme-v10') || localStorage.getItem('raj-delight-theme');
    if(t!=='dark'&&t!=='light') t='light';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.colorScheme = t;
  }catch(e){}
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${ui.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeBoot }} /></head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
        {children}
      </body>
    </html>
  );
}
