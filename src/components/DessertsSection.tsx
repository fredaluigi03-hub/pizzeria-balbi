import { useEffect, useRef, useState } from 'react';

const DESSERT_IMAGE = '/images/desserts/WhatsApp_Image_2026-07-15_at_14.19.15.jpeg';

type Dessert = {
  name: string;
  crop: string;
  accent: string;
  note: string;
};

const desserts: Dessert[] = [
  { name: 'Rocher', crop: '18% 15%', accent: '#c8a84b', note: 'Croccante e avvolgente' },
  { name: 'Porcellino Rosa', crop: '72% 16%', accent: '#f4a7b9', note: 'Dolcezza irresistibile' },
  { name: 'Mela Caramellata', crop: '50% 18%', accent: '#d4813a', note: 'Fresca e croccante' },
  { name: 'Pistacchio', crop: '25% 62%', accent: '#8bb53f', note: 'Crema di pistacchio di Bronte' },
  { name: 'Cheesecake', crop: '68% 64%', accent: '#e8c547', note: 'Morbida e cremosa' },
  { name: 'Tortino al Cioccolato', crop: '44% 84%', accent: '#7a5241', note: 'Cuore caldo fondente' },
  { name: 'Cookie Cream', crop: '83% 76%', accent: '#b0956a', note: 'Friabile e goloso' },
  { name: 'Millefoglie', crop: '10% 80%', accent: '#deb66a', note: 'Pasta sfoglia e crema pasticcera' },
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
        <p>{dessert.note}</p>
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
