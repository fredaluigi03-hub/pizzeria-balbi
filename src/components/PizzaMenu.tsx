import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    id: 'pizze',
    label: 'Pizze',
    sub: 'Classiche · Speciali · Gourmet · Ripieni',
    desc: '14 pizze napoletane, forno a legna a 485°C',
    cta: 'Sfoglia il menu',
    href: '/menu?category=pizze',
    image: '/images/menu/ChatGPT_Image_15_lug_2026,_15_02_00 copy.png',
    accent: '#c9a227',
  },
  {
    id: 'dolci',
    label: 'Dolci',
    sub: 'Pasticceria artigianale',
    desc: 'Ogni dolce fatto ogni giorno — tutti a €5',
    cta: 'Scopri i dessert',
    href: '/menu?category=dolci',
    image: '/images/desserts/WhatsApp_Image_2026-07-15_at_14.19.15.jpeg',
    accent: '#e8c547',
  },
  {
    id: 'birre',
    label: 'Birre & Drinks',
    sub: 'Artigianali · Bibite · Acque',
    desc: 'Selezione curata abbinata alla nostra pizza',
    cta: 'Esplora le bevande',
    href: '/menu?category=birre',
    image: '/images/craft-beers/ChatGPT_Image_15_lug_2026,_15_04_59 copy.png',
    accent: '#b8960c',
  },
];

type Card = typeof cards[0];

function MenuCard({ card, index }: { card: Card; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={card.href}
      className="menu-hub-v2 interactive group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(44px)',
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${index * 0.14}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${index * 0.14}s`,
      }}
    >
      <img
        src={card.image}
        alt={card.label}
        loading="lazy"
        decoding="async"
        className="menu-hub-v2-img"
      />

      <div className="menu-hub-v2-overlay" />

      <div
        className="menu-hub-v2-badge"
        style={{ borderColor: card.accent + '55', color: card.accent }}
      >
        {card.sub}
      </div>

      <div className="menu-hub-v2-body">
        <p className="menu-hub-v2-desc" style={{ color: 'rgba(240,236,228,0.55)' }}>{card.desc}</p>
        <h3 className="menu-hub-v2-title">{card.label}</h3>
        <div className="menu-hub-v2-cta" style={{ color: card.accent }}>
          <span>{card.cta}</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </a>
  );
}

export default function PizzaMenu() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [hv, setHv] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHv(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-charcoal overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(201,162,39,0.07) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div ref={headerRef} className="text-center mb-14">
          <p
            className={`reveal ${hv ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Pizzeria Balbi
          </p>
          <h2
            className={`reveal reveal-delay-1 ${hv ? 'visible' : ''} font-playfair text-cream mt-4`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            Il Nostro<br />
            <em className="italic text-gold">Menu</em>
          </h2>
          <p
            className={`reveal reveal-delay-2 ${hv ? 'visible' : ''} font-geist text-sm text-cream/50 mt-4 max-w-xs mx-auto`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Seleziona una categoria per esplorare la nostra selezione.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((card, i) => (
            <MenuCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
