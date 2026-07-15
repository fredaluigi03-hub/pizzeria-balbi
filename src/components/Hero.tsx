import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const scrollY = window.scrollY;
      imgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForno = () => {
    document.querySelector('#forno')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Parallax image */}
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <img
          src="/images/menu/ChatGPT_Image_15_lug_2026,_15_03_18.png"
          alt="Forno a legna Pizzeria Balbi"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0e0d]/60 via-[#0f0e0d]/30 to-[#0f0e0d]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0e0d]/40 via-transparent to-[#0f0e0d]/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <div
            className="animate-fade-in text-[10px] uppercase tracking-[0.5em] text-gold font-geist font-light"
            style={{ fontFamily: "'Geist', sans-serif", animationDelay: '0.2s', opacity: 0 }}
          >
            Atripalda, Avellino
          </div>

          <h1
            className="animate-fade-up font-playfair text-cream leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              animationDelay: '0.4s',
              opacity: 0,
            }}
          >
            Pizzeria
            <br />
            <span className="italic gold-text-gradient">Balbi</span>
          </h1>

          <p
            className="animate-fade-up text-cream/70 font-playfair italic text-xl md:text-2xl"
            style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.7s', opacity: 0 }}
          >
            "Dove la pizza incontra i dolci."
          </p>

          <div
            className="animate-fade-up flex flex-col sm:flex-row items-center gap-4 mt-4"
            style={{ animationDelay: '0.9s', opacity: 0 }}
          >
            <a
              href="tel:+393773727225"
              className="interactive btn-gold text-sm"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Prenota un Tavolo
            </a>
            <button
              onClick={scrollToMenu}
              className="interactive btn-outline-gold text-sm"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Scopri il Menu
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToForno}
        className="interactive absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
      >
        <span
          className="text-[9px] uppercase tracking-[0.3em] text-cream/40 font-geist"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          Scopri
        </span>
        <ChevronDown size={16} className="text-gold opacity-60" />
      </button>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0f0e0d] to-transparent" />
    </section>
  );
}
