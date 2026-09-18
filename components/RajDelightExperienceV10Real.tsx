'use client';

import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import styles from './RajDelightExperienceV10Real.module.css';

const PHONE = 'tel:+917983148985';
const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

const FALLBACK_FOOD = 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1800&q=88';
const FALLBACK_DRINK = 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=88';
const FALLBACK_INTERIOR = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=88';
const FALLBACK_PIZZA = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=88';
const FALLBACK_PASTA = 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=88';
const FALLBACK_MOMOS = 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=1200&q=88';

const photos = {
  hero: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_1800/FOOD_CATALOG/IMAGES/CMS/2025/6/12/4cd93e62-c01a-4f08-bc19-e3c40e56264d_99b5326e-4138-4947-8357-f86d99e67737.jpg',
  interior: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg',
  drinks: 'https://b.zmtcdn.com/data/reviews_photos/ee7/f296da001d1ec8ea98a4cc392cfbaee7_1757771164.jpg',
  tikka: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_1000/FOOD_CATALOG/IMAGES/CMS/2025/6/12/4cd93e62-c01a-4f08-bc19-e3c40e56264d_99b5326e-4138-4947-8357-f86d99e67737.jpg',
  dosa: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_1000/ukutkka8iszzwovys2it',
  pizza: FALLBACK_PIZZA,
  pasta: FALLBACK_PASTA,
  momos: FALLBACK_MOMOS,
};

const foodImages: Record<string, string> = {
  coffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=84',
  shake: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=84',
  mocktail: FALLBACK_DRINK,
  soup: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=84',
  lassi: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1000&q=84',
  tandoor: photos.tikka,
  curry: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=84',
  dal: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_300%2Ch_300%2Cc_fit/knzirng1nopuedldckm1',
  rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=84',
  biryani: FALLBACK_FOOD,
  raita: 'https://nutriscan.app/calories-nutrition/images/raitha-abb99.webp',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=84',
  naan: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=84',
  paratha: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/3cc0f26aa020905ccf9586b62bbef4a4',
  papad: 'https://b.zmtcdn.com/data/dish_photos/adc/8f0b58a3c22c9f5582c3d81f97515adc.jpeg',
  chinese: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=84',
  momos: photos.momos,
  sizzler: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=84',
  pizza: photos.pizza,
  garlic: 'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=1200',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=84',
  pasta: photos.pasta,
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=84',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=84',
  thali: FALLBACK_FOOD,
  dosa: photos.dosa,
  pav: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=84',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=84',
  icecream: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1000&q=84',
  snacks: 'https://static.wixstatic.com/media/2b9ea2_75440b2d1d2743ac87af610f48cf130b~mv2.jpg/v1/fill/w_980%2Ch_653%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/SW_Image_3-copy.jpg',
  navratri: 'https://www.ekirana.nl/media/wysiwyg/ekirana/blog-images/navratri-vrat-thali-v2.jpg',
  drinks: FALLBACK_DRINK,
};

const categoryImages: Record<string, string> = {
  'Warm & Cozy': foodImages.coffee, 'Shake It Up': foodImages.shake, 'Fizzy Mocktails': foodImages.mocktail,
  'Soulful Soups': foodImages.soup, Lassi: foodImages.lassi, 'Tandoori Station': foodImages.tandoor,
  'Indian Main Course': foodImages.curry, 'Dal Delight': foodImages.dal, Rice: foodImages.rice, Biryani: foodImages.biryani,
  Raita: foodImages.raita, Salad: foodImages.salad, 'Indian Breads': foodImages.naan, Paratha: foodImages.paratha,
  Papad: foodImages.papad, 'Chinese Appetizers': foodImages.chinese, Dumplings: foodImages.momos,
  'Saucy Delights': foodImages.curry, 'Chinese Cuisine': foodImages.chinese, 'Smokey Grills': foodImages.sizzler,
  Continental: foodImages.pizza, 'Garlic Breads': foodImages.garlic, 'Delicious Burger': foodImages.burger,
  'Italian Pasta': foodImages.pasta, Fries: foodImages.fries, Sandwich: foodImages.sandwich, 'Special Thali': foodImages.thali,
  'South Indian': foodImages.dosa, 'Starters Smart': foodImages.pav, Dessert: foodImages.dessert,
  'Variety Of Ice Cream': foodImages.icecream, 'Kitty Menu': foodImages.snacks, 'Navratri Food': foodImages.navratri, Drinks: foodImages.drinks,
};

