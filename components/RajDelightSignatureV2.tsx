'use client';

import { useEffect, useMemo, useState } from 'react';
import { allMenuItems, menuCategories } from '@/lib/menu';
import styles from './RajDelightSignatureV2.module.css';

const ZOMATO = 'https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY = 'https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const PHONE = 'tel:+917983148985';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM = 'https://www.instagram.com/raj_delight/';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1599354607448-8ad6e92b027a?auto=format&fit=crop&w=1800&q=88',
  interior: 'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg',
  paneer: 'https://www.gravy.sg/assets/dish-paneer-tikka.jpg',
  curry: 'https://recipecontent.fooby.ch/25477_3-2_1920-1280.jpg',
  momos: 'https://c.ndtvimg.com/2025-03/ruef42p_momos_625x300_11_March_25.jpg?im=FeatureCrop%2Calgorithm%3Ddnn%2Cwidth%3D1200%2Cheight%3D886',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=88',
  burger: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/be4e0e26fdd3f62ecf8e09f57e77d72e',
  pasta: 'https://images.unsplash.com/photo-1676471771228-c4cdbfbd2a7f?auto=format&fit=crop&w=1400&q=88',
  thali: 'https://pd.w.org/2025/05/506682de3008f07a2.33494874.jpg',
  dosa: 'https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?auto=format&fit=crop&w=1400&q=88',
  dessert: 'https://cdn.shopify.com/s/files/1/0687/4457/7250/files/recipe-inline-dessert-classic-sundae-min.jpg?v=1753382955',
  icecream: 'https://images.deliveryhero.io/image/fd-pk/LH/kxzi-listing.jpg',
  drink: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=88',
} as const;

const featured = [
  { name: 'Tandoori Paneer Tikka', category: 'Tandoori Station', image: IMG.paneer, tag: 'Signature' },
  { name: 'Veg Hyderabadi Biryani', category: 'Biryani', image: IMG.hero, tag: 'Classic' },
  { name: 'Paneer Tikka Pizza', category: 'Continental', image: IMG.pizza, tag: 'Modern' },
  { name: 'Masala Dosa', category: 'South Indian', image: IMG.dosa, tag: 'South Indian' },
];

const visualCategories = ['Tandoori Station','Indian Main Course','Biryani','Chinese Appetizers','Continental','Delicious Burger','Italian Pasta','Special Thali','South Indian','Dessert','Variety Of Ice Cream','Drinks'];
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

function SafeImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="imageFallback">Raj Delight</div>;
  return <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}

