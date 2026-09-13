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
const HERO = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2200&q=90';
const THALI = 'https://images.unsplash.com/photo-1598514982901-ae62709f7b82?auto=format&fit=crop&w=1400&q=90';
const PIZZA = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=90';
const DOSA = 'https://images.unsplash.com/photo-1668236543090-5e8f8e4e1b2b?auto=format&fit=crop&w=1400&q=90';
const BURGER = 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=90';
const DRINK = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=90';

const nameFixes: Record<string, string> = {
  'Black Current Skake': 'Black Current Shake',
  'Panner Butter Masala': 'Paneer Butter Masala',
  'Chinesse Sizzler': 'Chinese Sizzler',
  'Saucy Delighats': 'Saucy Delights',
  'Rajsthani Thali (special)': 'Rajasthani Thali (special)',
};
const categoryFixes: Record<string, string> = { 'Saucy Delighats': 'Saucy Delights', "Drink's": 'Drinks' };
const pretty = (value: string) => nameFixes[value] ?? value;
const prettyCategory = (value: string) => categoryFixes[value] ?? value;

function estimatePrice(category: string): string {
  if (/drink|shake|mocktail|lassi|warm|tea|coffee/i.test(category)) return '₹70–₹180 est.';
  if (/pizza|pasta|sizzler|burger|sandwich/i.test(category)) return '₹120–₹350 est.';
  if (/thali|biryani|rice|main course|dal/i.test(category)) return '₹150–₹350 est.';
  if (/dessert|ice cream/i.test(category)) return '₹80–₹220 est.';
  return '₹100–₹300 est.';
}

function Arrow() { return <span aria-hidden="true">↗</span>; }
function InstagramIcon({ size = 18 }: { size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="rd-social-svg"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>;
}
function ThemeGlyph({ dark }: { dark: boolean }) { return <span aria-hidden="true">{dark ? '☀' : '◐'}</span>; }

function SafeImage({ src, alt, className = '', priority = false, sizes }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  const fallback = src === REAL_INTERIOR ? '' : REAL_INTERIOR;
  if (failed) return <div className={`rd-image-fallback ${className}`} role="img" aria-label={`${alt} unavailable`}><span>Raj Delight</span></div>;
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes ?? '100vw'} className={className} onError={() => { if (fallback) setFailed(true); else setFailed(true); }} />;
}

