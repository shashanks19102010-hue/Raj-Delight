'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import styles from './RajDelightExperienceV8.module.css';

const PHONE = 'tel:+917983148985';
const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

// Real listing photos are used for the restaurant-facing surfaces; dish photography is matched to the cuisine.
const images = {
  restaurant: 'https://images.openai.com/static-rsc-1/YIQhN7LAxnZIdzsCX-R5b9iCsH1siO_bFSCjIFwlfpIIt4CzpB1WHnwS4BJNafU1iytJGQ7cNEYDyB8aFbS-0kQITYshhSaE4url5V5CMKVNz6ko5jiA_iBPJvUaMMoP5PkgLjMMragcZSGRpEBjrXNH3NqXLxXL4wpwF0BmN4o',
  restaurantAlt: 'Raj Delight dining room in Chandausi',
  restaurantSecond: 'https://images.openai.com/static-rsc-1/jxLHra-0znHXXltxKQZhwjvdafzvegD9YQEef0cdwFZMWhpeG1fTIhQD1IuxjnoihKcQkhVxFPLnVZxbBvLEx2Eqg3FefuZu4vAc2NsGAnxwjNz0D6Ald68ZaRQZIfKffh-ugKrtkAJyOaSNjFxyqh4OaeLfgm6L8cAb4Bc-GpU',
  paneer: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=85',
  biryani: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=85',
  dosa: 'https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?auto=format&fit=crop&w=1200&q=85',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85',
  momos: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
  thali: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
  drink: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
  curry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=85',
};

type GalleryImage = { src: string; alt: string; title: string };

const gallery: GalleryImage[] = [
  { src: images.restaurant, alt: images.restaurantAlt, title: 'The dining room' },
  { src: images.restaurantSecond, alt: 'Raj Delight restaurant ambience', title: 'A place for family meals' },
  { src: images.paneer, alt: 'Tandoori paneer dish', title: 'Tandoori favourites' },
  { src: images.dosa, alt: 'Masala dosa', title: 'South Indian classics' },
  { src: images.pizza, alt: 'Vegetarian pizza', title: 'Continental plates' },
];

const categoryImages: Record<string, string> = {
  'Tandoori Station': images.paneer,
  'Indian Main Course': images.curry,
  Biryani: images.biryani,
  'Chinese Appetizers': images.momos,
  Dumplings: images.momos,
  Continental: images.pizza,
  'Delicious Burger': images.burger,
  'Italian Pasta': images.pasta,
  'Special Thali': images.thali,
  'South Indian': images.dosa,
  Dessert: images.dessert,
  'Variety Of Ice Cream': images.dessert,
  Drinks: images.drink,
  "Drink's": images.drink,
  'Chinese Cuisine': images.momos,
  'Indian Breads': images.thali,
  Paratha: images.thali,
  'Dal Delight': images.curry,
  Rice: images.biryani,
};

const featured = [
  { name: 'Tandoori Paneer Tikka', category: 'Tandoori Station', image: images.paneer },
  { name: 'Veg Hyderabadi Biryani (special)', category: 'Biryani', image: images.biryani },
  { name: 'Paneer Tikka Pizza', category: 'Continental', image: images.pizza },
  { name: 'Masala Dosa', category: 'South Indian', image: images.dosa },
];

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">↗</span>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="m15.5 15.5 4.3 4.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.7c.5-.2 1.1 0 1.4.5l1.5 3.1c.2.4.2.9-.1 1.2L8.7 10c1.2 2.3 3 4.1 5.3 5.3l1.5-1.3c.3-.3.8-.3 1.2-.1l3.1 1.5c.5.3.7.9.5 1.4l-.8 2.1c-.2.6-.8.9-1.4.9C10 19.6 4.4 14 4.2 6.1c0-.6.3-1.2.9-1.4l2.1-1Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>;
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.7 14.5A7.8 7.8 0 0 1 9.5 4.3 8.2 8.2 0 1 0 19.7 14.5Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M17.7 3.6v3.1M16.15 5.15h3.1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M12 2.6v2.5M12 18.9v2.5M2.6 12h2.5M18.9 12h2.5M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/></svg>;
}

