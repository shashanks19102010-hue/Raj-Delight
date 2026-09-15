'use client';

import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import styles from './RajDelightExperienceV9.module.css';

const PHONE = 'tel:+917983148985';
const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

// These two photos are sourced from the Raj Delight Google/business listing.
const googleGallery = [
  { src: 'https://images.openai.com/static-rsc-1/oDZfYYK3kyzlBSfhwfUoC8I27kd-Du7zGOpkG_jF9XueyBM3_JfGJT2Lp1Y4RMsLUw8iUcuKQMTAgDouxBJ8bd1FtgaDLWXQtRkvjWV9qU_V16SsB23kpPreLyY8Tuqrt7LZEn66Ll5HAbCtna8WzrfCkmmjbT8NwntOc8tfmE0', alt: 'Raj Delight Google listing photo', label: 'Google listing photo' },
  { src: 'https://images.openai.com/static-rsc-1/btAcaMnockOfBmfWhiadCC-Gk5-rmjqP5BmHrsdFF7-W77z3DB4FSvuTqKlHBTTjxm74r_HdPOAgccevQ6IfN9bRT8wwTaa7HYtKcKBrEFMCsB14pbFvSSgLakPzIUAXWTqGrnyiqbNsZ9bsAU0-L7cpzu61x25PnHqnu-wkrXQ', alt: 'Raj Delight Google listing ambience photo', label: 'Google ambience photo' },
];

const foodImages: Record<string, string> = {
  coffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=84',
  shake: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=84',
  mocktail: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=84',
  soup: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=84',
  lassi: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1000&q=84',
  tandoor: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1000&q=84',
  curry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=84',
  dal: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1000&q=84',
  rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=84',
  biryani: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=84',
  raita: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=84',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=84',
  naan: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=84',
  paratha: 'https://images.unsplash.com/photo-1626776876729-bab4369f8a10?auto=format&fit=crop&w=1000&q=84',
  papad: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=84',
  chinese: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=84',
  momos: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=1000&q=84',
  sizzler: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=84',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=84',
  garlic: 'https://images.unsplash.com/photo-1573140401552-3fab0b24427b?auto=format&fit=crop&w=1000&q=84',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=84',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=84',
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=84',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=84',
  thali: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=84',
  dosa: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=84',
  pav: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=84',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=84',
  icecream: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1000&q=84',
  snacks: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=84',
  navratri: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=84',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=84',
};

const categoryImages: Record<string, string> = {
  'Warm & Cozy': foodImages.coffee, 'Shake It Up': foodImages.shake, 'Fizzy Mocktails': foodImages.mocktail,
  'Soulful Soups': foodImages.soup, Lassi: foodImages.lassi, 'Tandoori Station': foodImages.tandoor,
  'Indian Main Course': foodImages.curry, 'Dal Delight': foodImages.dal, Rice: foodImages.rice, Biryani: foodImages.biryani,
  Raita: foodImages.raita, Salad: foodImages.salad, 'Indian Breads': foodImages.naan, Paratha: foodImages.paratha,
  Papad: foodImages.papad, 'Chinese Appetizers': foodImages.chinese, Dumplings: foodImages.momos,
  'Saucy Delights': foodImages.curry, 'Chinese Cuisine': foodImages.chinese, 'Smokey Grills': foodImages.sizzler,
  Continental: foodImages.pizza, 'Garlic Breads': foodImages.garlic, 'Delicious Burger': foodImages.burger,
  'Italian Pasta': foodImages.pasta, Fries: foodImages.fries, Sandwich: foodImages.sandwich, 'Special Thali': foodImages.thali,
  'South Indian': foodImages.dosa, 'Starters Smart': foodImages.pav, Dessert: foodImages.dessert,
  'Variety Of Ice Cream': foodImages.icecream, 'Kitty Menu': foodImages.snacks, 'Navratri Food': foodImages.navratri, Drinks: foodImages.drinks,
};

