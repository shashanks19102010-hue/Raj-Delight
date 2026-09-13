'use client';

import { useMemo, useState } from 'react';
import { Logo } from './Logo';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const zomatoUrl = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const swiggyUrl = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const phoneNumber = '+917983148985';

const featured = [
  { label: 'Special', name: 'Paneer Lababdar', category: 'Indian Main Course' },
  { label: 'Special', name: 'Veg Hyderabadi Biryani (special)', category: 'Biryani' },
  { label: 'Raj Delight Special', name: 'Idli Chaat (raj Delight Special)', category: 'South Indian' },
  { label: 'Classic', name: 'Paneer Tikka Pizza', category: 'Continental' },
];

const galleryTiles = [
  { src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85', alt: 'Editorial Indian dining table', size: 'large' },
  { src: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=85', alt: 'Editorial Indian dish photography', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85', alt: 'Editorial restaurant interior', size: 'standard' },
  { src: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85', alt: 'Editorial dumpling photography', size: 'standard' },
];

export function RestaurantSite() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery = !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Vegetarian Restaurant</span>
          <span className="topbar-dot" aria-hidden="true" />
          <span>Chandausi</span>
          <span className="topbar-spacer" />
          <a href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <button className="mobile-brand" onClick={() => scrollTo('home')} aria-label="Go to Raj Delight home">
            <Logo compact />
          </button>
          <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Primary navigation">
            <button onClick={() => scrollTo('home')}>Home</button>
            <button onClick={() => scrollTo('menu')}>Menu</button>
            <button onClick={() => scrollTo('story')}>Our Story</button>
            <button onClick={() => scrollTo('gallery')}>Gallery</button>
            <button onClick={() => scrollTo('reviews')}>Reviews</button>
            <button onClick={() => scrollTo('visit')}>Visit Us</button>
          </nav>
          <div className="nav-actions">
            <a className="button button--gold button--small" href={zomatoUrl} target="_blank" rel="noreferrer">Order Online</a>
            <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-media" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=88" alt="" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-glow hero-glow--one" />
        <div className="hero-glow hero-glow--two" />
        <div className="container hero-content">
          <div className="hero-eyebrow">RAJ DELIGHT · CHANDAUSI</div>
          <h1>Where every table<br /><em>becomes a memory.</em></h1>
          <p>Explore a vegetarian menu that moves from North Indian favourites to South Indian classics, Chinese plates, pizzas, pasta, desserts and more.</p>
          <div className="hero-actions">
            <button className="button button--gold" onClick={() => scrollTo('menu')}>Explore the menu <span aria-hidden="true">↗</span></button>
            <a className="button button--ghost" href={mapsUrl} target="_blank" rel="noreferrer">Visit Raj Delight</a>
          </div>
          <div className="hero-meta">
            <div><span className="meta-value">4.3</span><span className="stars">★★★★★</span><span className="meta-label">Google rating</span></div>
            <div className="hero-meta-divider" />
            <div><span className="meta-value">34</span><span className="meta-label">Menu categories</span></div>
            <div className="hero-meta-divider" />
            <div><span className="meta-value">09:30–00:00</span><span className="meta-label">Daily hours shown online</span></div>
          </div>
        </div>
        <div className="hero-scroll">Scroll to explore <span>↓</span></div>
      </section>

      <section className="intro section" id="story">
        <div className="container intro-grid">
          <div>
            <span className="section-kicker">THE RAJ DELIGHT TABLE</span>
            <h2>More choice.<br /><em>More reasons to gather.</em></h2>
          </div>
          <div className="intro-copy">
            <p className="lead">Raj Delight is a vegetarian restaurant in Chandausi with a wide-ranging menu spanning Indian, South Indian, Chinese, Continental, fast-food, street-food, ice-cream and beverage selections.</p>
            <p className="muted">This website keeps the public restaurant information together in one place, while sending online orders to the restaurant’s existing ordering platforms.</p>
            <div className="signature-rule" />
            <span className="signature">Raj Delight · Chandausi</span>
          </div>
        </div>
      </section>

      <section className="feature-band section section--dark">
        <div className="container">
          <div className="section-head">
            <div><span className="section-kicker section-kicker--light">FROM THE CURRENT MENU</span><h2>Favourites worth<br /><em>coming back for.</em></h2></div>
            <button className="text-link text-link--light" onClick={() => scrollTo('menu')}>See full menu <span>↗</span></button>
          </div>
          <div className="feature-grid">
            {featured.map((item, index) => (
              <article className={`feature-card feature-card--${index + 1}`} key={item.name}>
                <div className="feature-number">0{index + 1}</div>
                <div className="feature-tag">{item.label}</div>
                <div className="feature-copy"><p>{item.category}</p><h3>{item.name}</h3></div>
                <button className="feature-arrow" onClick={() => { setActiveCategory(item.category); scrollTo('menu'); }}>Explore <span>↗</span></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="menu-section section" id="menu">
        <div className="container">
          <div className="section-head section-head--menu">
            <div><span className="section-kicker">THE FULL MENU</span><h2>Everything on the<br /><em>table, beautifully sorted.</em></h2></div>
            <div className="menu-count"><strong>{menuItemCount}</strong><span>publicly listed<br />menu items</span></div>
          </div>

          <div className="menu-toolbar">
            <label className="menu-search">
              <span aria-hidden="true">⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes..." aria-label="Search menu" />
              {query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}
            </label>
            <div className="category-scroll" role="tablist" aria-label="Menu categories">
              {['All', ...menuCategories.map((category) => category.name)].map((category) => (
                <button key={category} className={activeCategory === category ? 'category-pill category-pill--active' : 'category-pill'} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>
              ))}
            </div>
          </div>

          <div className="menu-results-head"><span>{visibleItems.length} items shown</span><span>{activeCategory === 'All' ? 'All categories' : activeCategory}</span></div>
          <div className="menu-list">
            {visibleItems.map((item, index) => (
              <div className="menu-row" key={`${item.category}-${item.name}`}>
                <span className="menu-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="menu-name"><span>{item.name}</span><small>{item.category}</small></div>
                <span className="menu-dash" />
                <span className="menu-status">Menu listing</span>
              </div>
            ))}
          </div>
          {visibleItems.length === 0 && <div className="empty-state">No listed dish matches your search.</div>}
          <p className="menu-note">Prices are not shown here because the current public ordering listing gates item prices behind login. The dish names above reflect the public listing and should be rechecked against the restaurant’s latest menu before publication of prices.</p>
        </div>
      </section>

      <section className="experience section section--paper">
        <div className="container experience-grid">
          <div className="experience-copy"><span className="section-kicker">A WIDE TABLE, ONE PLACE</span><h2>From morning chai<br /><em>to late-night cravings.</em></h2><p>Public listings currently describe Raj Delight as a vegetarian restaurant with indoor seating, lunch, dinner, takeaway and home delivery.</p><div className="experience-stats"><div><strong>Vegetarian</strong><span>Restaurant listing</span></div><div><strong>Indoor</strong><span>Seating listed</span></div><div><strong>Delivery</strong><span>Available online</span></div></div></div>
          <div className="experience-art" aria-hidden="true"><div className="art-orbit art-orbit--one" /><div className="art-orbit art-orbit--two" /><div className="art-center"><Logo /><span>RD</span></div><div className="art-caption">AN EXPERIENCE DESIGNED<br />AROUND THE TABLE</div></div>
        </div>
      </section>

      <section className="gallery section" id="gallery">
        <div className="container">
          <div className="section-head"><div><span className="section-kicker">VISUAL JOURNAL</span><h2>A little taste of<br /><em>the atmosphere.</em></h2></div><span className="gallery-note">Editorial imagery is used as a design placeholder until original Raj Delight photography is supplied.</span></div>
          <div className="gallery-grid">
            {galleryTiles.map((tile, index) => <figure className={`gallery-tile gallery-tile--${tile.size}`} key={tile.src}><img src={tile.src} alt={tile.alt} loading="lazy" /><figcaption>RAJ DELIGHT / 0{index + 1}</figcaption></figure>)}
          </div>
        </div>
      </section>

      <section className="review-section section section--dark" id="reviews">
        <div className="container review-grid">
          <div className="review-score"><span className="section-kicker section-kicker--light">PUBLIC LISTING SNAPSHOT</span><div className="big-rating">4.3</div><div className="big-stars">★★★★★</div><p>Google rating</p></div>
          <div className="review-copy"><span className="quote-mark">“</span><blockquote>Food, location, atmosphere and service can be explored from the current public listings. For the most current guest feedback, open the live Google profile.</blockquote><div className="review-actions"><a className="button button--outline-light" href={mapsUrl} target="_blank" rel="noreferrer">View live Google profile <span>↗</span></a><a className="text-link text-link--light" href={zomatoUrl} target="_blank" rel="noreferrer">Open Zomato <span>↗</span></a></div></div>
        </div>
      </section>

      <section className="order-section section" id="visit">
        <div className="container order-card">
          <div><span className="section-kicker">ORDER & VISIT</span><h2>Your next meal<br /><em>is one tap away.</em></h2><p>Use the restaurant’s active public ordering links for delivery, or open directions for an in-person visit.</p></div>
          <div className="order-actions"><a href={zomatoUrl} target="_blank" rel="noreferrer" className="order-platform"><span>Zomato</span><small>Order online</small><b>↗</b></a><a href={swiggyUrl} target="_blank" rel="noreferrer" className="order-platform"><span>Swiggy</span><small>Order online</small><b>↗</b></a><a href={mapsUrl} target="_blank" rel="noreferrer" className="order-platform"><span>Google Maps</span><small>Get directions</small><b>↗</b></a></div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-top">
          <div><Logo /><p className="footer-description">Raj Delight · Vegetarian restaurant in Chandausi.</p></div>
          <div className="footer-columns"><div><span>Explore</span><button onClick={() => scrollTo('home')}>Home</button><button onClick={() => scrollTo('menu')}>Menu</button><button onClick={() => scrollTo('gallery')}>Gallery</button></div><div><span>Visit</span><a href={mapsUrl} target="_blank" rel="noreferrer">15, Lathi Bazar</a><a href={mapsUrl} target="_blank" rel="noreferrer">Ward 05, Chandausi</a><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></div><div><span>Order</span><a href={zomatoUrl} target="_blank" rel="noreferrer">Zomato</a><a href={swiggyUrl} target="_blank" rel="noreferrer">Swiggy</a><a href={mapsUrl} target="_blank" rel="noreferrer">Directions</a></div></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Raj Delight</span><span>Built with care for Chandausi</span></div>
      </footer>

      <div className="mobile-actions"><button onClick={() => scrollTo('menu')}>Menu</button><a href={zomatoUrl} target="_blank" rel="noreferrer">Order</a><a href={mapsUrl} target="_blank" rel="noreferrer">Directions</a></div>
    </main>
  );
}
