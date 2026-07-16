import { useState, useMemo } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import DessertsSection from './DessertsSection';
import BeersSection from './BeersSection';

type Category = 'Classiche' | 'Speciali' | 'Gourmet' | 'Ripieni';
type Tab = 'pizze' | 'dolci' | 'birre';

type Pizza = { name: string; ingredients: string; price: number; category: Category };

const pizzas: Pizza[] = [
  { name: 'Margherita', price: 5, ingredients: 'Pomodoro, fiordilatte, basilico', category: 'Classiche' },
  { name: 'Marinara', price: 5, ingredients: 'Pomodoro, aglio, origano', category: 'Classiche' },
  { name: 'Diavola', price: 8, ingredients: 'Pomodoro, fiordilatte, salame piccante', category: 'Classiche' },
  { name: 'Capricciosa', price: 9, ingredients: 'Pomodoro, fiordilatte, funghi, prosciutto, olive, carciofi', category: 'Classiche' },
  { name: 'Partenope', price: 8, ingredients: 'Ricetta della tradizione napoletana', category: 'Speciali' },
  { name: 'Bufalina', price: 9, ingredients: 'Pomodoro, mozzarella di bufala campana, basilico fresco', category: 'Speciali' },
  { name: '5 Formaggi', price: 9, ingredients: 'Fiordilatte, scamorza, gorgonzola, parmigiano, provola', category: 'Speciali' },
  { name: 'Ortolana', price: 10, ingredients: 'Pomodoro, fiordilatte, verdure di stagione grigliate', category: 'Speciali' },
  { name: 'Bronte', price: 10, ingredients: 'Crema di pistacchio di Bronte, fiordilatte, mortadella', category: 'Gourmet' },
  { name: 'Tartufina', price: 12, ingredients: 'Fiordilatte, tartufo nero, porcini, olio al tartufo', category: 'Gourmet' },
  { name: 'Delizia Irpinia', price: 12, ingredients: 'Salsiccia irpina, friarielli, provola affumicata', category: 'Gourmet' },
  { name: 'Partenio 2.0', price: 12, ingredients: 'Interpretazione della casa, ingredienti selezionati', category: 'Gourmet' },
  { name: 'Crocco Pizza', price: 10, ingredients: 'Ripieno della casa, forno a legna', category: 'Ripieni' },
  { name: 'Pizza Pazza', price: 10, ingredients: 'Ricotta, cicoli napoletani, pepe nero', category: 'Ripieni' },
];

const pizzaCategories: Category[] = ['Classiche', 'Speciali', 'Gourmet', 'Ripieni'];

const tabs: { id: Tab; label: string }[] = [
  { id: 'pizze', label: 'Pizze' },
  { id: 'dolci', label: 'Dolci' },
  { id: 'birre', label: 'Birre & Drinks' },
];

function PizzaSection() {
  const [cat, setCat] = useState<Category>('Classiche');
  const shown = useMemo(() => pizzas.filter(p => p.category === cat), [cat]);

  return (
    <div className="mt-10">
      <div className="menu-pizza-hero">
        <img
          src="/images/menu/ChatGPT_Image_15_lug_2026,_15_02_00 copy.png"
          alt="Pizze di Balbi"
          loading="lazy"
          decoding="async"
        />
        <div className="menu-pizza-hero-overlay" />
        <div className="menu-pizza-hero-content">
          <span>Forno a legna · 485°C · 72h lievitazione</span>
          <h2>Le Nostre <em>Pizze</em></h2>
        </div>
      </div>

      <div className="menu-cattabs mt-8" role="tablist">
        {pizzaCategories.map(c => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`menu-cattab${cat === c ? ' active' : ''}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="pizza-menu-grid mt-7" key={cat}>
        {shown.map((p, i) => (
          <article
            key={p.name}
            className="pizza-menu-item"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="pizza-menu-item-left">
              <h2>{p.name}</h2>
              <p>{p.ingredients}</p>
            </div>
            <strong>€{p.price}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function MenuExperience() {
  const query = new URLSearchParams(window.location.search).get('category');
  const initial: Tab =
    query === 'dolci' ? 'dolci' :
    query === 'birre' ? 'birre' :
    'pizze';

  const [active, setActive] = useState<Tab>(initial);

  return (
    <main className="min-h-screen bg-charcoal pb-24 pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        <a
          href="/"
          className="interactive inline-flex items-center gap-2 font-geist text-[10px] uppercase tracking-[0.22em] text-cream/50 hover:text-gold transition-colors duration-200"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          <ArrowLeft size={13} />
          Torna alla home
        </a>

        <header className="mt-10 mb-10">
          <p
            className="font-geist text-[10px] uppercase tracking-[0.45em] text-gold mb-3"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Pizzeria Balbi — Atripalda
          </p>
          <h1
            className="font-playfair text-cream"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
            }}
          >
            Il Menu,<br />
            <em className="italic text-gold">con calma.</em>
          </h1>
        </header>

        <div className="menu-exp-tabs" role="tablist">
          {tabs.map(t => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`menu-exp-tab${active === t.id ? ' active' : ''}`}
            >
              {t.label}
              {active === t.id && <ChevronRight size={11} className="inline ml-1 opacity-50" />}
            </button>
          ))}
        </div>

        {active === 'pizze' && <PizzaSection />}
      </div>

      {active === 'dolci' && <DessertsSection />}
      {active === 'birre' && <BeersSection showDrinks />}

      {/* Bottom navigation — especially helpful on mobile after scrolling */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 pt-16 pb-4 flex justify-center">
        <a
          href="/"
          className="interactive inline-flex items-center gap-3 px-7 py-3.5 rounded-sm font-geist text-[10px] uppercase tracking-[0.28em] text-cream/60 hover:text-gold border border-cream/10 hover:border-gold/40 transition-all duration-300"
          style={{ fontFamily: "'Geist', sans-serif", background: 'rgba(255,255,255,0.03)' }}
        >
          <ArrowLeft size={13} />
          Torna alla home
        </a>
      </div>
    </main>
  );
}
