import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowDown, ArrowRight, Compass, Menu, Mountain, Play, X, Waves, Utensils, Landmark, Palette, Instagram, Youtube, Facebook, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hunzaAsset from "@/assets/hunza.jpg.asset.json";
import lakeAsset from "@/assets/lake.jpg.asset.json";
import skarduAsset from "@/assets/skardu.jpg.asset.json";
import fairyAsset from "@/assets/fairy.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Discover Pakistan | Where Every Horizon Tells a Story" },
    { name: "description", content: "Explore Pakistan's legendary mountains, ancient civilizations, living culture, modern cities and Arabian Sea coast." },
    { property: "og:title", content: "Discover Pakistan | An Extraordinary Journey" },
    { property: "og:description", content: "Breathtaking landscapes, timeless heritage and unforgettable hospitality." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: DiscoverPakistan,
});

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;

const images = {
  hunza: hunzaAsset.url,
  lake: lakeAsset.url,
  skardu: commons("Skardu , Pakistan.jpg"),
  fairy: commons("Fairy Meadows, Pakistan.jpg"),
  swat: commons("Swat Valley - Pakistan.jpg"),
  lahore: commons("BADSHAHI MOSQUE LAHORE.jpg"),
  islamabad: commons("Faisal mosque islamabad.jpg"),
  karachi: commons("Karachi sea.jpg"),
  multan: commons("Shrine Shah Rukn-e-Alam.jpg"),
  mohenjo: commons("Mohenjodaro.jpg"),
  gwadar: commons("Gwadar, Balochistan.jpg"),
  deosai: commons("Deosai Pakistan.jpg"),
  cholistan: commons("Derawar Fort Cholistan.jpg"),
  peaks: skarduAsset.url,
  meadow: fairyAsset.url,
  coast: commons("Gwadar, Balochistan.jpg"),
  desert: commons("Cholistan pakistan.jpg"),
  culture: commons("BADSHAHI MOSQUE LAHORE.jpg"),
  food: lakeAsset.url,
};

const destinations = [
  ["Hunza Valley","Gilgit–Baltistan",images.hunza,"Turquoise waters, storied forts and the cathedral peaks of the Karakoram."],
  ["Skardu","Gilgit–Baltistan",images.skardu,"A sublime gateway to high mountains, alpine lakes and vast cold deserts."],
  ["Fairy Meadows","Gilgit–Baltistan",images.fairy,"Wildflower meadows beneath the immense, silent face of Nanga Parbat."],
  ["Swat Valley","Khyber Pakhtunkhwa",images.swat,"Emerald forests, crystalline rivers and timeless mountain villages."],
  ["Lahore","Punjab",images.lahore,"Mughal grandeur, legendary cuisine and a city alive with colour."],
  ["Islamabad","Federal Capital",images.islamabad,"Modern elegance framed by the green folds of the Margalla Hills."],
  ["Karachi","Sindh",images.karachi,"A restless coastal metropolis where commerce, culture and the sea meet."],
  ["Multan","Punjab",images.multan,"The City of Saints, wrapped in blue tilework and centuries of devotion."],
  ["Mohenjo-daro","Sindh",images.mohenjo,"Walk the remarkably planned streets of a 5,000-year-old civilization."],
  ["Gwadar","Balochistan",images.gwadar,"Sculpted headlands and luminous coves along the Makran Coast."],
  ["Deosai","Gilgit–Baltistan",images.deosai,"An endless high-altitude plain where sky, wildlife and silence prevail."],
  ["Cholistan Desert","Punjab",images.cholistan,"Golden dunes, nomadic traditions and the monumental Derawar Fort."],
] as const;

const regions = [
 ["Gilgit-Baltistan","The roof of the world","Hunza · Skardu · Deosai"], ["Azad Kashmir","Valleys of rivers and pine","Neelum · Rawalakot"],
 ["Punjab","The historic heartland","Lahore · Multan · Cholistan"], ["Sindh","Civilization beside the Indus","Karachi · Mohenjo-daro"],
 ["Khyber Pakhtunkhwa","Mountain passageways","Swat · Chitral · Peshawar"], ["Balochistan","The untamed frontier","Gwadar · Hingol · Quetta"],
 ["Islamabad","The green capital","Faisal Mosque · Margallas"],
] as const;

