'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import styles from './RajDelightExperienceV10Real.module.css';

const PHONE = 'tel:+917983148985';
const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

const photos = {
  hero: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1800&q=90',
  interior: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg',
  drinks: 'https://b.zmtcdn.com/data/reviews_photos/ee7/f296da001d1ec8ea98a4cc392cfbaee7_1757771164.jpg',
  tikka: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_400/FOOD_CATALOG/IMAGES/CMS/2025/6/12/4cd93e62-c01a-4f08-bc19-e3c40e56264d_99b5326e-4138-4947-8357-f86d99e67737.jpg',
  dosa: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_400/ukutkka8iszzwovys2it',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=88',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=88',
  momos: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=1200&q=88',
};

const categoryImages: Record<string, string> = {
  'Warm & Cozy': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=84',
  'Shake It Up': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=84',
  'Fizzy Mocktails': photos.drinks,
  'Soulful Soups': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=84',
  Lassi: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1000&q=84',
  'Tandoori Station': photos.tikka,
  'Indian Main Course': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=84',
  'Dal Delight': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=84',
  Rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=84',
  Biryani: photos.hero,
  Raita: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=84',
  Salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=84',
  'Indian Breads': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=84',
  Paratha: 'https://images.unsplash.com/photo-1626776876729-bab4369f8a10?auto=format&fit=crop&w=1000&q=84',
  Papad: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=84',
  'Chinese Appetizers': photos.momos,
  Dumplings: photos.momos,
  'Saucy Delights': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=84',
  'Chinese Cuisine': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=84',
  'Smokey Grills': photos.tikka,
  Continental: photos.pizza,
  'Garlic Breads': photos.pizza,
  'Delicious Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=84',
  'Italian Pasta': photos.pasta,
  Fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=84',
  Sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=84',
  'Special Thali': photos.hero,
  'South Indian': photos.dosa,
  'Starters Smart': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=84',
  Dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=84',
  'Variety Of Ice Cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1000&q=84',
  'Kitty Menu': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=84',
  'Navratri Food': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=84',
  Drinks: photos.drinks,
};

const specialCards = [
  { title: 'Tandoori Paneer Tikka', tag: 'Tandoori', src: photos.tikka, alt: 'Paneer tikka skewers served with chutney' },
  { title: 'Veg Hyderabadi Biryani', tag: 'Biryani', src: photos.hero, alt: 'Vegetarian biryani in a dark serving bowl' },
  { title: 'Paneer Tikka Pizza', tag: 'Continental', src: photos.pizza, alt: 'Vegetarian pizza with a crisp crust' },
  { title: 'Masala Dosa', tag: 'South Indian', src: photos.dosa, alt: 'Golden dosa served with chutney' },
];

const gallery = [
  { src: photos.interior, alt: 'Raj Delight restaurant interior in Chandausi', label: 'Raj Delight · interior' },
  { src: photos.drinks, alt: 'Raj Delight beverage display photographed at the restaurant', label: 'Raj Delight · drinks' },
  { src: photos.tikka, alt: 'Tandoori paneer tikka visual', label: 'Tandoori favourites' },
  { src: photos.dosa, alt: 'Masala dosa visual', label: 'South Indian classics' },
  { src: photos.pizza, alt: 'Vegetarian pizza visual', label: 'Pizza & continental' },
  { src: photos.pasta, alt: 'Vegetarian pasta visual', label: 'Italian pasta' },
  { src: photos.momos, alt: 'Vegetable momos visual', label: 'Dumplings & momos' },
  { src: photos.hero, alt: 'Vegetarian biryani visual', label: 'Biryani table' },
];

