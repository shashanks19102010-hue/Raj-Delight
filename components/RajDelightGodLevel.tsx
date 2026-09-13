'use client';

import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories } from '@/lib/menu';
import { Logo } from './Logo';

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const zomatoUrl = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const swiggyUrl = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const phoneUrl = 'tel:+917983148985';
const instagramUrl = 'https://www.instagram.com/raj_delight/';

const gallery = [
  { src: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg', title: 'Raj Delight interior', note: 'Restaurant listing visual' },
  { src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=88', title: 'Indian dining spread', note: 'Cuisine visual' },
  { src: 'https://images.unsplash.com/photo-1598514982901-ae62709f7b82?auto=format&fit=crop&w=1600&q=88', title: 'Navratri thali', note: 'Seasonal visual' },
  { src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=88', title: 'Vegetarian burger', note: 'Menu visual' },
  { src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=88', title: 'Vegetarian pizza', note: 'Menu visual' },
  { src: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1600&q=88', title: 'Indian curry', note: 'Menu visual' },
];

const featured = [
  { name: 'Veg Grilled Sandwich', category: 'Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=88', price: '₹140–200' },
  { name: 'Fresh Lime Soda (Mix)', category: 'Fizzy Mocktails', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=88', price: '₹80–140' },
  { name: 'Cheese Garlic Bread', category: 'Garlic Breads', image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=1200&q=88', price: '₹120–180' },
  { name: 'Navratri Thali', category: 'Navratri Food', image: 'https://images.unsplash.com/photo-1598514982901-ae62709f7b82?auto=format&fit=crop&w=1200&q=88', price: '₹180–280' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }
function InstagramIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>; }
function ImageWithFallback({ src, alt, className = '', loading = 'lazy' as const }: { src: string; alt: string; className?: string; loading?: 'lazy' | 'eager' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`${className} rd-image-fallback`} role="img" aria-label={`${alt} image unavailable`}><span>Raj Delight</span></div>;
  return <img src={src} alt={alt} className={className} loading={loading} onError={() => setFailed(true)} />;
}
function estimatePrice(category: string) {
  if (/drink|shake|juice|coffee|tea|mocktail/i.test(category)) return '₹70–180';
  if (/pizza|pasta|sizzler/i.test(category)) return '₹180–350';
  if (/thali|meal|biryani/i.test(category)) return '₹180–320';
  if (/dessert|ice cream/i.test(category)) return '₹80–180';
  return '₹100–280';
}

export function RajDelightGodLevel() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    window.localStorage.setItem('raj-delight-theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    setDark(window.localStorage.getItem('raj-delight-theme') === 'dark');
  }, []);

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const textMatch = !q || `${item.name} ${item.category}`.toLowerCase().includes(q);
      return categoryMatch && textMatch;
    });
  }, [activeCategory, query]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenu(false);
  };

  return <main className="rd-godlevel">
    <div className="rd-edge-frame" aria-hidden="true"><span className="rd-edge rd-edge--tl"/><span className="rd-edge rd-edge--tr"/><span className="rd-edge rd-edge--bl"/><span className="rd-edge rd-edge--br"/><i className="rd-edge-line rd-edge-line--left"/><i className="rd-edge-line rd-edge-line--right"/></div>
    <div className="rd-announcement"><div className="rd-shell"><span>100% Vegetarian</span><b/><span>Chandausi</span><div className="rd-announcement-spacer"/><a href={mapsUrl} target="_blank" rel="noreferrer">Get directions <Arrow/></a><button className="rd-theme" onClick={() => setDark((v) => !v)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? '☀' : '◐'}</button></div></div>
    <header className="rd-header"><div className="rd-shell rd-header-inner"><button className="rd-logo-button" onClick={() => scrollTo('home')} aria-label="Raj Delight home"><Logo compact/></button><nav className={mobileMenu ? 'rd-nav rd-nav--open' : 'rd-nav'} aria-label="Primary navigation">{['home','about','menu','gallery','contact'].map((id) => <button key={id} onClick={() => scrollTo(id)}>{id[0].toUpperCase() + id.slice(1)}</button>)}</nav><div className="rd-header-actions"><a href={zomatoUrl} target="_blank" rel="noreferrer" className="rd-btn rd-btn--gold rd-hide-mobile">Order online <Arrow/></a><button className="rd-menu-button" onClick={() => setMobileMenu((v) => !v)} aria-expanded={mobileMenu} aria-label="Toggle navigation"><span/><span/></button></div></div></header>

    <section className="rd-hero" id="home"><div className="rd-hero-bg"><ImageWithFallback src={featured[0].image} alt="Vegetarian grilled sandwich" loading="eager"/></div><div className="rd-hero-overlay"/><div className="rd-shell rd-hero-content"><div className="rd-kicker">RAJ DELIGHT · CHANDAUSI</div><div className="rd-hero-logo"><Logo/></div><h1>Food that feels <em>like a celebration.</em></h1><p>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p><div className="rd-hero-actions"><button className="rd-btn rd-btn--gold" onClick={() => scrollTo('menu')}>Explore the menu <Arrow/></button><a className="rd-btn rd-btn--ghost" href={phoneUrl}>Call restaurant <Arrow/></a></div><div className="rd-hero-stats"><div><strong>4.3</strong><span>Google rating</span></div><div><strong>299</strong><span>listed items</span></div><div><strong>9:30 AM–12 AM</strong><span>hours shown online</span></div><div><strong>100%</strong><span>vegetarian</span></div></div></div><div className="rd-hero-scroll">SCROLL <span/></div></section>

    <section className="rd-order"><div className="rd-shell rd-order-inner"><div><small>DELIVERY · TAKEAWAY</small><h2>Order your favourites.</h2></div><div className="rd-order-grid"><a className="rd-order-zomato" href={zomatoUrl} target="_blank" rel="noreferrer"><strong>Zomato</strong><span>Order online</span><Arrow/></a><a className="rd-order-swiggy" href={swiggyUrl} target="_blank" rel="noreferrer"><strong>Swiggy</strong><span>Order online</span><Arrow/></a><a href={phoneUrl}><strong>Call</strong><span>+91 79831 48985</span><Arrow/></a></div></div></section>

    <section className="rd-section rd-about" id="about"><div className="rd-shell rd-two-col"><div><small className="rd-label">THE TABLE</small><h2>A little bit of <em>everything.</em></h2><p>Raj Delight is a pure vegetarian restaurant in Chandausi with indoor seating, takeaway, lunch, dinner and home delivery.</p><a className="rd-text-link" href={mapsUrl} target="_blank" rel="noreferrer">Visit the restaurant <Arrow/></a></div><div className="rd-orbit"><div className="rd-orbit-ring rd-orbit-ring--1"/><div className="rd-orbit-ring rd-orbit-ring--2"/><div className="rd-orbit-center"><Logo compact/><span>RAJ DELIGHT</span><small>CHANDAUSI</small></div></div></div></section>

    <section className="rd-section rd-featured"><div className="rd-shell"><div className="rd-section-head"><div><small className="rd-label">POPULAR PICKS</small><h2>Made to make you <em>stay awhile.</em></h2></div><span className="rd-index">01 — 04</span></div><div className="rd-feature-grid">{featured.map((dish, i) => <article className="rd-dish" key={dish.name}><div className="rd-dish-image"><ImageWithFallback src={dish.image} alt={dish.name}/><span>0{i + 1}</span></div><small>{dish.category}</small><h3>{dish.name}</h3><div className="rd-dish-bottom"><b>{dish.price}</b><button onClick={() => { setActiveCategory(dish.category); scrollTo('menu'); }}>View in menu <Arrow/></button></div></article>)}</div></div></section>

    <section className="rd-menu-section" id="menu"><div className="rd-shell"><div className="rd-menu-head"><div><small className="rd-label">THE COMPLETE MENU</small><h2>299 choices. <em>One table.</em></h2><p>Search, filter and browse the complete publicly listed menu. Displayed prices are practical estimates where exact live prices are not published; use the ordering buttons for the current bill.</p></div><div className="rd-price-card"><span>PRICE GUIDE</span><strong>₹100–₹350</strong><small>typical dish range</small><b>Exact prices may vary by portion, preparation and ordering platform.</b></div></div><div className="rd-menu-toolbar"><label><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes or categories..." aria-label="Search menu"/>{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label><div className="rd-category-row" role="tablist">{['All', ...menuCategories.map((c) => c.name)].map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'active' : ''} role="tab" aria-selected={activeCategory === category}>{category}</button>)}</div></div><div className="rd-menu-result"><span>{visibleItems.length} items shown</span>{activeCategory !== 'All' && <button onClick={() => setActiveCategory('All')}>Show all</button>}</div>{visibleItems.length ? <div className="rd-menu-grid">{visibleItems.map((item) => <a className="rd-menu-card" key={`${item.category}-${item.name}`} href={zomatoUrl} target="_blank" rel="noreferrer"><span className="rd-menu-card-cat">{item.category}</span><strong>{item.name}</strong><span className="rd-menu-card-price">{estimatePrice(item.category)} <Arrow/></span></a>)}</div> : <div className="rd-empty">No dishes match “{query || activeCategory}”. Try another search or <button onClick={() => { setQuery(''); setActiveCategory('All'); }}>show all dishes</button>.</div>}</div></section>

    <section className="rd-section rd-gallery-section" id="gallery"><div className="rd-shell"><div className="rd-section-head"><div><small className="rd-label">VISUAL JOURNAL</small><h2>A glimpse of the <em>experience.</em></h2></div><p>Restaurant imagery is distinguished from cuisine mood references until more owner-approved photographs are available.</p></div><div className="rd-gallery">{gallery.map((tile, i) => <figure key={tile.src} className={`rd-gallery-card rd-gallery-card--${i + 1}`}><ImageWithFallback src={tile.src} alt={tile.title}/><figcaption><span>{tile.note}</span><strong>{tile.title}</strong></figcaption></figure>)}</div></div></section>

    <section className="rd-section rd-contact" id="contact"><div className="rd-shell rd-contact-wrap"><div><small className="rd-label">VISIT · ORDER · CONNECT</small><h2>Come for the food. <em>Stay for the moment.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className="rd-contact-actions"><a className="rd-btn rd-btn--dark" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <Arrow/></a><a className="rd-btn rd-btn--light" href={phoneUrl}>Call +91 79831 48985</a><a className="rd-btn rd-btn--light rd-instagram" href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon/> @raj_delight</a></div></div><div className="rd-contact-card"><div><small>HOURS SHOWN ONLINE</small><strong>9:30 AM – 12:00 AM</strong></div><div><small>ORDER ONLINE</small><span><a href={zomatoUrl} target="_blank" rel="noreferrer">Zomato <Arrow/></a><a href={swiggyUrl} target="_blank" rel="noreferrer">Swiggy <Arrow/></a></span></div><div><small>FOOD LICENCE</small><strong>12726074000015</strong></div></div></div></section>

    <footer className="rd-footer"><div className="rd-shell rd-footer-grid"><div><Logo/><p>Pure vegetarian dining in Chandausi.</p></div><div><small>EXPLORE</small><button onClick={() => scrollTo('home')}>Home</button><button onClick={() => scrollTo('about')}>About</button><button onClick={() => scrollTo('menu')}>Menu</button><button onClick={() => scrollTo('gallery')}>Gallery</button><button onClick={() => scrollTo('contact')}>Contact</button></div><div><small>ORDER</small><a href={zomatoUrl} target="_blank" rel="noreferrer">Zomato</a><a href={swiggyUrl} target="_blank" rel="noreferrer">Swiggy</a><a href={phoneUrl}>Call restaurant</a></div><div><small>SOCIAL</small><a className="rd-social-link" href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon/> Instagram</a></div></div><div className="rd-shell rd-footer-bottom"><span>© {new Date().getFullYear()} Raj Delight</span><span>Good food · Great moments</span></div></footer>
    <div className="rd-mobile-bar"><button onClick={() => scrollTo('menu')}>Menu</button><a href={zomatoUrl} target="_blank" rel="noreferrer">Order</a><a href={phoneUrl}>Call</a><a href={mapsUrl} target="_blank" rel="noreferrer">Directions</a></div>
  </main>;
}
