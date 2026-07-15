import { useEffect, useRef, useState } from 'react';

const DESSERT_IMAGE = '/images/desserts/WhatsApp_Image_2026-07-15_at_14.19.15.jpeg';

type Dessert = {
  name: string;
  crop: string;
  accent: string;
};

const desserts: Dessert[] = [
  { name: 'Tiramisù', crop: '29% 22%', accent: '#f5db96' },
  { name: 'Cannolo', crop: '60% 26%', accent: '#d28a53' },
  { name: 'Cheesecake Pistacchio', crop: '62% 66%', accent: '#acc765' },
  { name: 'Profiterole', crop: '43% 25%', accent: '#9a674d' },
  { name: 'Panna Cotta', crop: '30% 59%', accent: '#f2c9c1' },
  { name: 'Tortino Fondente', crop: '82% 45%', accent: '#9d735f' },
  { name: 'Babà al Rum', crop: '70% 82%', accent: '#deb66a' },
  { name: 'Millefoglie', crop: '76% 65%', accent: '#e2bd72' },
];

function DessertCard({ dessert, index }: { dessert: Dessert; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={ref} className="dessert-luxury-card interactive" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transitionDelay: `${index * 70}ms` }}>
      <div className="dessert-luxury-image">
        <img src={DESSERT_IMAGE} alt={dessert.name} style={{ objectPosition: dessert.crop }} />
        <div className="dessert-luxury-overlay" />
        <span className="dessert-artisan">Artigianale</span>
        <span className="dessert-price">€5</span>
      </div>
      <div className="dessert-luxury-body">
        <span className="dessert-mini-line" style={{ backgroundColor: dessert.accent }} />
        <h3>{dessert.name}</h3>
        <p>Un piccolo lusso, fatto ogni giorno.</p>
      </div>
    </article>
  );
}

export default function DessertsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.16 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dolci" className="dessert-boutique relative overflow-hidden py-24 sm:py-32">
      <div className="dessert-boutique-glow" />
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        <header className={`dessert-boutique-heading ${visible ? 'visible' : ''}`}>
          <p>Pasticceria artigianale</p>
          <h2>I Dolci <em>di Balbi</em></h2>
          <div className="dessert-heading-rule" />
          <span>Tutti i dessert artigianali hanno un prezzo unico.</span>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {desserts.map((dessert, index) => <DessertCard key={dessert.name} dessert={dessert} index={index} />)}
        </div>
      </div>
    </section>
  );
}
