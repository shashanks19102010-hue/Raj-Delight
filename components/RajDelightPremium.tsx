'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories } from '@/lib/menu';
import { Logo } from './Logo';

const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const PHONE = 'tel:+917983148985';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';
const REAL_INTERIOR = 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=2200&q=90',
  paneer: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=1500&q=90',
  biryani: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1500&q=90',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1500&q=90',
  dosa: 'https://images.unsplash.com/photo-1668236543090-5e8f8e4e1b2b?auto=format&fit=crop&w=1500&q=90',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1500&q=90',
  thali: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1500&q=90',
  drinks: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1500&q=90',
};

const featureCards = [
  { name: 'Paneer Tikka', category: 'Tandoori Station', tag: 'Popular pick', image: IMAGES.paneer },
  { name: 'Veg Hyderabadi Biryani', category: 'Biryani', tag: 'Special', image: IMAGES.biryani },
  { name: 'Paneer Tikka Pizza', category: 'Continental', tag: 'Crowd pleaser', image: IMAGES.pizza },
  { name: 'Masala Dosa', category: 'South Indian', tag: 'Classic', image: IMAGES.dosa },
  { name: 'Veg Grilled Sandwich', category: 'Sandwich', tag: 'Popular', image: IMAGES.sandwich },
  { name: 'Navratri Thali', category: 'Navratri Food', tag: 'Seasonal', image: IMAGES.thali },
];

const gallery = [
  { title: 'Raj Delight interior', note: 'Public listing photograph', image: REAL_INTERIOR },
  { title: 'Paneer Tikka', note: 'Cuisine reference', image: IMAGES.paneer },
  { title: 'Veg Hyderabadi Biryani', note: 'Cuisine reference', image: IMAGES.biryani },
  { title: 'Paneer Tikka Pizza', note: 'Cuisine reference', image: IMAGES.pizza },
  { title: 'Masala Dosa', note: 'Cuisine reference', image: IMAGES.dosa },
  { title: 'Fresh Lime Soda', note: 'Cuisine reference', image: IMAGES.drinks },
];

const typoFixes: Record<string, string> = {
  'Black Current Skake': 'Black Current Shake',
  'Panner Butter Masala': 'Paneer Butter Masala',
  'Chinesse Sizzler': 'Chinese Sizzler',
  'Rajsthani Thali (special)': 'Rajasthani Thali (special)',
};

const pretty = (name: string) => typoFixes[name] ?? name;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SafeImage({ src, alt, priority = false, sizes = '100vw', className = '' }: { src: string; alt: string; priority?: boolean; sizes?: string; className?: string }) {
  const [current, setCurrent] = useState(src);
  return (
    <Image
      src={current}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setCurrent(REAL_INTERIOR)}
    />
  );
}