const specialCards = [
  { title: 'Tandoori Paneer Tikka', tag: 'Tandoori', src: photos.tikka, fallback: FALLBACK_FOOD, alt: 'Paneer tikka served at Raj Delight' },
  { title: 'Veg Hyderabadi Biryani', tag: 'Biryani', src: FALLBACK_FOOD, fallback: FALLBACK_FOOD, alt: 'Vegetarian biryani served in a restaurant bowl' },
  { title: 'Paneer Tikka Pizza', tag: 'Continental', src: photos.pizza, fallback: FALLBACK_PIZZA, alt: 'Vegetarian pizza' },
  { title: 'Masala Dosa', tag: 'South Indian', src: photos.dosa, fallback: FALLBACK_FOOD, alt: 'Masala dosa served with chutney' },
];

const gallery = [
  { src: photos.interior, fallback: FALLBACK_INTERIOR, alt: 'Raj Delight restaurant interior in Chandausi', label: 'Raj Delight · interior' },
  { src: photos.drinks, fallback: FALLBACK_DRINK, alt: 'Raj Delight drinks display', label: 'Raj Delight · drinks' },
  { src: photos.tikka, fallback: FALLBACK_FOOD, alt: 'Raj Delight paneer tikka', label: 'Tandoori favourites' },
  { src: photos.dosa, fallback: FALLBACK_FOOD, alt: 'Raj Delight masala dosa', label: 'South Indian classics' },
  { src: photos.pizza, fallback: FALLBACK_PIZZA, alt: 'Vegetarian pizza', label: 'Pizza & continental' },
  { src: photos.pasta, fallback: FALLBACK_PASTA, alt: 'Vegetarian pasta', label: 'Italian pasta' },
  { src: photos.momos, fallback: FALLBACK_MOMOS, alt: 'Vegetable momos', label: 'Dumplings & momos' },
  { src: FALLBACK_FOOD, fallback: FALLBACK_FOOD, alt: 'Vegetarian biryani', label: 'Biryani table' },
];

function SmartImage({ src, fallback, alt, className = '', loading = 'lazy' as const }: { src: string; fallback: string; alt: string; className?: string; loading?: 'lazy' | 'eager' }) {
  const [current, setCurrent] = useState(src);
  return <img src={current} alt={alt} className={className} loading={loading} decoding="async" onError={() => { if (current !== fallback) setCurrent(fallback); }} />;
}

