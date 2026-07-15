import { Instagram, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#0a0908] border-t border-white/5">
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <button onClick={scrollTop} className="interactive flex flex-col items-start">
              <span
                className="text-[8px] uppercase tracking-[0.5em] text-gold font-geist font-light"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                Pizzeria
              </span>
              <span
                className="text-4xl font-playfair italic text-cream mt-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Balbi
              </span>
            </button>
            <p
              className="text-cream/40 font-geist text-sm leading-relaxed"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Pizza napoletana autentica, lievitazione naturale di 72 ore e forno a legna a 485°C.
              Nel cuore di Atripalda, Avellino.
            </p>
            <div className="flex items-center gap-2">
              <div className="divider-gold w-8" />
              <span
                className="text-gold/60 font-playfair italic text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                #LaPizzaCheOgniGustoUnisce
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-[10px] uppercase tracking-[0.4em] text-gold font-geist mb-6"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Navigazione
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Il Forno', href: '#forno' },
                { label: 'Menu Pizza', href: '/menu?category=pizze' },
                { label: 'Dolci Artigianali', href: '/menu?category=dolci' },
                { label: 'Birre Craft', href: '/menu?category=birre' },
                { label: 'Il Team', href: '#team' },
                { label: 'Galleria', href: '#galleria' },
                { label: 'Prenota', href: '#contatti' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="interactive text-cream/40 hover:text-gold transition-colors duration-200 font-geist text-sm"
                    style={{ fontFamily: "'Geist', sans-serif" }}
                    onClick={(e) => {
                      if (!link.href.startsWith('/')) {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] uppercase tracking-[0.4em] text-gold font-geist mb-6"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Contatti
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+393773727225"
                className="interactive flex items-center gap-3 text-cream/50 hover:text-gold transition-colors duration-200 group"
              >
                <Phone size={14} className="text-gold/50 group-hover:text-gold transition-colors flex-shrink-0" />
                <span className="font-geist text-sm" style={{ fontFamily: "'Geist', sans-serif" }}>
                  +39 377 372 7225
                </span>
              </a>
              <a
                href="https://instagram.com/pizzeriabalbi"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive flex items-center gap-3 text-cream/50 hover:text-gold transition-colors duration-200 group"
              >
                <Instagram size={14} className="text-gold/50 group-hover:text-gold transition-colors flex-shrink-0" />
                <span className="font-geist text-sm" style={{ fontFamily: "'Geist', sans-serif" }}>
                  @pizzeriabalbi
                </span>
              </a>
              <div className="flex items-start gap-3 text-cream/50">
                <MapPin size={14} className="text-gold/50 mt-0.5 flex-shrink-0" />
                <span className="font-geist text-sm" style={{ fontFamily: "'Geist', sans-serif" }}>
                  Via Salita Palazzo SNC<br />
                  83042 Atripalda (AV)
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              <a
                href="https://instagram.com/pizzeriabalbi"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive w-10 h-10 glass rounded-sm flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/30 transition-all duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/393773727225"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive w-10 h-10 glass rounded-sm flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/30 transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="tel:+393773727225"
                className="interactive w-10 h-10 glass rounded-sm flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/30 transition-all duration-200"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-cream/25 font-geist text-xs"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            © {new Date().getFullYear()} Pizzeria Balbi — Atripalda, Avellino
          </p>
          <p
            className="flex items-center gap-1.5 text-cream/25 font-geist text-xs"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Fatto con <Heart size={10} className="text-[#c0392b]" fill="#c0392b" /> per gli amanti della pizza
          </p>
        </div>
      </div>
    </footer>
  );
}