function Icon({ name }: { name: 'phone' | 'sun' | 'moon' | 'arrow' | 'map' | 'search' | 'close' | 'spark' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    {name === 'phone' && <path {...common} d="M7.2 3.7c.5-.2 1.1 0 1.4.5l1.5 3.1c.2.4.2.9-.1 1.2L8.7 10c1.2 2.3 3 4.1 5.3 5.3l1.5-1.3c.3-.3.8-.3 1.2-.1l3.1 1.5c.5.3.7.9.5 1.4l-.8 2.1c-.2.6-.8.9-1.4.9C10 19.6 4.4 14 4.2 6.1c0-.6.3-1.2.9-1.4l2.1-1Z" />}
    {name === 'sun' && <><circle {...common} cx="12" cy="12" r="3.5"/><path {...common} d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7"/></>}
    {name === 'moon' && <path {...common} d="M19.4 14.5A7.7 7.7 0 0 1 9.5 4.6 8.1 8.1 0 1 0 19.4 14.5Z"/>}
    {name === 'arrow' && <path {...common} d="M5 19 19 5M9 5h10v10"/>}
    {name === 'map' && <><path {...common} d="M4 5.7 9.2 3l5.6 3 5.2-2.7v15L14.8 21l-5.6-3L4 20.7Z"/><path {...common} d="M9.2 3v15M14.8 6v15"/></>}
    {name === 'search' && <><circle {...common} cx="10.8" cy="10.8" r="6.2"/><path {...common} d="m15.5 15.5 4.3 4.3"/></>}
    {name === 'close' && <path {...common} d="m7 7 10 10M17 7 7 17"/>}
    {name === 'spark' && <path {...common} d="m12 3 1.2 5.4L18 10l-4.8 1.6L12 17l-1.2-5.4L6 10l4.8-1.6Z"/>}
  </svg>;
}

export function RajDelightExperienceV10() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('raj-delight-theme-v10') || localStorage.getItem('raj-delight-theme-v9');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('raj-delight-theme-v10', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || galleryOpen !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, galleryOpen]);

  useEffect(() => {
    const reveal = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add(styles.revealed)), { threshold: 0.14 });
    reveal.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); setOrderOpen(false); setGalleryOpen(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allMenuItems.filter((item) => (category === 'All' || item.category === category) && (!needle || `${item.name} ${item.category}`.toLowerCase().includes(needle)));
  }, [query, category]);

  const visibleCategories = query.trim() ? menuCategories.filter((entry) => results.some((item) => item.category === entry.name)) : menuCategories;
  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const currentPhoto = galleryOpen === null ? gallery[0] : gallery[galleryOpen];

  return <main className={styles.site}>
    <div className={styles.progress} aria-hidden="true" />
    <header className={styles.nav}>
      <div className={`${styles.wrap} ${styles.navInner}`}>
        <button className={styles.brand} onClick={() => go('home')} aria-label="Raj Delight home"><Image src="/raj-delight-mark.svg" alt="" width={40} height={40} priority/><span><strong>Raj Delight</strong><small>Chandausi · Vegetarian Restaurant</small></span></button>
        <nav className={styles.links} aria-label="Primary navigation"><button onClick={() => go('about')}>About</button><button onClick={() => go('menu')}>Menu</button><button onClick={() => go('gallery')}>Gallery</button><button onClick={() => go('contact')}>Visit</button></nav>
        <div className={styles.navActions}><button className={styles.themeButton} onClick={() => setTheme((v) => v === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Go dark' : 'Go light'} title={theme === 'light' ? 'Go dark' : 'Go light'}><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button><a className={styles.callButton} href={PHONE}><Icon name="phone"/>Call</a><button className={styles.orderButton} onClick={() => setOrderOpen((v) => !v)} aria-expanded={orderOpen}>Order <Icon name="arrow"/></button></div>
        <button className={styles.mobileMenuButton} onClick={() => setMenuOpen(true)} aria-label="Open navigation">Menu</button>
      </div>
    </header>

    {orderOpen && <div className={styles.orderPanel} role="dialog" aria-label="Order online"><div className={styles.orderHeader}><div><small>ORDER ONLINE</small><strong>Choose a delivery app</strong></div><button onClick={() => setOrderOpen(false)} aria-label="Close order panel"><Icon name="close"/></button></div><div className={styles.orderCards}><a className={styles.zomato} href={ZOMATO} target="_blank" rel="noreferrer"><b>Z</b><span><small>DELIVERY</small><strong>Zomato</strong></span><Icon name="arrow"/></a><a className={styles.swiggy} href={SWIGGY} target="_blank" rel="noreferrer"><b>S</b><span><small>DELIVERY</small><strong>Swiggy</strong></span><Icon name="arrow"/></a></div></div>}

    {menuOpen && <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Mobile navigation"><div className={styles.sheetHead}><strong>Raj Delight</strong><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><Icon name="close"/></button></div><div className={styles.sheetLinks}><button onClick={() => go('about')}>About <Icon name="arrow"/></button><button onClick={() => go('menu')}>Menu <Icon name="arrow"/></button><button onClick={() => go('gallery')}>Gallery <Icon name="arrow"/></button><button onClick={() => go('contact')}>Visit <Icon name="arrow"/></button></div><div className={styles.sheetActions}><a href={PHONE}><Icon name="phone"/>Call restaurant</a><a href={ZOMATO} target="_blank" rel="noreferrer">Order on Zomato <Icon name="arrow"/></a><a href={SWIGGY} target="_blank" rel="noreferrer">Order on Swiggy <Icon name="arrow"/></a><button onClick={() => setTheme((v) => v === 'light' ? 'dark' : 'light')}><Icon name={theme === 'light' ? 'moon' : 'sun'}/>{theme === 'light' ? 'Dark mode' : 'Light mode'}</button></div></div>}

    <section id="home" className={styles.hero}><Image className={styles.heroImage} src={photos.hero} alt="Vegetarian biryani served at a restaurant table" fill priority sizes="100vw"/><div className={styles.heroVeil}/><div className={`${styles.wrap} ${styles.heroContent}`} data-reveal><p className={styles.kicker}><Icon name="spark"/>RAJ DELIGHT · CHANDAUSI</p><h1>A table worth <em>coming back to.</em></h1><p className={styles.heroLead}>A lively vegetarian menu moving from tandoor and biryani to dosa, Chinese, pizza, pasta, desserts and drinks.</p><div className={styles.heroActions}><button className={styles.primary} onClick={() => go('menu')}>Explore menu <Icon name="arrow"/></button><button className={styles.lightButton} onClick={() => setOrderOpen((v) => !v)}>Order online <Icon name="arrow"/></button><a className={styles.callHero} href={PHONE}><Icon name="phone"/>Call +91 79831 48985</a></div><div className={styles.heroMeta}><span>15 Lathi Bazar</span><b>·</b><span>9:30 AM – 12 AM</span><b>·</b><span>100% vegetarian</span></div></div><button className={styles.scrollHint} onClick={() => go('about')}>Scroll to explore <span/></button></section>

    <section className={styles.band}><div className={`${styles.wrap} ${styles.bandGrid}`}><span><small>01</small>Broad vegetarian menu</span><span><small>02</small>Dine-in · takeaway · delivery</span><span><small>03</small>Family-friendly table in Chandausi</span></div></section>

    <section id="about" className={`${styles.section} ${styles.about}`} data-reveal><div className={`${styles.wrap} ${styles.aboutGrid}`}><div className={styles.aboutImage}><Image src={photos.interior} alt="Raj Delight restaurant interior in Chandausi" fill sizes="(max-width: 860px) 100vw, 50vw"/><span>Raj Delight · Chandausi</span></div><div className={styles.copy}><p className={styles.eyebrow}>01 · ABOUT THE TABLE</p><h2>Comfort food, <em>with range.</em></h2><p>Raj Delight brings many kinds of vegetarian comfort food together under one roof. The menu covers tandoori plates, Indian mains, biryani, Chinese appetisers, momos, South Indian favourites, pizza, pasta, desserts and drinks.</p><p className={styles.muted}>Come for a family meal, a quick bite or an evening table in the heart of Chandausi.</p><div className={styles.info}><div><small>ADDRESS</small><strong>15, Lathi Bazar<br/>Ward 05, Chandausi</strong></div><div><small>HOURS</small><strong>Every day<br/>9:30 AM – 12 AM</strong></div></div><div className={styles.inlineLinks}><a href={MAPS} target="_blank" rel="noreferrer">Directions <Icon name="arrow"/></a><a href={PHONE}>Call restaurant <Icon name="phone"/></a></div></div></div></section>

    <section className={`${styles.section} ${styles.specials}`} data-reveal><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>02 · SIGNATURE PICKS</p><h2>Start with a few <em>favourites.</em></h2></div><span>Distinct plates · one vegetarian kitchen</span></div><div className={styles.specialGrid}>{specialCards.map((item) => <article className={styles.specialCard} key={item.title}><div className={styles.specialImage}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 25vw"/></div><div><small>{item.tag}</small><h3>{item.title}</h3></div></article>)}</div></div></section>

    <section id="menu" className={`${styles.section} ${styles.menuSection}`} data-reveal><div className={styles.wrap}><div className={styles.menuHead}><div><p className={styles.eyebrow}>03 · THE COMPLETE MENU</p><h2>Everything on the <em>table.</em></h2><p>{menuItemCount} public menu items across {menuCategories.length} categories.</p></div><a className={styles.callCard} href={PHONE}><Icon name="phone"/><span><small>Need help deciding?</small><strong>Call Raj Delight</strong></span><Icon name="arrow"/></a></div><div className={styles.controls}><label className={styles.search}><Icon name="search"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes or categories" aria-label="Search the menu"/></label><div className={styles.chips}><button className={category === 'All' ? styles.activeChip : ''} onClick={() => setCategory('All')}>All <span>{menuItemCount}</span></button>{visibleCategories.map((entry) => <button key={entry.name} className={category === entry.name ? styles.activeChip : ''} onClick={() => setCategory(entry.name)}>{entry.name} <span>{entry.items.length}</span></button>)}</div></div><div className={styles.menuSummary}>{results.length} dishes shown</div>{results.length === 0 ? <div className={styles.empty}><strong>No dishes found.</strong><p>Try another dish name.</p><button onClick={() => { setCategory('All'); setQuery(''); }}>View all dishes</button></div> : <div className={styles.menuGrid}>{menuCategories.map((entry, index) => { const items = results.filter((item) => item.category === entry.name); if (!items.length) return null; return <article className={styles.chapter} key={entry.name}><button className={styles.chapterHead} onClick={() => setCategory(entry.name)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{entry.name}</strong><b>{items.length}</b></button><div className={styles.items}>{items.map((item) => <div className={styles.menuItem} key={`${item.category}-${item.name}`}><span>{item.name}</span><i/></div>)}</div></article>; })}</div>}</div></section>

    <section className={`${styles.section} ${styles.cuisine}`} data-reveal><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>04 · EXPLORE BY CUISINE</p><h2>Pick your <em>mood.</em></h2></div><button onClick={() => go('menu')}>Open full menu <Icon name="arrow"/></button></div><div className={styles.cuisineGrid}>{menuCategories.map((entry, index) => <button key={entry.name} className={styles.cuisineCard} onClick={() => { setCategory(entry.name); go('menu'); }}><Image src={categoryImages[entry.name] || photos.pizza} alt={`${entry.name} menu`} fill sizes="(max-width: 760px) 50vw, 20vw"/><div/><small>{String(index + 1).padStart(2, '0')}</small><strong>{entry.name}</strong><span>{entry.items.length} dishes</span></button>)}</div></div></section>

    <section id="gallery" className={`${styles.section} ${styles.gallerySection}`} data-reveal><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>05 · GALLERY</p><h2>Real place, <em>real mood.</em></h2></div><a href={MAPS} target="_blank" rel="noreferrer">View latest Google photos <Icon name="arrow"/></a></div><div className={styles.galleryGrid}>{gallery.map((item, index) => <button key={`${item.label}-${index}`} className={index === 0 ? styles.galleryLarge : styles.galleryCard} onClick={() => setGalleryOpen(index)}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 33vw"/><span>{item.label}</span></button>)}</div><p className={styles.galleryNote}>The first two gallery images are verified Raj Delight listing photographs. The Google link keeps the full live photo collection one tap away.</p></div></section>

    <section id="contact" className={`${styles.section} ${styles.contact}`} data-reveal><div className={`${styles.wrap} ${styles.contactGrid}`}><div><p className={styles.eyebrow}>06 · VISIT RAJ DELIGHT</p><h2>Make the next meal <em>a local plan.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi. Call, get directions or order online.</p><div className={styles.contactActions}><a className={styles.darkPrimary} href={MAPS} target="_blank" rel="noreferrer"><Icon name="map"/>Get directions</a><a className={styles.darkSecondary} href={PHONE}><Icon name="phone"/>Call now</a></div></div><div className={styles.contactCard}><div><small>PHONE</small><a href={PHONE}>+91 79831 48985</a></div><div><small>ADDRESS</small><strong>15, Lathi Bazar<br/>Ward 05, Chandausi</strong></div><div><small>HOURS</small><strong>Every day · 9:30 AM – 12 AM</strong></div><div><small>ORDER</small><p><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a></p></div></div></div></section>

    <footer className={styles.footer}><div className={`${styles.wrap} ${styles.footerTop}`}><div className={styles.footerBrand}><Image src="/raj-delight-mark.svg" alt="" width={40} height={40}/><span><strong>Raj Delight</strong><small>Chandausi</small></span></div><p>Vegetarian dining, broad choices and a lively table worth returning to.</p><div className={styles.footerLinks}><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a></div></div><div className={`${styles.wrap} ${styles.footerBottom}`}><span>© {new Date().getFullYear()} Raj Delight</span><span>15 Lathi Bazar · Chandausi</span></div></footer>

    <div className={styles.mobileDock}><a href={PHONE}><Icon name="phone"/><span>Call</span></a><button onClick={() => go('menu')}><Icon name="search"/><span>Menu</span></button><button onClick={() => setOrderOpen((v) => !v)}><Icon name="arrow"/><span>Order</span></button></div>

    {galleryOpen !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Gallery photo" onClick={() => setGalleryOpen(null)}><button className={styles.close} onClick={() => setGalleryOpen(null)} aria-label="Close gallery"><Icon name="close"/></button><button className={styles.prev} onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen + gallery.length - 1) % gallery.length); }} aria-label="Previous photo">‹</button><div className={styles.lightboxMedia} onClick={(e) => e.stopPropagation()}><Image src={currentPhoto.src} alt={currentPhoto.alt} fill sizes="90vw"/><span>{currentPhoto.label}</span></div><button className={styles.next} onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen + 1) % gallery.length); }} aria-label="Next photo">›</button></div>}
  </main>;
}
