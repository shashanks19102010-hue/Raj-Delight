'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import styles from './RajDelightUltraFinal.module.css';
import { allMenuItems, menuCategories } from '@/lib/menu';

const ZOMATO='https://www.zomato.com/chandausi/raj-delight-restaurant-chandausi-locality/order';
const SWIGGY='https://www.swiggy.com/city/chandausi/raj-delight-restaurant-chandausi-rest1102497';
const PHONE='tel:+917983148985';
const MAPS='https://www.google.com/maps/search/?api=1&query=Raj%20Delight%2015%20Lathi%20Bazar%20Chandausi';
const INSTAGRAM='https://www.instagram.com/raj_delight/';

const IMG={
  interior:'https://img3.restaurantguru.com/c8b1-Restaurant-Raj-Delight-interior.jpg',
  listing1:'https://content.jdmagicbox.com/v2/comp/chandausi/a8/9999p5923.5923.250401114055.d2a8/catalogue/raj-delight-avas-vikas-colony-chandausi-restaurants-bi3c56zh4s-250.jpg',
  listing2:'https://content.jdmagicbox.com/v2/comp/chandausi/a8/9999p5923.5923.250401114055.d2a8/catalogue/raj-delight-avas-vikas-colony-chandausi-restaurants-pdycxhi8xa-250.jpg',
  paneer:'https://spicesafari.in/assets/images/Starter.png',
  biryani:'https://www.tiktokbriyani.com/assets/images/veg/Vegetable-Biryani.webp',
  pizza:'https://b.zmtcdn.com/data/pictures/chains/1/21415351/c5b3e2010da3553ec3ac889204d3e786.jpg',
  dosa:'https://www.skandacloudkitchen.in/assets/masala-dosa-BCIr_LYP.png',
  thali:'https://media-assets.swiggy.com/swiggy/image/upload/f_auto%2Cq_auto%2Cfl_lossy/fc8mmevwmbsje3ib5kbd',
  drink:'https://hospitalitycareerprofile.com/uploads/images/202605/image_1200x_69ff4cd3b82d4.webp',
  dessert:'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_300%2Ch_300%2Ce_grayscale%2Cc_fit/FOOD_CATALOG/IMAGES/CMS/2025/7/25/0e80b187-03b4-4e42-8037-02dfedf0f1f1_4d2c1c80-f646-4e5e-847d-5cf12b8e527c.jpg',
};

const PRICE:Record<string,string>={
  'Panner Butter Masala':'₹430.99','Paneer Butter Masala':'₹430.99','Kadhai Paneer':'₹430.99',
  'Shahi Paneer':'₹391.69','Paneer Lababdar (special)':'₹391.69','Malai Kofta':'₹391.69',
  'Masala Dosa':'₹182.09','South Indian Platter':'₹352.39','Tava Roti Plain':'₹19.65',
  'Jeera Aloo':'₹196.50','Kadhai Mushroom':'₹365.49','Kashmiri Dum Aloo':'₹378.59',
};
const FIX:Record<string,string>={'Panner Butter Masala':'Paneer Butter Masala','Black Current Skake':'Black Current Shake','Chinesse Sizzler':'Chinese Sizzler','Saucy Delighats':'Saucy Delights','Rajsthani Thali (special)':'Rajasthani Thali (special)'};
const pretty=(v:string)=>FIX[v]??v;
function Arrow(){return <span aria-hidden="true">↗</span>}
function SocialIcon({size=18}:{size?:number}){return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>}
function SafeImage({src,alt,priority=false,sizes='100vw',className=''}:{src:string;alt:string;priority?:boolean;sizes?:string;className?:string}){const [failed,setFailed]=useState(false);if(failed)return <div className={`${styles.fallback} ${className}`} role="img" aria-label={`${alt} unavailable`}><span>Raj Delight</span></div>;return <Image fill src={src} alt={alt} priority={priority} sizes={sizes} className={className} onError={()=>setFailed(true)}/>}

const specials=[
  {name:'Paneer Tikka',cat:'Tandoori Station',img:IMG.paneer,note:'Popular pick'},
  {name:'Veg Hyderabadi Biryani',cat:'Biryani',img:IMG.biryani,note:'Special'},
  {name:'Paneer Tikka Pizza',cat:'Continental',img:IMG.pizza,note:'Crowd pleaser'},
  {name:'Masala Dosa',cat:'South Indian',img:IMG.dosa,note:'Classic'},
  {name:'Navratri Thali',cat:'Navratri Food',img:IMG.thali,note:'Seasonal'},
] as const;

