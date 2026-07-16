import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '485', unit: '°C', label: 'Forno a Legna' },
  { value: '72', unit: 'h', label: 'Lievitazione' },
  { value: '100', unit: '%', label: 'Artigianalità' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function OvenSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { ref: statsRef, visible: statsVisible } = useReveal();

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.closest('section')?.getBoundingClientRect();
      if (!rect) return;
      const offset = -rect.top * 0.25;
      imgRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="forno" className="relative overflow-hidden min-h-screen flex items-center">
      <div ref={imgRef} className="absolute inset-0 scale-125">
        <img
          src="/images/menu/ChatGPT_Image_15_lug_2026,_15_02_00.png"
          alt="Il forno Pizzeria Balbi"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0e0d]/95 via-[#0f0e0d]/80 to-[#0f0e0d]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d] via-transparent to-[#0f0e0d]/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 w-full">
        <div ref={statsRef} className="max-w-2xl">
          <div
            className={`reveal ${statsVisible ? 'visible' : ''}`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">Il Nostro Segreto</span>
          </div>

          <h2
            className={`reveal reveal-delay-1 ${statsVisible ? 'visible' : ''} font-playfair text-cream mt-4`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.1,
            }}
          >
            La Tradizione
            <br />
            <span className="italic text-gold">Napoletana</span>
          </h2>

          <p
            className={`reveal reveal-delay-2 ${statsVisible ? 'visible' : ''} text-cream/60 font-geist text-base leading-relaxed mt-6 max-w-md`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Ogni pizza nasce da un impasto che riposa per 72 ore, poi cotta nel nostro forno a legna
            raggiunge una temperatura di 485°C — il segreto di un cornicione perfetto.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 mt-14">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal reveal-delay-${i + 2} ${statsVisible ? 'visible' : ''} group`}
              >
                <div className="flex items-end gap-1 leading-none">
                  <span
                    className="font-playfair gold-text-gradient"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-gold/60 font-playfair mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}
                  >
                    {stat.unit}
                  </span>
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mt-2 font-geist"
                  style={{ fontFamily: "'Geist', sans-serif" }}
                >
                  {stat.label}
                </div>
                <div className="mt-3 h-px w-12 bg-gold/30 group-hover:w-20 group-hover:bg-gold/60 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
