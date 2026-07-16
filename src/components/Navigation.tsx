import { useEffect, useState } from 'react';
import { Menu, X, User, ShoppingBag } from 'lucide-react';
import { useOrder } from '../ordering/OrderContext';

const links = [
  { label: 'Il Forno', href: '#forno' },
  { label: 'Menu', href: '#menu' },
  { label: 'Dolci', href: '/menu?category=dolci' },
  { label: 'Promozioni', href: '#promozioni' },
  { label: 'Team', href: '#team' },
  { label: 'Contatti', href: '#contatti' },
];

type Props = { onAccountOpen: () => void };

export default function Navigation({ onAccountOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dispatch, cartCount } = useOrder();

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

  const openOrdering = () => {
    setOpen(false);
    dispatch({ type: 'OPEN', payload: null });
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
          <a href="/" className="flex flex-col items-start interactive">
            <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-geist font-light leading-none" style={{ fontFamily: "'Geist', sans-serif" }}>
              Pizzeria
            </span>
            <span className="text-2xl font-playfair italic text-cream leading-none mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
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

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onAccountOpen}
              className="interactive w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.2)' }}
              aria-label="Il mio account"
            >
              <User size={15} className="text-cream/60" />
            </button>
            <button
              type="button"
              onClick={openOrdering}
              className="relative interactive btn-gold text-[10px] flex items-center gap-2"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              <ShoppingBag size={13} />
              Ordina Ora
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-[#0f0e0d] font-bold" style={{ background: '#e8c547' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            {cartCount > 0 && (
              <button type="button" onClick={openOrdering} className="relative interactive" aria-label="Carrello">
                <ShoppingBag size={20} className="text-gold" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-[#0f0e0d] font-bold" style={{ background: '#e8c547' }}>
                  {cartCount}
                </span>
              </button>
            )}
            <button className="interactive text-cream p-1" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

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
            style={{ fontFamily: "'Playfair Display', serif", transitionDelay: open ? `${i * 50}ms` : '0ms' }}
          >
            {link.label}
          </button>
        ))}
        <button
          type="button"
          className="interactive btn-gold mt-4 flex items-center gap-2"
          style={{ fontFamily: "'Geist', sans-serif" }}
          onClick={openOrdering}
        >
          <ShoppingBag size={15} />
          Ordina Ora
        </button>
        <button
          type="button"
          className="interactive btn-outline-gold flex items-center gap-2 text-xs"
          style={{ fontFamily: "'Geist', sans-serif" }}
          onClick={() => { setOpen(false); onAccountOpen(); }}
        >
          <User size={13} />
          Il Mio Account
        </button>
      </div>
    </>
  );
}
