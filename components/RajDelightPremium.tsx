'use client';

import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories } from '@/lib/menu';
import styles from './RajDelightPremium.module.css';

const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const PHONE = 'tel:+917983148985';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1800&q=88',
  interior: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg',
  paneer: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1400&q=88',
  curry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1400&q=88',
  momos: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1400&q=88',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=88',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=88',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=88',
  thali: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1400&q=88',
  dosa: 'https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?auto=format&fit=crop&w=1400&q=88',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=88',
  icecream: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1400&q=88',
  drink: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=88',
};

const featured = [
  { name: 'Tandoori Paneer Tikka', category: 'Tandoori Station', image: IMG.paneer, tag: 'Signature' },
  { name: 'Veg Hyderabadi Biryani', category: 'Biryani', image: IMG.hero, tag: 'Classic' },
  { name: 'Paneer Tikka Pizza', category: 'Continental', image: IMG.pizza, tag: 'Modern' },
  { name: 'Masala Dosa', category: 'South Indian', image: IMG.dosa, tag: 'South Indian' },
];

const visualCategories = [
  'Tandoori Station', 'Indian Main Course', 'Biryani', 'Chinese Appetizers',
  'Continental', 'Delicious Burger', 'Italian Pasta', 'Special Thali',
  'South Indian', 'Dessert', 'Variety Of Ice Cream', 'Drinks',
];

const categoryImages: Record<string, string> = {
  'Tandoori Station': IMG.paneer,
  'Indian Main Course': IMG.curry,
  Biryani: IMG.hero,
  'Chinese Appetizers': IMG.momos,
  Continental: IMG.pizza,
  'Delicious Burger': IMG.burger,
  'Italian Pasta': IMG.pasta,
  'Special Thali': IMG.thali,
  'South Indian': IMG.dosa,
  Dessert: IMG.dessert,
  'Variety Of Ice Cream': IMG.icecream,
  Drinks: IMG.drink,
};

function Arrow() { return <span aria-hidden="true">↗</span>; }

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.1A8.3 8.3 0 0 1 8.9 4 8.3 8.3 0 1 0 20 15.1Z" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M17 4.5v3M15.5 6h3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  );
}