const gallery=[
  {src:IMG.interior,alt:'Raj Delight restaurant interior',label:'Verified public listing photo'},
  {src:IMG.listing1,alt:'Raj Delight public listing photo',label:'Verified public listing photo'},
  {src:IMG.listing2,alt:'Raj Delight public listing photo',label:'Verified public listing photo'},
  {src:IMG.paneer,alt:'Paneer tikka dish visual',label:'Editorial dish visual'},
  {src:IMG.biryani,alt:'Vegetable biryani dish visual',label:'Editorial dish visual'},
  {src:IMG.pizza,alt:'Paneer tikka pizza dish visual',label:'Editorial dish visual'},
  {src:IMG.dosa,alt:'Masala dosa dish visual',label:'Editorial dish visual'},
  {src:IMG.thali,alt:'Indian thali dish visual',label:'Editorial dish visual'},
  {src:IMG.drink,alt:'Refreshing mocktail visual',label:'Editorial drink visual'},
  {src:IMG.dessert,alt:'Gulab jamun dessert visual',label:'Editorial dessert visual'},
] as const;

const featuredCategories=['Warm & Cozy','Shake It Up','Tandoori Station','Indian Main Course','Biryani','Chinese Appetizers','Continental','Delicious Burger','Italian Pasta','Special Thali','South Indian','Dessert'];
const categoryVisuals:Record<string,string>={
  'Warm & Cozy':IMG.drink,'Shake It Up':IMG.drink,'Tandoori Station':IMG.paneer,'Indian Main Course':IMG.paneer,
  'Biryani':IMG.biryani,'Chinese Appetizers':IMG.listing1,'Continental':IMG.pizza,'Delicious Burger':IMG.pizza,
  'Italian Pasta':IMG.pizza,'Special Thali':IMG.thali,'South Indian':IMG.dosa,'Dessert':IMG.dessert,
};

