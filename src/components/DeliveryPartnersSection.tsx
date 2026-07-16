import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const partners = [
  {
    id: 'deliveroo',
    name: 'Deliveroo',
    tagline: 'Ordina su Deliveroo',
    color: '#00CCBC',
    emoji: '🛵',
    available: true,
  },
  {
    id: 'glovo',
    name: 'Glovo',
    tagline: 'Ordina su Glovo',
    color: '#FFC244',
    emoji: '📦',
    available: true,
  },
  {
    id: 'justeat',
    name: 'Just Eat',
    tagline: 'Ordina su Just Eat',
    color: '#FF8000',
    emoji: '🍽️',
    available: true,
  },
  {
    id: 'ubereats',
    name: 'Uber Eats',
    tagline: 'Prossimamente',
    color: '#06C167',
    emoji: '🚴',
    available: false,
  },
];

export default function DeliveryPartnersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-10">
      <div className={`reveal ${visible ? 'visible' : ''} text-center mb-8`}>
        <p className="font-geist text-[9px] uppercase tracking-[0.4em] text-cream/35 mb-2" style={{ fontFamily: "'Geist', sans-serif" }}>
          Oppure ordina tramite
        </p>
        <div className="h-px mx-auto w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)' }} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {partners.map((p, i) => (
          <div
            key={p.id}
            className={`partner-card${p.available ? ' interactive group' : ' partner-card--soon'}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
            }}
          >
            <div className="partner-emoji">{p.emoji}</div>
            <p className="font-playfair text-cream text-base mt-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{p.name}</p>
            {p.available ? (
              <div className="flex items-center gap-1 mt-1">
                <p className="font-geist text-[9px] uppercase tracking-[0.18em]" style={{ fontFamily: "'Geist', sans-serif", color: p.color }}>{p.tagline}</p>
                <ExternalLink size={8} style={{ color: p.color }} />
              </div>
            ) : (
              <p className="font-geist text-[9px] uppercase tracking-[0.18em] text-cream/25 mt-1" style={{ fontFamily: "'Geist', sans-serif" }}>{p.tagline}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
