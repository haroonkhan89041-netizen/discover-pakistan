import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  ArrowDown, ArrowRight, Compass, Menu, Mountain, Play, X, Waves, Utensils,
  Landmark, Palette, MapPin, ChevronRight, Search, Mail, Clock, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Discover Pakistan | Where Every Horizon Tells a Story" },
      { name: "description", content: "Explore Pakistan's legendary mountains, ancient civilizations, living culture, modern cities and Arabian Sea coast." },
      { name: "keywords", content: "Pakistan travel, Pakistan tourism, Hunza, Skardu, Lahore, Islamabad, Swat, Mohenjo-daro, Gwadar, travel guide" },
      { property: "og:title", content: "Discover Pakistan | An Extraordinary Journey" },
      { property: "og:description", content: "Breathtaking landscapes, timeless heritage and unforgettable hospitality." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiscoverPakistan,
});

const images = {
  // Location-specific editorial imagery: each destination gets a visual matching its identity.
  hunza: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Hunza_Valley%2C_Pakistan.jpg/1280px-Hunza_Valley%2C_Pakistan.jpg",
  lake: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Attabad_Lake%2C_Hunza_Pakistan.jpg/1600px-Attabad_Lake%2C_Hunza_Pakistan.jpg",
  skardu: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Skardu_%2C_Pakistan.jpg/1280px-Skardu_%2C_Pakistan.jpg",
  fairy: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Nanga_Parbat_from_Fairy_Meadow.jpg/1280px-Nanga_Parbat_from_Fairy_Meadow.jpg",
  swat: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Mountains_in_Swat_Valley1.jpg/1280px-Mountains_in_Swat_Valley1.jpg",
  lahore: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Badshahi_Mosque%2C_Lahore..JPG",
  lahoreFort: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Lahore_Fort_Punjab.jpg/1280px-Lahore_Fort_Punjab.jpg",
  badshahi: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Badshahi_Mosque%2C_Lahore..JPG",
  islamabad: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Faisal_Mosque_islamabad_07.jpg/1280px-Faisal_Mosque_islamabad_07.jpg",
  karachi: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/PK_Karachi_asv2020-02_img13_Clifton_Beach.jpg/1200px-PK_Karachi_asv2020-02_img13_Clifton_Beach.jpg",
  multan: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Shah_Rukn-e-Alam_Shrine.jpg/1280px-Shah_Rukn-e-Alam_Shrine.jpg",
  mohenjo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Panoramic_view_of_the_stupa_mound_and_great_bath_in_Mohenjodaro.JPG/1280px-Panoramic_view_of_the_stupa_mound_and_great_bath_in_Mohenjodaro.JPG",
  gwadar: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Gwadar%2C_Balochistan.jpg",
  deosai: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Unnamed_lake_Deosai_plain%2C_just_beneath_the_Burji_La_Pass.jpg/1280px-Unnamed_lake_Deosai_plain%2C_just_beneath_the_Burji_La_Pass.jpg",
  cholistan: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Derawar_Fort%2C_Cholistan_Desert%2C_Pakistan.jpg/1280px-Derawar_Fort%2C_Cholistan_Desert%2C_Pakistan.jpg",
  taxila: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Dharmarajika_stupa_and_monastery_c_by_Usman_Ghani.jpg/1280px-Dharmarajika_stupa_and_monastery_c_by_Usman_Ghani.jpg",
  makli: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/PK_Thatta_asv2020-02_img25_Makli_Necropolis.jpg/1280px-PK_Thatta_asv2020-02_img25_Makli_Necropolis.jpg",
  rohtas: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Fort_Rohtas.jpg/1280px-Fort_Rohtas.jpg",
  shahRukn: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tomb_of_Shah_Rukn-e-Alam%2C_Multan_-_Front_Courtyard.jpg/1280px-Tomb_of_Shah_Rukn-e-Alam%2C_Multan_-_Front_Courtyard.jpg",
  peaks: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Attabad_Lake%2C_Hunza_Pakistan.jpg/1600px-Attabad_Lake%2C_Hunza_Pakistan.jpg",
  desert: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Derawar_Fort%2C_Cholistan_Desert%2C_Pakistan.jpg/1600px-Derawar_Fort%2C_Cholistan_Desert%2C_Pakistan.jpg",
};

