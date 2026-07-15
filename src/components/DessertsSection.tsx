import { useEffect, useRef, useState } from 'react';

const DESSERT_IMAGE = '/images/desserts/ChatGPT_Image_15_lug_2026,_14_57_52.png';

interface Dessert {
  name: string;
  category: 'Cioccolato' | 'Crema' | 'Frutta' | 'Speciale';
  cropX: string;
  cropY: string;
  scale: number;
}

const desserts: Dessert[] = [
  { name: 'Tiramisù',               category: 'Crema',      cropX: '8%',   cropY: '15%',  scale: 1.6 },
  { name: 'Cannolo',                category: 'Speciale',   cropX: '30%',  cropY: '10%',  scale: 1.7 },
  { name: 'Cheesecake Pistacchio',  category: 'Crema',      cropX: '55%',  cropY: '12%',  scale: 1.65 },
  { name: 'Profiterole',            category: 'Cioccolato', cropX: '80%',  cropY: '8%',   scale: 1.6 },
  { name: 'Panna Cotta',            category: 'Crema',      cropX: '8%',   cropY: '75%',  scale: 1.65 },
  { name: 'Tortino Fondente',       category: 'Cioccolato', cropX: '32%',  cropY: '80%',  scale: 1.7 },
  { name: 'Babà al Rum',            category: 'Speciale',   cropX: '60%',  cropY: '78%',  scale: 1.6 },
  { name: 'Millefoglie',            category: 'Frutta',     cropX: '85%',  cropY: '82%',  scale: 1.65 },
];

const categoryColors: Record<string, string> = {
  Cioccolato: '#6b3a2a',
  Crema:      '#7a6030',
  Frutta:     '#3a5c3a',
  Speciale:   '#3a3a6b',
};

const categories = ['Tutti', 'Cioccolato', 'Crema', 'Frutta', 'Speciale'];

function DessertCard({ dessert, index }: { dessert: Dessert; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="dessert-card interactive flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.07}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
      }}
    >
      {/* Card */}
      <div
        className="rounded-sm overflow-hidden flex-1"
        style={{
          background: 'linear-gradient(145deg, #f7f0e4 0%, #ece4d0 100%)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15)',
        }}
      >
        {/* Dessert image crop */}
        <div className="relative overflow-hidden" style={{ paddingBottom: '80%' }}>
          <img
            src={DESSERT_IMAGE}
            alt={dessert.name}
            className="dessert-img absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: `${dessert.cropX} ${dessert.cropY}`,
              transform: `scale(${dessert.scale})`,
              transformOrigin: `${dessert.cropX} ${dessert.cropY}`,
            }}
          />

          {/* Artigianale badge - appears on hover */}
          <div className="artigianale-badge absolute top-3 left-3">
            <span
              className="text-[9px] uppercase tracking-[0.3em] font-geist font-medium px-2 py-1 rounded-sm"
              style={{
                fontFamily: "'Geist', sans-serif",
                background: 'rgba(15,14,13,0.85)',
                color: '#c9a227',
                backdropFilter: 'blur(8px)',
              }}
            >
              Artigianale
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 flex items-center justify-between">
          <div>
            <span
              className="block text-[9px] uppercase tracking-[0.25em] font-geist mb-1"
              style={{
                fontFamily: "'Geist', sans-serif",
                color: categoryColors[dessert.category],
              }}
            >
              {dessert.category}
            </span>
            <h3
              className="font-playfair text-[#1a1714] text-base leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {dessert.name}
            </h3>
          </div>

          {/* Golden price badge */}
          <div
            className="flex items-center justify-center rounded-sm ml-3 flex-shrink-0"
            style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #b8960c, #e8c547, #b8960c)',
              boxShadow: '0 2px 12px rgba(201,162,39,0.4)',
            }}
          >
            <span
              className="font-playfair font-bold text-[#0f0e0d] text-lg leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              €5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DessertsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tutti');

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = activeCategory === 'Tutti'
    ? desserts
    : desserts.filter((d) => d.category === activeCategory);

  return (
    <section id="dolci" className="relative py-32 bg-charcoal-mid">
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0e0d] via-transparent to-[#0f0e0d] opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div
            className={`reveal ${headerVisible ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Pasticceria Artigianale
          </div>
          <h2
            className={`reveal reveal-delay-1 ${headerVisible ? 'visible' : ''} font-playfair text-cream mt-4`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            I Dolci che Concludono
            <br />
            <span className="italic text-gold">l'Esperienza</span>
          </h2>
          <p
            className={`reveal reveal-delay-2 ${headerVisible ? 'visible' : ''} text-cream/50 font-geist text-sm mt-4 italic`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Tutti i nostri dessert artigianali a soli €5
          </p>

          {/* Category filter */}
          <div
            className={`reveal reveal-delay-3 ${headerVisible ? 'visible' : ''} flex flex-wrap items-center justify-center gap-2 mt-8`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="interactive px-4 py-1.5 rounded-sm text-[10px] uppercase tracking-[0.2em] font-geist transition-all duration-200"
                style={{
                  fontFamily: "'Geist', sans-serif",
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #b8960c, #e8c547)'
                    : 'rgba(255,255,255,0.04)',
                  color: activeCategory === cat ? '#0f0e0d' : 'rgba(240,236,228,0.5)',
                  border: activeCategory === cat
                    ? '1px solid transparent'
                    : '1px solid rgba(201,162,39,0.2)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dessert cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((dessert, i) => (
            <DessertCard key={dessert.name} dessert={dessert} index={i} />
          ))}
        </div>

        {/* Showcase full image */}
        <div
          className={`reveal reveal-delay-2 ${headerVisible ? 'visible' : ''} mt-16 relative rounded-sm overflow-hidden`}
          style={{ maxHeight: '400px' }}
        >
          <img
            src={DESSERT_IMAGE}
            alt="Showcase dessert Pizzeria Balbi"
            className="w-full object-cover"
            style={{ objectPosition: 'center 40%', maxHeight: '400px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d]/80 via-[#0f0e0d]/20 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p
              className="font-playfair italic text-cream/90 text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              La nostra vetrina di dolci artigianali
            </p>
            <p
              className="font-geist text-gold text-sm mt-1"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Ogni giorno freschi, ogni sera esauriti
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