export function RajDelightFinalV2() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('raj-delight-theme');
    const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const value = stored ? stored === 'dark' : systemDark;
    setDark(value);
    document.documentElement.dataset.theme = value ? 'dark' : 'light';
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    window.localStorage.setItem('raj-delight-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const byCategory = activeCategory === 'All' || item.category === activeCategory;
      const bySearch = !q || `${item.name} ${item.category}`.toLowerCase().includes(q);
      return byCategory && bySearch;
    });
  }, [activeCategory, search]);

  const toggleCategory = (name: string) => {
    setOpenCategories((current) => current.includes(name) ? current.filter((x) => x !== name) : [...current, name]);
  };
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false); };
  const chooseCategory = (name: string) => { setActiveCategory(name); setOpenCategories([name]); scrollTo('menu'); };

  const categoryCount = menuCategories.length;
  const dishCount = allMenuItems.length;

  return (
    <main className="rd-final-v2">
      <div className="rd-frame" aria-hidden="true"><i className="rd-frame-corner rd-frame-corner--tl"/><i className="rd-frame-corner rd-frame-corner--tr"/><i className="rd-frame-corner rd-frame-corner--bl"/><i className="rd-frame-corner rd-frame-corner--br"/><span className="rd-frame-rail rd-frame-rail--left"/><span className="rd-frame-rail rd-frame-rail--right"/></div>

      <div className="rd-topline"><div className="rd-container rd-topline-inner"><span>100% vegetarian</span><b/><span>Chandausi</span><div className="rd-spacer"/><a className="rd-top-social" href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon size={14}/> @raj_delight</a><button className="rd-theme-switch" onClick={() => setDark((v) => !v)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}><ThemeGlyph dark={dark}/></button></div></div>

      <header className="rd-nav-wrap"><div className="rd-container rd-nav"><button className="rd-brand-button" onClick={() => scrollTo('home')} aria-label="Raj Delight home"><Logo compact/></button><nav className={menuOpen ? 'rd-nav-links rd-nav-links--open' : 'rd-nav-links'} aria-label="Primary navigation">{['home','about','menu','gallery','contact'].map((id) => <button key={id} onClick={() => scrollTo(id)}>{id[0].toUpperCase()+id.slice(1)}</button>)}</nav><div className="rd-nav-actions"><a href={ZOMATO} target="_blank" rel="noreferrer" className="rd-outline-order">Order online <Arrow/></a><button className="rd-burger" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span/><span/></button></div></div></header>

      <section className="rd-hero" id="home"><SafeImage src={HERO} alt="Vegetarian Indian dining" priority sizes="100vw" className="rd-cover-image"/><div className="rd-hero-vignette"/><div className="rd-container rd-hero-inner"><div className="rd-hero-copy"><span className="rd-kicker">Raj Delight · Chandausi</span><h1>A Taste Worth <em>Remembering.</em></h1><p>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks — all under one roof.</p><div className="rd-hero-cta"><button className="rd-primary-btn" onClick={() => scrollTo('menu')}>Explore the menu <Arrow/></button><button className="rd-secondary-btn" onClick={() => scrollTo('gallery')}>View gallery <Arrow/></button></div></div><div className="rd-hero-proof"><div><strong>4.3</strong><span>Google rating</span></div><div><strong>{dishCount}</strong><span>listed dishes</span></div><div><strong>9:30 AM–12 AM</strong><span>hours shown online</span></div><div><strong>Veg</strong><span>restaurant</span></div></div></div><div className="rd-hero-scroll">Scroll <span/></div></section>

      <section className="rd-order-band"><div className="rd-container rd-order-inner"><div><span className="rd-eyebrow">Delivery · takeaway</span><h2>Your favourites, one click away.</h2></div><div className="rd-order-buttons"><a className="rd-order-card rd-order-card--zomato" href={ZOMATO} target="_blank" rel="noreferrer"><strong>Order on Zomato</strong><span>Open ordering</span><Arrow/></a><a className="rd-order-card rd-order-card--swiggy" href={SWIGGY} target="_blank" rel="noreferrer"><strong>Order on Swiggy</strong><span>Open ordering</span><Arrow/></a><a className="rd-order-card" href={PHONE}><strong>Call restaurant</strong><span>+91 79831 48985</span><Arrow/></a></div></div></section>

      <section className="rd-section rd-about" id="about"><div className="rd-container rd-story-grid"><button className="rd-story-image" onClick={() => setLightbox({src:REAL_INTERIOR,alt:'Raj Delight interior'})} aria-label="Open Raj Delight interior photo"><SafeImage src={REAL_INTERIOR} alt="Raj Delight interior" sizes="(max-width: 900px) 100vw, 55vw"/><span>Public listing photograph · tap to enlarge</span></button><div className="rd-story-copy"><span className="rd-eyebrow">The Raj Delight experience</span><h2>A little bit of <em>everything.</em></h2><p>Raj Delight is publicly listed in Chandausi with vegetarian dining, indoor seating, takeaway, lunch, dinner and home delivery.</p><div className="rd-feature-list"><div><b>01</b><span>Vegetarian menu</span></div><div><b>02</b><span>Indoor seating</span></div><div><b>03</b><span>Takeaway & delivery</span></div><div><b>04</b><span>Lunch & dinner</span></div></div></div></div></section>

      <section className="rd-section rd-specials"><div className="rd-container"><div className="rd-section-heading"><div><span className="rd-eyebrow">Our specialties</span><h2>Made to make you <em>stay awhile.</em></h2></div><button className="rd-text-btn" onClick={() => scrollTo('menu')}>View complete menu <Arrow/></button></div><div className="rd-special-grid">{[
        ['Paneer Tikka','Tandoori Station',HERO,'Popular pick'],['Veg Hyderabadi Biryani','Biryani',HERO,'Special'],['Paneer Tikka Pizza','Continental',PIZZA,'Crowd pleaser'],['Masala Dosa','South Indian',DOSA,'Classic'],['Veg Grilled Sandwich','Sandwich',BURGER,'Popular on Swiggy'],['Fresh Lime Soda (mix)','Fizzy Mocktails',DRINK,'Popular on Swiggy']
      ].map(([name,category,image,note],i)=><article className="rd-special-card" key={name}><button className="rd-special-media" onClick={() => setLightbox({src:image,alt:name})} aria-label={`Open ${name} image`}><SafeImage src={image} alt={name} sizes="(max-width: 720px) 80vw, 30vw"/><span>{String(i+1).padStart(2,'0')}</span></button><small>{note}</small><h3>{name}</h3><div className="rd-dish-bottom"><b>{estimatePrice(category)}</b><button onClick={() => chooseCategory(category)} className="rd-mini-link">View in menu <Arrow/></button></div></article>)}</div></div></section>

      <section className="rd-section rd-menu" id="menu"><div className="rd-container"><div className="rd-menu-intro"><div><span className="rd-eyebrow">The complete menu</span><h2>{categoryCount} categories. <em>{dishCount} dishes.</em></h2><p>Browse the complete public menu without a never-ending page. Select a category to expand only that section, or search for a dish.</p></div><div className="rd-bill-note"><span>Public listing spend</span><strong>₹200–₹400</strong><small>average bill / person</small></div></div><div className="rd-menu-tools"><label className="rd-search"><span>⌕</span><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search dishes or categories..." aria-label="Search menu"/>{search&&<button onClick={()=>setSearch('')} aria-label="Clear search">×</button>}</label><div className="rd-menu-topcats" role="tablist" aria-label="Popular categories"><button className={activeCategory==='All'?'is-active':''} onClick={()=>setActiveCategory('All')}>All</button>{['Indian Main Course','South Indian','Tandoori Station','Chinese Appetizers','Continental','Delicious Burger','Italian Pasta','Dessert'].map((name)=><button key={name} className={activeCategory===name?'is-active':''} onClick={()=>setActiveCategory(name)}>{prettyCategory(name)}</button>)}</div><div className="rd-menu-mobile-select-wrap"><label htmlFor="rd-category">Browse category</label><select id="rd-category" value={activeCategory} onChange={(e)=>setActiveCategory(e.target.value)}><option value="All">All categories</option>{categoryNames(menuCategories).map((name)=><option key={name} value={name}>{prettyCategory(name)}</option>)}</select></div></div><div className="rd-menu-summary"><span>{filtered.length} dishes shown</span>{activeCategory!=='All'&&<button onClick={()=>setActiveCategory('All')}>Reset category</button>}</div><div className="rd-category-accordion">{menuCategories.map((category)=>{const items=filtered.filter((item)=>item.category===category.name);if(activeCategory!=='All'&&items.length===0)return null;const isOpen=search.trim().length>0?items.length>0:activeCategory===category.name||openCategories.includes(category.name)||(activeCategory==='All'&&openCategories.length===0&&menuCategories.indexOf(category)===0);return <section className={isOpen?'rd-category is-open':'rd-category'} key={category.name}><button className="rd-category-header" onClick={()=>toggleCategory(category.name)} aria-expanded={isOpen}><span className="rd-category-number">{String(menuCategories.indexOf(category)+1).padStart(2,'0')}</span><strong>{prettyCategory(category.name)}</strong><span className="rd-category-count">{category.items.length} items</span><span className="rd-category-chevron">{isOpen?'−':'+'}</span></button>{isOpen&&<div className="rd-category-items">{items.map((item)=><a key={`${item.category}-${item.name}`} className="rd-menu-item" href={ZOMATO} target="_blank" rel="noreferrer"><span>{pretty(item.name)}</span><small>{estimatePrice(item.category)} <Arrow/></small></a>)}</div>}</section>})}</div></div></section>

      <section className="rd-seasonal"><button className="rd-seasonal-image" onClick={()=>setLightbox({src:THALI,alt:'Navratri thali visual'})} aria-label="Open Navratri thali image"><SafeImage src={THALI} alt="Navratri thali visual" sizes="(max-width: 900px) 100vw, 55vw"/></button><div className="rd-seasonal-copy"><span className="rd-eyebrow">Seasonal favourite</span><h2>Navratri <em>Thali.</em></h2><p>The public menu includes a dedicated Navratri Food section, including Navratri Thali.</p><button className="rd-primary-btn rd-primary-btn--dark" onClick={()=>chooseCategory('Navratri Food')}>Explore Navratri food <Arrow/></button></div></section>

      <section className="rd-section rd-gallery-section" id="gallery"><div className="rd-container"><div className="rd-section-head"><div><small className="rd-label">Visual journal</small><h2>See the place. <em>Feel the mood.</em></h2></div><p>The Raj Delight interior image is identified as a public-listing photograph. Other visuals are editorial mood references until owner-approved photography is supplied.</p></div><div className="rd-gallery">{[{src:REAL_INTERIOR,alt:'Raj Delight interior',note:'Public listing'},{src:HERO,alt:'Indian dining mood',note:'Editorial reference'},{src:THALI,alt:'Navratri thali',note:'Editorial reference'},{src:PIZZA,alt:'Vegetarian pizza',note:'Editorial reference'},{src:DOSA,alt:'South Indian dosa',note:'Editorial reference'},{src:DRINK,alt:'Fresh lime drink',note:'Editorial reference'}].map((tile)=><button key={tile.alt} className="rd-gallery-card" onClick={()=>setLightbox({src:tile.src,alt:tile.alt})} aria-label={`Open ${tile.alt}`}><SafeImage src={tile.src} alt={tile.alt} sizes="(max-width: 720px) 50vw, 33vw"/><span>{tile.note}</span><strong>{tile.alt}</strong></button>)}</div></div></section>

      <section className="rd-section rd-contact" id="contact"><div className="rd-container rd-contact-grid"><div className="rd-contact-copy"><span className="rd-eyebrow">Visit · order · connect</span><h2>Come for the food. <em>Stay for the moment.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className="rd-contact-cta"><a className="rd-primary-btn rd-primary-btn--dark" href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow/></a><a className="rd-secondary-btn rd-secondary-btn--light" href={PHONE}>Call restaurant</a><a className="rd-secondary-btn rd-secondary-btn--light rd-instagram" href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon/> @raj_delight</a></div></div><div className="rd-contact-card"><div><small>Hours shown online</small><strong>9:30 AM – 12:00 AM</strong></div><div><small>Phone</small><strong>+91 79831 48985</strong></div><div><small>Food licence</small><strong>12726074000015</strong></div><div><small>Order online</small><span><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow/></a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow/></a></span></div></div></div></section>

      <footer className="rd-footer"><div className="rd-container rd-footer-grid"><div className="rd-footer-brand"><Logo/><p>Pure vegetarian dining in Chandausi.</p></div><div><small>Explore</small><button onClick={()=>scrollTo('home')}>Home</button><button onClick={()=>scrollTo('about')}>About</button><button onClick={()=>scrollTo('menu')}>Menu</button><button onClick={()=>scrollTo('gallery')}>Gallery</button><button onClick={()=>scrollTo('contact')}>Contact</button></div><div><small>Order</small><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a><a href={PHONE}>Call restaurant</a></div><div><small>Social</small><a href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramIcon/> Instagram · @raj_delight</a></div></div><div className="rd-container rd-footer-bottom"><span>© {new Date().getFullYear()} Raj Delight</span><span>Public restaurant information · Chandausi</span></div></footer>

      <div className="rd-desktop-order"><a href={ZOMATO} target="_blank" rel="noreferrer">Order online <Arrow/></a></div>
      <nav className="rd-mobile-actions" aria-label="Quick actions"><button onClick={()=>scrollTo('menu')}>Menu</button><a href={ZOMATO} target="_blank" rel="noreferrer">Order</a><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a></nav>

      {lightbox&&<div className="rd-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={()=>setLightbox(null)}><button className="rd-lightbox-close" onClick={()=>setLightbox(null)} aria-label="Close image">×</button><div className="rd-lightbox-media" onClick={(e)=>e.stopPropagation()}><SafeImage src={lightbox.src} alt={lightbox.alt} sizes="100vw" priority/><p>{lightbox.alt}</p></div></div>}
    </main>
  );
}

function categoryNames(categories: typeof menuCategories): string[] { return categories.map((category) => category.name); }
