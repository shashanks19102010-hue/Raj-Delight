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

const images = {
  hero: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2200&q=90',
  thali: 'https://images.unsplash.com/photo-1598514982901-ae62709f7b82?auto=format&fit=crop&w=1600&q=90',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90',
  dosa: 'https://images.unsplash.com/photo-1668236543090-5e8f8e4e1b2b?auto=format&fit=crop&w=1600&q=90',
  burger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=90',
  drink: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=90',
};

const displayFixes: Record<string, string> = {
  'Black Current Skake': 'Black Current Shake',
  'Panner Butter Masala': 'Paneer Butter Masala',
  'Chinesse Sizzler': 'Chinese Sizzler',
  'Saucy Delighats': 'Saucy Delights',
  'Rajsthani Thali (special)': 'Rajasthani Thali (special)',
};
const categoryFixes: Record<string, string> = { 'Saucy Delighats': 'Saucy Delights', "Drink's": 'Drinks' };
const pretty = (value: string) => displayFixes[value] ?? value;
const prettyCategory = (value: string) => categoryFixes[value] ?? value;

function Arrow() { return <span aria-hidden="true">↗</span>; }
function InstagramIcon({ size = 18 }: { size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>;
}

function SmartImage({ src, alt, priority = false, sizes = '100vw' }: { src: string; alt: string; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="rd-image-fallback" role="img" aria-label={`${alt} image unavailable`}><span>Raj Delight</span></div>;
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="rd-smart-image" onError={() => setFailed(true)} />;
}

export function RajDelightSite() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [viewer, setViewer] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('raj-delight-theme');
    const system = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const initial = stored ? stored === 'dark' : system;
    setDark(initial);
    document.documentElement.dataset.theme = initial ? 'dark' : 'light';
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    window.localStorage.setItem('raj-delight-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = viewer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [viewer]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const searchMatch = !q || `${item.name} ${item.category}`.toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const chooseCategory = (name: string) => {
    setActiveCategory(name);
    setOpenCategory(name);
    go('menu');
  };

  const categoriesWithItems = menuCategories.map((category) => ({
    ...category,
    items: filtered.filter((item) => item.category === category.name),
  }));

  return (
    <main className="rd-final">
      <div className="rd-frame" aria-hidden="true"><i className="rd-frame-corner rd-frame-corner--tl"/><i className="rd-frame-corner rd-frame-corner--tr"/><i className="rd-frame-corner rd-frame-corner--bl"/><i className="rd-frame-corner rd-frame-corner--br"/><span className="rd-frame-rail rd-frame-rail--left"/><span className="rd-frame-rail rd-frame-rail--right"/></div>

      <div className="rd-topline"><div className="rd-container rd-topline-inner"><span>100% vegetarian</span><b/><span>Chandausi</span><div className="rd-spacer"/><a className="rd-top-social" href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon size={14}/> @raj_delight</a><button className="rd-theme-switch" onClick={() => setDark((v) => !v)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? '☀' : '◐'}</button></div></div>

      <header className="rd-nav-wrap"><div className="rd-container rd-nav"><button className="rd-brand-button" onClick={() => go('home')} aria-label="Raj Delight home"><Logo compact/></button><nav className={mobileOpen ? 'rd-nav-links rd-nav-links--open' : 'rd-nav-links'} aria-label="Primary navigation">{['home','about','menu','gallery','contact'].map((id)=><button key={id} onClick={()=>go(id)}>{id[0].toUpperCase()+id.slice(1)}</button>)}</nav><div className="rd-nav-actions"><a className="rd-outline-order" href={ZOMATO} target="_blank" rel="noreferrer">Order online <Arrow/></a><button className="rd-burger" onClick={()=>setMobileOpen(v=>!v)} aria-label="Toggle navigation" aria-expanded={mobileOpen}><span/><span/></button></div></div></header>

      <section className="rd-hero" id="home"><SmartImage src={images.hero} alt="Vegetarian Indian dining" priority sizes="100vw"/><div className="rd-hero-vignette"/><div className="rd-container rd-hero-inner"><div className="rd-hero-copy"><span className="rd-kicker">Raj Delight · Chandausi</span><h1>A Taste Worth <em>Remembering.</em></h1><p>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks — all under one roof.</p><div className="rd-hero-cta"><button className="rd-primary-btn" onClick={()=>go('menu')}>Explore menu <Arrow/></button><button className="rd-secondary-btn" onClick={()=>go('gallery')}>View gallery <Arrow/></button></div></div><div className="rd-hero-proof"><div><strong>4.3</strong><span>Google rating</span></div><div><strong>{menuCategories.length}</strong><span>menu categories</span></div><div><strong>9:30 AM–12 AM</strong><span>hours shown online</span></div><div><strong>100%</strong><span>vegetarian</span></div></div></div><div className="rd-hero-scroll">Scroll to explore <span/></div></section>

      <section className="rd-order-band"><div className="rd-container rd-order-inner"><div><span className="rd-eyebrow">Delivery · takeaway</span><h2>Your favourites, one click away.</h2></div><div className="rd-order-buttons"><a className="rd-order-card rd-order-card--zomato" href={ZOMATO} target="_blank" rel="noreferrer"><strong>Zomato</strong><span>Order online</span><Arrow/></a><a className="rd-order-card rd-order-card--swiggy" href={SWIGGY} target="_blank" rel="noreferrer"><strong>Swiggy</strong><span>Order online</span><Arrow/></a><a className="rd-order-card rd-order-card--call" href={PHONE}><strong>Call</strong><span>+91 79831 48985</span><Arrow/></a></div></div></section>

      <section className="rd-section rd-about" id="about"><div className="rd-container rd-story-grid"><button className="rd-story-image" onClick={()=>setViewer({src:REAL_INTERIOR,alt:'Raj Delight interior'})} aria-label="Open Raj Delight interior"><SmartImage src={REAL_INTERIOR} alt="Raj Delight interior" sizes="(max-width: 900px) 100vw, 55vw"/><span>Public listing photo · tap to enlarge</span></button><div className="rd-story-copy"><span className="rd-eyebrow">The Raj Delight experience</span><h2>A little bit of <em>everything.</em></h2><p>Raj Delight is publicly listed in Chandausi with vegetarian dining, indoor seating, takeaway, lunch, dinner and home delivery.</p><div className="rd-feature-list"><div><b>01</b><span>Vegetarian menu</span></div><div><b>02</b><span>Indoor seating</span></div><div><b>03</b><span>Takeaway & delivery</span></div><div><b>04</b><span>Lunch & dinner</span></div></div></div></div></section>

      <section className="rd-section rd-specials"><div className="rd-container"><div className="rd-section-heading"><div><span className="rd-eyebrow">Our specialties</span><h2>Favourites worth <em>coming back for.</em></h2></div><button className="rd-text-btn" onClick={()=>go('menu')}>View complete menu <Arrow/></button></div><div className="rd-special-grid">{[
        ['Paneer Tikka','Tandoori Station',images.hero,'Popular pick'],['Veg Hyderabadi Biryani','Biryani',images.hero,'Special'],['Paneer Tikka Pizza','Continental',images.pizza,'Crowd pleaser'],['Masala Dosa','South Indian',images.dosa,'Classic'],['Veg Grilled Sandwich','Sandwich',images.burger,'Popular on Swiggy'],['Fresh Lime Soda (mix)','Fizzy Mocktails',images.drink,'Popular on Swiggy']
      ].map(([name,category,image,note],i)=><article className="rd-special-card" key={name}><button className="rd-special-media" onClick={()=>setViewer({src:image,alt:name})} aria-label={`Open ${name} image`}><SmartImage src={image} alt={name} sizes="(max-width: 720px) 80vw, 30vw"/><span>{String(i+1).padStart(2,'0')}</span></button><small>{note}</small><h3>{name}</h3><button className="rd-mini-link" onClick={()=>chooseCategory(category)}>View in menu <Arrow/></button></article>)}</div></div></section>

      <section className="rd-section rd-menu" id="menu"><div className="rd-container"><div className="rd-menu-intro"><div><span className="rd-eyebrow">The complete menu</span><h2>{menuCategories.length} categories. <em>{allMenuItems.length} listed dishes.</em></h2><p>Browse the full public menu without a giant wall of cards. Search for a dish, select a popular category, or open each section to see its items.</p></div><div className="rd-bill-note"><span>Public listing spend</span><strong>₹200–₹400</strong><small>average bill / person shown online</small></div></div><div className="rd-menu-tools"><label className="rd-search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search dishes or categories..." aria-label="Search dishes or categories"/>{search&&<button onClick={()=>setSearch('')} aria-label="Clear search">×</button>}</label><div className="rd-menu-topcats" role="tablist" aria-label="Popular menu categories"><button className={activeCategory==='All'?'is-active':''} onClick={()=>{setActiveCategory('All');setOpenCategory(null)}}>All</button>{['Indian Main Course','South Indian','Tandoori Station','Chinese Appetizers','Continental','Delicious Burger','Italian Pasta','Dessert'].map(c=><button key={c} className={activeCategory===c?'is-active':''} onClick={()=>{setActiveCategory(c);setOpenCategory(c)}}>{prettyCategory(c)}</button>)}</div><div className="rd-menu-mobile-select-wrap"><label htmlFor="rd-category-select">Browse category</label><select id="rd-category-select" value={activeCategory} onChange={e=>{setActiveCategory(e.target.value);setOpenCategory(e.target.value==='All'?null:e.target.value)}}><option value="All">All categories</option>{menuCategories.map(c=><option key={c.name} value={c.name}>{prettyCategory(c.name)}</option>)}</select></div></div><div className="rd-menu-summary"><span>{filtered.length} dishes shown</span>{activeCategory!=='All'&&<button onClick={()=>{setActiveCategory('All');setOpenCategory(null)}}>Show all</button>}</div><div className="rd-category-accordion">{categoriesWithItems.map((category,index)=>{const shouldShow=activeCategory==='All'||category.items.length>0;if(!shouldShow)return null;const isOpen=search.trim().length>0?category.items.length>0:openCategory===category.name;return <section key={category.name} className={isOpen?'rd-category is-open':'rd-category'}><button className="rd-category-header" onClick={()=>setOpenCategory(isOpen?null:category.name)} aria-expanded={isOpen}><span className="rd-category-number">{String(index+1).padStart(2,'0')}</span><strong>{prettyCategory(category.name)}</strong><span className="rd-category-count">{category.items.length||category.items.length===0?category.items.length:category.items.length} items</span><span className="rd-category-chevron">{isOpen?'−':'+'}</span></button>{isOpen&&<div className="rd-category-items">{category.items.length?category.items.map(item=><a className="rd-menu-item" href={ZOMATO} target="_blank" rel="noreferrer" key={`${item.category}-${item.name}`}><span>{pretty(item.name)}</span><small>View current price <Arrow/></small></a>):<p className="rd-empty">No dishes match this filter.</p>}</div>}</section>})}</div></div></section>

      <section className="rd-seasonal"><button className="rd-seasonal-image" onClick={()=>setViewer({src:images.thali,alt:'Navratri Thali visual'})} aria-label="Open Navratri Thali image"><SmartImage src={images.thali} alt="Navratri Thali visual" sizes="(max-width: 900px) 100vw, 55vw"/></button><div className="rd-seasonal-copy"><span className="rd-eyebrow">Seasonal selection</span><h2>Navratri <em>Thali.</em></h2><p>The current public menu includes a dedicated Navratri Food section with a listed Navratri Thali.</p><button className="rd-primary-btn rd-primary-btn--dark" onClick={()=>chooseCategory('Navratri Food')}>Explore Navratri food <Arrow/></button></div></section>

      <section className="rd-section rd-gallery" id="gallery"><div className="rd-container"><div className="rd-section-heading"><div><span className="rd-eyebrow">Visual journal</span><h2>See the place. <em>Feel the mood.</em></h2></div><p>Restaurant listing imagery is identified as such. Food visuals are mood references until owner-approved original photography is supplied.</p></div><div className="rd-gallery-grid">{[{src:REAL_INTERIOR,alt:'Raj Delight interior',note:'Public listing'},{src:images.hero,alt:'Indian dining mood',note:'Editorial reference'},{src:images.thali,alt:'Navratri thali mood',note:'Editorial reference'},{src:images.pizza,alt:'Vegetarian pizza mood',note:'Editorial reference'},{src:images.dosa,alt:'South Indian dosa mood',note:'Editorial reference'},{src:images.drink,alt:'Fresh lime drink mood',note:'Editorial reference'}].map(tile=><button className="rd-gallery-tile" key={tile.alt} onClick={()=>setViewer({src:tile.src,alt:tile.alt})} aria-label={`Open ${tile.alt}`}><SmartImage src={tile.src} alt={tile.alt} sizes="(max-width: 720px) 50vw, 33vw"/><span>{tile.note}</span><strong>{tile.alt}</strong></button>)}</div></div></section>

      <section className="rd-section rd-contact" id="contact"><div className="rd-container rd-contact-grid"><div className="rd-contact-copy"><span className="rd-eyebrow">Visit · order · connect</span><h2>Come for the food. <em>Stay for the moment.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className="rd-contact-cta"><a className="rd-primary-btn rd-primary-btn--dark" href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow/></a><a className="rd-secondary-btn rd-secondary-btn--light" href={PHONE}>Call restaurant</a><a className="rd-secondary-btn rd-secondary-btn--light" href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon/> @raj_delight</a></div></div><div className="rd-contact-card"><div><small>Hours shown online</small><strong>9:30 AM – 12:00 AM</strong></div><div><small>Phone</small><strong>+91 79831 48985</strong></div><div><small>Food licence</small><strong>12726074000015</strong></div><div><small>Order online</small><span><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow/></a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow/></a></span></div></div></div></section>

      <footer className="rd-footer"><div className="rd-container rd-footer-grid"><div className="rd-footer-brand"><Logo/><p>Pure vegetarian dining in Chandausi.</p></div><div><small>Explore</small><button onClick={()=>go('home')}>Home</button><button onClick={()=>go('about')}>About</button><button onClick={()=>go('menu')}>Menu</button><button onClick={()=>go('gallery')}>Gallery</button><button onClick={()=>go('contact')}>Contact</button></div><div><small>Order</small><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a><a href={PHONE}>Call restaurant</a></div><div><small>Social</small><a href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon/> Instagram · @raj_delight</a></div></div><div className="rd-container rd-footer-bottom"><span>© {new Date().getFullYear()} Raj Delight</span><span>Public restaurant information · Chandausi</span></div></footer>

      <div className="rd-desktop-order"><a href={ZOMATO} target="_blank" rel="noreferrer">Order online <Arrow/></a></div>
      <nav className="rd-mobile-actions" aria-label="Quick actions"><button onClick={()=>go('menu')}>Menu</button><a href={ZOMATO} target="_blank" rel="noreferrer">Order</a><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a></nav>

      {viewer&&<div className="rd-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={()=>setViewer(null)}><button className="rd-lightbox-close" onClick={()=>setViewer(null)} aria-label="Close image viewer">×</button><div className="rd-lightbox-media" onClick={e=>e.stopPropagation()}><SmartImage src={viewer.src} alt={viewer.alt} sizes="100vw" priority/><p>{viewer.alt}</p></div></div>}
    </main>
  );
}