const destinations = [
  ["Hunza Valley","Gilgit-Baltistan",images.hunza,"Turquoise waters, storied forts and the cathedral peaks of the Karakoram."],
  ["Skardu","Gilgit-Baltistan",images.skardu,"A sublime gateway to high mountains, alpine lakes, and vast cold deserts."],
  ["Fairy Meadows","Gilgit-Baltistan",images.fairy,"Wildflower meadows beneath the immense, silent face of Nanga Parbat."],
  ["Swat Valley","Khyber Pakhtunkhwa",images.swat,"Emerald forests, crystalline rivers, and timeless mountain villages."],
  ["Lahore","Punjab",images.lahore,"Mughal grandeur, legendary cuisine, and a city alive with colour."],
  ["Islamabad","Islamabad Capital Territory",images.islamabad,"Modern elegance framed by the green folds of the Margalla Hills."],
  ["Karachi","Sindh",images.karachi,"A coastal metropolis where commerce, culture, and the sea meet."],
  ["Multan","Punjab",images.shahRukn,"The City of Saints, wrapped in blue tilework and centuries of history."],
  ["Mohenjo-daro","Sindh",images.mohenjo,"Walk the remarkably planned streets of a 5,000-year-old civilization."],
  ["Gwadar","Balochistan",images.gwadar,"Sculpted headlands and luminous coves along the Makran Coast."],
  ["Deosai","Gilgit-Baltistan",images.deosai,"An immense high-altitude plain where sky, wildlife, and silence prevail."],
  ["Cholistan Desert","Punjab",images.cholistan,"Golden dunes, desert traditions, and the monumental Derawar Fort."],
] as const;

const regions = [
  ["Gilgit-Baltistan","The roof of the world","Hunza · Skardu · Deosai"],
  ["Azad Kashmir","Valleys of rivers and pine","Neelum · Keran · Sharda"],
  ["Punjab","The historic heartland","Lahore · Multan · Cholistan"],
  ["Sindh","Civilization beside the Indus","Karachi · Mohenjo-daro"],
  ["Khyber Pakhtunkhwa","Mountain passageways","Swat · Chitral · Peshawar"],
  ["Balochistan","The untamed frontier","Gwadar · Hingol · Quetta"],
  ["Islamabad","The green capital","Faisal Mosque · Margallas"],
] as const;

const regionImages = [
  images.hunza, "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Azad_Kashmir_-_Neelum_Valley.jpg/1280px-Azad_Kashmir_-_Neelum_Valley.jpg", images.lahore, images.mohenjo,
  images.swat, images.gwadar, images.islamabad,
] as const;

const experiences: ReadonlyArray<[ComponentType<{ className?: string }>, string, string, string]> = [
  [Mountain,"Mountain Adventures","Explore the Karakoram, Himalayas and Hindu Kush.","destinations"],
  [Landmark,"Ancient Heritage","Discover civilizations thousands of years old.","heritage"],
  [Utensils,"Pakistani Cuisine","Taste regional dishes, spices and traditions passed down through generations.","culture"],
  [Compass,"Architecture & History","Enter mosques, forts, shrines and Mughal masterpieces.","heritage"],
  [Waves,"Coastal Escapes","Discover beaches, headlands and fishing communities along the Arabian Sea.","destinations"],
  [Palette,"Art & Culture","Meet music, crafts, textiles, traditions and generous hospitality.","culture"],
];

const cultureImages: ReadonlyArray<readonly [string, string]> = [
  [images.lahoreFort,"Lahore Fort, Lahore"],
  [images.hunza,"Hunza mountain culture"],
  [images.mohenjo,"Mohenjo-daro heritage"],
  [images.cholistan,"Cholistan desert traditions"],
  [images.karachi,"Karachi coastal life"],
];