export function RajDelightSignatureV2() {
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{src:string;alt:string}|null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('raj-delight-theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem('raj-delight-theme', theme);
    document.documentElement.dataset.theme = theme;
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
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    setOpenCategory(category);
    requestAnimationFrame(() => jump('menu-items'));
  };
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allMenuItems.filter(item =>
      (activeCategory === 'All' || item.category === activeCategory) &&
      (!needle || `${item.name} ${item.category}`.toLowerCase().includes(needle))
    );
  }, [activeCategory, query]);
  const rows = useMemo(() => {
    if (!query.trim() && activeCategory === 'All') return menuCategories;
    const allowed = new Set(filtered.map(item => item.category));
    return menuCategories.filter(category => allowed.has(category.name));
  }, [filtered, activeCategory, query]);

  return (
    <main className={`${styles.site} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.progress} style={{transform:`scaleX(${progress/100})`}} aria-hidden="true" />
      <div className={styles.edgeFrame} aria-hidden="true" />

      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navInner}`}>
          <button className={styles.brand} onClick={() => jump('home')} aria-label="Raj Delight home">
            <img src="/raj-delight-mark.svg" alt="" className={styles.brandMark} />
            <span className={styles.brandText}><strong>Raj Delight</strong><small>Chandausi</small></span>
          </button>
          <nav className={styles.links} aria-label="Primary navigation">
            <button onClick={() => jump('about')}>About</button><button onClick={() => jump('menu')}>Menu</button><button onClick={() => jump('gallery')}>Gallery</button><button onClick={() => jump('contact')}>Contact</button>
          </nav>
          <div className={styles.navTools}>
            <button className={styles.theme} onClick={() => setTheme(v => v === 'light' ? 'dark' : 'light')}>{theme === 'light' ? 'Night' : 'Day'}</button>
            <a className={styles.navOrder} href={ZOMATO} target="_blank" rel="noreferrer">Order <Arrow /></a>
          </div>
        </div>
      </header>

      <section className={styles.hero} id="home">
        <div className={styles.heroMedia}><SafeImage src={IMG.hero} alt="Vegetable biryani served at Raj Delight" priority /></div>
        <div className={styles.heroOverlay} /><div className={styles.heroOrb} aria-hidden="true" />
        <div className={`${styles.wrap} ${styles.heroContent}`}>
          <p className={styles.kicker}>15 Lathi Bazar · Chandausi · 100% Vegetarian</p>
          <h1>A taste worth<br /><em>remembering.</em></h1>
          <p className={styles.heroIntro}>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p>
          <div className={styles.heroActions}>
            <button className={styles.primaryCta} onClick={() => jump('menu')}>Explore menu <Arrow /></button>
            <a className={styles.secondaryCta} href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow /></a>
            <div className={styles.orderGroup}>
              <button className={styles.orderToggle} onClick={() => setOrderOpen(v => !v)} aria-expanded={orderOpen}>Order online <Arrow /></button>
              {orderOpen && <div className={styles.orderPanel}><a className={styles.orderMini} href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow /></a><a className={styles.orderMini} href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow /></a></div>}
            </div>
          </div>
          <div className={styles.heroMeta}><div><span>Rating</span><strong>4.3</strong></div><div><span>Categories</span><strong>{menuCategories.length}</strong></div><div><span>Hours shown</span><strong>9:30–12</strong></div></div>
        </div>
        <div className={styles.heroSide}>Scroll to discover <span /></div>
      </section>

      <section className={styles.marquee}><div className={styles.marqueeTrack}><span>Indian classics</span><i>◆</i><span>South Indian</span><i>◆</i><span>Indo-Chinese</span><i>◆</i><span>Continental</span><i>◆</i><span>Desserts & drinks</span><i>◆</i><span>Indian classics</span><i>◆</i><span>South Indian</span><i>◆</i><span>Indo-Chinese</span><i>◆</i><span>Continental</span><i>◆</i><span>Desserts & drinks</span></div></section>

      <section className={`${styles.section} ${styles.story}`} id="about"><div className={`${styles.wrap} ${styles.storyGrid}`}>
        <button className={styles.storyImage} onClick={() => setLightbox({src:IMG.interior,alt:'Raj Delight restaurant interior'})}><SafeImage src={IMG.interior} alt="Raj Delight restaurant interior" /><span className={styles.caption}>Public listing photo · view larger</span></button>
        <div className={styles.storyCopy}><p className={styles.kicker}>The Raj Delight experience</p><h2>A little bit of <em>everything.</em></h2><p className={styles.bodyCopy}>Raj Delight brings together familiar Indian favourites with South Indian, Indo-Chinese, Continental and seasonal selections, all in one vegetarian menu.</p><div className={styles.facts}><div className={styles.fact}><b>01</b><span>Vegetarian menu</span></div><div className={styles.fact}><b>02</b><span>Indoor seating</span></div><div className={styles.fact}><b>03</b><span>Takeaway & delivery</span></div><div className={styles.fact}><b>04</b><span>Lunch & dinner</span></div></div></div>
      </div></section>

      <section className={`${styles.section} ${styles.signature}`}><div className={styles.wrap}>
        <div className={styles.sectionHead}><div><p className={styles.kicker}>The table, reimagined</p><h2>Signature <em>flavours.</em></h2></div><button className={styles.textButton} onClick={() => jump('menu')}>Open complete menu <Arrow /></button></div>
        <div className={styles.signatureGrid}>{featured.map((item,index)=><article className={styles.dish} key={item.name}><button className={styles.dishImage} onClick={() => setLightbox({src:item.image,alt:item.name})}><SafeImage src={item.image} alt={item.name}/><b>{String(index+1).padStart(2,'0')}</b></button><p className={styles.dishTag}>{item.tag}</p><h3>{item.name}</h3><button className={styles.dishLink} onClick={() => chooseCategory(item.category)}>Explore category <Arrow /></button></article>)}</div>
      </div></section>

      <section className={styles.menuSection} id="menu"><div className={styles.wrap}>
        <div className={styles.menuIntro}><div><p className={styles.kicker}>The complete menu</p><h2>Every flavour.<br /><em>One place.</em></h2><p>Explore the full public menu through an editorial category system, then open any chapter for every listed dish.</p></div><div className={styles.menuCount}><span>Dishes</span><strong>{allMenuItems.length}</strong><small>across {menuCategories.length} categories</small></div></div>
        <div className={styles.menuTools}><label className={styles.searchBox}><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a dish or category" aria-label="Search a dish or category" />{query && <button onClick={()=>setQuery('')} aria-label="Clear search">×</button>}</label><div className={styles.categoryScroller}><button className={activeCategory==='All'?styles.active:''} onClick={()=>{setQuery('');setActiveCategory('All');setOpenCategory(null)}}>All</button>{visualCategories.map(category=><button key={category} className={activeCategory===category?styles.active:''} onClick={()=>chooseCategory(category)}>{category}</button>)}</div></div>
        <div className={styles.chapterGrid}>{visualCategories.map((category,index)=>{const count=menuCategories.find(c=>c.name===category)?.items.length??0;return <button key={category} className={styles.chapter} onClick={()=>chooseCategory(category)}><SafeImage src={categoryImages[category]} alt={`${category} menu visual`}/><span className={styles.chapterShade}/><span className={styles.chapterNo}>{String(index+1).padStart(2,'0')}</span><span className={styles.chapterCopy}><small>{count} dishes</small><strong>{category}</strong><em>Explore <Arrow/></em></span></button>})}</div>
        <div className={styles.menuMeta}><span>{query || activeCategory !== 'All' ? `${filtered.length} matching dishes` : `${allMenuItems.length} dishes shown`}</span>{(query || activeCategory !== 'All') && <button onClick={()=>{setQuery('');setActiveCategory('All');setOpenCategory(null)}}>Clear filters</button>}</div>
        <div className={styles.menuRows} id="menu-items">{rows.map((category,index)=>{const open=openCategory===category.name;const items=query || activeCategory!=='All' ? filtered.filter(i=>i.category===category.name).map(i=>i.name) : category.items;return <section className={styles.menuRow} key={category.name}><button className={styles.menuRowHead} onClick={()=>setOpenCategory(open?null:category.name)} aria-expanded={open}><span>{String(index+1).padStart(2,'0')}</span><strong>{category.name}</strong><small>{items.length} items</small><b>{open?'−':'+'}</b></button>{open && <div className={styles.menuItems}>{items.map(name=><div className={styles.menuItem} key={name}><strong>{name}</strong></div>)}</div>}</section>})}</div>
      </div></section>

      <section className={`${styles.section} ${styles.season}`}><div className={`${styles.wrap} ${styles.seasonCard}`}><button className={styles.seasonImage} onClick={()=>setLightbox({src:IMG.thali,alt:'Raj Delight seasonal thali visual'})}><SafeImage src={IMG.thali} alt="Seasonal thali visual"/><span className={styles.caption}>Seasonal selection</span></button><div className={styles.seasonCopy}><p className={styles.kicker}>Seasonal selection</p><h2>Navratri <em>Thali.</em></h2><p className={styles.bodyCopy}>The public menu includes a dedicated Navratri Food section with seasonal favourites.</p><button className={styles.primaryCta} onClick={()=>chooseCategory('Navratri Food')}>Explore Navratri food <Arrow /></button></div></div></section>

      <section className={`${styles.section} ${styles.gallery}`} id="gallery"><div className={styles.wrap}><div className={styles.sectionHead}><div><p className={styles.kicker}>Visual journal</p><h2>See the place.<br /><em>Feel the mood.</em></h2></div><p className={styles.sectionAside}>Warm light, editorial crops, quiet captions and enough motion to keep the experience alive.</p></div><div className={styles.galleryGrid}><button className={styles.galleryLarge} onClick={()=>setLightbox({src:IMG.interior,alt:'Raj Delight restaurant interior'})}><SafeImage src={IMG.interior} alt="Raj Delight restaurant interior"/><span className={styles.caption}>Restaurant</span></button>{[IMG.paneer,IMG.hero,IMG.pizza,IMG.dosa,IMG.thali].map((src,i)=><button className={styles.galleryTile} key={src} onClick={()=>setLightbox({src,alt:`Raj Delight gallery image ${i+1}`})}><SafeImage src={src} alt={`Raj Delight gallery image ${i+1}`}/><span className={styles.caption}>Restaurant & food</span></button>)}</div><a className={styles.galleryMore} href={MAPS} target="_blank" rel="noreferrer">View more public listing photos <Arrow /></a></div></section>

      <section className={styles.visit} id="contact"><div className={`${styles.wrap} ${styles.visitGrid}`}><div><p className={styles.kicker}>Visit · order · connect</p><h2>Come for the food.<br /><em>Stay for the moment.</em></h2><p className={styles.bodyCopy}>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className={styles.visitActions}><a className={styles.primaryCta} href={MAPS} target="_blank" rel="noreferrer">Get directions <Arrow/></a><a className={styles.secondaryCta} href={PHONE}>Call restaurant</a></div></div><div className={styles.visitCard}><div className={styles.visitRow}><small>Hours shown online</small><strong>9:30 AM – 12:00 AM</strong></div><div className={styles.visitRow}><small>Phone</small><strong>+91 79831 48985</strong></div><div className={styles.visitRow}><small>Order online</small><strong>Zomato · Swiggy</strong></div><div className={styles.visitActions}><a className={styles.primaryCta} href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow/></a><a className={styles.secondaryCta} href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow/></a></div><a className={styles.social} href={INSTAGRAM} target="_blank" rel="noreferrer"><span>@raj_delight</span><b>Instagram <Arrow/></b></a></div></div></section>

      <footer className={styles.footer}><div className={styles.wrap}><div className={styles.footerTop}><div className={styles.footerBrand}><img src="/raj-delight-mark.svg" alt="Raj Delight"/><div><strong>Raj Delight</strong><span>Chandausi</span></div></div><p>Vegetarian dining in Chandausi.<br/>A little bit of everything.</p></div><div className={styles.footerCols}><div><small>Explore</small><button onClick={()=>jump('home')}>Home</button><button onClick={()=>jump('about')}>About</button><button onClick={()=>jump('menu')}>Menu</button><button onClick={()=>jump('gallery')}>Gallery</button><button onClick={()=>jump('contact')}>Contact</button></div><div><small>Order</small><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato <Arrow/></a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy <Arrow/></a><a href={PHONE}>Call <Arrow/></a></div><div><small>Social</small><a href={INSTAGRAM} target="_blank" rel="noreferrer">@raj_delight <Arrow/></a></div></div><div className={styles.footerBottom}><span>© 2026 Raj Delight</span><span>Public restaurant information · Chandausi</span></div></div></footer>

      <nav className={styles.mobileBar} aria-label="Quick actions"><button onClick={()=>jump('menu')}>Menu</button><a href={ZOMATO} target="_blank" rel="noreferrer">Order</a><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a></nav>
      {lightbox && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={()=>setLightbox(null)}><button className={styles.closeLightbox} onClick={()=>setLightbox(null)} aria-label="Close image">×</button><img src={lightbox.src} alt={lightbox.alt} onClick={e=>e.stopPropagation()}/></div>}
    </main>
  );
}
