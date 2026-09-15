'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import styles from './RajDelightExperience.module.css';

const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const PHONE = 'tel:+917983148985';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

const images = {
  hero: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1800&q=82',
  interior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=82',
  paneer: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=82',
  curry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=82',
  momos: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=82',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=82',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=82',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=82',
  thali: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=82',
  dosa: 'https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?auto=format&fit=crop&w=1200&q=82',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=82',
  icecream: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=82',
  drink: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=82',
};

const featured = [
  { name: 'Tandoori Paneer Tikka', category: 'Tandoori Station', image: images.paneer, label: 'Signature' },
  { name: 'Veg Hyderabadi Biryani', category: 'Biryani', image: images.hero, label: 'Classic' },
  { name: 'Paneer Tikka Pizza', category: 'Continental', image: images.pizza, label: 'Modern' },
  { name: 'Masala Dosa', category: 'South Indian', image: images.dosa, label: 'South Indian' },
];

const categoryImages: Record<string, string> = {
  'Tandoori Station': images.paneer,
  'Indian Main Course': images.curry,
  Biryani: images.hero,
  'Chinese Appetizers': images.momos,
  Continental: images.pizza,
  'Delicious Burger': images.burger,
  'Italian Pasta': images.pasta,
  'Special Thali': images.thali,
  'South Indian': images.dosa,
  Dessert: images.dessert,
  'Variety Of Ice Cream': images.icecream,
  Drinks: images.drink,
};

const Arrow = () => <span aria-hidden="true" className={styles.arrow}>↗</span>;

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.8 14.7A7.8 7.8 0 0 1 9.3 4.2a8.2 8.2 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M17.6 4.1v3.2M16 5.7h3.2" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round"/></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  );
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="m15.5 15.5 4.3 4.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
}