const heritage = [
  ["c. 2600 BCE","Indus Valley Civilization",images.mohenjo],
  ["c. 2500 BCE","Mohenjo-daro",images.mohenjo],
  ["c. 600 BCE","Taxila",images.taxila],
  ["14th C.","Makli Necropolis",images.makli],
  ["1526","Mughal Empire",images.lahore],
  ["1541","Rohtas Fort",images.rohtas],
  ["1566","Lahore Fort",images.lahoreFort],
  ["1673","Badshahi Mosque",images.badshahi],
] as const;

function DiscoverPakistan() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [region, setRegion] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<(typeof destinations)[number] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightbox(null); setSelectedDestination(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const locked = Boolean(lightbox || selectedDestination);
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox, selectedDestination]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void import("gsap").then(({ default: gsap }) =>
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from(".hero-reveal", { y: 70, opacity: 0, duration: 1.25, stagger: .12, ease: "power3.out" });
          gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
            gsap.from(el, { y: 45, opacity: 0, duration: .9, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 86%" } })
          );
          gsap.to(".hero-bg", { yPercent: 18, ease: "none",
            scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true } });
        }, root);
      })
    );
    return () => ctx?.revert();
  }, []);

  const filtered = destinations.filter(([name, loc, , desc]) =>
    `${name} ${loc} ${desc}`.toLowerCase().includes(query.toLowerCase())
  );
  const close = () => setMenu(false);

  return (
    <div ref={root} className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/55 shadow-[0_10px_40px_oklch(0_0_0/12%)] backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10">
          <a href="#home" aria-label="Discover Pakistan home" className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <img src="/discover-pakistan-logo.svg" alt="Discover Pakistan" className="h-12 w-auto" />
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-[11px] uppercase tracking-[.16em] text-muted-foreground lg:flex">
            {["Home","Destinations","Experiences","Culture","Heritage","About","Contact"].map((n) => (
              <a className="transition-colors hover:text-primary" href={`#${n.toLowerCase().replaceAll(" ","-")}`} key={n}>{n}</a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button asChild variant="gold"><a href="#destinations">Explore now <ArrowRight /></a></Button>
          </div>
          <Button aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="mobile-navigation"
            variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
        {menu && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="grid gap-5 border-t border-border bg-background p-6 lg:hidden">
            {["Home","Destinations","Experiences","Culture","Heritage","About","Contact"].map((n) => (
              <a onClick={close} href={`#${n.toLowerCase().replaceAll(" ","-")}`} key={n}>{n}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="grain relative flex min-h-[96svh] items-end overflow-hidden pb-20 pt-32">
          <img className="hero-bg cinematic-image absolute -inset-y-[18%] h-[136%] w-full object-cover scale-[1.03]" src={images.hunza}
            alt="Pakistan mountain landscape" fetchPriority="high" onError={(e) => { const img = e.currentTarget; img.style.opacity = "0"; img.style.background = "linear-gradient(135deg, oklch(.17 .03 165), oklch(.08 .02 165))"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
          <div className="relative mx-auto w-full max-w-[1500px] px-5 lg:px-10">
            <p className="hero-reveal mb-5 text-xs uppercase tracking-[.4em] text-primary">The land of extraordinary</p>
            <h1 className="hero-reveal font-display text-[clamp(4.8rem,14vw,13rem)] leading-[.73] tracking-normal">PAKISTAN</h1>
            <h2 className="hero-reveal mt-6 max-w-4xl font-display text-3xl italic leading-[1.08] md:text-6xl">Where Every Horizon Tells a Story.</h2>
            <p className="hero-reveal mt-7 max-w-2xl text-sm leading-7 text-foreground/75 md:text-base">
              From some of the world’s highest mountains to ancient civilizations, vibrant cities, and dramatic coastlines — discover a land of extraordinary beauty.
            </p>
            <div className="hero-reveal mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="gold"><a href="#destinations">Explore Pakistan <ArrowRight /></a></Button>
              <Button asChild size="lg" variant="glass"><a href="#cinematic"><Play /> Watch the journey</a></Button>
            </div>
          </div>
          <a aria-label="Scroll to destinations" href="#destinations" className="absolute bottom-7 right-7 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[.3em] text-muted-foreground md:right-12">
            <span>Scroll</span><ArrowDown className="h-4 w-4 text-primary" />
          </a>
        </section>

        <section id="destinations" className="px-5 py-24 lg:px-10 lg:py-36 text-center">
          <div className="reveal mx-auto mb-14 flex max-w-[1500px] flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[.3em] text-primary">Twelve remarkable worlds</p>
              <h2 className="font-display text-5xl md:text-7xl">Choose your horizon.</h2>
            </div>
            <div className="w-full max-w-md">
              <p className="mb-3 text-sm leading-7 text-muted-foreground">Search destinations by name, region or experience.</p>
              <label className="flex items-center gap-3 rounded-md border border-border bg-card/60 px-4 py-3 focus-within:border-primary">
                <Search className="h-4 w-4 text-primary" />
                <input aria-label="Search destinations" value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Pakistan..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </label>
            </div>
          </div>
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(([name,loc,img,desc], i) => (
              <article className={`reveal premium-hover group relative h-[480px] overflow-hidden rounded-lg border border-border/50 bg-card/40 shadow-[0_20px_60px_oklch(0_0_0/16%)] ${i===0||i===7 ? "md:col-span-2 lg:col-span-2" : ""}`} key={name}>
                <img loading="lazy" className="cinematic-image absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={img} alt={`${name}, ${loc}`} onError={(e) => { const img = e.currentTarget; img.style.opacity = "0"; img.style.background = "linear-gradient(135deg, oklch(.17 .03 165), oklch(.08 .02 165))"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                  <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[.25em] text-primary"><MapPin className="h-3 w-3" />{loc}</p>
                  <h3 className="font-display text-4xl">{name}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/70">{desc}</p>
                  <button onClick={() => setSelectedDestination([name,loc,img,desc])}
                    className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-primary hover:text-foreground">
                    Discover details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <p className="mx-auto mt-8 max-w-[1500px] text-sm text-muted-foreground">No destination matched your search. Try “Hunza”, “Punjab”, or “mountain”.</p>}
        </section>

        <section className="border-y border-border bg-card/40 px-5 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.9fr_1.1fr]">
            <div className="reveal">
              <p className="mb-4 text-xs uppercase tracking-[.3em] text-primary">Explore the regions</p>
              <h2 className="font-display text-5xl md:text-7xl">One Country.<br /><span className="italic text-primary">A Thousand Worlds.</span></h2>
              <div className="mt-10 border-t border-border">
                {regions.map((r,i) => (
                  <button onMouseEnter={() => setRegion(i)} onClick={() => setRegion(i)}
                    className={`flex w-full items-center justify-between border-b border-border py-4 text-center transition-colors ${region===i ? "text-primary" : "text-muted-foreground hover:text-foreground"}`} key={r[0]}>
                    <span>{String(i+1).padStart(2,"0")} &nbsp; {r[0]}</span><ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
            <div className="reveal relative min-h-[600px] overflow-hidden rounded-lg">
              <img className="cinematic-image absolute inset-0 h-full w-full object-cover transition-all duration-700"
                src={regionImages[region]} alt={regions[region]?.[0] ?? "Pakistan region"} onError={(e) => { const img = e.currentTarget; img.style.opacity = "0"; img.style.background = "linear-gradient(135deg, oklch(.17 .03 165), oklch(.08 .02 165))"; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 p-8">
                <p className="text-xs uppercase tracking-[.25em] text-primary">{regions[region]?.[1]}</p>
                <h3 className="mt-2 font-display text-5xl">{regions[region]?.[0]}</h3>
                <p className="mt-3 text-muted-foreground">{regions[region]?.[2]}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="experiences" className="px-5 py-24 lg:px-10 lg:py-36 text-center">
          <div className="reveal mx-auto max-w-[1500px]">
            <p className="text-xs uppercase tracking-[.3em] text-primary">Curated experiences</p>
            <h2 className="mt-4 max-w-4xl font-display text-5xl md:text-7xl">Experience Pakistan<br /><span className="italic">Beyond the Ordinary.</span></h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-[1500px] gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {experiences.map(([Icon,title,text,target]) => (
              <article className="reveal group bg-card p-8 transition-colors hover:bg-secondary/70 lg:p-10" key={title}>
                <Icon className="mb-12 h-7 w-7 text-primary" />
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
                <a href={`#${target}`} className="mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-primary">Explore this experience <ArrowRight className="h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="culture" className="bg-foreground px-5 py-24 text-background lg:px-10 lg:py-32 text-center">
          <div className="mx-auto max-w-[1500px]">
            <div className="reveal flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end">
              <div><p className="text-xs uppercase tracking-[.3em] text-accent">A living tapestry</p><h2 className="mt-4 font-display text-5xl md:text-7xl">A Culture Written<br /><span className="italic">in Colour.</span></h2></div>
              <p className="max-w-md text-sm leading-7 opacity-65">Every province speaks in its own textiles, rhythms, recipes and rituals — united by an instinctive warmth.</p>
            </div>
            <div className="mt-14 grid h-[700px] grid-cols-2 grid-rows-3 gap-3 md:grid-cols-4 md:grid-rows-2">
              {cultureImages.map(([src,cap],i) => (
                <figure role="button" tabIndex={0} aria-label={`Enlarge ${cap}`} onClick={() => setLightbox(src)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightbox(src); } }}
                  className={`group relative cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${i===0 ? "row-span-2 md:col-span-2" : ""}`} key={cap}>
                  <img loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={src} alt={cap} onError={(e) => { const img = e.currentTarget; img.style.opacity = "0"; img.style.background = "linear-gradient(135deg, oklch(.17 .03 165), oklch(.08 .02 165))"; }} />
                  <figcaption className="absolute bottom-0 p-5 text-xs uppercase tracking-[.18em] opacity-0 transition-opacity group-hover:opacity-100">{cap}</figcaption>
                </figure>
              ))}
            </div>
            <blockquote className="reveal mx-auto my-28 max-w-5xl text-center font-display text-4xl italic leading-tight md:text-7xl">“Pakistan is not just a destination. It is a feeling waiting to be discovered.”</blockquote>
          </div>
        </section>

        <section id="heritage" className="overflow-hidden px-5 py-24 lg:px-10 lg:py-32 text-center">
          <div className="mx-auto max-w-[1500px]">
            <p className="reveal text-xs uppercase tracking-[.3em] text-primary">Five millennia in motion</p>
            <h2 className="reveal mt-4 font-display text-5xl md:text-7xl">Walk Through Time.</h2>
            <div className="mt-14 flex snap-x gap-4 overflow-x-auto pb-7">
              {heritage.map(([year,name,img]) => (
                <article className="group relative h-[460px] min-w-[310px] snap-center overflow-hidden rounded-lg md:min-w-[390px]" key={name}>
                  <img className="cinematic-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={name} loading="lazy" onError={(e) => { const img = e.currentTarget; img.style.opacity = "0"; img.style.background = "linear-gradient(135deg, oklch(.17 .03 165), oklch(.08 .02 165))"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-7"><p className="text-xs tracking-[.25em] text-primary">{year}</p><h3 className="mt-2 font-display text-3xl">{name}</h3></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cinematic" className="grain relative flex min-h-[90svh] items-center justify-center overflow-hidden">
          <img className="cinematic-image absolute inset-0 h-full w-full scale-105 object-cover" src={images.peaks} alt="Dramatic mountain landscape" loading="lazy" onError={(e) => { const img = e.currentTarget; img.style.opacity = "0"; img.style.background = "linear-gradient(135deg, oklch(.17 .03 165), oklch(.08 .02 165))"; }} />
          <div className="absolute inset-0 bg-background/45" />
          <h2 className="reveal relative text-center font-display text-6xl md:text-9xl">See Pakistan<br /><span className="italic text-primary">Differently.</span></h2>
        </section>

        <section className="border-y border-border bg-card/30 px-5 py-20 lg:px-10">
          <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-4">
            {[[">8,000m","Pakistan's highest peaks"],["5,000+ Years","Of ancient history"],["1,046 km","Arabian Sea coastline"],["Every Terrain","Mountain, desert, forest & sea"]].map(([n,l]) => (
              <div className="reveal border-l border-primary pl-6" key={n}><p className="font-display text-4xl text-primary md:text-5xl">{n}</p><p className="mt-3 text-sm text-muted-foreground">{l}</p></div>
            ))}
          </div>
        </section>

        <section className="px-5 py-24 lg:px-10 lg:py-32">
          <div className="reveal mx-auto mb-14 max-w-[1500px] text-center"><p className="text-xs uppercase tracking-[.3em] text-primary">A visual journey</p><h2 className="mt-4 font-display text-5xl md:text-7xl">Infinite Pakistan.</h2></div>
          <div className="mx-auto columns-1 gap-3 space-y-3 md:columns-2 lg:columns-3 max-w-[1500px]">
            {destinations.slice(0,9).map(([name,,img],i) => (
              <figure role="button" tabIndex={0} aria-label={`Enlarge ${name} image`} onClick={() => setLightbox(img)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightbox(img); } }}
                className="reveal premium-hover group relative cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" key={`${name}-gallery`}>
                <img loading="lazy" className={`cinematic-image w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i%3===0 ? "h-[520px]" : "h-[340px]"}`} src={img} alt={name} />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background p-6 pt-20 font-display text-2xl opacity-0 transition-opacity group-hover:opacity-100">{name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="plan-your-journey" className="relative flex min-h-[75svh] items-center px-5 py-24 lg:px-10">
          <img className="cinematic-image absolute inset-0 h-full w-full object-cover" src={images.lake} alt="Pakistan mountain lake landscape" loading="lazy" onError={(e) => { const img = e.currentTarget; img.style.opacity = "0"; img.style.background = "linear-gradient(135deg, oklch(.17 .03 165), oklch(.08 .02 165))"; }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-transparent" />
          <div className="reveal relative mx-auto w-full max-w-[1500px]">
            <p className="text-xs uppercase tracking-[.3em] text-primary">The horizon is calling</p>
            <h2 className="mt-5 max-w-4xl font-display text-5xl md:text-8xl">Your Journey Into Pakistan Begins Here.</h2>
            <p className="mt-6 max-w-xl leading-7 text-foreground/75">Discover breathtaking landscapes, timeless history, unforgettable culture and the warmth of a nation unlike any other.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="gold"><a href="#destinations">Start exploring <ArrowRight /></a></Button>
              <Button asChild size="lg" variant="glass"><a href="#contact">Plan with us <Mail /></a></Button>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-border bg-card/30 px-5 py-24 lg:px-10 lg:py-32 text-center">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[.3em] text-primary">About Discover Pakistan</p>
              <h2 className="mt-4 font-display text-5xl md:text-7xl">A gateway to a country of contrasts.</h2>
              <p className="mt-7 max-w-2xl text-sm leading-8 text-muted-foreground">Discover Pakistan is a visual travel guide built to make the country's landscapes, heritage, cities and living culture easier to explore from anywhere.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[["Curated","Destinations selected for visual discovery"],["Local spirit","Culture, history and places in one journey"],["Always exploring","A growing guide to remarkable horizons"]].map(([a,b]) => (
                <div className="reveal rounded-lg border border-border bg-background/40 p-6" key={a}><ShieldCheck className="mb-5 h-5 w-5 text-primary" /><h3 className="font-display text-2xl">{a}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{b}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-24 lg:px-10 lg:py-32 text-center">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_.8fr]">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[.3em] text-primary">Plan your next horizon</p>
              <h2 className="mt-4 font-display text-5xl md:text-7xl">Have a question?<br /><span className="italic text-primary">Let's explore.</span></h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">For destination suggestions, partnerships or travel-guide questions, get in touch.</p>
              <a href="https://tourism.gov.pk/" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 text-sm text-primary hover:text-foreground"><Compass className="h-4 w-4" /> Official Pakistan tourism resources <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="reveal grid gap-3">
              <div className="rounded-lg border border-border bg-card p-7"><Clock className="h-5 w-5 text-primary" /><h3 className="mt-5 font-display text-2xl">Take your time</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Save this guide and build your route around the places that inspire you most.</p></div>
              <div className="rounded-lg border border-border bg-card p-7"><Compass className="h-5 w-5 text-primary" /><h3 className="mt-5 font-display text-2xl">Follow the horizon</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the destination search above to move from mountains to cities, heritage and coast.</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div><img src="/discover-pakistan-logo.svg" alt="Discover Pakistan" className="h-16 w-auto max-w-full" /><p className="mt-3 font-display italic text-muted-foreground">Where Every Horizon Tells a Story.</p></div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs uppercase tracking-[.16em] text-muted-foreground">
              {["Explore","Destinations","Experiences","Culture","Heritage","About","Contact"].map(x => <a className="hover:text-primary" href={`#${x.toLowerCase() === "explore" ? "home" : x.toLowerCase()}`} key={x}>{x}</a>)}
            </div>
          </div>
          <div className="mt-16 flex flex-col justify-between gap-5 border-t border-border pt-7 text-xs text-muted-foreground md:flex-row">
            <p>© 2026 Discover Pakistan. Celebrating the beauty, heritage and diversity of Pakistan.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[.16em]">
              <a href="https://tourism.gov.pk/" target="_blank" rel="noreferrer" className="hover:text-primary">Pakistan Tourism</a>
              <a href="https://doam.gov.pk/" target="_blank" rel="noreferrer" className="hover:text-primary">Heritage & Archaeology</a>
              <a href="https://whc.unesco.org/en/statesparties/pk" target="_blank" rel="noreferrer" className="hover:text-primary">UNESCO Pakistan</a>
            </div>
          </div>
        </div>
      </footer>

      {selectedDestination && (
        <div role="dialog" aria-modal="true" aria-label={`${selectedDestination[0]} details`} onClick={() => setSelectedDestination(null)}
          onKeyDown={(e) => { if (e.key === "Escape") setSelectedDestination(null); }}
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-5 backdrop-blur-xl">
          <div onClick={(e) => e.stopPropagation()} className="grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2">
            <img src={selectedDestination[2]} alt={selectedDestination[0]} className="h-64 w-full object-cover md:h-full" loading="lazy" onError={(e) => { const img = e.currentTarget; img.style.opacity = "0"; }} />
            <div className="relative overflow-y-auto p-8 lg:p-10">
              <Button aria-label="Close destination details" size="icon" variant="glass" className="absolute right-5 top-5" onClick={() => setSelectedDestination(null)}><X /></Button>
              <p className="text-xs uppercase tracking-[.25em] text-primary">{selectedDestination[1]}</p>
              <h2 className="mt-3 pr-10 font-display text-5xl">{selectedDestination[0]}</h2>
              <p className="mt-6 leading-8 text-muted-foreground">{selectedDestination[3]}</p>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs uppercase tracking-[.2em] text-primary">Explore further</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">Use this destination as a starting point, then explore the regions, experiences and heritage stories across Pakistan.</p>
                <a href="#contact" onClick={() => setSelectedDestination(null)} className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[.18em] text-primary">Plan a journey <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {lightbox && (
        <div role="dialog" aria-modal="true" aria-label="Enlarged Pakistan gallery image" onClick={() => setLightbox(null)}
          onKeyDown={(e) => { if (e.key === "Escape") setLightbox(null); }}
          tabIndex={-1}
          className="fixed inset-0 z-[110] flex cursor-zoom-out items-center justify-center bg-background/95 p-5 backdrop-blur-xl">
          <Button aria-label="Close image" size="icon" variant="glass" className="absolute right-5 top-5" onClick={() => setLightbox(null)}><X /></Button>
          <img className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain" src={lightbox} alt="Pakistan gallery enlarged view" />
        </div>
      )}
    </div>
  );
}
