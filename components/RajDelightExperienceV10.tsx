'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories, menuItemCount } from '@/lib/menu';
import styles from './RajDelightExperienceV10.module.css';

const PHONE = 'tel:+917983148985';
const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const GOOGLE_PHOTOS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

const listingPhotos = [
  {
    src: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg',
    alt: 'Raj Delight restaurant interior in Chandausi',
    label: 'Raj Delight · interior',
  },
  {
    src: 'https://b.zmtcdn.com/data/reviews_photos/ee7/f296da001d1ec8ea98a4cc392cfbaee7_1757771164.jpg',
    alt: 'Raj Delight beverage display photographed at the restaurant',
    label: 'Raj Delight · drinks',
  },
];

const dishPhotos = {
  hero: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1800&q=90',
  tikka: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_400/FOOD_CATALOG/IMAGES/CMS/2025/6/12/4cd93e62-c01a-4f08-bc19-e3c40e56264d_99b5326e-4138-4947-8357-f86d99e67737.jpg',
  dosa: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_400/ukutkka8iszzwovys2it',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=88',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=88',
  momos: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=1200&q=88',
  drinks: 'https://b.zmtcdn.com/data/reviews_photos/ee7/f296da001d1ec8ea98a4cc392cfbaee7_1757771164.jpg',
};

const categoryPhotos: Record<string, string> = {
  'Warm & Cozy': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85',
  'Shake It Up': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=85',
  'Fizzy Mocktails': dishPhotos.drinks,
  'Soulful Soups': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85',
  Lassi: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1000&q=85',
  'Tandoori Station': dishPhotos.tikka,
  'Indian Main Course': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=85',
  'Dal Delight': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85',
  Rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85',
  Biryani: dishPhotos.hero,
  Raita: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85',
  Salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85',
  'Indian Breads': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=85',
  Paratha: 'https://images.unsplash.com/photo-1626776876729-bab4369f8a10?auto=format&fit=crop&w=1000&q=85',
  Papad: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=85',
  'Chinese Appetizers': dishPhotos.momos,
  Dumplings: dishPhotos.momos,
  'Saucy Delights': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=85',
  'Chinese Cuisine': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85',
  'Smokey Grills': dishPhotos.tikka,
  Continental: dishPhotos.pizza,
  'Garlic Breads': dishPhotos.pizza,
  'Delicious Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85',
  'Italian Pasta': dishPhotos.pasta,
  Fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=85',
  Sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=85',
  'Special Thali': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85',
  'South Indian': dishPhotos.dosa,
  'Starters Smart': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1000&q=85',
  Dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85',
  'Variety Of Ice Cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1000&q=85',
  'Kitty Menu': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85',
  'Navratri Food': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85',
  Drinks: dishPhotos.drinks,
};

const specials = [
  { title: 'Tandoori Paneer Tikka', tag: 'Tandoori', image: dishPhotos.tikka, alt: 'Paneer tikka skewers with chutney' },
  { title: 'Veg Hyderabadi Biryani', tag: 'Biryani', image: dishPhotos.hero, alt: 'Vegetarian biryani served in a dark bowl' },
  { title: 'Paneer Tikka Pizza', tag: 'Continental', image: dishPhotos.pizza, alt: 'Vegetarian pizza with a crisp golden crust' },
  { title: 'Masala Dosa', tag: 'South Indian', image: dishPhotos.dosa, alt: 'Golden dosa served with chutney' },
];

const gallery = [
  listingPhotos[0],
  listingPhotos[1],
  { src: dishPhotos.tikka, alt: 'Tandoori paneer tikka visual', label: 'Tandoori favourites' },
  { src: dishPhotos.dosa, alt: 'Masala dosa visual', label: 'South Indian classics' },
  { src: dishPhotos.pizza, alt: 'Vegetarian pizza visual', label: 'Pizza from the continental menu' },
  { src: dishPhotos.pasta, alt: 'Vegetarian pasta visual', label: 'Italian pasta' },
  { src: dishPhotos.momos, alt: 'Vegetable momos visual', label: 'Dumplings & momos' },
  { src: dishPhotos.drinks, alt: 'Raj Delight drinks photograph', label: 'Raj Delight drinks' },
];