export function RajDelightExperience() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeReveal, setActiveReveal] = useState<Record<string, boolean>>({});
  const revealRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('raj-delight-theme');
    const next = stored === 'dark' ? 'dark' : 'light';
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
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => {
      setActiveReveal((current) => {
        const next = { ...current };
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal');
            if (id) next[id] = true;
          }
        }
        return next;
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox || mobileNavOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox, mobileNavOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null);
        setMobileNavOpen(false);
        setOrderOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery = !needle || `${item.name} ${item.category}`.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const visibleCategories = useMemo(() => {
    if (!query.trim()) return menuCategories;
    const allowed = new Set(filteredItems.map((item) => item.category));
    return menuCategories.filter((category) => allowed.has(category.name));
  }, [query, filteredItems]);

  const jump = (id: string) => {
    setMobileNavOpen(false);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light');

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    requestAnimationFrame(() => document.getElementById('menu-items')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <main className={styles.site}>
      <div className={styles.progress} style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true"><i /><b /></div>

      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navInner}`}>
          <button className={styles.brand} onClick={() => jump('home')} aria-label="Raj Delight home">
            <span className={styles.brandMarkWrap}><Image src="/raj-delight-mark.svg" alt="" width={44} height={44} className={styles.brandMark} /></span>
            <span className={styles.brandText}><strong>Raj Delight</strong><small>Chandausi</small></span>
          </button>
          <nav className={styles.links} aria-label="Primary navigation">
            <button onClick={() => jump('about')}>About</button>
            <button onClick={() => jump('menu')}>Menu</button>
            <button onClick={() => jump('gallery')}>Gallery</button>
            <button onClick={() => jump('contact')}>Contact</button>
          </nav>
          <div className={styles.navTools}>
            <button className={styles.iconButton} onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}><ThemeIcon dark={theme === 'light'} /></button>
            <a className={styles.navOrder} href={ZOMATO} target="_blank" rel="noreferrer">Order <Arrow /></a>
          </div>
          <button className={styles.mobileTheme} onClick={toggleTheme} aria-label="Toggle theme"><ThemeIcon dark={theme === 'light'} /></button>
          <button className={styles.menuButton} onClick={() => setMobileNavOpen(true)} aria-label="Open navigation" aria-expanded={mobileNavOpen}><span /><span /></button>
        </div>
      </header>

      {mobileNavOpen && <div className={styles.mobileNav} role="dialog" aria-modal="true" aria-label="Navigation">
        <div className={styles.mobileNavTop}><span>Raj Delight</span><button onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">×</button></div>
        <div className={styles.mobileNavLinks}>
          {['about', 'menu', 'gallery', 'contact'].map((id, index) => <button key={id} onClick={() => jump(id)}><small>{String(index + 1).padStart(2, '0')}</small>{id}<Arrow /></button>)}
        </div>
        <a href={ZOMATO} target="_blank" rel="noreferrer" className={styles.mobileOrder}>Order online <Arrow /></a>
      </div>}

      <section className={styles.hero} id="home">
        <div className={styles.heroMedia}><Image src={images.hero} alt="Vegetarian biryani dish" fill priority sizes="100vw" className={styles.heroImage} /></div>
        <div className={styles.heroShade} />
        <div className={styles.heroRing} aria-hidden="true" />
        <div className={`${styles.wrap} ${styles.heroContent}`}>
          <p className={styles.kicker}>15 Lathi Bazar · Chandausi · 100% Vegetarian</p>
          <h1>A taste worth <em>remembering.</em></h1>
          <p className={styles.heroIntro}>Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks — together in one table.</p>
          <div className={styles.heroActions}>
            <button className={styles.primaryButton} onClick={() => jump('menu')}>Explore menu <Arrow /></button>
            <div className={styles.orderGroup}>
              <button className={styles.secondaryButton} onClick={() => setOrderOpen((open) => !open)} aria-expanded={orderOpen}>Order online <Arrow /></button>
              {orderOpen && <div className={styles.orderPopover}>
                <a href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow /></a>
                <a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow /></a>
              </div>}
            </div>
            <a className={styles.textCta} href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow /></a>
          </div>
          <div className={styles.heroStats}>
            <div><span>Rating</span><strong>4.3</strong></div>
            <div><span>Menu categories</span><strong>{menuCategories.length}</strong></div>
            <div><span>Hours shown</span><strong>9:30 AM–12 AM</strong></div>
          </div>
        </div>
        <div className={styles.heroScroll}>Scroll to explore <span /></div>
      </section>

      <div className={styles.ticker} aria-label="Cuisine highlights"><div className={styles.tickerTrack}><span>Indian classics</span><i>✦</i><span>South Indian</span><i>✦</i><span>Indo-Chinese</span><i>✦</i><span>Continental</span><i>✦</i><span>Desserts & drinks</span><i>✦</i><span>Indian classics</span><i>✦</i><span>South Indian</span><i>✦</i><span>Indo-Chinese</span></div></div>

      <section className={`${styles.section} ${styles.storySection} ${activeReveal.about ? styles.revealed : ''}`} id="about" data-reveal="about">
        <div className={`${styles.wrap} ${styles.storyGrid}`}>
          <button className={styles.storyMedia} onClick={() => setLightbox({ src: images.interior, alt: 'Raj Delight interior' })} aria-label="View restaurant interior">
            <Image src={images.interior} alt="Raj Delight interior" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.coverImage} />
            <span>View interior <Arrow /></span>
          </button>
          <div className={styles.storyCopy}>
            <p className={styles.kicker}>The Raj Delight experience</p>
            <h2>A little bit of <em>everything.</em></h2>
            <p>Raj Delight brings familiar vegetarian favourites together with South Indian, Indo-Chinese, Continental and seasonal selections. The menu is broad; the experience should still feel calm, warm and intentional.</p>
            <div className={styles.facts}>
              <div><b>01</b><span>Vegetarian menu</span></div><div><b>02</b><span>Indoor seating</span></div><div><b>03</b><span>Takeaway & delivery</span></div><div><b>04</b><span>Lunch & dinner</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.featuredSection} ${activeReveal.featured ? styles.revealed : ''}`} data-reveal="featured">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}><div><p className={styles.kicker}>From the table</p><h2>Signature <em>flavours.</em></h2></div><button className={styles.quietLink} onClick={() => jump('menu')}>See full menu <Arrow /></button></div>
          <div className={styles.featuredGrid}>
            {featured.map((item, index) => <article className={styles.dish} key={item.name} style={{ ['--delay' as string]: `${index * 90}ms` }}>
              <button className={styles.dishMedia} onClick={() => setLightbox({ src: item.image, alt: item.name })} aria-label={`View ${item.name}`}>
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 700px) 90vw, 25vw" className={styles.coverImage} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
              <p className={styles.dishLabel}>{item.label}</p><h3>{item.name}</h3><button className={styles.categoryLink} onClick={() => chooseCategory(item.category)}>{item.category} <Arrow /></button>
            </article>)}
          </div>
        </div>
      </section>

      <section className={styles.menuSection} id="menu">
        <div className={styles.wrap}>
          <div className={styles.menuIntro}><div><p className={styles.kicker}>The complete table</p><h2>Explore the <em>menu.</em></h2><p>Browse the complete public menu by category or search by dish name. Prices are intentionally not embedded because delivery-platform pricing can change.</p></div><div className={styles.menuTotal}><span>Items</span><strong>{menuItemCount}</strong></div></div>
          <div className={styles.menuToolbar}>
            <div className={styles.searchField}><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes or categories" aria-label="Search menu" />{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}</div>
            <div className={styles.categoryScroller} role="tablist" aria-label="Menu categories">
              <button className={activeCategory === 'All' ? styles.activeTab : ''} onClick={() => setActiveCategory('All')} role="tab" aria-selected={activeCategory === 'All'}>All</button>
              {visibleCategories.map((category) => <button key={category.name} className={activeCategory === category.name ? styles.activeTab : ''} onClick={() => chooseCategory(category.name)} role="tab" aria-selected={activeCategory === category.name}>{category.name}</button>)}
            </div>
          </div>

          <div className={styles.categoryGrid}>
            {visibleCategories.slice(0, 12).map((category, index) => <button key={category.name} className={styles.categoryCard} onClick={() => chooseCategory(category.name)}>
              <Image src={categoryImages[category.name] ?? images.curry} alt="" fill sizes="(max-width: 700px) 48vw, 24vw" className={styles.coverImage} />
              <span className={styles.categoryVeil} /><span className={styles.categoryNumber}>{String(index + 1).padStart(2, '0')}</span><span className={styles.categoryCopy}><small>{category.items.length} selections</small><strong>{category.name}</strong><em>Explore <Arrow /></em></span>
            </button>)}
          </div>

          <div id="menu-items" className={styles.menuItems}>
            <div className={styles.menuItemsHead}><div><span>{activeCategory === 'All' ? 'All categories' : activeCategory}</span><strong>{filteredItems.length}</strong></div><small>{query ? `Results for “${query}”` : 'A curated public menu list'}</small></div>
            {filteredItems.length === 0 ? <div className={styles.emptyState}><strong>No dishes found.</strong><span>Try a different search or choose another category.</span></div> : <div className={styles.rows}>{filteredItems.map((item, index) => <div className={styles.menuRow} key={`${item.category}-${item.name}`} style={{ ['--row-delay' as string]: `${Math.min(index, 18) * 24}ms` }}><span className={styles.rowNo}>{String(index + 1).padStart(2, '0')}</span><span className={styles.rowName}>{item.name}</span><span className={styles.rowCategory}>{item.category}</span></div>)}</div>}
          </div>
        </div>
      </section>

      <section className={`${styles.seasonal} ${activeReveal.seasonal ? styles.revealed : ''}`} data-reveal="seasonal">
        <div className={`${styles.wrap} ${styles.seasonGrid}`}>
          <div className={styles.seasonMedia} onClick={() => setLightbox({ src: images.thali, alt: 'Special thali' })}><Image src={images.thali} alt="Special thali" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.coverImage} /><span>Seasonal table <Arrow /></span></div>
          <div className={styles.seasonCopy}><p className={styles.kicker}>Made for the moment</p><h2>Special tables, <em>special occasions.</em></h2><p>The menu also includes Special Thali and Navratri Food categories, giving the site a natural place for seasonal menus without turning the whole experience into a campaign landing page.</p><button className={styles.primaryButtonDark} onClick={() => chooseCategory('Special Thali')}>Explore special thali <Arrow /></button></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.gallerySection} ${activeReveal.gallery ? styles.revealed : ''}`} id="gallery" data-reveal="gallery">
        <div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.kicker}>A visual pause</p><h2>Around the <em>table.</em></h2></div><a className={styles.quietLink} href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram <Arrow /></a></div>
          <div className={styles.galleryGrid}>
            {[['galleryLarge', images.paneer, 'Tandoori paneer'], ['galleryTall', images.interior, 'Restaurant interior'], ['galleryWide', images.pizza, 'Paneer pizza'], ['gallerySmall', images.dosa, 'Masala dosa'], ['gallerySmall', images.dessert, 'Dessert']].map(([className, src, alt], index) => <button className={styles[className as keyof typeof styles] as string} key={`${src}-${index}`} onClick={() => setLightbox({ src, alt })} aria-label={`View ${alt}`}><Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.coverImage} /><span>{alt}</span></button>)}
          </div>
        </div>
      </section>

      <section className={styles.visitSection} id="contact">
        <div className={`${styles.wrap} ${styles.visitGrid}`}>
          <div><p className={styles.kicker}>Come by</p><h2>See you at <em>Raj Delight.</em></h2><p>15 Lathi Bazar, Chandausi</p></div>
          <div className={styles.contactCard}><div><small>Address</small><strong>15 Lathi Bazar<br />Chandausi, Uttar Pradesh</strong></div><div><small>Phone</small><a href={PHONE}>+91 79831 48985</a></div><div><small>Order</small><span>Delivery links below</span></div><div className={styles.contactActions}><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow /></a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow /></a><a href={MAPS} target="_blank" rel="noreferrer">Directions <Arrow /></a></div></div>
        </div>
      </section>

      <footer className={styles.footer}><div className={`${styles.wrap} ${styles.footerInner}`}><div><div className={styles.footerBrand}>Raj Delight</div><p>Vegetarian dining in Chandausi.</p></div><div className={styles.footerLinks}><button onClick={() => jump('about')}>About</button><button onClick={() => jump('menu')}>Menu</button><button onClick={() => jump('gallery')}>Gallery</button><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a></div><span className={styles.footerNote}>© {new Date().getFullYear()} Raj Delight</span></div></footer>

      {lightbox && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}>
        <div className={styles.lightboxImage} onClick={(event) => event.stopPropagation()}><Image src={lightbox.src} alt={lightbox.alt} fill sizes="100vw" className={styles.containImage} /><button onClick={() => setLightbox(null)} aria-label="Close image">×</button><span>{lightbox.alt}</span></div>
      </div>}
    </main>
  );
}