export function RajDelightUltra(){
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  const [mobile,setMobile]=useState(false);
  const [query,setQuery]=useState('');
  const [active,setActive]=useState('All');
  const [expanded,setExpanded]=useState<string|null>(null);
  const [lightbox,setLightbox]=useState<{src:string;alt:string}|null>(null);
  const [revealed,setRevealed]=useState<Record<string,boolean>>({});
  const dark=theme==='dark';

  useEffect(()=>{const stored=window.localStorage.getItem('raj-delight-theme');if(stored==='light'||stored==='dark')setTheme(stored)},[]);
  useEffect(()=>{window.localStorage.setItem('raj-delight-theme',theme);document.documentElement.dataset.theme=theme},[theme]);
  useEffect(()=>{const els=Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add(styles.show));return}const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const id=e.target.getAttribute('data-reveal');if(id)setRevealed(v=>({...v,[id]:true}));io.unobserve(e.target)}),{threshold:.12});els.forEach(e=>io.observe(e));return()=>io.disconnect()},[]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setLightbox(null)};window.addEventListener('keydown',key);document.body.style.overflow=lightbox===null?'':'hidden';return()=>{window.removeEventListener('keydown',key);document.body.style.overflow=''}},[lightbox]);

  const filtered=useMemo(()=>{const q=query.trim().toLowerCase();return allMenuItems.filter(item=>(active==='All'||item.category===active)&&(!q||`${item.name} ${item.category}`.toLowerCase().includes(q)))},[active,query]);
  const go=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});setMobile(false)};
  const choose=(cat:string)=>{setActive(cat);setExpanded(cat);setMobile(false);requestAnimationFrame(()=>document.getElementById('menu-items')?.scrollIntoView({behavior:'smooth',block:'start'}))};
  const toggleTheme=()=>setTheme(t=>t==='light'?'dark':'light');

  return <main className={dark?`${styles.site} ${styles.dark}`:styles.site}>
    <div className={styles.frame} aria-hidden="true"/>
    <div className={styles.top}><div className={`${styles.wrap} ${styles.topin}`}><span>100% Vegetarian</span><i className={styles.dot}/><span>Chandausi</span><div className={styles.grow}/><a href={INSTAGRAM} target="_blank" rel="noreferrer"><SocialIcon size={14}/> @raj_delight</a><button className={styles.themeToggle} onClick={toggleTheme} aria-label={`Switch to ${theme==='light'?'dark':'light'} theme`}>{theme==='light'?'Light':'Dark'}</button></div></div>
    <header className={styles.nav}><div className={`${styles.wrap} ${styles.navin}`}><button className={styles.brand} onClick={()=>go('home')} aria-label="Raj Delight home"><img className={styles.brandMark} src="/raj-delight-mark.svg" alt="Raj Delight"/><span className={styles.brandCopy}><b>Raj Delight</b><small>Chandausi</small></span></button><nav className={mobile?`${styles.links} ${styles.linksOpen}`:styles.links}>{['about','menu','gallery','contact'].map(id=><button key={id} onClick={()=>go(id)}>{id}</button>)}</nav><div className={styles.grow}/><a href={ZOMATO} target="_blank" rel="noreferrer" className={styles.navOrder}>Order online <Arrow/></a><button className={styles.burger} onClick={()=>setMobile(v=>!v)} aria-expanded={mobile} aria-label="Open navigation"><span/><span/></button></div></header>

    <section className={styles.hero} id="home"><SafeImage src={IMG.biryani} alt="Vegetable biryani dish visual" priority sizes="100vw" className={styles.heroImg}/><div className={styles.heroShade}/><div className={`${styles.wrap} ${styles.heroIn}`}><span className={styles.eyebrow}>Raj Delight · Chandausi</span><h1>A taste worth<br/><em>remembering.</em></h1><p>North Indian favourites, South Indian classics, Indo-Chinese plates, pizzas, pasta, desserts and refreshing drinks.</p><div className={styles.heroActions}><button className={styles.goldBtn} onClick={()=>go('menu')}>Explore menu <Arrow/></button><button className={styles.ghostBtn} onClick={()=>go('gallery')}>View gallery <Arrow/></button></div><div className={styles.stats}><div><strong>4.3</strong><span>Google rating</span></div><div><strong>{menuCategories.length}</strong><span>menu categories</span></div><div><strong>9:30 AM–12 AM</strong><span>hours shown online</span></div><div><strong>Veg</strong><span>restaurant</span></div></div></div><div className={styles.scrollHint}>Scroll <span/></div></section>

    <section className={styles.orderBand}><div className={styles.wrap}><div className={styles.orderIn}><div><span className={styles.eyebrow}>Delivery · takeaway</span><h2>Your favourites, one click away.</h2></div><div className={styles.orderGrid}><a href={ZOMATO} target="_blank" rel="noreferrer" className={`${styles.orderCard} ${styles.zomato}`}><strong>Zomato</strong><small>Restaurant listing · order online</small><span><Arrow/></span></a><a href={SWIGGY} target="_blank" rel="noreferrer" className={`${styles.orderCard} ${styles.swiggy}`}><strong>Swiggy</strong><small>Restaurant listing · order online</small><span><Arrow/></span></a><a href={PHONE} className={styles.orderCard}><strong>Call</strong><small>+91 79831 48985</small><span><Arrow/></span></a></div></div></div></section>

    <section id="about" data-reveal="about" className={`${styles.section} ${styles.reveal} ${revealed.about?styles.show:''}`}><div className={styles.wrap}><div className={styles.story}><button className={styles.storyPhoto} onClick={()=>setLightbox({src:IMG.interior,alt:'Raj Delight restaurant interior'})} aria-label="Open Raj Delight interior photo"><SafeImage src={IMG.interior} alt="Raj Delight restaurant interior" sizes="(max-width:900px) 100vw, 55vw"/><span className={styles.caption}>Public listing photo · tap to enlarge</span></button><div className={styles.storyCopy}><span className={styles.eyebrow}>The Raj Delight experience</span><h2 className={styles.sectionTitle}>A little bit of <em>everything.</em></h2><p>Raj Delight is publicly listed in Chandausi with vegetarian dining, indoor seating, takeaway, lunch, dinner and home delivery.</p><div className={styles.features}><div><b>01</b><span>Vegetarian menu</span></div><div><b>02</b><span>Indoor seating</span></div><div><b>03</b><span>Takeaway & delivery</span></div><div><b>04</b><span>Lunch & dinner</span></div></div></div></div></div></section>

    <section data-reveal="specials" className={`${styles.section} ${styles.specials} ${styles.reveal} ${revealed.specials?styles.show:''}`}><div className={styles.wrap}><div className={styles.heading}><div><span className={styles.eyebrow}>Must-try plates</span><h2 className={styles.sectionTitle}>Favourites worth <em>coming back for.</em></h2></div><button className={styles.textLink} onClick={()=>go('menu')}>View complete menu <Arrow/></button></div><div className={styles.specialGrid}>{specials.map(s=><article className={styles.special} key={s.name}><button className={styles.specialPhoto} onClick={()=>setLightbox({src:s.img,alt:`${s.name} dish visual`})} aria-label={`Open ${s.name} image`}><SafeImage src={s.img} alt={`${s.name} dish visual`} sizes="(max-width:760px) 84vw, 20vw"/><b className={styles.index}>{String(specials.indexOf(s)+1).padStart(2,'0')}</b></button><small>{s.note}</small><h3>{s.name}</h3><strong className={styles.price}>{PRICE[s.name]??'View live price'}</strong><button className={styles.view} onClick={()=>choose(s.cat)}>View in menu <Arrow/></button></article>)}</div></div></section>

    <section className={styles.menu} id="menu"><div className={styles.wrap}><div className={styles.menuHead}><div><span className={styles.eyebrow}>The complete menu</span><h2 className={styles.menuTitle}>Every flavour. <em>One place.</em></h2><p>{menuCategories.length} categories · {allMenuItems.length} listed dishes. Start with the visual chapters below, then open the exact category for every listed dish.</p></div><div className={styles.spend}><small>Public listing spend</small><b>₹200–₹400</b><span>average bill / person</span></div></div><div className={styles.menuTools}><label className={styles.search}><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search dishes or categories..." aria-label="Search dishes or categories"/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search">×</button>}</label><div className={styles.chips}>{['All','Indian Main Course','South Indian','Tandoori Station','Chinese Appetizers','Continental','Delicious Burger','Italian Pasta','Dessert'].map(c=><button key={c} className={active===c?styles.activeChip:''} onClick={()=>{setActive(c);setExpanded(c==='All'?null:c)}}>{c==='All'?'All dishes':c}</button>)}</div><div className={styles.select}><label htmlFor="rd-cat">Browse category</label><select id="rd-cat" value={active} onChange={e=>{setActive(e.target.value);setExpanded(e.target.value==='All'?null:e.target.value)}}><option value="All">All dishes</option>{menuCategories.map(c=><option key={c.name} value={c.name}>{c.name}</option>)}</select></div></div><div className={styles.menuMosaic} aria-label="Featured menu chapters">{featuredCategories.map((name,i)=><button key={name} className={styles.menuTile} onClick={()=>choose(name)}><SafeImage src={categoryVisuals[name]} alt={`${name} menu visual`} sizes="(max-width:700px) 50vw, 25vw"/><span className={styles.menuTileShade}/><b>{String(i+1).padStart(2,'0')}</b><div><small>{menuCategories.find(c=>c.name===name)?.items.length ?? 0} dishes</small><strong>{name}</strong><em>Explore ↗</em></div></button>)}</div><div className={styles.meta}><span>{filtered.length} dishes shown</span>{active!=='All'&&<button onClick={()=>{setActive('All');setExpanded(null)}}>Reset</button>}</div><div id="menu-items">{menuCategories.map((c,i)=>{const items=filtered.filter(x=>x.category===c.name);if(active!=='All'&&!items.length)return null;const open=expanded===c.name||(query.trim().length>0&&items.length>0);return <section className={styles.cat} key={c.name}><button className={styles.catHead} onClick={()=>setExpanded(open?null:c.name)} aria-expanded={open}><span>{String(i+1).padStart(2,'0')}</span><strong>{c.name}</strong><small>{c.items.length} items</small><b>{open?'−':'+'}</b></button>{open&&<div className={styles.catItems}>{items.map(item=><a href={ZOMATO} target="_blank" rel="noreferrer" key={`${item.category}-${item.name}`}><span>{pretty(item.name)}</span><small>{PRICE[item.name]??PRICE[pretty(item.name)]??'View live price'} <i>↗</i></small></a>)}</div>}</section>})}</div></div></section>

    <section className={styles.season}><button className={styles.seasonImg} onClick={()=>setLightbox({src:IMG.thali,alt:'Navratri Thali dish visual'})} aria-label="Open Navratri Thali image"><SafeImage src={IMG.thali} alt="Navratri Thali dish visual" sizes="(max-width:850px) 100vw, 55vw"/><span>Seasonal dish visual</span></button><div className={styles.seasonCopy}><span className={styles.eyebrow}>Seasonal selection</span><h2>Navratri <em>Thali.</em></h2><p>The public menu includes a dedicated Navratri Food section with a listed Navratri Thali.</p><button className={styles.goldBtn} onClick={()=>choose('Navratri Food')}>Explore Navratri food <Arrow/></button></div></section>

    <section className={`${styles.section} ${styles.gallery}`} id="gallery"><div className={styles.wrap}><div className={styles.heading}><div><span className={styles.eyebrow}>Visual journal</span><h2 className={styles.sectionTitle}>See the place. <em>Feel the mood.</em></h2></div><p className={styles.headingText}>Three verified public listing photos lead the gallery; the remaining tiles are editorial dish visuals so no blank or broken image states remain.</p></div><div className={styles.galleryGrid}>{gallery.map(g=><button key={`${g.src}-${g.alt}`} className={styles.galleryTile} onClick={()=>setLightbox({src:g.src,alt:g.alt})}><SafeImage src={g.src} alt={g.alt} sizes="(max-width:700px) 50vw, 33vw"/><span>{g.label}</span><strong>{g.alt}</strong></button>)}</div><a className={styles.galleryMore} href={MAPS} target="_blank" rel="noreferrer">View more public listing photos on Maps <Arrow/></a></div></section>

    <section className={styles.contact} id="contact"><div className={styles.wrap}><div className={styles.contactGrid}><div><span className={styles.eyebrow}>Visit · order · connect</span><h2>Come for the food. <em>Stay for the moment.</em></h2><p>15, Lathi Bazar, Ward 05, Chandausi Locality, Chandausi, Uttar Pradesh 244412.</p><div className={styles.contactActions}><a href={MAPS} target="_blank" rel="noreferrer" className={styles.goldBtn}>Get directions <Arrow/></a><a href={PHONE} className={styles.ghostBtn}>Call restaurant</a></div></div><div className={styles.contactCard}><div><small>Hours shown online</small><b>9:30 AM – 12:00 AM</b></div><div><small>Phone</small><b>+91 79831 48985</b></div><div><small>Food licence</small><b>12726074000015</b></div><a href={INSTAGRAM} target="_blank" rel="noreferrer" className={styles.instagram}><SocialIcon size={28}/><span>@raj_delight</span><b><Arrow/></b></a></div></div></div></section>

    <footer className={styles.footer}><div className={styles.wrap}><div className={styles.footerGrid}><div><div className={styles.footerBrand}><img className={styles.mark} src="/raj-delight-mark.svg" alt="Raj Delight"/><span><b>Raj Delight</b><small>Chandausi</small></span></div><p>Vegetarian dining in Chandausi.</p></div><div><small>Explore</small>{['home','about','menu','gallery','contact'].map(id=><button key={id} onClick={()=>go(id)}>{id}</button>)}</div><div><small>Order</small><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato ↗</a><a href={SWIGGY} target="_blank" rel="noreferrer">Swiggy ↗</a><a href={PHONE}>Call ↗</a></div><div><small>Social</small><a href={INSTAGRAM} target="_blank" rel="noreferrer"><SocialIcon size={16}/> @raj_delight</a></div></div><div className={styles.footBottom}><span>© {new Date().getFullYear()} Raj Delight</span><span>Public restaurant information · Chandausi</span></div></div></footer>
    <div className={styles.desktopOrder}><a href={ZOMATO} target="_blank" rel="noreferrer">Order online <Arrow/></a></div><nav className={styles.mobileActions}><button onClick={()=>go('menu')}>Menu</button><a href={ZOMATO} target="_blank" rel="noreferrer">Order</a><a href={PHONE}>Call</a><a href={MAPS} target="_blank" rel="noreferrer">Directions</a></nav>
    {lightbox!==null&&<div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Image viewer" onClick={()=>setLightbox(null)}><button className={styles.close} onClick={()=>setLightbox(null)} aria-label="Close">×</button><div className={styles.lightInner} onClick={e=>e.stopPropagation()}><SafeImage src={lightbox.src} alt={lightbox.alt} priority sizes="94vw"/><p>{lightbox.alt}</p></div></div>}
  </main>;
}