function Icon({ name }: { name: 'phone' | 'sun' | 'moon' | 'arrow' | 'map' | 'search' | 'close' | 'chevron' | 'spark' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    {name === 'phone' && <path {...common} d="M7.2 3.7c.5-.2 1.1 0 1.4.5l1.5 3.1c.2.4.2.9-.1 1.2L8.7 10c1.2 2.3 3 4.1 5.3 5.3l1.5-1.3c.3-.3.8-.3 1.2-.1l3.1 1.5c.5.3.7.9.5 1.4l-.8 2.1c-.2.6-.8.9-1.4.9C10 19.6 4.4 14 4.2 6.1c0-.6.3-1.2.9-1.4l2.1-1Z" />}
    {name === 'sun' && <><circle {...common} cx="12" cy="12" r="3.4"/><path {...common} d="M12 2.6v2.5M12 18.9v2.5M2.6 12h2.5M18.9 12h2.5M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7 5.5 18.5"/></>}
    {name === 'moon' && <path {...common} d="M19.6 14.6A7.8 7.8 0 0 1 9.4 4.4 8.1 8.1 0 1 0 19.6 14.6Z"/>}
    {name === 'arrow' && <path {...common} d="M5 19 19 5M9 5h10v10"/>}
    {name === 'map' && <><path {...common} d="M4 5.7 9.2 3l5.6 3 5.2-2.7v15L14.8 21l-5.6-3L4 20.7Z"/><path {...common} d="M9.2 3v15M14.8 6v15"/></>}
    {name === 'search' && <><circle {...common} cx="10.8" cy="10.8" r="6.2"/><path {...common} d="m15.5 15.5 4.3 4.3"/></>}
    {name === 'close' && <path {...common} d="m7 7 10 10M17 7 7 17"/>}
    {name === 'chevron' && <path {...common} d="m7 9 5 5 5-5"/>}
    {name === 'spark' && <path {...common} d="m12 3 1.2 5.4L18 10l-4.8 1.6L12 17l-1.2-5.4L6 10l4.8-1.6Z"/>}
  </svg>;
}

export function RajDelightExperienceV10() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem('raj-delight-theme-v10') || window.localStorage.getItem('raj-delight-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [mobileMenu, setMobileMenu] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { window.localStorage.setItem('raj-delight-theme-v10', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = mobileMenu || galleryOpen !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenu, galleryOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMobileMenu(false); setOrderOpen(false); setGalleryOpen(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allMenuItems.filter((item) => {
      const byCategory = category === 'All' || item.category === category;
      const byQuery = !needle || `${item.name} ${item.category}`.toLowerCase().includes(needle);
      return byCategory && byQuery;
    });
  }, [category, query]);

  const resultCategories = useMemo(() => {
    if (!query.trim()) return menuCategories;
    return menuCategories.filter((entry) => results.some((item) => item.category === entry.name));
  }, [query, results]);

  const go = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const displayedGalleryIndex = galleryOpen ?? 0;
  const currentGallery = gallery[displayedGalleryIndex];

  return <main className={styles.site}>
    <div className={styles.progress} aria-hidden="true" />
    <header className={styles.nav}>
      <div className={`${styles.wrap} ${styles.navInner}`}>
        <button className={styles.brand} onClick={() => go('home')} aria-label="Raj Delight home">
          <Image src="/raj-delight-mark.svg" alt="" width={42} height={42} priority />
          <span><strong>Raj Delight</strong><small>Chandausi · Vegetarian Restaurant</small></span>
        </button>
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <button onClick={() => go('about')}>About</button>
          <button onClick={() => go('menu')}>Menu</button>
          <button onClick={() => go('gallery')}>Gallery</button>
          <button onClick={() => go('contact')}>Visit</button>
        </nav>
        <div className={styles.navActions}>
          <button className={styles.themeBtn} onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'} title={theme === 'light' ? 'Go dark' : 'Go light'}>
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>
          <a className={styles.callBtn} href={PHONE}><Icon name="phone" /> Call</a>
          <button className={styles.orderBtn} onClick={() => setOrderOpen((value) => !value)} aria-expanded={orderOpen}>Order <Icon name="arrow" /></button>
        </div>
        <button className={styles.mobileMenuBtn} onClick={() => setMobileMenu(true)} aria-label="Open navigation">Menu</button>
      </div>
    </header>

    {mobileMenu && <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Navigation">
      <div className={styles.sheetTop}><span>RAJ DELIGHT</span><button onClick={() => setMobileMenu(false)} aria-label="Close navigation"><Icon name="close" /></button></div>
      <div className={styles.sheetLinks}>
        <button onClick={() => go('about')}>About <Icon name="arrow" /></button>
        <button onClick={() => go('menu')}>Menu <Icon name="arrow" /></button>
        <button onClick={() => go('gallery')}>Gallery <Icon name="arrow" /></button>
        <button onClick={() => go('contact')}>Visit <Icon name="arrow" /></button>
      </div>
      <div className={styles.sheetActions}>
        <a href={PHONE}><Icon name="phone" /> Call Raj Delight</a>
        <a href={ZOMATO} target="_blank" rel="noreferrer">Order on Zomato <Icon name="arrow" /></a>
        <a href={SWIGGY} target="_blank" rel="noreferrer">Order on Swiggy <Icon name="arrow" /></a>
        <button onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')}><Icon name={theme === 'light' ? 'moon' : 'sun'} /> {theme === 'light' ? 'Dark mode' : 'Light mode'}</button>
      </div>
    </div>}

    {orderOpen && <div className={styles.orderPanel} role="dialog" aria-label="Order online">
      <div className={styles.orderPanelHead}><div><small>ORDER ONLINE</small><strong>Choose where to order</strong></div><button onClick={() => setOrderOpen(false)} aria-label="Close order panel"><Icon name="close" /></button></div>
      <div className={styles.orderCards}>
        <a className={styles.zomatoCard} href={ZOMATO} target="_blank" rel="noreferrer"><span>Z</span><div><small>DELIVERY</small><strong>Zomato</strong></div><Icon name="arrow" /></a>
        <a className={styles.swiggyCard} href={SWIGGY} target="_blank" rel="noreferrer"><span>S</span><div><small>DELIVERY</small><strong>Swiggy</strong></div><Icon name="arrow" /></a>
      </div>
    </div>}

    <section id="home" className={styles.hero}>
      <Image className={styles.heroImage} src={dishPhotos.hero} alt="Vegetarian biryani served at a restaurant table" fill priority sizes="100vw" />
      <div className={styles.heroVeil} aria-hidden="true" />
      <div className={styles.wrap + ' ' + styles.heroContent}>
        <p className={styles.kicker}><Icon name="spark" /> RAJ DELIGHT · CHANDAUSI</p>
        <h1>A table worth <em>coming back to.</em></h1>
        <p className={styles.heroLead}>A broad vegetarian menu, warm dining and flavours that move from tandoor to dosa, biryani, Chinese, pizza, pasta, desserts and drinks.</p>
        <div className={styles.heroActions}>
          <button className={styles.primary} onClick={() => go('menu')}>Explore the menu <Icon name="arrow" /></button>
          <button className={styles.secondaryLight} onClick={() => setOrderOpen((value) => !value)}>Order online <Icon name="arrow" /></button>
          <a className={styles.callHero} href={PHONE}><Icon name="phone" /> Call +91 79831 48985</a>
        </div>
        <div className={styles.heroFacts}><span>15 Lathi Bazar</span><b>·</b><span>Daily · 9:30 AM – 12 AM</span><b>·</b><span>100% vegetarian</span></div>
      </div>
      <button className={styles.heroScroll} onClick={() => go('about')} aria-label="Scroll to about section">Scroll to explore <span /></button>
    </section>

    <section className={styles.introBand} aria-label="Restaurant highlights">
      <div className={styles.wrap + ' ' + styles.introGrid}>
        <span><small>01</small>Broad vegetarian menu</span>
        <span><small>02</small>Dine-in · takeaway · delivery</span>
        <span><small>03</small>Chandausi since your next meal</span>
      </div>
    </section>

    <section id="about" className={styles.section + ' ' + styles.about}>
      <div className={styles.wrap + ' ' + styles.aboutGrid}>
        <div className={styles.aboutPhoto}>
          <Image src={listingPhotos[0].src} alt={listingPhotos[0].alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
          <span>Raj Delight · Chandausi</span>
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>ABOUT THE TABLE</p>
          <h2>Comfort food, <em>with range.</em></h2>
          <p>Raj Delight brings many kinds of vegetarian comfort food together under one roof. The public menu spans tandoori plates, Indian mains, biryani, Chinese appetisers, momos, South Indian favourites, pizza, pasta, desserts and drinks.</p>
          <p className={styles.muted}>For a family meal, a quick bite or a relaxed evening, the goal is simple: a lively table that still feels easy to settle into.</p>
          <div className={styles.infoGrid}><div><small>ADDRESS</small><strong>15, Lathi Bazar<br />Ward 05, Chandausi</strong></div><div><small>HOURS</small><strong>Every day<br />9:30 AM – 12 AM</strong></div></div>
          <div className={styles.copyActions}><a className={styles.textLink} href={MAPS} target="_blank" rel="noreferrer">Get directions <Icon name="arrow" /></a><a className={styles.textLink} href={PHONE}>Call restaurant <Icon name="phone" /></a></div>
        </div>
      </div>
    </section>

    <section className={styles.section + ' ' + styles.specials}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>SIGNATURE PICKS</p><h2>Start with a few <em>favourites.</em></h2></div><span className={styles.headNote}>Four distinct plates · one vegetarian kitchen</span></div>
        <div className={styles.specialGrid}>
          {specials.map((item) => <article key={item.title} className={styles.specialCard}>
            <div className={styles.specialMedia}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 25vw" /></div>
            <div className={styles.specialCopy}><small>{item.tag}</small><h3>{item.title}</h3></div>
          </article>)}
        </div>
      </div>
    </section>

    <section id="menu" className={styles.section + ' ' + styles.menuSection}>
      <div className={styles.wrap}>
        <div className={styles.menuHead}>
          <div><p className={styles.eyebrow}>THE COMPLETE MENU</p><h2>Everything on the <em>table.</em></h2><p>Explore all {menuItemCount} public menu items across {menuCategories.length} categories. Search by dish or jump by chapter.</p></div>
          <a className={styles.callCard} href={PHONE}><Icon name="phone" /><span><small>Need help deciding?</small><strong>Call Raj Delight</strong></span><Icon name="arrow" /></a>
        </div>
        <div className={styles.menuControls}>
          <label className={styles.search}><Icon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes or categories" aria-label="Search the menu" /></label>
          <div className={styles.chips} aria-label="Menu categories">
            <button className={category === 'All' ? styles.chipActive : ''} onClick={() => setCategory('All')}>All <span>{menuItemCount}</span></button>
            {resultCategories.map((item) => <button key={item.name} className={category === item.name ? styles.chipActive : ''} onClick={() => setCategory(item.name)}>{item.name} <span>{item.items.length}</span></button>)}
          </div>
        </div>
        <div className={styles.menuSummary}>{results.length} dishes shown</div>
        {results.length === 0 ? <div className={styles.empty}><strong>No dishes found.</strong><p>Try another dish name or browse the full menu.</p><button onClick={() => { setQuery(''); setCategory('All'); }}>View all dishes</button></div> : <div className={styles.menuGrid}>
          {(category === 'All' && !query.trim() ? menuCategories : menuCategories.filter((entry) => results.some((item) => item.category === entry.name))).map((entry, index) => {
            const items = results.filter((item) => item.category === entry.name);
            if (!items.length) return null;
            return <article className={styles.chapter} key={entry.name}>
              <button className={styles.chapterHead} onClick={() => setCategory(entry.name)} aria-label={`Show ${entry.name}`}>
                <span className={styles.chapterNo}>{String(index + 1).padStart(2, '0')}</span>
                <span><small>CHAPTER</small><strong>{entry.name}</strong></span>
                <b>{items.length}</b>
              </button>
              <div className={styles.items}>{items.map((item) => <div className={styles.menuItem} key={`${item.category}-${item.name}`}><span>{item.name}</span><i /></div>)}</div>
            </article>;
          })}
        </div>}
      </div>
    </section>

    <section className={styles.section + ' ' + styles.cuisineSection}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>EXPLORE BY CUISINE</p><h2>Pick your <em>mood.</em></h2></div><button className={styles.textButton} onClick={() => go('menu')}>Open full menu <Icon name="arrow" /></button></div>
        <div className={styles.cuisineGrid}>
          {menuCategories.map((entry, index) => <button key={entry.name} className={styles.cuisineCard} onClick={() => { setCategory(entry.name); go('menu'); }}>
            <Image src={categoryPhotos[entry.name] || dishPhotos.pizza} alt={`${entry.name} menu`} fill sizes="(max-width: 760px) 50vw, 20vw" />
            <div className={styles.cuisineShade} /><small>{String(index + 1).padStart(2, '0')}</small><strong>{entry.name}</strong><span>{entry.items.length} dishes</span>
          </button>)}
        </div>
      </div>
    </section>

    <section id="gallery" className={styles.section + ' ' + styles.gallerySection}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>GALLERY</p><h2>See the mood, <em>not just the menu.</em></h2></div><a className={styles.textButton} href={GOOGLE_PHOTOS} target="_blank" rel="noreferrer">View Google photos <Icon name="arrow" /></a></div>
        <div className={styles.galleryGrid}>
          {gallery.map((item, index) => <button key={`${item.label}-${index}`} className={index === 0 ? styles.galleryCardLarge : styles.galleryCard} onClick={() => setGalleryOpen(index)} aria-label={`Open ${item.label}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 33vw" /><span>{item.label}</span></button>)}
        </div>
        <p className={styles.galleryNote}>Two gallery images above are verified Raj Delight listing photographs; the full Google photo set is linked directly so the latest restaurant photos stay current.</p>
      </div>
    </section>

    <section id="contact" className={styles.section + ' ' + styles.visitSection}>
      <div className={styles.wrap + ' ' + styles.visitGrid}>
        <div className={styles.visitCopy}><p className={styles.eyebrow}>VISIT RAJ DELIGHT</p><h2>Make the next meal <em>a local plan.</em></h2><p>Find us at 15, Lathi Bazar, Ward 05, Chandausi. Call before you leave, get directions or order online.</p><div className={styles.visitActions}><a className={styles.primaryDark} href={MAPS} target="_blank" rel="noreferrer"><Icon name="map" /> Get directions</a><a className={styles.secondaryDark} href={PHONE}><Icon name="phone" /> Call now</a></div></div>
        <div className={styles.visitCard}><div><small>PHONE</small><a href={PHONE}>+91 79831 48985</a></div><div><small>ADDRESS</small><strong>15, Lathi Bazar<br />Ward 05, Chandausi</strong></div><div><small>HOURS</small><strong>Every day · 9:30 AM – 12 AM</strong></div><div><small>ORDER</small><p><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a></p></div></div>
      </div>
    </section>

    <footer className={styles.footer}><div className={styles.wrap + ' ' + styles.footerGrid}><div className={styles.footerBrand}><Image src="/raj-delight-mark.svg" alt="" width={42} height={42} /><div><strong>Raj Delight</strong><small>Chandausi</small></div></div><p>Vegetarian dining, broad choices and a lively table worth returning to.</p><div className={styles.footerLinks}><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy</a><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a></div></div><div className={styles.wrap + ' ' + styles.footerBottom}><span>© {new Date().getFullYear()} Raj Delight</span><span>15 Lathi Bazar · Chandausi</span></div></footer>

    <div className={styles.mobileDock}><a href={PHONE}><Icon name="phone" /><span>Call</span></a><button onClick={() => go('menu')}><Icon name="search" /><span>Menu</span></button><button onClick={() => setOrderOpen((value) => !value)}><Icon name="arrow" /><span>Order</span></button></div>

    {galleryOpen !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={() => setGalleryOpen(null)}>
      <button className={styles.lightboxClose} onClick={() => setGalleryOpen(null)} aria-label="Close gallery"><Icon name="close" /></button>
      <button className={styles.lightboxPrev} onClick={(event) => { event.stopPropagation(); setGalleryOpen((galleryOpen + gallery.length - 1) % gallery.length); }} aria-label="Previous photo">‹</button>
      <div className={styles.lightboxMedia} onClick={(event) => event.stopPropagation()}><Image src={currentGallery.src} alt={currentGallery.alt} fill sizes="90vw" /><span>{currentGallery.label}</span></div>
      <button className={styles.lightboxNext} onClick={(event) => { event.stopPropagation(); setGalleryOpen((galleryOpen + 1) % gallery.length); }} aria-label="Next photo">›</button>
    </div>}
  </main>;
}