function SafeImage({ src, alt, className = '', priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`${styles.imageFallback} ${className}`} role="img" aria-label={`${alt} unavailable`}>Raj Delight</div>;
  return <img src={src} alt={alt} className={className} loading={priority ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}

export function RajDelightPremium() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem('raj-delight-theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('raj-delight-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight * 0.88) {
          const id = node.dataset.reveal;
          if (id) setRevealed((current) => current[id] ? current : { ...current, [id]: true });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.colorScheme = next;
    try { window.localStorage.setItem('raj-delight-theme', next); } catch {}
    setTheme(next);
  };

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const searchMatch = !needle || `${item.name} ${item.category}`.toLowerCase().includes(needle);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const visibleCategories = useMemo(() => {
    if (!query.trim() && activeCategory === 'All') return menuCategories;
    const allowed = new Set(filtered.map((item) => item.category));
    return menuCategories.filter((category) => allowed.has(category.name));
  }, [activeCategory, query, filtered]);

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    setOpenCategory(category);
    requestAnimationFrame(() => jump('menu-items'));
  };

  return (
    <main className={`${styles.site} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.progress} style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
      <div className={styles.edgeFrame} aria-hidden="true" />
      <div className={styles.cornerGlow} aria-hidden="true" />

      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navInner}`}>
          <button className={styles.brand} onClick={() => jump('home')} aria-label="Raj Delight home">
            <img src="/raj-delight-mark.svg" alt="" className={styles.brandMark} />
            <span><strong>Raj Delight</strong><small>Chandausi</small></span>
          </button>
          <nav className={styles.links} aria-label="Primary navigation">
            <button onClick={() => jump('about')}>About</button>
            <button onClick={() => jump('menu')}>Menu</button>
            <button onClick={() => jump('gallery')}>Gallery</button>
            <button onClick={() => jump('contact')}>Contact</button>
          </nav>
          <div className={styles.navTools}>
            <button className={styles.theme} onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><ThemeIcon dark={theme === 'light'} /></button>
            <a className={styles.navOrder} href={ZOMATO} target="_blank" rel="noreferrer">Order <Arrow /></a>
          </div>
          <button className={styles.mobileTheme} onClick={toggleTheme} aria-label="Toggle theme"><ThemeIcon dark={theme === 'light'} /></button>
        </div>
      </header>

      <section className={styles.hero} id="home">
        <div className={styles.heroMedia}><SafeImage src={IMG.hero} alt="Vegetable biryani served at Raj Delight" priority /></div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroOrb} aria-hidden="true" />
        <div className={`${styles.wrap} ${styles.heroContent}`}>
          <p className={styles.kicker}>15 Lathi Bazar · Chandausi · 100% Vegetarian</p>
          <h1>A taste worth<br /><em>remembering.</em></h1>
          <p className={styles.heroIntro}>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p>
          <div className={styles.heroActions}>
            <button className={styles.primaryCta} onClick={() => jump('menu')}>Explore menu <Arrow /></button>
            <a className={styles.secondaryCta} href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow /></a>
            <div className={styles.orderGroup}>
              <button className={styles.orderToggle} onClick={() => setOrderOpen((value) => !value)} aria-expanded={orderOpen}>Order online <Arrow /></button>
              {orderOpen && <div className={styles.orderPanel}>
                <a href={ZOMATO} target="_blank" rel="noreferrer"><span>Zomato</span><Arrow /></a>
                <a href={SWIGGY} target="_blank" rel="noreferrer"><span>Swiggy</span><Arrow /></a>
              </div>}
            </div>
          </div>
          <div className={styles.heroMeta}>
            <div><span>Rating</span><strong>4.3</strong></div>
            <div><span>Categories</span><strong>{menuCategories.length}</strong></div>
            <div><span>Hours shown</span><strong>9:30 AM–12:00 AM</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.marquee} aria-label="Restaurant highlights"><div className={styles.marqueeTrack}><span>Indian classics</span><i>◆</i><span>South Indian</span><i>◆</i><span>Indo-Chinese</span><i>◆</i><span>Continental</span><i>◆</i><span>Desserts & drinks</span><i>◆</i><span>Indian classics</span><i>◆</i><span>South Indian</span><i>◆</i><span>Indo-Chinese</span><i>◆</i><span>Continental</span><i>◆</i></div></section>

      <section className={`${styles.section} ${styles.story} ${revealed.about ? styles.show : ''}`} id="about" data-reveal="about">
        <div className={`${styles.wrap} ${styles.storyGrid}`}>
          <button className={styles.storyImage} onClick={() => setLightbox({ src: IMG.interior, alt: 'Raj Delight restaurant interior' })} aria-label="View Raj Delight interior"><SafeImage src={IMG.interior} alt="Raj Delight restaurant interior" /><span>Public listing photo · view larger</span></button>
          <div className={styles.storyCopy}><p className={styles.kicker}>The Raj Delight experience</p><h2>A little bit of <em>everything.</em></h2><p>Raj Delight brings together familiar Indian favourites with South Indian, Indo-Chinese, Continental and seasonal selections, all in one vegetarian menu.</p><div className={styles.storyFacts}><div><b>01</b><span>Vegetarian menu</span></div><div><b>02</b><span>Indoor seating</span></div><div><b>03</b><span>Takeaway & delivery</span></div><div><b>04</b><span>Lunch & dinner</span></div></div></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.signature} ${revealed.signature ? styles.show : ''}`} data-reveal="signature">
        <div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.kicker}>The table, reimagined</p><h2>Signature <em>flavours.</em></h2></div><button onClick={() => jump('menu')} className={styles.textButton}>Open complete menu <Arrow /></button></div>
          <div className={styles.signatureGrid}>{featured.map((item, index) => <article className={styles.dish} key={item.name}><button className={styles.dishImage} onClick={() => setLightbox({ src: item.image, alt: item.name })} aria-label={`View ${item.name}`}><SafeImage src={item.image} alt={item.name} /><b>{String(index + 1).padStart(2, '0')}</b></button><p className={styles.dishTag}>{item.tag}</p><h3>{item.name}</h3><button className={styles.dishLink} onClick={() => chooseCategory(item.category)}>Explore category <Arrow /></button></article>)}</div>
        </div>
      </section>

      <section className={styles.menuSection} id="menu">
        <div className={styles.wrap}><div className={styles.menuIntro}><div><p className={styles.kicker}>The complete menu</p><h2>Every flavour.<br /><em>One place.</em></h2><p>Browse the full listed menu by chapter, then open a category to see every dish.</p></div><div className={styles.menuCount}><span>Dishes</span><strong>{allMenuItems.length}</strong><small>across {menuCategories.length} categories</small></div></div>
          <div className={styles.menuTools}><label className={styles.searchBox}><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a dish or category" aria-label="Search a dish or category" />{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}</label><div className={styles.categoryScroller}><button className={activeCategory === 'All' ? styles.categoryActive : ''} onClick={() => { setActiveCategory('All'); setOpenCategory(null); setQuery(''); }}>All</button>{visualCategories.map((category) => <button key={category} className={activeCategory === category ? styles.categoryActive : ''} onClick={() => chooseCategory(category)}>{category}</button>)}</div></div>
          <div className={styles.menuChapters}>{visualCategories.map((category, index) => { const count = menuCategories.find((entry) => entry.name === category)?.items.length ?? 0; return <button key={category} className={styles.chapter} onClick={() => chooseCategory(category)}><SafeImage src={categoryImages[category]} alt={`${category} menu visual`} /><span className={styles.chapterShade} /><b>{String(index + 1).padStart(2, '0')}</b><span className={styles.chapterCopy}><small>{count} dishes</small><strong>{category}</strong><em>View chapter <Arrow /></em></span></button>; })}</div>
          <div className={styles.menuMeta}><span>{query || activeCategory !== 'All' ? `${filtered.length} matching dishes` : `${allMenuItems.length} dishes shown`}</span>{(query || activeCategory !== 'All') && <button onClick={() => { setQuery(''); setActiveCategory('All'); setOpenCategory(null); }}>Clear filters</button>}</div>
          <div className={styles.menuRows} id="menu-items">{visibleCategories.map((category, index) => { const isOpen = openCategory === category.name; const items = query || activeCategory !== 'All' ? filtered.filter((item) => item.category === category.name).map((item) => item.name) : category.items; return <section className={styles.menuRow} key={category.name}><button className={styles.menuRowHead} onClick={() => setOpenCategory(isOpen ? null : category.name)} aria-expanded={isOpen}><span>{String(index + 1).padStart(2, '0')}</span><strong>{category.name}</strong><small>{items.length} items</small><b>{isOpen ? '−' : '+'}</b></button>{isOpen && <div className={styles.menuItems}>{items.map((name) => <div key={name} className={styles.menuItem}><strong>{name}</strong></div>)}</div>}</section>; })}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.season}`} data-reveal="season"><div className={`${styles.wrap} ${styles.seasonCard}`}><button className={styles.seasonImage} onClick={() => setLightbox({ src: IMG.thali, alt: 'Seasonal vegetarian thali' })} aria-label="View seasonal thali"><SafeImage src={IMG.thali} alt="Seasonal vegetarian thali" /><span>Seasonal selection</span></button><div className={styles.seasonCopy}><p className={styles.kicker}>Seasonal selection</p><h2>Navratri <em>Thali.</em></h2><p>The public menu includes a dedicated Navratri Food section with seasonal favourites.</p><button className={styles.seasonCta} onClick={() => chooseCategory('Navratri Food')}>Discover the seasonal table <Arrow /></button></div></div></section>

      <section className={`${styles.section} ${styles.gallery}`} id="gallery" data-reveal="gallery"><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.kicker}>Visual journal</p><h2>See the place.<br /><em>Feel the mood.</em></h2></div><p className={styles.sectionAside}>Real restaurant atmosphere paired with editorial food imagery and subtle motion.</p></div><div className={styles.galleryGrid}><button className={styles.galleryLarge} onClick={() => setLightbox({ src: IMG.interior, alt: 'Raj Delight public listing photo' })}><SafeImage src={IMG.interior} alt="Raj Delight public listing photo" /><span>Restaurant</span></button>{[IMG.paneer, IMG.hero, IMG.pizza, IMG.dosa, IMG.thali].map((src, index) => <button key={`${src}-${index}`} className={styles.galleryTile} onClick={() => setLightbox({ src, alt: `Raj Delight gallery ${index + 1}` })}><SafeImage src={src} alt={`Raj Delight gallery ${index + 1}`} /><span>{index === 0 ? 'Paneer tikka' : index === 1 ? 'Biryani' : index === 2 ? 'Pizza' : index === 3 ? 'South Indian' : 'Thali'}</span></button>)}</div><a className={styles.galleryMore} href={MAPS} target="_blank" rel="noreferrer">View more public listing photos <Arrow /></a></div></section>

      <section className={styles.visit} id="contact"><div className={`${styles.wrap} ${styles.visitGrid}`}><div><p className={styles.kicker}>Visit · order · connect</p><h2>Come for the food.<br /><em>Stay for the moment.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className={styles.visitActions}><a className={styles.primaryCta} href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow /></a><a className={styles.secondaryCta} href={PHONE}>Call restaurant</a></div></div><div className={styles.contactCard}><div><small>Hours shown online</small><strong>9:30 AM – 12:00 AM</strong></div><div><small>Phone</small><strong>+91 79831 48985</strong></div><div><small>Order online</small><strong>Zomato · Swiggy</strong></div><div className={styles.visitActions}><a className={styles.primaryCta} href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow /></a><a className={styles.secondaryCta} href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow /></a></div><a className={styles.instagram} href={INSTAGRAM} target="_blank" rel="noreferrer"><span>@raj_delight</span><b>Instagram <Arrow /></b></a></div></div></section>

      <footer className={styles.footer}><div className={styles.wrap}><div className={styles.footerTop}><div className={styles.footerBrand}><img src="/raj-delight-mark.svg" alt="Raj Delight" /><div><strong>Raj Delight</strong><span>Chandausi</span></div></div><p>Vegetarian dining in Chandausi.<br />A little bit of everything.</p></div><div className={styles.footerColumns}><div><small>Explore</small><button onClick={() => jump('home')}>Home</button><button onClick={() => jump('about')}>About</button><button onClick={() => jump('menu')}>Menu</button><button onClick={() => jump('gallery')}>Gallery</button><button onClick={() => jump('contact')}>Contact</button></div><div><small>Order</small><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow /></a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow /></a><a href={PHONE}>Call <Arrow /></a></div><div><small>Social</small><a href={INSTAGRAM} target="_blank" rel="noreferrer">@raj_delight <Arrow /></a></div></div><div className={styles.footerBottom}><span>© 2026 Raj Delight</span><span>Public restaurant information · Chandausi</span></div></div></footer>

      <nav className={styles.mobileBar} aria-label="Quick actions"><button onClick={() => jump('menu')}>Menu</button><a href={ZOMATO} target="_blank" rel="noreferrer">Order</a><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a></nav>

      {lightbox && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}><button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close image">×</button><div className={styles.lightboxInner} onClick={(event) => event.stopPropagation()}><img src={lightbox.src} alt={lightbox.alt} /></div></div>}
    </main>
  );
}