const regionImages = [
  images.hunza,
  images.fairy,
  images.lahore,
  images.mohenjo,
  images.swat,
  images.gwadar,
  images.islamabad,
] as const;

const experiences: ReadonlyArray<[ComponentType<{ className?: string }>, string, string]> = [
 [Mountain,"Mountain Adventures","Explore the Karakoram, Himalayas and Hindu Kush."],[Landmark,"Ancient Heritage","Discover civilizations thousands of years old."],[Utensils,"Pakistani Cuisine","Taste rich spices and dishes passed down through generations."],[Compass,"Architecture & History","Enter mosques, forts, shrines and Mughal masterpieces."],[Waves,"Coastal Escapes","Discover secluded beaches along the Arabian Sea."],[Palette,"Art & Culture","Meet music, crafts, traditions and generous hospitality."],
];

const cultureImages: ReadonlyArray<readonly [string, string]> = [[images.culture,"Traditional architecture"],[images.food,"A table made for sharing"],[images.lahore,"Mughal artistry"],[images.desert,"Desert traditions"],[images.city,"Modern expression"]];

function DiscoverPakistan() {
 const root = useRef<HTMLDivElement>(null); const [menu,setMenu]=useState(false); const [region,setRegion]=useState(0); const [lightbox,setLightbox]=useState<string|null>(null);
 useEffect(()=>{ let ctx:{revert:()=>void}|undefined; void import("gsap").then(({default:gsap})=>import("gsap/ScrollTrigger").then(({ScrollTrigger})=>{ gsap.registerPlugin(ScrollTrigger); ctx=gsap.context(()=>{
   gsap.from(".hero-reveal",{y:70,opacity:0,duration:1.25,stagger:.12,ease:"power3.out"});
   gsap.utils.toArray<HTMLElement>(".reveal").forEach(el=>gsap.from(el,{y:45,opacity:0,duration:.9,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 86%"}}));
   gsap.to(".hero-bg",{yPercent:18,ease:"none",scrollTrigger:{trigger:"#home",start:"top top",end:"bottom top",scrub:true}});
 },root)})); return()=>ctx?.revert(); },[]);
 const close=()=>{setMenu(false)};
 return <div ref={root} className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
  <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/40 backdrop-blur-xl">
   <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10"><a href="#home" className="font-display text-lg tracking-[.2em]">DISCOVER <span className="text-primary">PAKISTAN</span></a>
   <nav aria-label="Main navigation" className="hidden items-center gap-7 text-[11px] uppercase tracking-[.16em] text-muted-foreground lg:flex">{["Home","Destinations","Experiences","Culture","Heritage","Plan Your Journey"].map(n=><a className="transition-colors hover:text-primary" href={`#${n.toLowerCase().replaceAll(" ","-")}`} key={n}>{n}</a>)}</nav>
   <div className="hidden lg:block"><Button asChild variant="gold"><a href="#destinations">Explore now <ArrowRight/></a></Button></div><Button aria-label="Open menu" variant="ghost" size="icon" className="lg:hidden" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</Button></div>
   {menu&&<nav className="grid gap-5 border-t border-border bg-background p-6 lg:hidden">{["Home","Destinations","Experiences","Culture","Heritage","Plan Your Journey"].map(n=><a onClick={close} href={`#${n.toLowerCase().replaceAll(" ","-")}`} key={n}>{n}</a>)}</nav>}
  </header>
  <main>
   <section id="home" className="grain relative flex min-h-[96svh] items-end overflow-hidden pb-20 pt-32">
    <img className="hero-bg cinematic-image absolute -inset-y-[18%] h-[136%] w-full object-cover" src={images.hunza} alt="Passu Cones rising above Hunza Valley" fetchPriority="high"/>
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/20"/><div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent"/>
    <div className="relative mx-auto w-full max-w-[1500px] px-5 lg:px-10"><p className="hero-reveal mb-5 text-xs uppercase tracking-[.4em] text-primary">The land of extraordinary</p><h1 className="hero-reveal font-display text-[clamp(4.8rem,14vw,13rem)] leading-[.73] tracking-normal">PAKISTAN</h1><h2 className="hero-reveal mt-6 font-display text-3xl italic md:text-6xl">Where Every Horizon Tells a Story.</h2><p className="hero-reveal mt-7 max-w-2xl text-sm leading-7 text-foreground/75 md:text-base">From the world's highest mountains to ancient civilizations, from vibrant cities to untouched coastlines — discover a land of extraordinary beauty.</p><div className="hero-reveal mt-9 flex flex-wrap gap-3"><Button asChild size="lg" variant="gold"><a href="#destinations">Explore Pakistan <ArrowRight/></a></Button><Button asChild size="lg" variant="glass"><a href="#cinematic"><Play/> Watch the journey</a></Button></div></div>
    <a aria-label="Scroll to destinations" href="#destinations" className="absolute bottom-7 right-7 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[.3em] text-muted-foreground md:right-12"><span>Scroll</span><ArrowDown className="h-4 w-4 text-primary"/></a>
   </section>

   <section id="destinations" className="px-5 py-24 lg:px-10 lg:py-36"><div className="reveal mx-auto mb-14 flex max-w-[1500px] flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-4 text-xs uppercase tracking-[.3em] text-primary">Twelve remarkable worlds</p><h2 className="font-display text-5xl md:text-7xl">Choose your horizon.</h2></div><p className="max-w-md text-sm leading-7 text-muted-foreground">Journey from glacial valleys to old cities, from the high plateau to the Arabian Sea.</p></div>
   <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{destinations.map(([name,loc,img,desc],i)=><article className={`reveal group relative overflow-hidden rounded-lg ${i===0||i===7?"md:col-span-2 lg:col-span-2":""} h-[480px]`} key={name}><img loading="lazy" className="cinematic-image absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" src={img} alt={`${name}, ${loc}`}/><div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-7 lg:p-9"><p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[.25em] text-primary"><MapPin className="h-3 w-3"/>{loc}</p><h3 className="font-display text-4xl">{name}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-foreground/70">{desc}</p><a href="#plan-your-journey" className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-primary">Discover more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></a></div></article>)}</div></section>

   <section className="border-y border-border bg-card/40 px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.9fr_1.1fr]"><div className="reveal"><p className="mb-4 text-xs uppercase tracking-[.3em] text-primary">Explore the regions</p><h2 className="font-display text-5xl md:text-7xl">One Country.<br/><span className="italic text-primary">A Thousand Worlds.</span></h2><div className="mt-10 border-t border-border">{regions.map((r,i)=><button onMouseEnter={()=>setRegion(i)} onClick={()=>setRegion(i)} className={`flex w-full items-center justify-between border-b border-border py-4 text-left transition-colors ${region===i?"text-primary":"text-muted-foreground hover:text-foreground"}`} key={r[0]}><span>{String(i+1).padStart(2,"0")} &nbsp; {r[0]}</span><ChevronRight className="h-4 w-4"/></button>)}</div></div><div className="reveal relative min-h-[600px] overflow-hidden rounded-lg"><img className="cinematic-image absolute inset-0 h-full w-full object-cover transition-all duration-700" src={regionImages[region] ?? images.hunza} alt={regions[region]?.[0] ?? "Pakistan region"}/><div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"/><div className="absolute bottom-0 p-8"><p className="text-xs uppercase tracking-[.25em] text-primary">{regions[region]?.[1] ?? "Discover Pakistan"}</p><h3 className="mt-2 font-display text-5xl">{regions[region]?.[0] ?? "Pakistan"}</h3><p className="mt-3 text-muted-foreground">{regions[region]?.[2] ?? "Explore remarkable destinations"}</p></div></div></div></section>

   <section id="experiences" className="px-5 py-24 lg:px-10 lg:py-36"><div className="reveal mx-auto max-w-[1500px]"><p className="text-xs uppercase tracking-[.3em] text-primary">Curated experiences</p><h2 className="mt-4 max-w-4xl font-display text-5xl md:text-7xl">Experience Pakistan<br/><span className="italic">Beyond the Ordinary.</span></h2></div><div className="mx-auto mt-14 grid max-w-[1500px] gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{experiences.map(([Icon,title,text])=><article className="reveal group bg-card p-8 transition-colors hover:bg-secondary/70 lg:p-10" key={title}><Icon className="mb-12 h-7 w-7 text-primary"/><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p><ArrowRight className="mt-7 h-5 w-5 text-primary transition-transform group-hover:translate-x-2"/></article>)}</div></section>

   <section id="culture" className="bg-foreground px-5 py-24 text-background lg:px-10 lg:py-32"><div className="mx-auto max-w-[1500px]"><div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[.3em] text-accent">A living tapestry</p><h2 className="mt-4 font-display text-5xl md:text-7xl">A Culture Written<br/><span className="italic">in Colour.</span></h2></div><p className="max-w-md text-sm leading-7 opacity-65">Every province speaks in its own textiles, rhythms, recipes and rituals — united by an instinctive warmth.</p></div><div className="mt-14 grid h-[700px] grid-cols-2 grid-rows-3 gap-3 md:grid-cols-4 md:grid-rows-2">{cultureImages.map(([src,cap],i)=><figure onClick={()=>setLightbox(src)} className={`group relative cursor-zoom-in overflow-hidden rounded-lg ${i===0?"row-span-2 md:col-span-2":""}`} key={cap}><img loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={src} alt={cap}/><figcaption className="absolute bottom-0 p-5 text-xs uppercase tracking-[.18em] text-foreground opacity-0 transition-opacity group-hover:opacity-100">{cap}</figcaption></figure>)}</div><blockquote className="reveal mx-auto my-28 max-w-5xl text-center font-display text-4xl italic leading-tight md:text-7xl">“Pakistan is not just a destination. It is a feeling waiting to be discovered.”</blockquote></div></section>

   <section id="heritage" className="overflow-hidden px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1500px]"><p className="reveal text-xs uppercase tracking-[.3em] text-primary">Five millennia in motion</p><h2 className="reveal mt-4 font-display text-5xl md:text-7xl">Walk Through Time.</h2><div className="mt-14 flex snap-x gap-4 overflow-x-auto pb-7">{[["2600 BCE","Indus Valley Civilization"],["2500 BCE","Mohenjo-daro"],["600 BCE","Taxila"],["1526","Mughal Empire"],["1566","Lahore Fort"],["1673","Badshahi Mosque"],["1541","Rohtas Fort"],["14th C.","Makli Necropolis"]].map(([year,name],i)=><article className="group relative h-[460px] min-w-[310px] snap-center overflow-hidden rounded-lg md:min-w-[390px]" key={name}><img className="cinematic-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={i%3===0?images.desert:i%3===1?images.lahore:images.culture} alt={name}/><div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"/><div className="absolute bottom-0 p-7"><p className="text-xs tracking-[.25em] text-primary">{year}</p><h3 className="mt-2 font-display text-3xl">{name}</h3></div></article>)}</div></div></section>

   <section id="cinematic" className="grain relative flex min-h-[90svh] items-center justify-center overflow-hidden"><img className="cinematic-image absolute inset-0 h-full w-full scale-105 object-cover" src={images.peaks} alt="Dramatic mountain landscape"/><div className="absolute inset-0 bg-background/45"/><h2 className="reveal relative text-center font-display text-6xl md:text-9xl">See Pakistan<br/><span className="italic text-primary">Differently.</span></h2></section>

   <section className="border-y border-border bg-card/30 px-5 py-20 lg:px-10"><div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-4">{[["8,000m+","World's highest peaks"],["5,000+ Years","Of ancient history"],["700+ km","Arabian Sea coastline"],["Every Terrain","Mountain, desert, forest & sea"]].map(([n,l])=><div className="reveal border-l border-primary pl-6" key={n}><p className="font-display text-4xl text-primary md:text-5xl">{n}</p><p className="mt-3 text-sm text-muted-foreground">{l}</p></div>)}</div></section>

   <section className="px-5 py-24 lg:px-10 lg:py-32"><div className="reveal mx-auto mb-14 max-w-[1500px] text-center"><p className="text-xs uppercase tracking-[.3em] text-primary">A visual journey</p><h2 className="mt-4 font-display text-5xl md:text-7xl">Infinite Pakistan.</h2></div><div className="mx-auto columns-1 gap-3 space-y-3 md:columns-2 lg:columns-3 max-w-[1500px]">{[...destinations.slice(0,9)].map(([name,,img],i)=><figure onClick={()=>setLightbox(img)} className="reveal group relative cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg" key={`${name}-gallery`}><img loading="lazy" className={`cinematic-image w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i%3===0?"h-[520px]":"h-[340px]"}`} src={img} alt={name}/><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background p-6 pt-20 font-display text-2xl opacity-0 transition-opacity group-hover:opacity-100">{name}</figcaption></figure>)}</div></section>

   <section id="plan-your-journey" className="relative flex min-h-[75svh] items-center px-5 py-24 lg:px-10"><img className="cinematic-image absolute inset-0 h-full w-full object-cover" src={images.lake} alt="Boat crossing Attabad Lake"/><div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-transparent"/><div className="reveal relative mx-auto w-full max-w-[1500px]"><p className="text-xs uppercase tracking-[.3em] text-primary">The horizon is calling</p><h2 className="mt-5 max-w-4xl font-display text-5xl md:text-8xl">Your Journey Into Pakistan Begins Here.</h2><p className="mt-6 max-w-xl leading-7 text-foreground/75">Discover breathtaking landscapes, timeless history, unforgettable culture and the warmth of a nation unlike any other.</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" variant="gold"><a href="#home">Start exploring <ArrowRight/></a></Button><Button asChild size="lg" variant="glass"><a href="#destinations">Discover destinations</a></Button></div></div></section>
  </main>
  <footer className="border-t border-border px-5 py-16 lg:px-10"><div className="mx-auto max-w-[1500px]"><div className="flex flex-col justify-between gap-10 md:flex-row"><div><p className="font-display text-2xl tracking-[.15em]">DISCOVER <span className="text-primary">PAKISTAN</span></p><p className="mt-3 font-display italic text-muted-foreground">Where Every Horizon Tells a Story.</p></div><div className="flex flex-wrap gap-x-8 gap-y-4 text-xs uppercase tracking-[.16em] text-muted-foreground">{["Explore","Destinations","Experiences","Culture","Heritage","About Pakistan","Contact"].map(x=><a className="hover:text-primary" href={x==="Explore"?"#home":`#${x.toLowerCase().replace(" ","-")}`} key={x}>{x}</a>)}</div></div><div className="mt-16 flex flex-col justify-between gap-5 border-t border-border pt-7 text-xs text-muted-foreground md:flex-row"><p>© 2026 Discover Pakistan. Celebrating the beauty, heritage and diversity of Pakistan.</p><div className="flex gap-4"><a href="https://instagram.com" aria-label="Instagram"><Instagram/></a><a href="https://youtube.com" aria-label="YouTube"><Youtube/></a><a href="https://facebook.com" aria-label="Facebook"><Facebook/></a></div></div></div></footer>
  {lightbox&&<div role="dialog" aria-modal="true" onClick={()=>setLightbox(null)} className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-background/95 p-5 backdrop-blur-xl"><Button aria-label="Close image" size="icon" variant="glass" className="absolute right-5 top-5" onClick={()=>setLightbox(null)}><X/></Button><img className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain" src={lightbox} alt="Pakistan gallery enlarged view"/></div>}
 </div>
}