import { useEffect, useRef, useState } from 'react';
import { Instagram } from 'lucide-react';

export default function TeamSection() {
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

  return (
    <section id="team" className="relative py-32 bg-charcoal-mid overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, #c9a227 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`reveal ${visible ? 'visible' : ''} relative overflow-hidden rounded-sm`}>
            <img
              src="/images/team/ChatGPT_Image_15_lug_2026,_15_06_56 copy.png"
              alt="Il team di Pizzeria Balbi"
              className="w-full object-cover rounded-sm transition-transform duration-700 hover:scale-105"
              style={{ maxHeight: '600px', objectPosition: 'center top' }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d]/70 via-transparent to-transparent pointer-events-none" />
            <div
              className="absolute top-4 right-4 w-12 h-12 opacity-60"
              style={{ borderTop: '1px solid #c9a227', borderRight: '1px solid #c9a227' }}
            />
            <div
              className="absolute bottom-4 left-4 w-12 h-12 opacity-60"
              style={{ borderBottom: '1px solid #c9a227', borderLeft: '1px solid #c9a227' }}
            />
          </div>

          <div>
            <div
              className={`reveal ${visible ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`}
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Dietro ogni pizza
            </div>
            <h2
              className={`reveal reveal-delay-1 ${visible ? 'visible' : ''} font-playfair text-cream mt-4`}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Il Cuore
              <br />
              <span className="italic text-gold">di Balbi</span>
            </h2>

            <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} flex items-center gap-4 mt-6`}>
              <div className="divider-gold w-8" />
              <div className="divider-gold w-16" />
            </div>

            <p
              className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} text-cream/60 font-geist text-base leading-relaxed mt-6`}
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Siamo tre amici uniti dalla stessa passione: la pizza napoletana autentica.
              Ogni giorno, selezioniamo gli ingredienti migliori, impastiamo con cura
              e cuociamo con amore nel nostro forno a legna.
            </p>

            <p
              className={`reveal reveal-delay-3 ${visible ? 'visible' : ''} text-cream/60 font-geist text-base leading-relaxed mt-4`}
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Non è solo una pizzeria — è il nostro sogno, servito con orgoglio
              ad ogni tavolo di Atripalda.
            </p>

            <div className={`reveal reveal-delay-4 ${visible ? 'visible' : ''} mt-8 inline-flex items-center gap-3`}>
              <span
                className="font-playfair italic text-gold text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                #LaPizzaCheOgniGustoUnisce
              </span>
            </div>

            <div className={`reveal reveal-delay-5 ${visible ? 'visible' : ''} flex flex-wrap gap-3 mt-8`}>
              <a
                href="https://instagram.com/pizzeriabalbi"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive btn-outline-gold flex items-center gap-2 text-xs"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                <Instagram size={14} />
                @pizzeriabalbi
              </a>
              <a
                href="tel:+393773727225"
                className="interactive btn-gold text-xs"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                Chiamaci
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
