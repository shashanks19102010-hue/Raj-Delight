'use client';

import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import { Logo } from './Logo';

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const zomatoUrl = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const swiggyUrl = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const phoneUrl = 'tel:+917983148985';
const instagramUrl = 'https://www.instagram.com/raj_delight/';

const gallery = [
  { src: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg', title: 'Raj Delight interior', note: 'Public listing photo' },
  { src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=88', title: 'Indian dining spread', note: 'Editorial cuisine visual' },
  { src: 'https://images.unsplash.com/photo-1598514982901-ae62709f7b82?auto=format&fit=crop&w=1600&q=88', title: 'Thali inspiration', note: 'Navratri menu visual' },
  { src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=88', title: 'Vegetarian burger', note: 'Menu visual' },
  { src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=88', title: 'Vegetarian pizza', note: 'Menu visual' },
  { src: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1600&q=88', title: 'Indian vegetarian curry', note: 'Menu visual' },
];

const featured = [
  { name: 'Veg Grilled Sandwich', category: 'Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Fresh Lime Soda (mix)', category: 'Fizzy Mocktails', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Cheese Garlic Bread', category: 'Garlic Breads', image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Navratri Thali', category: 'Navratri Food', image: 'https://images.unsplash.com/photo-1598514982901-ae62709f7b82?auto=format&fit=crop&w=1200&q=88' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>;
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? <span aria-hidden="true">☀</span> : <span aria-hidden="true">◐</span>;
}

export function RajDelightGodLevel() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const textMatch = !q || item.name.toLowerCase().includes(q);
      return categoryMatch && textMatch;
    });
  }, [activeCategory, query]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenu(false);
  };

  return (
    <main className="rd-godlevel">
      <div className="rd-edge-frame" aria-hidden="true">
        <span className="rd-edge rd-edge--tl" /><span className="rd-edge rd-edge--tr" /><span className="rd-edge rd-edge--bl" /><span className="rd-edge rd-edge--br" />
        <i className="rd-edge-line rd-edge-line--left" /><i className="rd-edge-line rd-edge-line--right" />
      </div>

      <div className="rd-announcement"><div className="rd-shell"><span>100% Vegetarian</span><b /> <span>Chandausi</span><div className="rd-announcement-spacer" /><a href={mapsUrl} target="_blank" rel="noreferrer">Get directions <Arrow /></a><button className="rd-theme" onClick={() => setDark((v) => !v)} aria-label="Toggle colour theme"><ThemeIcon dark={dark} /></button></div></div>

      <header className="rd-header"><div className="rd-shell rd-header-inner">
        <button className="rd-logo-button" onClick={() => scrollTo('home')} aria-label="Raj Delight home"><Logo compact /></button>
        <nav className={mobileMenu ? 'rd-nav rd-nav--open' : 'rd-nav'} aria-label="Primary navigation">
          {['home', 'menu', 'about', 'gallery', 'contact'].map((id) => <button key={id} onClick={() => scrollTo(id)}>{id === 'home' ? 'Home' : id[0].toUpperCase() + id.slice(1)}</button>)}
        </nav>
        <div className="rd-header-actions"><a href={zomatoUrl} target="_blank" rel="noreferrer" className="rd-btn rd-btn--gold rd-hide-mobile">Order on Zomato <Arrow /></a><button className="rd-menu-button" onClick={() => setMobileMenu((v) => !v)} aria-expanded={mobileMenu} aria-label="Open navigation"><span /><span /></button></div>
      </div></header>

      <section className="rd-hero" id="home">
        <div className="rd-hero-bg"><img src={featured[0].image} alt="" /></div><div className="rd-hero-overlay" />
        <div className="rd-shell rd-hero-content"><div className="rd-kicker">RAJ DELIGHT · CHANDAUSI</div><div className="rd-hero-logo"><Logo /></div>
          <h1>Food that feels <em>like a celebration.</em></h1>
          <p>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p>
          <div className="rd-hero-actions"><button className="rd-btn rd-btn--gold" onClick={() => scrollTo('menu')}>Explore the menu <Arrow /></button><a className="rd-btn rd-btn--ghost" href={phoneUrl}>Call restaurant <Arrow /></a></div>
          <div className="rd-hero-stats"><div><strong>4.3</strong><span>Google rating</span></div><div><strong>299</strong><span>listed items</span></div><div><strong>09:30–00:00</strong><span>hours shown online</span></div><div><strong>Veg</strong><span>restaurant</span></div></div>
        </div><div className="rd-hero-scroll">SCROLL <span /></div>
      </section>

      <section className="rd-order"><div className="rd-shell rd-order-inner"><div><small>DELIVERY · TAKEAWAY</small><h2>Order your favourites.</h2></div><div className="rd-order-grid"><a href={zomatoUrl} target="_blank" rel="noreferrer"><strong>Zomato</strong><span>Order online</span><Arrow /></a><a href={swiggyUrl} target="_blank" rel="noreferrer"><strong>Swiggy</strong><span>Order online</span><Arrow /></a><a href={phoneUrl}><strong>Call</strong><span>+91 79831 48985</span><Arrow /></a></div></div></section>

      <section className="rd-section rd-about" id="about"><div className="rd-shell rd-two-col"><div><small className="rd-label">THE TABLE</small><h2>A little bit of <em>everything.</em></h2><p>Raj Delight is publicly listed as a vegetarian restaurant in Chandausi offering indoor seating, takeaway, lunch, dinner and home delivery.</p><a className="rd-text-link" href={mapsUrl} target="_blank" rel="noreferrer">Visit the restaurant <Arrow /></a></div><div className="rd-orbit"><div className="rd-orbit-ring rd-orbit-ring--1" /><div className="rd-orbit-ring rd-orbit-ring--2" /><div className="rd-orbit-center"><Logo compact /><span>RAJ DELIGHT</span><small>CHANDAUSI</small></div></div></div></section>

      <section className="rd-section rd-featured"><div className="rd-shell"><div className="rd-section-head"><div><small className="rd-label">POPULAR PICKS</small><h2>Made to make you <em>stay awhile.</em></h2></div><span className="rd-index">01 — 04</span></div><div className="rd-feature-grid">{featured.map((dish, i) => <article className="rd-dish" key={dish.name}><div className="rd-dish-image"><img src={dish.image} alt={dish.name} loading="lazy" /><span>0{i + 1}</span></div><small>{dish.category}</small><h3>{dish.name}</h3><button onClick={() => { setActiveCategory(dish.category); scrollTo('menu'); }}>View in menu <Arrow /></button></article>)}</div></div></section>

      <section className="rd-menu-section" id="menu"><div className="rd-shell"><div className="rd-menu-head"><div><small className="rd-label">THE COMPLETE MENU</small><h2>299 choices. <em>One table.</em></h2><p>Browse every publicly listed menu item. Individual live prices remain on the ordering platforms when the source does not expose them here.</p></div><div className="rd-price-card"><span>PUBLIC SPEND SNAPSHOT</span><strong>₹400</strong><small>per person on current Zomato listing</small><b>₹200–₹400 typical bill range also appears in public restaurant listings.</b></div></div>
          <div className="rd-menu-toolbar"><label><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the menu..." aria-label="Search menu" />{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label><div className="rd-category-row" role="tablist">{['All', ...menuCategories.map((c) => c.name)].map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'active' : ''} role="tab" aria-selected={activeCategory === category}>{category}</button>)}</div></div>
          <div className="rd-menu-result"><span>{visibleItems.length} items shown</span>{activeCategory !== 'All' && <button onClick={() => setActiveCategory('All')}>Show all</button>}</div>
          <div className="rd-menu-grid">{visibleItems.map((item) => <a className="rd-menu-card" key={`${item.category}-${item.name}`} href={zomatoUrl} target="_blank" rel="noreferrer"><span className="rd-menu-card-cat">{item.category}</span><strong>{item.name}</strong><span className="rd-menu-card-price">Live price on Zomato <Arrow /></span></a>)}</div>
        </div></section>

      <section className="rd-section rd-gallery-section" id="gallery"><div className="rd-shell"><div className="rd-section-head"><div><small className="rd-label">VISUAL JOURNAL</small><h2>A glimpse of the <em>experience.</em></h2></div><p>One public listing image is shown as such; editorial food visuals are marked as mood references until restaurant-approved photography is supplied.</p></div><div className="rd-gallery">{gallery.map((tile, i) => <figure key={tile.src} className={`rd-gallery-card rd-gallery-card--${i + 1}`}><img src={tile.src} alt={tile.title} loading="lazy" /><figcaption><span>{tile.note}</span><strong>{tile.title}</strong></figcaption></figure>)}</div></div></section>

      <section className="rd-section rd-contact" id="contact"><div className="rd-shell rd-contact-wrap"><div><small className="rd-label">VISIT · ORDER · CONNECT</small><h2>Come for the food. <em>Stay for the moment.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className="rd-contact-actions"><a className="rd-btn rd-btn--dark" href={mapsUrl} target="_blank" rel="noreferrer">Get directions <Arrow /></a><a className="rd-btn rd-btn--light" href={phoneUrl}>Call +91 79831 48985</a><a className="rd-btn rd-btn--light" href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon /> @raj_delight</a></div></div><div className="rd-contact-card"><div><small>HOURS SHOWN ONLINE</small><strong>9:30 AM – 12:00 AM</strong></div><div><small>ORDER ONLINE</small><span><a href={zomatoUrl} target="_blank" rel="noreferrer">Zomato <Arrow /></a><a href={swiggyUrl} target="_blank" rel="noreferrer">Swiggy <Arrow /></a></span></div><div><small>FOOD LICENCE</small><strong>12726074000015</strong></div></div></div></section>

      <footer className="rd-footer"><div className="rd-shell rd-footer-grid"><div><Logo /><p>Vegetarian restaurant in Chandausi.</p></div><div><small>EXPLORE</small><button onClick={() => scrollTo('home')}>Home</button><button onClick={() => scrollTo('menu')}>Menu</button><button onClick={() => scrollTo('gallery')}>Gallery</button><button onClick={() => scrollTo('contact')}>Contact</button></div><div><small>ORDER</small><a href={zomatoUrl} target="_blank" rel="noreferrer">Zomato</a><a href={swiggyUrl} target="_blank" rel="noreferrer">Swiggy</a><a href={phoneUrl}>Call</a></div><div><small>SOCIAL</small><a href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon /> Instagram</a></div></div><div className="rd-shell rd-footer-bottom"><span>© 2026 Raj Delight</span><span>Public information · Chandausi</span></div></footer>

      <div className="rd-mobile-bar"><button onClick={() => scrollTo('menu')}>Menu</button><a href={zomatoUrl} target="_blank" rel="noreferrer">Order</a><a href={phoneUrl}>Call</a><a href={mapsUrl} target="_blank" rel="noreferrer">Directions</a></div>
    </main>
  );
}