function Icon({ name }: { name: 'phone' | 'sun' | 'moon' | 'arrow' | 'map' | 'search' | 'close' | 'chevron' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    {name === 'phone' && <path {...common} d="M7.2 3.7c.5-.2 1.1 0 1.4.5l1.5 3.1c.2.4.2.9-.1 1.2L8.7 10c1.2 2.3 3 4.1 5.3 5.3l1.5-1.3c.3-.3.8-.3 1.2-.1l3.1 1.5c.5.3.7.9.5 1.4l-.8 2.1c-.2.6-.8.9-1.4.9C10 19.6 4.4 14 4.2 6.1c0-.6.3-1.2.9-1.4l2.1-1Z" />}
    {name === 'sun' && <><circle {...common} cx="12" cy="12" r="3.4"/><path {...common} d="M12 2.6v2.5M12 18.9v2.5M2.6 12h2.5M18.9 12h2.5M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7 5.5 18.5"/></>}
    {name === 'moon' && <path {...common} d="M19.6 14.6A7.8 7.8 0 0 1 9.4 4.4 8.1 8.1 0 1 0 19.6 14.6Z"/>}
    {name === 'arrow' && <path {...common} d="M5 19 19 5M9 5h10v10"/>}
    {name === 'map' && <><path {...common} d="M4 5.7 9.2 3l5.6 3 5.2-2.7v15L14.8 21l-5.6-3L4 20.7Z"/><path {...common} d="M9.2 3v15M14.8 6v15"/></>}
    {name === 'search' && <><circle {...common} cx="10.8" cy="10.8" r="6.2"/><path {...common} d="m15.5 15.5 4.3 4.3"/></>}
    {name === 'close' && <path {...common} d="m7 7 10 10M17 7 7 17"/>}
    {name === 'chevron' && <path {...common} d="m7 9 5 5 5-5"/>}
  </svg>;
}

export function RajDelightExperienceV9() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem('raj-delight-theme-v9');
    const next = saved === 'dark' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { window.localStorage.setItem('raj-delight-theme-v9', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = mobileMenu || galleryOpen !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenu, galleryOpen]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobileMenu(false); setOrderOpen(false); setGalleryOpen(null); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const byCat = category === 'All' || item.category === category;
      const byQuery = !needle || `${item.name} ${item.category}`.toLowerCase().includes(needle);
      return byCat && byQuery;
    });
  }, [category, query]);

  const displayedCategories = query.trim() ? menuCategories.filter((c) => results.some((i) => i.category === c.name)) : (showAllCategories ? menuCategories : menuCategories.slice(0, 12));
  const go = (id: string) => { setMobileMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return <main className={styles.site}>
    <div className={styles.topline} aria-hidden="true" />
    <header className={styles.nav}>
      <div className={styles.wrap + ' ' + styles.navInner}>
        <button className={styles.brand} onClick={() => go('home')} aria-label="Raj Delight home"><img src="/raj-delight-mark.svg" alt="" /><span><strong>Raj Delight</strong><small>Chandausi · Vegetarian Restaurant</small></span></button>
        <nav className={styles.navLinks} aria-label="Primary"><button onClick={() => go('about')}>About</button><button onClick={() => go('menu')}>Menu</button><button onClick={() => go('gallery')}>Gallery</button><button onClick={() => go('contact')}>Visit</button></nav>
        <div className={styles.navActions}><button className={styles.theme} onClick={() => setTheme((t) => t === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button><a className={styles.call} href={PHONE}><Icon name="phone" /> Call</a><a className={styles.order} href={ZOMATO} target="_blank" rel="noreferrer">Order <Icon name="arrow" /></a></div>
        <button className={styles.menuBtn} onClick={() => setMobileMenu(true)} aria-label="Open menu">Menu</button>
      </div>
    </header>

    {mobileMenu && <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Navigation"><div className={styles.sheetTop}><span>Raj Delight</span><button onClick={() => setMobileMenu(false)} aria-label="Close"><Icon name="close" /></button></div><div className={styles.sheetLinks}>{['about','menu','gallery','contact'].map((id) => <button key={id} onClick={() => go(id)}>{id}</button>)}</div><div className={styles.sheetActions}><a href={PHONE}><Icon name="phone" /> Call now</a><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Icon name="arrow" /></a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Icon name="arrow" /></a><a href={MAPS} target="_blank" rel="noreferrer">Directions <Icon name="map" /></a></div></div>}

    <section className={styles.hero} id="home">
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={styles.wrap + ' ' + styles.heroInner}>
        <div className={styles.heroCopy}><p className={styles.label}>RAJ DELIGHT · CHANDAUSI</p><h1>Come hungry.<br /><em>Leave delighted.</em></h1><p className={styles.lead}>A lively vegetarian table with North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p><div className={styles.heroCtas}><button className={styles.primary} onClick={() => go('menu')}>Explore full menu <Icon name="arrow" /></button><a className={styles.callHero} href={PHONE}><Icon name="phone" /> Call <span>+91 79831 48985</span></a></div><div className={styles.quickFacts}><span>15, Lathi Bazar</span><i>•</i><span>9:30 AM – 12 AM</span><i>•</i><span>100% Vegetarian</span></div></div>
        <div className={styles.heroCard}><span className={styles.cardLabel}>ORDER ONLINE</span><h2>Choose your<br /><em>way.</em></h2><p>Go straight to the live ordering platforms.</p><a href={ZOMATO} target="_blank" rel="noreferrer"><strong>Zomato</strong><span>Open ordering <Icon name="arrow" /></span></a><a href={SWIGGY} target="_blank" rel="noreferrer"><strong>Swiggy</strong><span>Open ordering <Icon name="arrow" /></span></a><small>Delivery availability and prices are controlled by the platforms.</small></div>
      </div>
      <div className={styles.heroDecor} aria-hidden="true"><span /><span /><span /></div>
    </section>

    <section className={styles.marquee} aria-label="Cuisine list"><div>North Indian <b>✦</b> South Indian <b>✦</b> Indo-Chinese <b>✦</b> Pizza & Pasta <b>✦</b> Desserts <b>✦</b> Mocktails & Drinks <b>✦</b> 100% Vegetarian <b>✦</b> </div></section>

    <section className={styles.section + ' ' + styles.about} id="about"><div className={styles.wrap + ' ' + styles.twoCol}><div><p className={styles.label}>01 · ABOUT</p><h2>More choice.<br /><em>More reasons to stay.</em></h2><p className={styles.body}>Raj Delight brings a broad vegetarian menu together in Chandausi — from tandoori plates and Indian mains to biryani, noodles, momos, pizza, pasta, South Indian favourites and desserts.</p><div className={styles.info}><div><small>ADDRESS</small><strong>15, Lathi Bazar, Ward 05, Chandausi</strong></div><div><small>HOURS</small><strong>Every day · 9:30 AM – 12 AM</strong></div></div></div><div className={styles.aboutArt}><div className={styles.orb} /><span>Raj Delight<br />Chandausi</span></div></div></section>

    <section className={styles.section + ' ' + styles.menu} id="menu"><div className={styles.wrap}><div className={styles.menuHead}><div><p className={styles.label}>02 · THE COMPLETE MENU</p><h2>Every dish,<br /><em>one place.</em></h2><p className={styles.body}>Browse the full public menu — {menuItemCount} dishes across {menuCategories.length} categories.</p></div><a className={styles.callBox} href={PHONE}><Icon name="phone" /><span><small>Need help?</small><strong>Call Raj Delight</strong></span><Icon name="arrow" /></a></div><div className={styles.menuTools}><label className={styles.search}><Icon name="search" /><input value={query} onChange={(e) => { setQuery(e.target.value); setCategory('All'); }} placeholder="Search any dish or category" aria-label="Search menu" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" /></button>}</label><div className={styles.chips}><button className={category === 'All' ? styles.active : ''} onClick={() => setCategory('All')}>All <b>{menuItemCount}</b></button>{menuCategories.map((c) => <button key={c.name} className={category === c.name ? styles.active : ''} onClick={() => setCategory(c.name)}>{c.name} <b>{c.items.length}</b></button>)}</div></div><div className={styles.resultLine}><span>{results.length} dishes shown</span>{query && <button onClick={() => { setQuery(''); setCategory('All'); }}>Reset search</button>}</div><div className={styles.menuGrid}>{displayedCategories.map((c, idx) => { const items = results.filter((i) => i.category === c.name); if (!items.length) return null; return <article className={styles.chapter} key={c.name}><div className={styles.chapterTop}><span>{String(idx + 1).padStart(2,'0')}</span><div><small>CHAPTER</small><h3>{c.name}</h3></div><b>{items.length}</b></div><div className={styles.items}>{items.map((item) => <div className={styles.item} key={c.name + item.name}><span>{item.name}</span><i /></div>)}</div></article>; })}</div></div></section>

    <section className={styles.section + ' ' + styles.categories}><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.label}>03 · EXPLORE</p><h2>Pick a mood.<br /><em>Pick a menu.</em></h2></div>{!query && <button className={styles.outline} onClick={() => setShowAllCategories((v) => !v)}>{showAllCategories ? 'Show highlights' : 'Show all categories'} <Icon name="arrow" /></button>}</div><div className={styles.categoryGrid}>{displayedCategories.map((c, i) => <button className={styles.categoryCard} key={c.name} onClick={() => { setCategory(c.name); go('menu'); }}><img src={categoryImages[c.name] ?? foodImages.curry} alt="" loading="lazy" /><span>{String(i + 1).padStart(2,'0')}</span><strong>{c.name}</strong><small>{c.items.length} dishes</small></button>)}</div></div></section>

    <section className={styles.section + ' ' + styles.gallery} id="gallery"><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.label}>04 · GOOGLE LISTING GALLERY</p><h2>See the actual<br /><em>Raj Delight space.</em></h2><p className={styles.body}>These gallery images are from the restaurant's Google/business listing. No random people-focused stock photo is used here.</p></div><a className={styles.outline} href={MAPS} target="_blank" rel="noreferrer">Open on Google <Icon name="map" /></a></div><div className={styles.galleryGrid}>{googleGallery.map((image, index) => <button key={image.src} className={styles.photo} onClick={() => setGalleryOpen(index)}><img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} /><span>{image.label}</span><i><Icon name="arrow" /></i></button>)}</div></div></section>

    <section className={styles.section + ' ' + styles.visit} id="contact"><div className={styles.wrap + ' ' + styles.visitGrid}><div><p className={styles.label}>05 · VISIT & ORDER</p><h2>Make it a<br /><em>Raj Delight plan.</em></h2><p className={styles.body}>Call for a quick confirmation, get directions, or jump directly into online ordering.</p><div className={styles.visitBtns}><a className={styles.primary} href={PHONE}><Icon name="phone" /> Call now</a><a className={styles.darkBtn} href={MAPS} target="_blank" rel="noreferrer"><Icon name="map" /> Directions</a></div></div><div className={styles.contactCard}><div><small>PHONE</small><a href={PHONE}>+91 79831 48985</a></div><div><small>ADDRESS</small><strong>15, Lathi Bazar, Ward 05<br />Chandausi, Uttar Pradesh</strong></div><div><small>ORDER ONLINE</small><p><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a></p></div></div></div></section>

    <footer className={styles.footer}><div className={styles.wrap + ' ' + styles.footerTop}><div><strong>Raj Delight</strong><span>Chandausi · 100% Vegetarian</span></div><div className={styles.footerLinks}><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Google Maps</a><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a></div></div><div className={styles.wrap + ' ' + styles.footerBottom}><span>© {new Date().getFullYear()} Raj Delight</span><span>15 Lathi Bazar · Chandausi</span></div></footer>

    <div className={styles.mobileDock}><a href={PHONE}><Icon name="phone" /><span>Call</span></a><button onClick={() => go('menu')}><Icon name="search" /><span>Menu</span></button><a href={ZOMATO} target="_blank" rel="noreferrer"><span className={styles.dockArrow}>↗</span><span>Order</span></a></div>

    {galleryOpen !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Raj Delight gallery" onClick={() => setGalleryOpen(null)}><button className={styles.close} onClick={() => setGalleryOpen(null)} aria-label="Close gallery"><Icon name="close" /></button><button className={styles.prev} onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen - 1 + googleGallery.length) % googleGallery.length); }} aria-label="Previous photo">‹</button><img src={googleGallery[galleryOpen].src} alt={googleGallery[galleryOpen].alt} onClick={(e) => e.stopPropagation()} /><button className={styles.next} onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen + 1) % googleGallery.length); }} aria-label="Next photo">›</button></div>}
  </main>;
}
