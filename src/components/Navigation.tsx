import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Il Forno', href: '#forno', page: false },
  { label: 'Menu', href: '#menu', page: false },
  { label: 'Dolci', href: '/menu?category=dolci', page: true },
  { label: 'Birre', href: '#birre', page: false },
  { label: 'Team', href: '#team', page: false },
  { label: 'Contatti', href: '#contatti', page: false },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500 px-6 md:px-12 py-5"
        style={{
          background: scrolled ? 'rgba(15, 14, 13, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201, 162, 39, 0.12)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#"
            className="flex flex-col items-start interactive"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span
              className="text-[8px] uppercase tracking-[0.4em] text-gold font-geist font-light leading-none"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Pizzeria
            </span>
            <span
              className="text-2xl font-playfair italic text-cream leading-none mt-0.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Balbi
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="interactive text-[11px] uppercase tracking-[0.2em] text-cream/60 hover:text-gold transition-colors duration-200 font-geist"
                  style={{ fontFamily: "'Geist', sans-serif" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <a
            href="tel:+393773727225"
            className="interactive hidden md:block btn-gold text-[10px]"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Prenota
          </a>

          <button
            className="interactive md:hidden text-cream p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 bg-[#0f0e0d]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {links.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            className="interactive text-3xl font-playfair italic text-cream hover:text-gold transition-colors duration-200"
            style={{
              fontFamily: "'Playfair Display', serif",
              transitionDelay: open ? `${i * 50}ms` : '0ms',
            }}
          >
            {link.label}
          </button>
        ))}
        <a
          href="tel:+393773727225"
          className="interactive btn-gold mt-4"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          Prenota un Tavolo
        </a>
      </div>
    </>
  );
}
