'use client';

import { useMemo, useState } from 'react';
import { Logo } from './Logo';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const zomatoUrl = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const swiggyUrl = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const phoneNumber = '+917983148985';
const whatsappUrl = 'https://wa.me/917983148985';
const instagramSearch = 'https://www.google.com/search?q=Raj+Delight+Chandausi+Instagram';
const facebookSearch = 'https://www.google.com/search?q=Raj+Delight+Chandausi+Facebook';

const featured = [
  { name: 'Veg Grilled Sandwich', category: 'Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Fresh Lime Soda (mix)', category: "Fizzy Mocktails", image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Cheese Garlic Bread', category: 'Garlic Breads', image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=1200&q=88' },
  { name: 'Navratri Thali', category: 'Navratri Food', image: 'https://images.unsplash.com/photo-1598514982901-ae62709f7b82?auto=format&fit=crop&w=1200&q=88' },
];

const gallery = [
  { src: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg', alt: 'Public listing photo of Raj Delight interior', label: 'Public listing photo' },
  { src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=90', alt: 'Vegetarian dumpling dish', label: 'Cuisine mood' },
  { src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=90', alt: 'Indian dining spread', label: 'Dining mood' },
  { src: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1400&q=90', alt: 'Indian vegetarian curry', label: 'Cuisine mood' },
  { src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=90', alt: 'Vegetarian burger', label: 'Menu mood' },
  { src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=90', alt: 'Vegetarian pizza', label: 'Menu mood' },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SocialIcon({ type }: { type: 'instagram' | 'facebook' }) {
  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>
    );
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h2.8l.5-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.4-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H8.2v3H11v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function RestaurantSiteV3() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(true);

  const visibleItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesCategory && (!normalized || item.name.toLowerCase().includes(normalized));
    });
  }, [activeCategory, query]);

  const visibleGroups = useMemo(() => {
    if (activeCategory !== 'All' || query.trim()) {
      return [{ name: activeCategory === 'All' ? 'Search results' : activeCategory, items: visibleItems.map((item) => item.name) }];
    }
    return menuCategories;
  }, [activeCategory, query, visibleItems]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="edge-corners" aria-hidden="true">
        <span className="edge-corner edge-corner--tl" /><span className="edge-corner edge-corner--tr" />
        <span className="edge-corner edge-corner--bl" /><span className="edge-corner edge-corner--br" />
      </div>

      <div className="topbar">
        <div className="container topbar-inner">
          <span>100% Vegetarian</span><span className="topbar-dot" /><span>Chandausi</span>
          <span className="topbar-spacer" />
          <a href={mapsUrl} target="_blank" rel="noreferrer">Directions <Arrow /></a>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <button className="brand-button" onClick={() => scrollTo('home')} aria-label="Go to Raj Delight home"><Logo compact /></button>
          <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
            <button onClick={() => scrollTo('home')}>Home</button>
            <button onClick={() => scrollTo('menu')}>Menu</button>
            <button onClick={() => scrollTo('about')}>About</button>
            <button onClick={() => scrollTo('gallery')}>Gallery</button>
            <button onClick={() => scrollTo('reviews')}>Reviews</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
          <div className="nav-actions">
            <a className="button button--gold button--small" href={zomatoUrl} target="_blank" rel="noreferrer">Order Online <Arrow /></a>
            <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
          </div>
        </div>
      </header>

      <section className="hero-v3" id="home">
        <div className="hero-v3-media"><img src={featured[0].image} alt="" /></div>
        <div className="hero-v3-vignette" />
        <div className="container hero-v3-content">
          <div className="hero-brand-line"><Logo /></div>
          <h1>A Taste Worth <em>Remembering</em></h1>
          <p>From North Indian favourites and South Indian classics to Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p>
          <div className="hero-actions">
            <button className="button button--gold" onClick={() => scrollTo('menu')}>Explore Menu <Arrow /></button>
            <a className="button button--outline-light" href={mapsUrl} target="_blank" rel="noreferrer">Visit Us <Arrow /></a>
          </div>
          <div className="hero-proof">
            <div><strong>4.3</strong><span>Google rating</span></div>
            <div><strong>34</strong><span>menu categories</span></div>
            <div><strong>09:30–00:00</strong><span>hours shown online</span></div>
            <div><strong>Veg</strong><span>restaurant</span></div>
          </div>
        </div>
        <div className="hero-v3-scroll"><span /> Scroll to explore</div>
      </section>

      <section className="order-strip">
        <div className="container order-strip-inner">
          <div><span className="micro-label">DELIVERY & TAKEAWAY</span><strong>Order from Raj Delight</strong></div>
          <div className="order-strip-actions">
            <a href={zomatoUrl} target="_blank" rel="noreferrer" className="platform-chip platform-chip--zomato"><b>Zomato</b><span>Order online</span><Arrow /></a>
            <a href={swiggyUrl} target="_blank" rel="noreferrer" className="platform-chip platform-chip--swiggy"><b>Swiggy</b><span>Order online</span><Arrow /></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="platform-chip"><b>WhatsApp</b><span>Contact</span><Arrow /></a>
          </div>
        </div>
      </section>

      <section className="feature-v3 section" id="about">
        <div className="container">
          <div className="section-intro"><span className="micro-label">RAJ DELIGHT SPECIALS</span><h2>Favourites from the <em>current public menu.</em></h2><p>Swiggy currently highlights Veg Grilled Sandwich, Fresh Lime Soda (mix), Cheese Garlic Bread and Navratri Thali among popular choices.</p></div>
          <div className="feature-v3-grid">
            {featured.map((item) => (
              <article className="dish-card" key={item.name}>
                <div className="dish-card-image"><img src={item.image} alt={item.name} loading="lazy" /><span className="dish-number">01</span></div>
                <div className="dish-card-meta"><span>{item.category}</span><button onClick={() => { setActiveCategory(item.category); scrollTo('menu'); }}>View in menu <Arrow /></button></div>
                <h3>{item.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="menu-v3 section section--dark" id="menu">
        <div className="container">
          <div className="menu-v3-heading"><div><span className="micro-label micro-label--light">THE COMPLETE MENU</span><h2>One menu. <em>Every craving.</em></h2></div><div className="menu-total"><strong>{menuItemCount}</strong><span>publicly listed<br />items</span></div></div>
          <div className="menu-controls">
            <label className="menu-search-v3"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search every dish..." aria-label="Search every dish" />{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label>
            <div className="category-scroll-v3" role="tablist" aria-label="Menu categories">
              {['All', ...menuCategories.map((category) => category.name)].map((category) => <button key={category} className={activeCategory === category ? 'category-chip category-chip--active' : 'category-chip'} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}
            </div>
          </div>
          <div className="menu-view-toggle"><span>{visibleItems.length} items shown</span><button onClick={() => setShowAllCategories((value) => !value)}>{showAllCategories ? 'Compact view' : 'Show all categories'} <Arrow /></button></div>
          <div className={`full-menu ${showAllCategories ? 'full-menu--open' : 'full-menu--compact'}`}>
            {visibleGroups.map((group) => (
              <section className="menu-group" key={group.name}>
                <div className="menu-group-title"><span>{group.name}</span><small>{group.items.length} items</small></div>
                <div className="menu-grid-v3">
                  {group.items.map((name) => <a className="menu-item-card" key={`${group.name}-${name}`} href={zomatoUrl} target="_blank" rel="noreferrer"><span className="menu-item-name">{name}</span><span className="menu-item-price">View live price <Arrow /></span></a>)}
                </div>
              </section>
            ))}
          </div>
          <div className="price-notice"><strong>Price information</strong><p>Current public ordering pages require login to reveal individual dish prices. Public listings show approximately <b>₹200–₹400 per person</b> on Restaurant Guru and <b>₹1000 for two</b> on District; these are listing-level spend estimates, not individual dish prices.</p><a href={zomatoUrl} target="_blank" rel="noreferrer">Open live menu for current prices <Arrow /></a></div>
        </div>
      </section>

      <section className="experience-v3 section">
        <div className="container experience-v3-grid">
          <div className="experience-v3-copy"><span className="micro-label">THE EXPERIENCE</span><h2>Designed around the <em>table.</em></h2><p>Public listings currently describe Raj Delight as a vegetarian restaurant with indoor seating, lunch, dinner, takeaway and home delivery.</p><div className="experience-list"><div><span>01</span><strong>Vegetarian</strong><small>Public listing</small></div><div><span>02</span><strong>Indoor seating</strong><small>Public listing</small></div><div><span>03</span><strong>Home delivery</strong><small>Public listing</small></div><div><span>04</span><strong>Lunch & dinner</strong><small>Public listing</small></div></div></div>
          <div className="experience-emblem"><div className="emblem-ring emblem-ring--outer" /><div className="emblem-ring emblem-ring--inner" /><div className="emblem-center"><Logo /><span>RAJ DELIGHT</span></div></div>
        </div>
      </section>

      <section className="gallery-v3 section section--paper" id="gallery">
        <div className="container"><div className="section-head-v3"><div><span className="micro-label">VISUAL JOURNAL</span><h2>See the place. <em>Feel the mood.</em></h2></div><p>One current public listing photo is used alongside editorial food imagery until the restaurant provides an approved photography set.</p></div>
          <div className="gallery-v3-grid">{gallery.map((tile, index) => <figure key={tile.src} className={`gallery-v3-tile gallery-v3-tile--${index + 1}`}><img src={tile.src} alt={tile.alt} loading="lazy" /><figcaption><span>{tile.label}</span><b>0{index + 1}</b></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="reviews-v3 section section--dark" id="reviews">
        <div className="container reviews-v3-grid"><div><span className="micro-label micro-label--light">PUBLIC RATING</span><div className="rating-number">4.3</div><div className="rating-stars">★★★★★</div><p>Google rating snapshot</p></div><div><div className="review-quote">“</div><blockquote>Explore current customer feedback directly on the live restaurant profiles.</blockquote><div className="review-buttons"><a className="button button--outline-light" href={mapsUrl} target="_blank" rel="noreferrer">Google profile <Arrow /></a><a className="text-link text-link--light" href={zomatoUrl} target="_blank" rel="noreferrer">Read Zomato reviews <Arrow /></a></div></div></div>
      </section>

      <section className="contact-v3 section" id="contact">
        <div className="container contact-v3-grid">
          <div><span className="micro-label">VISIT RAJ DELIGHT</span><h2>Come by for <em>something delicious.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412</p><div className="contact-actions"><a className="button button--dark" href={mapsUrl} target="_blank" rel="noreferrer">Get Directions <Arrow /></a><a className="button button--outline-dark" href={`tel:${phoneNumber}`}>Call Restaurant</a><a className="button button--outline-dark" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a></div></div>
          <div className="contact-detail-panel"><div><span>Phone</span><a href={`tel:${phoneNumber}`}>+91 79831 48985</a></div><div><span>Hours shown online</span><strong>9:30 AM – 12:00 AM</strong></div><div><span>Food delivery</span><strong>Home delivery available</strong></div><div><span>Food licence</span><strong>12726074000015</strong></div></div>
        </div>
      </section>

      <footer className="footer-v3">
        <div className="container footer-v3-top"><div><Logo /><p>Vegetarian restaurant in Chandausi.</p></div><div className="footer-links-v3"><div><span>Explore</span><button onClick={() => scrollTo('home')}>Home</button><button onClick={() => scrollTo('menu')}>Menu</button><button onClick={() => scrollTo('gallery')}>Gallery</button><button onClick={() => scrollTo('contact')}>Contact</button></div><div><span>Order</span><a href={zomatoUrl} target="_blank" rel="noreferrer">Zomato</a><a href={swiggyUrl} target="_blank" rel="noreferrer">Swiggy</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a></div><div><span>Social</span><a href={instagramSearch} target="_blank" rel="noreferrer"><SocialIcon type="instagram" /> Instagram</a><a href={facebookSearch} target="_blank" rel="noreferrer"><SocialIcon type="facebook" /> Facebook</a></div></div></div>
        <div className="container footer-v3-bottom"><span>© {new Date().getFullYear()} Raj Delight</span><span>Public information compiled from current listings</span></div>
      </footer>

      <div className="mobile-actions-v3"><button onClick={() => scrollTo('menu')}>Menu</button><a href={zomatoUrl} target="_blank" rel="noreferrer">Order</a><a href={`tel:${phoneNumber}`}>Call</a><a href={mapsUrl} target="_blank" rel="noreferrer">Directions</a></div>
    </main>
  );
}
