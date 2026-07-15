import { useEffect, useRef, useState } from 'react';

const beers = [
  {
    name: 'Scuba Diaborupel',
    type: 'Birra Artigianale',
    description: 'Una Quadrupel belga artigianale, intensa e avvolgente. Note di caramello scuro, frutta secca e spezie.',
    badge: 'Artigianale',
  },
  {
    name: 'Leffe Blonde',
    type: 'Birra Abbaziale',
    description: 'Birra abbaziale belga con aromi fruttati e note di scorza di agrumi. Cremosa e bilanciata.',
    badge: 'Belgio',
  },
  {
    name: 'Franziskaner',
    type: 'Weissbier',
    description: 'La classica Weissbier bavarese. Schiuma abbondante, note di banana e chiodi di garofano.',
    badge: 'Germania',
  },
  {
    name: 'Corona Extra',
    type: 'Lager',
    description: 'Lager messicana leggera e rinfrescante. Perfetta con una fetta di limone fresco.',
    badge: 'Messico',
  },
  {
    name: 'Selezione del Giorno',
    type: 'Birra Speciale',
    description: 'Una selezione rotante di birre artigianali scelte dal nostro sommelier. Chiedi al cameriere.',
    badge: 'Speciale',
  },
];

function BeerCard({ beer, index }: { beer: typeof beers[0]; index: number }) {
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
      className="interactive glass rounded-sm p-6 flex flex-col gap-4 group transition-all duration-400"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, box-shadow 0.3s ease`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.4), 0 0 24px rgba(201,162,39,0.15)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '';
        (e.currentTarget as HTMLDivElement).style.transform = visible ? 'translateY(0)' : 'translateY(28px)';
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <span
            className="text-[9px] uppercase tracking-[0.3em] text-gold font-geist"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            {beer.badge}
          </span>
          <h3
            className="font-playfair text-cream text-xl mt-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {beer.name}
          </h3>
        </div>
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
          style={{
            background: 'linear-gradient(135deg, #b8960c, #e8c547)',
            boxShadow: '0 2px 8px rgba(201,162,39,0.3)',
          }}
        />
      </div>
      <p
        className="text-[10px] uppercase tracking-[0.2em] text-gold/60 font-geist"
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        {beer.type}
      </p>
      <p
        className="text-cream/50 font-geist text-sm leading-relaxed"
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        {beer.description}
      </p>
      <div className="h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent mt-2" />
    </div>
  );
}

const drinks = [
  { name: 'Acqua Naturale', detail: 'Bottiglia da 0.5L', price: '€1.5' },
  { name: 'Acqua Frizzante', detail: 'Bottiglia da 0.5L', price: '€1.5' },
  { name: 'Coca-Cola', detail: 'Lattina 33cl', price: '€2.5' },
  { name: 'Fanta', detail: 'Lattina 33cl', price: '€2.5' },
  { name: 'Sprite', detail: 'Lattina 33cl', price: '€2.5' },
  { name: 'San Pellegrino', detail: 'Aranciata, Limonata 33cl', price: '€2.5' },
  { name: 'Succhi di Frutta', detail: 'Selezione disponibile', price: '€2' },
  { name: 'Vino della Casa', detail: 'Rosso o Bianco, calice', price: 'Chiedi' },
];

export default function BeersSection({ showDrinks = false }: { showDrinks?: boolean }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.1;
      imgRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="birre" className="relative py-32 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: image */}
          <div className="relative order-2 md:order-1 overflow-hidden rounded-sm">
            <div ref={imgRef}>
              <img
                src="/images/craft-beers/ChatGPT_Image_15_lug_2026,_15_04_59 copy.png"
                alt="Birre artigianali Pizzeria Balbi"
                className="w-full object-cover rounded-sm"
                style={{ maxHeight: '600px', objectPosition: 'center top' }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d]/60 via-transparent to-transparent" />
            <div
              className="absolute bottom-6 left-6 right-6 glass rounded-sm p-4"
            >
              <p
                className="font-playfair italic text-cream/90 text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "La birra giusta per ogni pizza"
              </p>
              <p
                className="text-gold text-[10px] uppercase tracking-[0.3em] font-geist mt-1"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                Selezione curata
              </p>
            </div>
          </div>

          {/* Right: content */}
          <div className="order-1 md:order-2">
            <div ref={headerRef}>
              <div
                className={`reveal ${headerVisible ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`}
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                Birroteca
              </div>
              <h2
                className={`reveal reveal-delay-1 ${headerVisible ? 'visible' : ''} font-playfair text-cream mt-4`}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                }}
              >
                Birre Artigianali
                <br />
                <span className="italic text-gold">Selezionate</span>
              </h2>
              <p
                className={`reveal reveal-delay-2 ${headerVisible ? 'visible' : ''} text-cream/50 font-geist text-sm leading-relaxed mt-4`}
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                Ogni birra è scelta per esaltare i sapori della nostra pizza napoletana.
                Dalla leggerezza alle note più intense, c'è la birra giusta per ogni palato.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-10">
              {beers.map((beer, i) => (
                <BeerCard key={beer.name} beer={beer} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drinks section */}
      {showDrinks && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-12" />
          <div className="text-center mb-10">
            <p
              className="font-geist text-[10px] uppercase tracking-[0.5em] text-gold"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Bibite & Vini
            </p>
            <h3
              className="font-playfair text-cream mt-3"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              Altre <em className="italic text-gold">Bevande</em>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {drinks.map((drink) => (
              <div
                key={drink.name}
                className="glass rounded-sm p-5 flex flex-col gap-2 interactive"
                style={{ borderColor: 'rgba(232,197,71,0.12)' }}
              >
                <h4
                  className="font-playfair text-cream text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {drink.name}
                </h4>
                <p
                  className="font-geist text-cream/40 text-xs"
                  style={{ fontFamily: "'Geist', sans-serif" }}
                >
                  {drink.detail}
                </p>
                <p
                  className="font-playfair text-gold text-lg mt-auto pt-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {drink.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