export function RajDelightPremium() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('raj-delight-theme');
    const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
    const initial = stored === 'light' || stored === 'dark' ? stored : (systemDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('raj-delight-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightbox]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const byCategory = category === 'All' || item.category === category;
      const byQuery = !q || `${item.name} ${item.category}`.toLowerCase().includes(q);
      return byCategory && byQuery;
    });
  }, [category, query]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const selectCategory = (name: string) => {
    setCategory(name);
    setOpen(name);
    jump('menu');
  };

  const isOpen = (name: string) => query.trim() ? filtered.some((item) => item.category === name) : open === name || (category === name);

  return (
    <main className="rd-premium">
      <div className="rd-ornaments" aria-hidden="true"><i className="tl"/><i className="tr"/><i className="bl"/><i className="br"/><span className="rail left"/><span className="rail right"/></div>

      <div className="rd-utility">
        <div className="rd-container rd-utility-inner">
          <span>100% Vegetarian</span><b/><span>Chandausi</span><span className="rd-fill"/>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram <Arrow/></a>
          <a href={MAPS} target="_blank" rel="noreferrer">Directions <Arrow/></a>
          <button className="rd-theme-toggle" onClick={() => setTheme((v) => v === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            <span className={theme === 'dark' ? 'active' : ''}>Dark</span><span className={theme === 'light' ? 'active' : ''}>Light</span>
          </button>
        </div>
      </div>

      <header className="rd-header">
        <div className="rd-container rd-header-inner">
          <button className="rd-brand" onClick={() => jump('home')} aria-label="Raj Delight home"><Logo compact /></button>
          <nav className={menuOpen ? 'rd-nav is-open' : 'rd-nav'} aria-label="Primary navigation">
            {['home', 'about', 'menu', 'gallery', 'contact'].map((id) => <button key={id} onClick={() => jump(id)}>{id}</button>)}
          </nav>
          <div className="rd-header-cta"><a className="rd-pill rd-pill-gold" href={ZOMATO} target="_blank" rel="noreferrer">Order Online <Arrow/></a><button className="rd-menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}><span/><span/></button></div>
        </div>
      </header>

      <section className="rd-hero-premium" id="home">
        <SafeImage src={IMAGES.hero} alt="Indian vegetarian dining" priority sizes="100vw" className="rd-cover" />
        <div className="rd-hero-shade"/>
        <div className="rd-container rd-hero-copy">
          <span className="rd-eyebrow light">Raj Delight · Chandausi</span>
          <div className="rd-hero-mark"><Logo/></div>
          <h1>Food that feels <em>like a celebration.</em></h1>
          <p>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p>
          <div className="rd-hero-actions"><button className="rd-pill rd-pill-gold" onClick={() => jump('menu')}>Explore the menu <Arrow/></button><button className="rd-pill rd-pill-outline" onClick={() => jump('gallery')}>View gallery <Arrow/></button></div>
          <div className="rd-hero-facts"><div><strong>4.3</strong><span>Google rating</span></div><div><strong>{allMenuItems.length}</strong><span>listed dishes</span></div><div><strong>9:30 AM–12 AM</strong><span>hours shown online</span></div><div><strong>100%</strong><span>vegetarian</span></div></div>
        </div>
        <div className="rd-scroll-cue">Scroll <span/></div>
      </section>

      <section className="rd-order-panel"><div className="rd-container rd-order-panel-inner"><div><span className="rd-eyebrow">Delivery · takeaway</span><h2>Good food, <em>one tap away.</em></h2></div><div className="rd-order-actions"><a href={ZOMATO} target="_blank" rel="noreferrer"><small>Zomato</small><strong>Order online</strong><Arrow/></a><a href={SWIGGY} target="_blank" rel="noreferrer"><small>Swiggy</small><strong>Order online</strong><Arrow/></a><a href={PHONE}><small>Restaurant</small><strong>Call us</strong><Arrow/></a></div></div></section>

      <section className="rd-section rd-about" id="about"><div className="rd-container rd-about-grid"><button className="rd-about-image" onClick={() => setLightbox({ src: REAL_INTERIOR, alt: 'Raj Delight interior public listing photograph' })} aria-label="Open Raj Delight interior photograph"><SafeImage src={REAL_INTERIOR} alt="Raj Delight interior public listing photograph" sizes="(max-width: 900px) 100vw, 55vw"/><span>Tap to enlarge</span></button><div className="rd-copy"><span className="rd-eyebrow">The restaurant</span><h2>A wide table. <em>One place.</em></h2><p>Raj Delight is a vegetarian restaurant in Chandausi serving a broad public menu across Indian, South Indian, Chinese, Continental, fast-food, desserts and beverages.</p><div className="rd-stat-grid"><div><b>01</b><span>Vegetarian dining</span></div><div><b>02</b><span>Indoor seating</span></div><div><b>03</b><span>Takeaway & delivery</span></div><div><b>04</b><span>Lunch & dinner</span></div></div></div></div></section>

      <section className="rd-section rd-specials"><div className="rd-container"><div className="rd-section-top"><div><span className="rd-eyebrow">Signature selection</span><h2>Favourites worth <em>coming back for.</em></h2></div><button className="rd-underlink" onClick={() => jump('menu')}>View complete menu <Arrow/></button></div><div className="rd-feature-scroller">{featureCards.map((card, index) => <article className="rd-feature-card" key={card.name}><button className="rd-feature-image" onClick={() => setLightbox({ src: card.image, alt: card.name })} aria-label={`Open ${card.name} image`}><SafeImage src={card.image} alt={card.name} sizes="(max-width: 720px) 86vw, 30vw"/><span>{String(index + 1).padStart(2, '0')}</span></button><small>{card.tag}</small><h3>{card.name}</h3><div><button className="rd-underlink tiny" onClick={() => selectCategory(card.category)}>View in menu <Arrow/></button></div></article>)}</div></div></section>

      <section className="rd-menu-section" id="menu"><div className="rd-container"><div className="rd-menu-intro"><div><span className="rd-eyebrow light">The full menu</span><h2>Browse by <em>course & category.</em></h2><p>Search the complete public menu and open only the category you want. No endless scroll through 299 dishes.</p></div><div className="rd-menu-count"><strong>{allMenuItems.length}</strong><span>listed dishes</span></div></div><div className="rd-menu-tools"><label className="rd-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes..." aria-label="Search dishes"/>{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label><div className="rd-category-chips" role="tablist" aria-label="Popular categories"><button className={category === 'All' ? 'active' : ''} onClick={() => setCategory('All')}>All</button>{['Tandoori Station','Indian Main Course','Biryani','Chinese Appetizers','Continental','South Indian','Sandwich','Dessert'].map((name) => <button key={name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>{name}</button>)}</div></div><div className="rd-menu-summary"><span>{filtered.length} dishes shown</span>{category !== 'All' && <button onClick={() => { setCategory('All'); setOpen(null); }}>Show all</button>}</div><div className="rd-accordion">{menuCategories.map((group, index) => { const items = filtered.filter((item) => item.category === group.name); if (category !== 'All' && items.length === 0) return null; const shown = isOpen(group.name); return <section key={group.name} className={shown ? 'rd-accordion-item open' : 'rd-accordion-item'}><button className="rd-accordion-head" onClick={() => setOpen((v) => v === group.name ? null : group.name)} aria-expanded={shown}><span>{String(index + 1).padStart(2, '0')}</span><strong>{group.name}</strong><small>{group.items.length} items</small><i>{shown ? '−' : '+'}</i></button>{shown && <div className="rd-accordion-body">{items.map((item) => <a key={`${item.category}-${item.name}`} href={ZOMATO} target="_blank" rel="noreferrer"><span>{pretty(item.name)}</span><small>View order <Arrow/></small></a>)}</div>}</section>; })}</div></div></section>

      <section className="rd-section rd-gallery" id="gallery"><div className="rd-container"><div className="rd-section-top"><div><span className="rd-eyebrow">Visual journal</span><h2>More than a menu. <em>An experience.</em></h2></div><p>Original restaurant photography is prioritised where available; cuisine images are clearly treated as visual references.</p></div><div className="rd-gallery-grid">{gallery.map((tile, index) => <button className={`rd-gallery-tile tile-${index + 1}`} key={tile.title} onClick={() => setLightbox({ src: tile.image, alt: tile.title })} aria-label={`Open ${tile.title} image`}><SafeImage src={tile.image} alt={tile.title} sizes="(max-width: 720px) 92vw, 35vw"/><span><small>{tile.note}</small><strong>{tile.title}</strong></span></button>)}</div></div></section>

      <section className="rd-section rd-contact" id="contact"><div className="rd-container rd-contact-grid"><div><span className="rd-eyebrow">Visit · order · connect</span><h2>Come hungry. <em>Leave happy.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className="rd-contact-actions"><a className="rd-pill rd-pill-gold" href={ZOMATO} target="_blank" rel="noreferrer">Order on Zomato <Arrow/></a><a className="rd-pill rd-pill-dark" href={SWIGGY} target="_blank" rel="noreferrer">Order on Swiggy <Arrow/></a><a className="rd-pill rd-pill-outline-dark" href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow/></a></div></div><div className="rd-contact-card"><div><small>Hours shown online</small><strong>9:30 AM – 12:00 AM</strong></div><div><small>Phone</small><a href={PHONE}>+91 79831 48985</a></div><div><small>Instagram</small><a href={INSTAGRAM} target="_blank" rel="noreferrer">@raj_delight <Arrow/></a></div><div><small>Food licence</small><strong>12726074000015</strong></div></div></div></section>

      <footer className="rd-footer"><div className="rd-container rd-footer-top"><div><Logo/><p>Good Food · Great Moments</p></div><div><small>Explore</small><button onClick={() => jump('home')}>Home</button><button onClick={() => jump('about')}>About</button><button onClick={() => jump('menu')}>Menu</button><button onClick={() => jump('gallery')}>Gallery</button></div><div><small>Order</small><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a><a href={PHONE}>Call</a></div><div><small>Visit</small><a href={MAPS} target="_blank" rel="noreferrer">15, Lathi Bazar</a><a href={INSTAGRAM} target="_blank" rel="noreferrer">@raj_delight</a></div></div><div className="rd-container rd-footer-bottom"><span>© {new Date().getFullYear()} Raj Delight</span><span>Chandausi</span></div></footer>

      <nav className="rd-mobile-bar" aria-label="Quick actions"><button onClick={() => jump('menu')}>Menu</button><a href={ZOMATO} target="_blank" rel="noreferrer" className="active">Order</a><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a></nav>

      {lightbox && <div className="rd-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}><div className="rd-lightbox-inner" onClick={(e) => e.stopPropagation()}><button onClick={() => setLightbox(null)} aria-label="Close image">×</button><div><SafeImage src={lightbox.src} alt={lightbox.alt} sizes="90vw"/></div><p>{lightbox.alt}</p></div></div>}
    </main>
  );
}
