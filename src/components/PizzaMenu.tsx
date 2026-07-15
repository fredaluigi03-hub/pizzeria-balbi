import { useEffect, useRef, useState } from 'react';

const pizzas = [
  { name: 'Margherita', price: 5 },
  { name: 'Partenope', price: 8 },
  { name: 'Margherita Nobile', price: 8 },
  { name: 'Marinara', price: 5 },
  { name: '4 Stagioni', price: 9 },
  { name: 'Capricciosa', price: 9 },
  { name: 'Diavola', price: 8 },
  { name: 'WP', price: 8 },
  { name: 'Bufalina', price: 9 },
  { name: 'Filetto', price: 9 },
  { name: '5 Formaggi', price: 9 },
  { name: 'Tropea', price: 10 },
  { name: 'Mimosa', price: 8 },
  { name: 'Ortolana', price: 10 },
  { name: 'Carrettiera', price: 10 },
  { name: 'Carciofina', price: 10 },
  { name: 'Porcina', price: 8 },
  { name: 'Crocco Pizza', price: 10 },
  { name: 'Pizza Pazza', price: 10 },
  { name: 'Ligure', price: 10 },
  { name: 'Curva Sud', price: 10 },
  { name: 'Rucolella', price: 10 },
  { name: 'Salsiccia e Porcini', price: 10 },
  { name: 'Tricolore', price: 10 },
  { name: 'Scoiattolo', price: 10 },
  { name: 'La Fresca', price: 10 },
  { name: 'Fiocco', price: 10 },
  { name: 'Maruzzella', price: 10 },
  { name: 'Ariccia', price: 10 },
  { name: 'Datterina', price: 10 },
  { name: 'Bronte', price: 10 },
  { name: 'Marinara a Modo Mio', price: 10 },
  { name: 'Oro Giallo', price: 10 },
  { name: 'Vero Porco', price: 10 },
  { name: 'Sottobosco', price: 10 },
  { name: 'Bagnolese', price: 10 },
  { name: 'Montellese', price: 10 },
  { name: 'Laceno', price: 12 },
  { name: 'Delizia Irpinia', price: 12 },
  { name: 'Cacio e Pepe', price: 10 },
  { name: 'Partenio 2.0', price: 12 },
  { name: 'Porca Vacca Irpinia', price: 10 },
  { name: 'Tartufina', price: 12 },
];

function PizzaCard({ name, price, index }: { name: string; price: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      className="pizza-card interactive glass rounded-sm p-6 flex flex-col justify-between min-h-[120px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.04}s, transform 0.4s ease ${visible ? '0s' : `${index * 0.04}s`}`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <h3
        className="font-playfair text-cream text-lg leading-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {name}
      </h3>
      <div className="flex items-center justify-between mt-4">
        <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
        <span
          className="ml-4 text-gold font-playfair text-xl font-semibold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          €{price}
        </span>
      </div>
    </div>
  );
}

export default function PizzaMenu() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="menu" className="relative py-32 bg-charcoal">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,162,39,1) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div
            className={`reveal ${headerVisible ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Pizza Napoletana
          </div>
          <h2
            className={`reveal reveal-delay-1 ${headerVisible ? 'visible' : ''} font-playfair text-cream mt-4`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            Il Nostro Menu
          </h2>
          <div
            className={`reveal reveal-delay-2 ${headerVisible ? 'visible' : ''} flex items-center justify-center gap-4 mt-6`}
          >
            <div className="divider-gold w-16" />
            <p
              className="text-cream/50 font-geist text-sm italic"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Impasto con 72 ore di lievitazione • Forno a legna a 485°C
            </p>
            <div className="divider-gold w-16" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {pizzas.map((pizza, i) => (
            <PizzaCard key={pizza.name} name={pizza.name} price={pizza.price} index={i} />
          ))}
        </div>

        {/* Note */}
        <p
          className="text-center text-cream/30 font-geist text-xs mt-12 tracking-wide"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          Tutti i nostri impasti sono preparati con farina di tipo 1 e lievitati per 72 ore
        </p>
      </div>
    </section>
  );
}
