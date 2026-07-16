import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const images = [
  {
    src: '/images/menu/ChatGPT_Image_15_lug_2026,_15_03_18 copy.png',
    alt: 'Pizza napoletana Balbi',
    featured: true,
  },
  {
    src: '/images/menu/ChatGPT_Image_15_lug_2026,_15_02_00 copy.png',
    alt: 'Pizza nel forno Balbi',
    featured: false,
  },
  {
    src: '/images/desserts/ChatGPT_Image_15_lug_2026,_14_57_52 copy.png',
    alt: 'Dolci artigianali Balbi',
    featured: false,
  },
  {
    src: '/images/craft-beers/ChatGPT_Image_15_lug_2026,_15_04_59 copy.png',
    alt: 'Birre artigianali Balbi',
    featured: false,
  },
  {
    src: '/images/team/ChatGPT_Image_15_lug_2026,_15_06_56 copy.png',
    alt: 'Team Pizzeria Balbi',
    featured: false,
  },
];

type GalleryTileProps = {
  src: string;
  alt: string;
  index: number;
  visible: boolean;
  onOpen: () => void;
};

function GalleryTile({ src, alt, index, visible, onOpen }: GalleryTileProps) {
  const tileRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = tileRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    if (imgRef.current) {
      imgRef.current.style.transform = `scale(1.07) translate(${x * -3}px, ${y * -3}px)`;
    }
  };

  const handleMouseLeave = () => {
    const el = tileRef.current;
    if (!el) return;
    el.style.transform = '';
    if (imgRef.current) imgRef.current.style.transform = '';
  };

  return (
    <button
      ref={tileRef}
      type="button"
      className="gallery-tile interactive relative w-full overflow-hidden rounded-sm group text-left"
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Apri foto: ${alt}`}
      style={{
        opacity: 0,
        animation: visible
          ? `fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.13}s forwards`
          : 'none',
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="gallery-tile-img"
        loading="lazy"
        decoding="async"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d]/70 via-[#0f0e0d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(201,162,39,0.92)',
            boxShadow: '0 4px 20px rgba(201,162,39,0.5)',
          }}
        >
          <ZoomIn size={18} className="text-[#0f0e0d]" />
        </div>
      </div>

      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-400 rounded-sm pointer-events-none" />

      <div
        className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
      >
        <p
          className="font-geist text-[9px] uppercase tracking-[0.25em] text-cream/70"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          {alt}
        </p>
      </div>
    </button>
  );
}

export default function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const featured = images[0];
  const rest = images.slice(1);

  return (
    <section id="galleria" className="relative py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            L&apos;Atmosfera
            <br />
            <span className="italic text-gold">di Balbi</span>
          </h2>
        </div>

        {/* Featured full-width image */}
        <div
          className="gallery-featured interactive group relative overflow-hidden rounded-sm mb-4 cursor-pointer"
          onClick={() => setLightbox(featured.src)}
          style={{
            opacity: 0,
            animation: headerVisible ? 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0s forwards' : 'none',
          }}
          role="button"
          tabIndex={0}
          aria-label={`Apri foto: ${featured.alt}`}
          onKeyDown={(e) => e.key === 'Enter' && setLightbox(featured.src)}
        >
          <img
            src={featured.src}
            alt={featured.alt}
            className="gallery-featured-img"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(201,162,39,0.92)',
                boxShadow: '0 4px 24px rgba(201,162,39,0.5)',
              }}
            >
              <ZoomIn size={20} className="text-[#0f0e0d]" />
            </div>
          </div>
          <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-400 rounded-sm pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
            <p className="font-playfair italic text-cream/80 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              {featured.alt}
            </p>
          </div>
        </div>

        {/* Remaining images in 2-column grid */}
        <div className="gallery-grid">
          {rest.map((img, i) => (
            <GalleryTile
              key={img.src}
              src={img.src}
              alt={img.alt}
              index={i + 1}
              visible={headerVisible}
              onOpen={() => setLightbox(img.src)}
            />
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[9998] bg-[#0f0e0d]/96 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="interactive absolute top-6 right-6 w-11 h-11 rounded-full glass flex items-center justify-center text-cream hover:text-gold transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Chiudi immagine"
          >
            <X size={18} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full object-contain rounded-sm"
            style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.7)', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
