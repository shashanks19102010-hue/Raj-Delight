'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories } from '@/lib/menu';
import styles from './RajDelightUltra.module.css';

const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const PHONE = 'tel:+917983148985';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

const images = {
  interior: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg',
  paneer: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=88',
  biryani: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=88',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=88',
  dosa: 'https://images.unsplash.com/photo-1668236543090-5e8f8e4e1b2b?auto=format&fit=crop&w=1200&q=88',
  thali: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1200&q=88',
  drink: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=88',
};

const priceMap: Record<string, string> = {
  'Panner Butter Masala': '₹430.99',
  'Paneer Butter Masala': '₹430.99',
  'Kadhai Paneer': '₹430.99',
  'Shahi Paneer': '₹391.69',
  'Paneer Lababdar (special)': '₹391.69',
  'Malai Kofta': '₹391.69',
  'Masala Dosa': '₹182.09',
  'South Indian Platter': '₹352.39',
  'Tava Roti Plain': '₹19.65',
  'Jeera Aloo': '₹196.50',
  'Kadhai Mushroom': '₹365.49',
  'Kashmiri Dum Aloo': '₹378.59',
};

const fixName = (name: string) => {
  const fixes: Record<string, string> = {
    'Panner Butter Masala': 'Paneer Butter Masala',
    'Black Current Skake': 'Black Current Shake',
    'Chinesse Sizzler': 'Chinese Sizzler',
    'Saucy Delighats': 'Saucy Delights',
    'Rajsthani Thali (special)': 'Rajasthani Thali (special)',
  };
  return fixes[name] ?? name;
};

