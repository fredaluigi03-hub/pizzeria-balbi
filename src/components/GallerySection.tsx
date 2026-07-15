import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const images = [
  {
    src: '/images/menu/ChatGPT_Image_15_lug_2026,_15_03_18.png',
    alt: 'Pizza napoletana Balbi',
    tall: true,
  },
  {
    src: '/images/menu/ChatGPT_Image_15_lug_2026,_15_02_00.png',
    alt: 'Pizza nel forno Balbi',
    tall: false,
  },
  {
    src: '/images/desserts/ChatGPT_Image_15_lug_2026,_14_57_52.png',
    alt: 'Dolci artigianali Balbi',
    tall: false,
  },
  {
    src: '/images/craft-beers/ChatGPT_Image_15_lug_2026,_15_04_59.png',
    alt: 'Birre artigianali Balbi',
    tall: true,
  },
  {
    src: '/images/team/ChatGPT_Image_15_lug_2026,_15_06_56.png',
    alt: 'Team Pizzeria Balbi',
    tall: false,
  },
];

export default function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section id="galleria" className="relative py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div
            className={`reveal ${headerVisible ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Fotografie
          </div>
          <h2
            className={`reveal reveal-delay-1 ${headerVisible ? 'visible' : ''} font-playfair text-cream mt-4`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            L'Atmosfera
            <br />
            <span className="italic text-gold">di Balbi</span>
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {images.map((img, i) => (
            <div
              key={img.src}
              className="masonry-item interactive relative overflow-hidden rounded-sm group"
              onClick={() => setLightbox(img.src)}
              style={{
                opacity: 0,
                animation: headerVisible ? `fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s forwards` : 'none',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,162,39,0.9)' }}
                >
                  <ZoomIn size={16} className="text-[#0f0e0d]" />
                </div>
              </div>
              {/* Gold border on hover */}
              <div
                className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-300 rounded-sm pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9998] bg-[#0f0e0d]/96 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="interactive absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={18} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full object-contain rounded-sm"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