function Icon({ name }: { name: 'phone' | 'sun' | 'moon' | 'arrow' | 'map' | 'search' | 'close' | 'spark' | 'pin' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    {name === 'phone' && <path {...common} d="M7.2 3.7c.5-.2 1.1 0 1.4.5l1.5 3.1c.2.4.2.9-.1 1.2L8.7 10c1.2 2.3 3 4.1 5.3 5.3l1.5-1.3c.3-.3.8-.3 1.2-.1l3.1 1.5c.5.3.7.9.5 1.4l-.8 2.1c-.2.6-.8.9-1.4.9C10 19.6 4.4 14 4.2 6.1c0-.6.3-1.2.9-1.4l2.1-1Z" />}
    {name === 'sun' && <><circle {...common} cx="12" cy="12" r="3.5"/><path {...common} d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7"/></>}
    {name === 'moon' && <path {...common} d="M19.4 14.5A7.7 7.7 0 0 1 9.5 4.6 8.1 8.1 0 1 0 19.4 14.5Z"/>}
    {name === 'arrow' && <path {...common} d="M5 19 19 5M9 5h10v10"/>}
    {name === 'map' && <><path {...common} d="M4 5.7 9.2 3l5.6 3 5.2-2.7v15L14.8 21l-5.6-3L4 20.7Z"/><path {...common} d="M9.2 3v15M14.8 6v15"/></>}
    {name === 'pin' && <><path {...common} d="M19 10c0 4.5-7 10.2-7 10.2S5 14.5 5 10a7 7 0 1 1 14 0Z"/><circle {...common} cx="12" cy="10" r="2.2"/></>}
    {name === 'search' && <><circle {...common} cx="10.8" cy="10.8" r="6.2"/><path {...common} d="m15.5 15.5 4.3 4.3"/></>}
    {name === 'close' && <path {...common} d="m7 7 10 10M17 7 7 17"/>}
    {name === 'spark' && <path {...common} d="m12 3 1.2 5.4L18 10l-4.8 1.6L12 17l-1.2-5.4L6 10l4.8-1.6Z"/>}
  </svg>;
}

export function RajDelightExperienceV10() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('raj-delight-theme-v10') || window.localStorage.getItem('raj-delight-theme-v9') || window.localStorage.getItem('raj-delight-theme');
    const next = saved === 'dark' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { window.localStorage.setItem('raj-delight-theme-v10', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const locked = menuOpen || galleryOpen !== null || orderOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, galleryOpen, orderOpen]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dir = y > last + 2 ? 'down' : y < last - 2 ? 'up' : document.documentElement.dataset.scrollDir || 'up';
      document.documentElement.dataset.scrollDir = dir;
      document.documentElement.dataset.scrolled = y > 16 ? '1' : '0';
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reveal = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add(styles.revealed);
      else entry.target.classList.remove(styles.revealed);
    }), { threshold: 0.12 });
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
  const currentPhoto = galleryOpen === null ? gallery[0] : gallery[galleryOpen];
  const go = (id: string) => { setMenuOpen(false); setOrderOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return <main className={styles.site}>
    <div className={styles.progress} aria-hidden="true" />
    <header className={styles.nav}>
      <div className={`${styles.wrap} ${styles.navInner}`}>
        <button className={styles.brand} onClick={() => go('home')} aria-label="Raj Delight home"><img src="/grok_1789624913553.jpg" alt="Raj Delight logo"/><span><strong>Raj Delight</strong><small>Chandausi · Vegetarian Restaurant</small></span></button>
        <nav className={styles.links} aria-label="Primary navigation"><button onClick={() => go('about')}>About</button><button onClick={() => go('menu')}>Menu</button><button onClick={() => go('gallery')}>Gallery</button><button onClick={() => go('contact')}>Visit</button></nav>
        <div className={styles.navActions}><button className={styles.themeButton} onClick={() => setTheme((v) => v === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Go dark' : 'Go light'} title={theme === 'light' ? 'Go dark' : 'Go light'}><Icon name={theme === 'light' ? 'moon' : 'sun'} /></button><a className={styles.callButton} href={PHONE}><Icon name="phone"/>Call</a><button className={styles.orderButton} onClick={() => setOrderOpen((v) => !v)} aria-expanded={orderOpen}>Order <Icon name="arrow"/></button></div>
        <button className={styles.mobileMenuButton} onClick={() => setMenuOpen(true)} aria-label="Open navigation">Menu</button>
      </div>
    </header>

    {orderOpen && <div className={styles.orderPanel} role="dialog" aria-modal="true" aria-label="Order online"><div className={styles.orderHeader}><div><small>ORDER ONLINE</small><strong>Choose a delivery app</strong></div><button onClick={() => setOrderOpen(false)} aria-label="Close order panel"><Icon name="close"/></button></div><div className={styles.orderCards}><a className={styles.zomato} href={ZOMATO} target="_blank" rel="noreferrer"><b>Z</b><span><small>DELIVERY</small><strong>Zomato</strong></span><Icon name="arrow"/></a><a className={styles.swiggy} href={SWIGGY} target="_blank" rel="noreferrer"><b>S</b><span><small>DELIVERY</small><strong>Swiggy</strong></span><Icon name="arrow"/></a></div></div>}

    {menuOpen && <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Mobile navigation"><div className={styles.sheetHead}><strong>Raj Delight</strong><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><Icon name="close"/></button></div><div className={styles.sheetLinks}><button onClick={() => go('about')}>About <Icon name="arrow"/></button><button onClick={() => go('menu')}>Menu <Icon name="arrow"/></button><button onClick={() => go('gallery')}>Gallery <Icon name="arrow"/></button><button onClick={() => go('contact')}>Visit <Icon name="arrow"/></button></div><div className={styles.sheetActions}><a href={PHONE}><Icon name="phone"/>Call restaurant</a><a href={ZOMATO} target="_blank" rel="noreferrer">Order on Zomato <Icon name="arrow"/></a><a href={SWIGGY} target="_blank" rel="noreferrer">Order on Swiggy <Icon name="arrow"/></a><button onClick={() => setTheme((v) => v === 'light' ? 'dark' : 'light')}><Icon name={theme === 'light' ? 'moon' : 'sun'}/>{theme === 'light' ? 'Dark mode' : 'Light mode'}</button></div></div>}

    <section id="home" className={styles.hero}>
      <SmartImage src={photos.hero} fallback={FALLBACK_FOOD} alt="Raj Delight signature vegetarian food" className={styles.heroImage} loading="eager" />
      <div className={styles.heroVeil}/>
      <div className={`${styles.wrap} ${styles.heroContent}`} data-reveal>
        <p className={styles.kicker}><Icon name="spark"/>RAJ DELIGHT · CHANDAUSI</p>
        <h1>Good food deserves a <em>beautiful table.</em></h1>
        <p className={styles.heroLead}>A broad vegetarian menu, a warm local table and the easy choice of dine-in, takeaway or delivery.</p>
        <div className={styles.heroActions}><button className={styles.primary} onClick={() => go('menu')}>Explore menu <Icon name="arrow"/></button><button className={styles.lightButton} onClick={() => setOrderOpen((v) => !v)}>Order online <Icon name="arrow"/></button><a className={styles.callHero} href={PHONE}><Icon name="phone"/>Call restaurant</a></div>
        <div className={styles.heroMeta}><span><Icon name="pin"/>15 Lathi Bazar</span><b>·</b><span>9:30 AM – 12:00 AM</span><b>·</b><span>Vegetarian kitchen</span></div>
      </div>
      <button className={styles.scrollHint} onClick={() => go('about')}>Discover the table <span/></button>
    </section>

    <section className={styles.band}><div className={`${styles.wrap} ${styles.bandGrid}`}><span><small>01</small>34 menu categories</span><span><small>02</small>{menuItemCount} vegetarian dishes</span><span><small>03</small>9:30 AM – 12:00 AM</span></div></section>

    <section id="about" className={`${styles.section} ${styles.about}`} data-reveal><div className={`${styles.wrap} ${styles.aboutGrid}`}><div className={styles.aboutImage}><SmartImage src={photos.interior} fallback={FALLBACK_INTERIOR} alt="Raj Delight restaurant interior in Chandausi"/><span>Raj Delight · Chandausi</span></div><div className={styles.copy}><p className={styles.eyebrow}>01 · ABOUT THE TABLE</p><h2>Local comfort, <em>many moods.</em></h2><p>From tandoori plates and biryani to dosa, Chinese, pizza, pasta, desserts and drinks, Raj Delight brings a wide vegetarian menu together in one place.</p><p className={styles.muted}>The experience is designed to feel lively without visual noise: strong photography, editorial typography and small details that stay out of the way of the food.</p><div className={styles.info}><div><small>ADDRESS</small><strong>15, Lathi Bazar<br/>Ward 05, Chandausi</strong></div><div><small>OPEN DAILY</small><strong>9:30 AM – 12:00 AM<br/>Call ahead for details</strong></div></div><div className={styles.inlineLinks}><a href={MAPS} target="_blank" rel="noreferrer">Directions <Icon name="arrow"/></a><a href={PHONE}>Call restaurant <Icon name="phone"/></a></div></div></div></section>

    <section className={`${styles.section} ${styles.specials}`} data-reveal><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>02 · SIGNATURE PICKS</p><h2>A few plates to <em>start with.</em></h2></div><span>Food-led visuals · restrained motion · no gimmicks</span></div><div className={styles.specialGrid}>{specialCards.map((item) => <article className={styles.specialCard} key={item.title}><div className={styles.specialImage}><SmartImage src={item.src} fallback={item.fallback} alt={item.alt}/><span>{item.tag}</span></div><div className={styles.specialCopy}><h3>{item.title}</h3><p>View the full menu for more choices.</p></div></article>)}</div></div></section>

    <section id="menu" className={`${styles.section} ${styles.menuSection}`} data-reveal><div className={styles.wrap}><div className={styles.menuHead}><div><p className={styles.eyebrow}>03 · THE COMPLETE MENU</p><h2>Everything on the <em>table.</em></h2><p>{menuItemCount} public menu items across {menuCategories.length} categories.</p></div><a className={styles.callCard} href={PHONE}><Icon name="phone"/><span><small>Need a recommendation?</small><strong>Call Raj Delight</strong></span><Icon name="arrow"/></a></div><div className={styles.controls}><label className={styles.search}><Icon name="search"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes or categories" aria-label="Search the menu"/></label><div className={styles.chips}><button className={category === 'All' ? styles.activeChip : ''} onClick={() => setCategory('All')}>All <span>{menuItemCount}</span></button>{visibleCategories.slice(0, categoriesOpen || query.trim() ? visibleCategories.length : 12).map((entry) => <button key={entry.name} className={category === entry.name ? styles.activeChip : ''} onClick={() => setCategory(entry.name)}>{entry.name} <span>{entry.items.length}</span></button>)}{!query.trim() && visibleCategories.length > 12 && <button className={styles.moreChip} onClick={() => setCategoriesOpen((v) => !v)}>{categoriesOpen ? 'Show less' : `+${visibleCategories.length - 12} more`}</button>}</div></div><div className={styles.menuSummary}>{results.length} dishes shown</div>{results.length === 0 ? <div className={styles.empty}><strong>No dishes found.</strong><p>Try another dish name or category.</p><button onClick={() => { setCategory('All'); setQuery(''); }}>Reset search</button></div> : <div className={styles.menuGrid}>{menuCategories.map((entry, index) => { const items = results.filter((item) => item.category === entry.name); if (!items.length) return null; return <article className={styles.chapter} key={entry.name}><button className={styles.chapterHead} onClick={() => setCategory(entry.name)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{entry.name}</strong><b>{items.length}</b></button><div className={styles.items}>{items.map((item) => <div className={styles.menuItem} key={`${item.category}-${item.name}`}><span>{item.name}</span><i/></div>)}</div></article>; })}</div>}</div></section>

    <section className={`${styles.section} ${styles.cuisine}`} data-reveal><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>04 · EXPLORE BY CUISINE</p><h2>Pick your <em>mood.</em></h2></div><button onClick={() => go('menu')}>Open full menu <Icon name="arrow"/></button></div><div className={styles.cuisineGrid}>{menuCategories.map((entry, index) => <button key={entry.name} className={styles.cuisineCard} onClick={() => { setCategory(entry.name); go('menu'); }}><SmartImage src={categoryImages[entry.name] || foodImages.pizza} fallback={FALLBACK_FOOD} alt={`${entry.name} menu`} /><div/><small>{String(index + 1).padStart(2, '0')}</small><strong>{entry.name}</strong><span>{entry.items.length} dishes</span></button>)}</div></div></section>

    <section id="gallery" className={`${styles.section} ${styles.gallerySection}`} data-reveal><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>05 · GALLERY</p><h2>Real place, <em>real mood.</em></h2></div><a href={MAPS} target="_blank" rel="noreferrer">View latest Google photos <Icon name="arrow"/></a></div><div className={styles.galleryGrid}>{gallery.map((item, index) => <button key={`${item.label}-${index}`} className={index === 0 ? styles.galleryLarge : styles.galleryCard} onClick={() => setGalleryOpen(index)}><SmartImage src={item.src} fallback={item.fallback} alt={item.alt}/><span>{item.label}</span></button>)}</div><p className={styles.galleryNote}>Raj Delight listing imagery is used where available; failed remote assets fall back gracefully so the layout never collapses.</p></div></section>

    <section id="contact" className={`${styles.section} ${styles.contact}`} data-reveal><div className={`${styles.wrap} ${styles.contactGrid}`}><div><p className={styles.eyebrow}>06 · VISIT RAJ DELIGHT</p><h2>Make the next meal <em>a local plan.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi. Call, get directions or order online.</p><div className={styles.contactActions}><a className={styles.darkPrimary} href={MAPS} target="_blank" rel="noreferrer"><Icon name="map"/>Get directions</a><a className={styles.darkSecondary} href={PHONE}><Icon name="phone"/>Call now</a></div></div><div className={styles.contactCard}><div><small>PHONE</small><a href={PHONE}>+91 79831 48985</a></div><div><small>ADDRESS</small><strong>15, Lathi Bazar<br/>Ward 05, Chandausi</strong></div><div><small>HOURS</small><strong>Every day · 9:30 AM – 12:00 AM</strong></div><div><small>ORDER</small><p><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a></p></div></div></div></section>

    <footer className={styles.footer}><div className={`${styles.wrap} ${styles.footerTop}`}><div className={styles.footerBrand}><img src="/grok_1789624913553.jpg" alt="Raj Delight logo"/><span><strong>Raj Delight</strong><small>Chandausi</small></span></div><p>Food-led, locally rooted and designed to feel premium without feeling cold.</p><div className={styles.footerLinks}><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a></div></div><div className={`${styles.wrap} ${styles.footerBottom}`}><span>© {new Date().getFullYear()} Raj Delight</span><span>15 Lathi Bazar · Chandausi</span></div></footer>

    <div className={styles.mobileDock}><a href={PHONE}><Icon name="phone"/><span>Call</span></a><button onClick={() => go('menu')}><Icon name="search"/><span>Menu</span></button><button onClick={() => setOrderOpen((v) => !v)}><Icon name="arrow"/><span>Order</span></button></div>

    {galleryOpen !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Gallery photo" onClick={() => setGalleryOpen(null)}><button className={styles.close} onClick={() => setGalleryOpen(null)} aria-label="Close gallery"><Icon name="close"/></button><button className={styles.prev} onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen + gallery.length - 1) % gallery.length); }} aria-label="Previous photo">‹</button><div className={styles.lightboxMedia} onClick={(e) => e.stopPropagation()}><SmartImage src={currentPhoto.src} fallback={currentPhoto.fallback} alt={currentPhoto.alt} /><span>{currentPhoto.label}</span></div><button className={styles.next} onClick={(e) => { e.stopPropagation(); setGalleryOpen((galleryOpen + 1) % gallery.length); }} aria-label="Next photo">›</button></div>}
  </main>;
}