function Mark() {
  return (
    <svg className={styles.mark} viewBox="0 0 120 120" role="img" aria-label="Raj Delight emblem">
      <defs><linearGradient id="rd-ultra-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f5e3b5"/><stop offset=".5" stopColor="#caa45f"/><stop offset="1" stopColor="#8a622e"/></linearGradient></defs>
      <circle cx="60" cy="60" r="55" fill="#15100c" stroke="url(#rd-ultra-gold)" strokeWidth="2"/>
      <circle cx="60" cy="60" r="45" fill="none" stroke="url(#rd-ultra-gold)" strokeWidth="1.2" opacity=".55"/>
      <path d="M31 30c9-10 19-15 29-15s20 5 29 15" fill="none" stroke="url(#rd-ultra-gold)" strokeWidth="2.1" strokeLinecap="round"/>
      <path d="M42 18 37 10l10 2 3-8 5 8M78 18l5-8-10 2-3-8-5 8" fill="none" stroke="url(#rd-ultra-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="60" y="70" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="43" letterSpacing="-5" fill="url(#rd-ultra-gold)">RD</text>
      <path d="M32 87c8 7 17 10 28 10s20-3 28-10" fill="none" stroke="url(#rd-ultra-gold)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

function SmartImage({ src, alt, priority = false, sizes = '100vw', className = '' }: { src: string; alt: string; priority?: boolean; sizes?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={styles.fallback} role="img" aria-label={`${alt} unavailable`}><span>Raj Delight</span></div>;
  return <Image fill src={src} alt={alt} priority={priority} sizes={sizes} className={className} onError={() => setFailed(true)} />;
}

export function RajDelightUltra() {
  const [theme, setTheme] = useState<'light'|'dark'|'system'>('system');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const gallery = [
    { src: images.interior, alt: 'Raj Delight restaurant interior', label: 'Public listing photograph' },
    { src: images.paneer, alt: 'Paneer tikka dish visual', label: 'Dish visual' },
    { src: images.biryani, alt: 'Vegetable biryani dish visual', label: 'Dish visual' },
    { src: images.pizza, alt: 'Paneer tikka pizza dish visual', label: 'Dish visual' },
    { src: images.dosa, alt: 'Masala dosa dish visual', label: 'Dish visual' },
    { src: images.thali, alt: 'Navratri thali dish visual', label: 'Dish visual' },
    { src: images.drink, alt: 'Refreshing drink visual', label: 'Dish visual' },
  ];

  const specials = [
    ['Paneer Tikka', 'Tandoori Station', images.paneer, 'Popular pick'],
    ['Veg Hyderabadi Biryani', 'Biryani', images.biryani, 'Special'],
    ['Paneer Tikka Pizza', 'Continental', images.pizza, 'Crowd pleaser'],
    ['Masala Dosa', 'South Indian', images.dosa, 'Classic'],
    ['Navratri Thali', 'Navratri Food', images.thali, 'Seasonal'],
  ] as const;

  useEffect(() => {
    const stored = window.localStorage.getItem('raj-delight-theme') as 'light'|'dark'|'system'|null;
    setTheme(stored ?? 'system');
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && media.matches);
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    };
    apply();
    media.addEventListener?.('change', apply);
    window.localStorage.setItem('raj-delight-theme', theme);
    return () => media.removeEventListener?.('change', apply);
  }, [theme]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) { nodes.forEach(n => n.classList.add(styles.show)); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = (entry.target as HTMLElement).dataset.reveal;
        if (id) setRevealed(v => ({ ...v, [id]: true }));
        io.unobserve(entry.target);
      });
    }, { threshold: .14 });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (lightboxIndex === null || gallery.length === 0) return;
      if (e.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = lightboxIndex === null ? '' : 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [lightboxIndex, gallery.length]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMenuItems.filter(item => (activeCategory === 'All' || item.category === activeCategory) && (!q || `${item.name} ${item.category}`.toLowerCase().includes(q)));
  }, [activeCategory, query]);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const selectCategory = (name: string) => { setActiveCategory(name); setExpanded(name === 'All' ? null : name); go('menu'); };

  return (
    <main className={theme === 'dark' ? `${styles.site} ${styles.dark}` : styles.site}>
      <div className={styles.frame} aria-hidden="true" />
      <div className={styles.top}><div className={styles.wrap}><span>100% Vegetarian</span><i/><span>Chandausi</span><div className={styles.grow}/><a href={LINKS.instagram} target="_blank" rel="noreferrer"><SocialIcon/> @raj_delight</a><button onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')} aria-label="Cycle light, dark and system theme">{theme}</button></div></div>
      <header className={styles.nav}><div className={styles.wrap}><button className={styles.brand} onClick={() => go('home')} aria-label="Raj Delight home"><Mark/><span><b>Raj Delight</b><small>Chandausi</small></span></button><nav className={menuOpen ? `${styles.links} ${styles.linksOpen}` : styles.links}>{['about','menu','gallery','contact'].map(id=><button key={id} onClick={()=>go(id)}>{id}</button>)}</nav><div className={styles.navEnd}><a href={LINKS.zomato} target="_blank" rel="noreferrer" className={styles.navOrder}>Order online <Arrow/></a><button className={styles.burger} onClick={()=>setMenuOpen(v=>!v)} aria-expanded={menuOpen} aria-label="Open navigation"><span/><span/></button></div></div></header>

      <section className={styles.hero} id="home"><SmartImage src={images.biryani} alt="Vegetarian Indian dining visual" priority sizes="100vw" className={styles.heroImg}/><div className={styles.heroShade}/><div className={styles.wrap}><div className={styles.heroContent}><span className={styles.kicker}>Raj Delight · Chandausi</span><h1>Good food.<br/><em>Great moments.</em></h1><p>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p><div className={styles.heroActions}><button className={styles.goldBtn} onClick={()=>go('menu')}>Explore menu <Arrow/></button><button className={styles.ghostBtn} onClick={()=>go('gallery')}>View gallery <Arrow/></button></div><div className={styles.stats}><div><b>4.3</b><span>Google rating</span></div><div><b>{menuCategories.length}</b><span>menu categories</span></div><div><b>9:30 AM–12 AM</b><span>hours shown online</span></div><div><b>Veg</b><span>restaurant</span></div></div></div></div><div className={styles.scrollHint}>Scroll to explore <i/></div></section>

      <section className={styles.orderBand}><div className={styles.wrap}><div className={styles.orderIn}><div><span className={styles.eyebrow}>Delivery · takeaway</span><h2>Your favourites, one click away.</h2></div><div className={styles.orderGrid}><a href={LINKS.zomato} target="_blank" rel="noreferrer" className={`${styles.orderCard} ${styles.zomato}`}><strong>Order on Zomato</strong><small>Live ordering</small><span><Arrow/></span></a><a href={LINKS.swiggy} target="_blank" rel="noreferrer" className={`${styles.orderCard} ${styles.swiggy}`}><strong>Order on Swiggy</strong><small>Live ordering</small><span><Arrow/></span></a><a href={LINKS.phone} className={styles.orderCard}><strong>Call restaurant</strong><small>+91 79831 48985</small><span><Arrow/></span></a></div></div></div></section>

      <section id="about" data-reveal="about" className={revealed.about ? `${styles.section} ${styles.reveal} ${styles.show}` : `${styles.section} ${styles.reveal}`}><div className={styles.wrap}><div className={styles.story}><button className={styles.storyPhoto} onClick={()=>setLightboxIndex(0)} aria-label="Open Raj Delight interior photo"><SmartImage src={images.interior} alt="Raj Delight interior from public listing" sizes="(max-width:900px) 100vw, 55vw"/><span>Public listing photo · tap to enlarge</span></button><div><span className={styles.eyebrow}>The Raj Delight experience</span><h2 className={styles.title}>A little bit of <em>everything.</em></h2><p className={styles.text}>Raj Delight is publicly listed in Chandausi with vegetarian dining, indoor seating, takeaway, lunch, dinner and home delivery.</p><div className={styles.features}><div><b>01</b><span>Vegetarian menu</span></div><div><b>02</b><span>Indoor seating</span></div><div><b>03</b><span>Takeaway & delivery</span></div><div><b>04</b><span>Lunch & dinner</span></div></div></div></div></div></section>

      <section data-reveal="specials" className={revealed.specials ? `${styles.section} ${styles.specials} ${styles.reveal} ${styles.show}` : `${styles.section} ${styles.specials} ${styles.reveal}`}><div className={styles.wrap}><div className={styles.heading}><div><span className={styles.eyebrow}>Must-try plates</span><h2 className={styles.title}>Favourites worth <em>coming back for.</em></h2></div><button className={styles.textLink} onClick={()=>go('menu')}>View complete menu <Arrow/></button></div><div className={styles.specialGrid}>{specials.map(([name,cat,img,note],i)=><article key={name} className={styles.special}><button className={styles.specialPhoto} onClick={()=>setLightboxIndex(i+1)} aria-label={`Open ${name} image`}><SmartImage src={img} alt={`${name} dish visual`} sizes="(max-width:760px) 84vw, 20vw"/><b>{String(i+1).padStart(2,'0')}</b></button><small>{note}</small><h3>{name}</h3><strong className={styles.price}>{priceMap[name] ?? (name === 'Masala Dosa' ? PRICE['Masala Dosa'] : 'View live price')}</strong><button className={styles.view} onClick={()=>selectCategory(cat)}>View in menu <Arrow/></button></article>)}</div></div></section>

      <section className={styles.menu} id="menu"><div className={styles.wrap}><div className={styles.menuHead}><div><span className={styles.eyebrow}>The complete menu</span><h2 className={styles.menuTitle}>Every flavour. <em>One place.</em></h2><p>{menuCategories.length} categories · {allMenuItems.length} listed dishes. Search and browse category-by-category rather than scrolling through a wall of cards.</p></div><div className={styles.spend}><small>Public listing spend</small><b>₹200–₹400</b><span>average bill / person</span></div></div><div className={styles.menuTools}><label className={styles.search}><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes or categories..." aria-label="Search dishes or categories"/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search">×</button>}</label><div className={styles.chips}>{['All','Indian Main Course','South Indian','Tandoori Station','Chinese Appetizers','Continental','Delicious Burger','Italian Pasta','Dessert'].map(c=><button key={c} onClick={()=>setActiveCategory(c)} className={activeCategory===c?styles.activeChip:''}>{c==='All'?'All dishes':c}</button>)}</div><div className={styles.select}><label htmlFor="rr-category">Browse category</label><select id="rr-category" value={activeCategory} onChange={e=>{setActiveCategory(e.target.value);setExpanded(e.target.value==='All'?null:e.target.value)}}><option value="All">All dishes</option>{menuCategories.map(c=><option key={c.name} value={c.name}>{c.name}</option>)}</select></div></div><div className={styles.meta}><span>{filtered.length} dishes shown</span>{activeCategory!=='All'&&<button onClick={()=>setActiveCategory('All')}>Reset</button>}</div><div className={styles.categories}>{menuCategories.map((c,i)=>{const items=filtered.filter(x=>x.category===c.name);if(activeCategory!=='All'&&!items.length)return null;const open=expanded===c.name||(query.trim().length>0&&items.length>0);return <section className={styles.cat} key={c.name}><button className={styles.catHead} onClick={()=>setExpanded(open?null:c.name)} aria-expanded={open}><span>{String(i+1).padStart(2,'0')}</span><strong>{c.name}</strong><small>{c.items.length} items</small><b>{open?'−':'+'}</b></button>{open&&<div className={styles.catItems}>{items.map(item=>{const name=fixName(item.name);const p=priceMap[item.name]??priceMap[name];return <a href={ZOMATO} target="_blank" rel="noreferrer" key={`${item.category}-${item.name}`}><span>{name}</span><small>{p ?? 'View live price'} <i>↗</i></small></a>})}{!items.length&&<p>No dishes match your search.</p>}</div>}</section>})}</div></div></section>

      <section className={styles.season}><button className={styles.seasonImg} onClick={()=>setLightboxIndex(6)} aria-label="Open Navratri Thali image"><SmartImage src={images.thali} alt="Navratri Thali dish visual" sizes="(max-width:850px) 100vw, 55vw"/><span>Seasonal dish visual</span></button><div className={styles.seasonCopy}><span className={styles.eyebrow}>Seasonal selection</span><h2>Navratri <em>Thali.</em></h2><p>The public menu includes a dedicated Navratri Food section with a listed Navratri Thali.</p><button className={styles.darkBtn} onClick={()=>selectCategory('Navratri Food')}>Explore Navratri food <Arrow/></button></div></section>

      <section className={styles.section} id="gallery"><div className={styles.wrap}><div className={styles.heading}><div><span className={styles.eyebrow}>Visual journal</span><h2 className={styles.title}>See the place. <em>Feel the mood.</em></h2></div><p className={styles.headingText}>Tap a photograph to view it full-screen. The restaurant photo is identified separately from editorial dish visuals.</p></div><div className={styles.galleryGrid}>{gallery.map((g,i)=><button className={`${styles.galleryTile} ${i===0?styles.tall:''}`} key={g.alt} onClick={()=>setLightboxIndex(i)}><SmartImage src={g.src} alt={g.alt} sizes="(max-width:700px) 50vw, 33vw"/><span>{g.label}</span><strong>{g.alt}</strong></button>)}</div></div></section>

      <section className={styles.contact} id="contact"><div className={styles.wrap}><div className={styles.contactGrid}><div><span className={styles.eyebrow}>Visit · order · connect</span><h2>Come for the food. <em>Stay for the moment.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className={styles.contactActions}><a href={LINKS.maps} target="_blank" rel="noreferrer" className={styles.goldBtn}>Get directions <Arrow/></a><a href={LINKS.phone} className={styles.outlineBtn}>Call restaurant</a></div></div><div className={styles.contactCard}><div><small>Hours shown online</small><b>9:30 AM – 12:00 AM</b></div><div><small>Phone</small><b>+91 79831 48985</b></div><div><small>Food licence</small><b>12726074000015</b></div><a href={LINKS.instagram} target="_blank" rel="noreferrer" className={styles.instagram}><SocialIcon size={28}/><span>@raj_delight</span><b><Arrow/></b></a></div></div></div></section>

      <footer className={styles.footer}><div className={styles.wrap}><div className={styles.footerGrid}><div><div className={styles.footerBrand}><Mark/><span><b>Raj Delight</b><small>Chandausi</small></span></div><p>Vegetarian dining in Chandausi.</p></div><div><small>Explore</small>{['home','about','menu','gallery','contact'].map(id=><button key={id} onClick={()=>go(id)}>{id}</button>)}</div><div><small>Order</small><a href={LINKS.zomato} target="_blank" rel="noreferrer">Zomato</a><a href={LINKS.swiggy} target="_blank" rel="noreferrer">Swiggy</a><a href={LINKS.phone}>Call</a></div><div><small>Social</small><a href={LINKS.instagram} target="_blank" rel="noreferrer"><SocialIcon size={16}/> @raj_delight</a></div></div><div className={styles.footBottom}><span>© {new Date().getFullYear()} Raj Delight</span><span>Public restaurant information · Chandausi</span></div></div></footer>

      <div className={styles.desktopOrder}><a href={LINKS.zomato} target="_blank" rel="noreferrer">Order online <Arrow/></a></div><nav className={styles.mobileActions}><button onClick={()=>go('menu')}>Menu</button><a href={LINKS.zomato} target="_blank" rel="noreferrer">Order</a><a href={LINKS.phone}>Call</a><a href={LINKS.maps} target="_blank" rel="noreferrer">Directions</a></nav>

      {lightboxIndex !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Image viewer" onClick={()=>setLightboxIndex(null)}><button className={styles.close} onClick={()=>setLightboxIndex(null)} aria-label="Close">×</button><button className={styles.prev} onClick={(e)=>{e.stopPropagation();setLightboxIndex((lightboxIndex-1+gallery.length)%gallery.length)}} aria-label="Previous image">‹</button><div className={styles.lightInner} onClick={e=>e.stopPropagation()}><SmartImage src={gallery[lightboxIndex].src} alt={gallery[lightboxIndex].alt} sizes="94vw" priority/><p>{gallery[lightboxIndex].alt}</p></div><button className={styles.next} onClick={(e)=>{e.stopPropagation();setLightboxIndex((lightboxIndex+1)%gallery.length)}} aria-label="Next image">›</button></div>}
    </main>
  );
}

function SocialIcon({ size = 20 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>; }

const LINKS = { zomato: ZOMATO, swiggy: SWIGGY, phone: PHONE, maps: MAPS, instagram: INSTAGRAM };
const PRICE = priceMap;
