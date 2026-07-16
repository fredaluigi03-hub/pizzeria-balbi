import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Flame, Sparkles, Clock } from 'lucide-react';
import { useOrder } from '../ordering/OrderContext';

const promos = [
  {
    id: 'pizza-mese',
    badge: 'Pizza del Mese',
    icon: Sparkles,
    title: 'Bronte',
    sub: 'Pistacchio di Bronte DOP · Luglio 2026',
    desc: 'La nostra pizza gourmet del mese. Pistacchio di Bronte DOP, mortadella e fiordilatte.',
    originalPrice: 10,
    price: 8,
    accent: '#c9a227',
    image: '/images/menu/ChatGPT_Image_15_lug_2026,_15_02_00 copy.png',
  },
  {
    id: 'combo',
    badge: 'Offerta Speciale',
    icon: Flame,
    title: 'Combo Pizza + Dolce',
    sub: 'Risparmia €3 sul tuo ordine',
    desc: 'Scegli una pizza e un dolce artigianale — ottieni uno sconto speciale di €3.',
    originalPrice: 17,
    price: 14,
    accent: '#e8c547',
    image: '/images/desserts/WhatsApp_Image_2026-07-15_at_14.19.15.jpeg',
  },
  {
    id: 'happy-hour',
    badge: 'Happy Hour',
    icon: Clock,
    title: 'Aperitivo Balbi',
    sub: 'Ogni mercoledì 19:00–20:30',
    desc: 'Birra artigianale a metà prezzo con ogni pizza ordinata il mercoledì sera.',
    originalPrice: 9,
    price: 7,
    accent: '#b8960c',
    image: '/images/craft-beers/ChatGPT_Image_15_lug_2026,_15_04_59 copy.png',
  },
];

export default function PromotionsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { dispatch } = useOrder();

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.18 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="promozioni" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#151310' }}>
      <div className="absolute inset-0 pointer-events-none opacity-12"
        style={{ backgroundImage: 'radial-gradient(rgba(232,197,71,.25) 0.65px, transparent 0.65px)', backgroundSize: '20px 20px', maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div ref={headerRef} className="text-center mb-14">
          <p className={`reveal ${visible ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`} style={{ fontFamily: "'Geist', sans-serif" }}>
            Offerte Esclusive
          </p>
          <h2
            className={`reveal reveal-delay-1 ${visible ? 'visible' : ''} font-playfair text-cream mt-4`}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1, letterSpacing: '-0.025em' }}
          >
            Le Nostre<br />
            <em className="italic text-gold">Promozioni</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((promo, i) => {
            const Icon = promo.icon;
            return (
              <div
                key={promo.id}
                className="promo-card interactive group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                }}
              >
                <div className="promo-img-wrap">
                  <img src={promo.image} alt={promo.title} className="promo-img" loading="lazy" decoding="async" />
                  <div className="promo-img-overlay" />
                  <div
                    className="promo-badge"
                    style={{ borderColor: `${promo.accent}66`, color: promo.accent, background: `${promo.accent}18` }}
                  >
                    <Icon size={10} />
                    {promo.badge}
                  </div>
                  <div className="promo-price-badge">
                    <span className="promo-price-old">€{promo.originalPrice}</span>
                    <span className="promo-price-new" style={{ color: promo.accent }}>€{promo.price}</span>
                  </div>
                </div>

                <div className="promo-body">
                  <p className="font-geist text-[9px] uppercase tracking-[0.25em] mt-0.5" style={{ fontFamily: "'Geist', sans-serif", color: `${promo.accent}bb` }}>{promo.sub}</p>
                  <h3 className="font-playfair text-cream text-xl mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{promo.title}</h3>
                  <p className="font-geist text-cream/45 text-xs leading-relaxed mt-2" style={{ fontFamily: "'Geist', sans-serif" }}>{promo.desc}</p>
                  <button
                    type="button"
                    className="promo-cta interactive flex items-center gap-2"
                    style={{ color: promo.accent }}
                    onClick={() => dispatch({ type: 'OPEN', payload: null })}
                  >
                    <span>Ordina ora</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