export function RajDelightExperienceV8() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [navOpen, setNavOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem('raj-delight-theme');
    const next = saved === 'dark' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { window.localStorage.setItem('raj-delight-theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = navOpen || lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen, lightboxIndex]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNavOpen(false);
        setOrderOpen(false);
        setLightboxIndex(null);
      }
      if (lightboxIndex !== null && event.key === 'ArrowRight') setLightboxIndex((current) => current === null ? null : (current + 1) % gallery.length);
      if (lightboxIndex !== null && event.key === 'ArrowLeft') setLightboxIndex((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const queryMatch = !needle || `${item.name} ${item.category}`.toLowerCase().includes(needle);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  const grouped = useMemo(() => {
    if (!query.trim() && activeCategory === 'All') return menuCategories;
    return menuCategories.map((category) => ({
      ...category,
      items: filteredItems.filter((item) => item.category === category.name).map((item) => item.name),
    })).filter((category) => category.items.length > 0);
  }, [activeCategory, filteredItems, query]);

  const jump = (id: string) => {
    setNavOpen(false);
    setOrderOpen(false);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const chooseCategory = (name: string) => {
    setActiveCategory(name);
    requestAnimationFrame(() => document.getElementById('menu-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light');

  return (
    <main className={styles.site}>
      <div className={styles.topProgress} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true"><span /><span /></div>

      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navInner}`}>
          <button className={styles.brand} onClick={() => jump('home')} aria-label="Raj Delight home">
            <Image src="/raj-delight-mark.svg" alt="" width={40} height={40} className={styles.brandMark} />
            <span><strong>Raj Delight</strong><small>Chandausi</small></span>
          </button>
          <nav className={styles.navLinks} aria-label="Primary navigation">
            <button onClick={() => jump('about')}>About</button>
            <button onClick={() => jump('menu')}>Menu</button>
            <button onClick={() => jump('gallery')}>Gallery</button>
            <button onClick={() => jump('contact')}>Visit</button>
          </nav>
          <div className={styles.navActions}>
            <button className={styles.iconButton} onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><ThemeIcon dark={theme === 'light'} /></button>
            <a className={styles.callNav} href={PHONE}><PhoneIcon /> <span>Call</span></a>
            <a className={styles.orderNav} href={ZOMATO} target="_blank" rel="noreferrer">Order <Arrow /></a>
          </div>
          <button className={styles.mobileTheme} onClick={toggleTheme} aria-label="Toggle theme"><ThemeIcon dark={theme === 'light'} /></button>
          <button className={styles.menuButton} onClick={() => setNavOpen(true)} aria-label="Open navigation" aria-expanded={navOpen}><span /><span /></button>
        </div>
      </header>

      {navOpen && <div className={styles.mobileSheet} role="dialog" aria-modal="true" aria-label="Raj Delight navigation">
        <div className={styles.sheetHead}><strong>Raj Delight</strong><button onClick={() => setNavOpen(false)} aria-label="Close navigation">×</button></div>
        <div className={styles.sheetLinks}>
          {['about', 'menu', 'gallery', 'contact'].map((id, index) => <button key={id} onClick={() => jump(id)}><small>{String(index + 1).padStart(2, '0')}</small><span>{id}</span><Arrow /></button>)}
        </div>
        <div className={styles.sheetActions}><a href={PHONE}><PhoneIcon /> Call Raj Delight</a><a href={ZOMATO} target="_blank" rel="noreferrer">Order online <Arrow /></a></div>
      </div>}

      <section className={styles.hero} id="home">
        <div className={styles.heroMedia}>
          <Image src={images.restaurant} alt={images.restaurantAlt} fill priority unoptimized sizes="100vw" className={styles.heroImage} />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`${styles.wrap} ${styles.heroContent}`}>
          <p className={styles.eyebrow}>RAJ DELIGHT · CHANDAUSI</p>
          <h1>A table worth <em>coming back to.</em></h1>
          <p className={styles.heroLead}>A fully vegetarian menu spanning North Indian favourites, South Indian classics, Indo-Chinese plates, pizza, pasta, desserts and drinks.</p>
          <div className={styles.heroCtas}>
            <button className={styles.primaryCta} onClick={() => jump('menu')}>Explore the menu <Arrow /></button>
            <div className={styles.orderWrap}>
              <button className={styles.secondaryCta} onClick={() => setOrderOpen((open) => !open)} aria-expanded={orderOpen}>Order online <Arrow /></button>
              {orderOpen && <div className={styles.orderMenu}><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow /></a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow /></a></div>}
            </div>
            <a className={styles.tertiaryCta} href={PHONE}><PhoneIcon /> Call <span>+91 79831 48985</span></a>
          </div>
          <div className={styles.heroMeta}><span>15 Lathi Bazar</span><i>·</i><span>9:30 AM – 12 AM</span><i>·</i><span>Dine-in & takeaway</span></div>
        </div>
        <button className={styles.scrollHint} onClick={() => jump('about')}>Scroll to explore <span /></button>
      </section>

      <section className={styles.ribbon}><div className={styles.ribbonTrack}><span>North Indian</span><i>✦</i><span>South Indian</span><i>✦</i><span>Indo-Chinese</span><i>✦</i><span>Pizza & Pasta</span><i>✦</i><span>Desserts</span><i>✦</i><span>Drinks</span><i>✦</i><span>100% Vegetarian</span></div></section>

      <section className={`${styles.section} ${styles.about}`} id="about">
        <div className={`${styles.wrap} ${styles.aboutGrid}`}>
          <button className={styles.aboutImage} onClick={() => setLightboxIndex(0)} aria-label="Open Raj Delight restaurant photo">
            <Image src={images.restaurantSecond} alt="Raj Delight restaurant ambience" fill unoptimized sizes="(max-width: 900px) 100vw, 52vw" className={styles.cover} />
            <span>View the space <Arrow /></span>
          </button>
          <div className={styles.copyBlock}>
            <p className={styles.sectionLabel}>01 · ABOUT RAJ DELIGHT</p>
            <h2>A broad menu, one <em>vegetarian table.</em></h2>
            <p>Raj Delight brings many kinds of comfort food together under one roof. The menu moves from tandoori and Indian mains to biryani, Chinese appetisers, momos, pizza, pasta, South Indian favourites, desserts and drinks.</p>
            <p className={styles.muted}>Come for a quick bite, a family meal or a relaxed evening in the heart of Chandausi.</p>
            <div className={styles.infoRows}><div><small>ADDRESS</small><strong>15, Lathi Bazar, Ward 05, Chandausi</strong></div><div><small>HOURS</small><strong>Daily · 9:30 AM – 12 AM</strong></div></div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.featuredSection}`} id="featured">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}><div><p className={styles.sectionLabel}>02 · SIGNATURE PICKS</p><h2>Start with a few <em>favourites.</em></h2></div><button className={styles.lineCta} onClick={() => jump('menu')}>See full menu <Arrow /></button></div>
          <div className={styles.featureGrid}>{featured.map((item) => <article key={item.name} className={styles.featureCard}><div className={styles.featureMedia}><Image src={item.image} alt={item.name} fill unoptimized sizes="(max-width: 760px) 92vw, 25vw" className={styles.cover} /></div><div className={styles.featureCopy}><small>{item.category}</small><h3>{item.name}</h3></div></article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.menuSection}`} id="menu">
        <div className={styles.wrap}>
          <div className={styles.menuIntro}><div><p className={styles.sectionLabel}>03 · THE COMPLETE MENU</p><h2>Everything on the <em>table.</em></h2><p>{menuItemCount} dishes across {menuCategories.length} categories. Search the full public menu or browse it chapter by chapter.</p></div><a className={styles.menuCallout} href={PHONE}><PhoneIcon /><span><small>Need help deciding?</small><strong>Call Raj Delight</strong></span><Arrow /></a></div>
          <div className={styles.menuControls}>
            <label className={styles.searchField}><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes or categories" aria-label="Search the menu" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear menu search">×</button>}</label>
            <div className={styles.categoryScroller} aria-label="Menu categories"><button className={activeCategory === 'All' ? styles.activeChip : ''} onClick={() => setActiveCategory('All')}>All <span>{menuItemCount}</span></button>{menuCategories.map((category) => <button key={category.name} className={activeCategory === category.name ? styles.activeChip : ''} onClick={() => chooseCategory(category.name)}>{category.name}<span>{category.items.length}</span></button>)}</div>
          </div>
          <div className={styles.menuSummary} id="menu-results"><span>{filteredItems.length} dishes shown</span>{query && <button onClick={() => { setQuery(''); setActiveCategory('All'); }}>Reset search</button>}</div>
          <div className={styles.menuGrid}>{grouped.map((category, index) => <article key={category.name} className={styles.menuChapter}><button className={styles.chapterHead} onClick={() => chooseCategory(category.name)}><span className={styles.chapterNumber}>{String(index + 1).padStart(2, '0')}</span><span><small>CHAPTER</small><strong>{category.name}</strong></span><b>{category.items.length}</b></button><div className={styles.menuItems}>{category.items.map((item) => <div key={`${category.name}-${item}`} className={styles.menuItem}><span>{item}</span><i /></div>)}</div></article>)}</div>
          {!grouped.length && <div className={styles.emptyState}><strong>No dishes found.</strong><span>Try a different search or return to the full menu.</span><button onClick={() => { setQuery(''); setActiveCategory('All'); }}>Show all dishes</button></div>}
        </div>
      </section>

      <section className={`${styles.section} ${styles.categoryShowcase}`}>
        <div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.sectionLabel}>04 · EXPLORE BY MOOD</p><h2>Choose your <em>chapter.</em></h2></div></div><div className={styles.categoryGrid}>{menuCategories.slice(0, 18).map((category, index) => <button key={category.name} className={styles.categoryCard} onClick={() => chooseCategory(category.name)}><Image src={categoryImages[category.name] || images.curry} alt={`${category.name} cuisine`} fill unoptimized sizes="(max-width: 760px) 44vw, 20vw" className={styles.cover} /><span className={styles.categoryShade} /><small>{String(index + 1).padStart(2, '0')}</small><strong>{category.name}</strong><i>{category.items.length} dishes</i></button>)}</div></div>
      </section>

      <section className={`${styles.section} ${styles.gallerySection}`} id="gallery">
        <div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.sectionLabel}>05 · GALLERY</p><h2>See the mood, <em>not just the menu.</em></h2></div><a className={styles.lineCta} href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram <Arrow /></a></div><div className={styles.galleryGrid}>{gallery.map((item, index) => <button key={item.title} className={`${styles.galleryCard} ${index === 0 ? styles.galleryHero : ''}`} onClick={() => setLightboxIndex(index)} aria-label={`Open ${item.title}`}><Image src={item.src} alt={item.alt} fill unoptimized sizes="(max-width: 760px) 94vw, 33vw" className={styles.cover} /><span>{item.title}</span></button>)}</div></div>
      </section>

      <section className={`${styles.section} ${styles.visitSection}`} id="contact">
        <div className={`${styles.wrap} ${styles.visitGrid}`}>
          <div><p className={styles.sectionLabel}>06 · VISIT RAJ DELIGHT</p><h2>Make your next meal <em>a local plan.</em></h2><p>Find us at 15, Lathi Bazar in Chandausi. Call before you leave, get directions, or order online for delivery.</p><div className={styles.visitActions}><a className={styles.primaryCta} href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow /></a><a className={styles.secondaryCtaDark} href={PHONE}><PhoneIcon /> Call now</a></div></div>
          <div className={styles.visitCard}><div><small>ADDRESS</small><strong>15, Lathi Bazar<br />Ward 05, Chandausi</strong></div><div><small>PHONE</small><a href={PHONE}>+91 79831 48985</a></div><div><small>HOURS</small><strong>Every day · 9:30 AM – 12 AM</strong></div><div><small>ORDER</small><p><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a></p></div></div>
        </div>
      </section>

      <footer className={styles.footer}><div className={`${styles.wrap} ${styles.footerGrid}`}><div><div className={styles.footerBrand}><Image src="/raj-delight-mark.svg" alt="" width={38} height={38} /><span><strong>Raj Delight</strong><small>Chandausi</small></span></div><p>Vegetarian dining, broad choices and a place to come back to.</p></div><div className={styles.footerLinks}><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a><a href={ZOMATO} target="_blank" rel="noreferrer">Order</a><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a></div></div><div className={`${styles.wrap} ${styles.footerBottom}`}><span>© {new Date().getFullYear()} Raj Delight</span><span>15 Lathi Bazar · Chandausi</span></div></footer>

      <div className={styles.mobileDock}><a href={PHONE}><PhoneIcon /><span>Call</span></a><button onClick={() => jump('menu')}><SearchIcon /><span>Menu</span></button><a href={ZOMATO} target="_blank" rel="noreferrer"><Arrow /><span>Order</span></a></div>

      {lightboxIndex !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Gallery viewer" onClick={() => setLightboxIndex(null)}><button className={styles.lightboxClose} onClick={() => setLightboxIndex(null)} aria-label="Close gallery">×</button><button className={styles.lightboxPrev} onClick={(event) => { event.stopPropagation(); setLightboxIndex((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length); }} aria-label="Previous photo">←</button><div className={styles.lightboxMedia} onClick={(event) => event.stopPropagation()}><Image src={gallery[lightboxIndex].src} alt={gallery[lightboxIndex].alt} fill unoptimized sizes="92vw" className={styles.contain} /><div><small>{gallery[lightboxIndex].title}</small><span>{lightboxIndex + 1} / {gallery.length}</span></div></div><button className={styles.lightboxNext} onClick={(event) => { event.stopPropagation(); setLightboxIndex((current) => current === null ? null : (current + 1) % gallery.length); }} aria-label="Next photo">→</button></div>}
    </main>
  );
}
