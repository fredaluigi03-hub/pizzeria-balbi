import { useState } from 'react';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useOrder } from './OrderContext';
import { menuItems } from './menuData';
import type { MenuItem, MenuCategory } from './types';

const CATS: { id: MenuCategory; label: string; emoji: string }[] = [
  { id: 'pizze', label: 'Pizze', emoji: '🍕' },
  { id: 'dolci', label: 'Dolci', emoji: '🍰' },
  { id: 'birre', label: 'Drinks', emoji: '🍺' },
];

const PIZZA_REQUESTS = [
  'Ben cotta', 'Tagliata a spicchi', 'Senza basilico', 'Senza aglio',
  'Extra mozzarella', 'Extra parmigiano', 'Senza olive', 'Senza capperi',
];

function ItemSheet({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { dispatch } = useOrder();
  const [qty, setQty] = useState(1);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [customRequest, setCustomRequest] = useState('');

  const toggleRequest = (r: string) => {
    setSelectedRequests((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const combinedRequest = [
    ...selectedRequests,
    ...(customRequest.trim() ? [customRequest.trim()] : []),
  ].join(', ');

  const handleAdd = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: qty,
        image: item.image,
        category: item.category,
        specialRequest: combinedRequest || undefined,
      },
    });
    onClose();
  };

  return (
    <div className="item-sheet-backdrop" onClick={onClose}>
      <div className="item-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="item-sheet-img-wrap">
          <img src={item.image} alt={item.name} className="item-sheet-img" loading="lazy" />
          <div className="item-sheet-img-overlay" />
          {item.badge && (
            <span className="item-sheet-badge">{item.badge}</span>
          )}
          <button
            type="button"
            className="item-sheet-close interactive"
            onClick={onClose}
            aria-label="Chiudi"
          >
            <X size={16} />
          </button>
        </div>

        <div className="item-sheet-body">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-playfair text-cream text-2xl leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
              <p className="font-geist text-cream/50 text-sm mt-1 leading-relaxed" style={{ fontFamily: "'Geist', sans-serif" }}>{item.description}</p>
            </div>
            <span className="font-playfair text-gold text-2xl flex-shrink-0 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>€{item.price.toFixed(2)}</span>
          </div>

          {item.ingredients && (
            <div className="mt-4 p-3 rounded-md" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,162,39,0.15)' }}>
              <p className="font-geist text-[9px] uppercase tracking-[0.28em] text-gold/60 mb-1" style={{ fontFamily: "'Geist', sans-serif" }}>Ingredienti</p>
              <p className="font-geist text-cream/55 text-xs leading-relaxed" style={{ fontFamily: "'Geist', sans-serif" }}>{item.ingredients}</p>
            </div>
          )}

          {item.category === 'pizze' && (
            <div className="mt-5">
              <p className="font-geist text-[9px] uppercase tracking-[0.28em] text-gold/70 mb-3" style={{ fontFamily: "'Geist', sans-serif" }}>Richieste Speciali</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {PIZZA_REQUESTS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="order-request-tag interactive"
                    data-active={selectedRequests.includes(r)}
                    onClick={() => toggleRequest(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <textarea
                className="order-textarea"
                placeholder="Altre richieste personalizzate..."
                rows={2}
                value={customRequest}
                onChange={(e) => setCustomRequest(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center gap-4 mt-6">
            <div className="order-qty-ctrl">
              <button type="button" className="interactive" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} /></button>
              <span className="font-playfair text-cream text-lg w-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{qty}</span>
              <button type="button" className="interactive" onClick={() => setQty((q) => q + 1)}><Plus size={14} /></button>
            </div>
            <button type="button" className="btn-gold flex-1 flex items-center justify-center gap-2 text-sm" onClick={handleAdd}>
              <ShoppingBag size={15} />
              Aggiungi — €{(item.price * qty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item, onSelect }: { item: MenuItem; onSelect: () => void }) {
  return (
    <button
      type="button"
      className="order-item-card interactive group text-left"
      onClick={onSelect}
    >
      <div className="order-item-img-wrap">
        <img src={item.image} alt={item.name} className="order-item-img" loading="lazy" />
        {item.badge && <span className="order-item-badge">{item.badge}</span>}
        <div className="order-item-add-overlay">
          <div className="order-item-add-btn">
            <Plus size={18} className="text-[#0f0e0d]" />
          </div>
        </div>
      </div>
      <div className="order-item-body">
        <h4 className="font-playfair text-cream text-lg leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h4>
        <p className="font-geist text-cream/45 text-xs leading-relaxed mt-1 line-clamp-2" style={{ fontFamily: "'Geist', sans-serif" }}>{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-playfair text-gold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>€{item.price.toFixed(2)}</span>
          <div className="order-item-plus">
            <Plus size={14} className="text-[#0f0e0d]" />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function MenuBrowser() {
  const { dispatch, cartTotal, cartCount } = useOrder();
  const [cat, setCat] = useState<MenuCategory>('pizze');
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const shown = menuItems.filter((m) => m.category === cat);

  return (
    <div className="flex flex-col h-full">
      {/* Category tabs */}
      <div className="flex gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(201,162,39,0.12)' }}>
        {CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`order-cat-tab interactive${cat === c.id ? ' active' : ''}`}
            onClick={() => setCat(c.id)}
          >
            <span>{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="order-menu-grid">
          {shown.map((item) => (
            <ItemCard key={item.id} item={item} onSelect={() => setSelected(item)} />
          ))}
        </div>
      </div>

      {/* Cart bar */}
      {cartCount > 0 && (
        <div className="px-4 pb-4">
          <button
            type="button"
            className="btn-gold w-full flex items-center justify-between px-5 text-sm interactive"
            onClick={() => dispatch({ type: 'SET_STEP', payload: 'cart' })}
          >
            <span className="order-cart-count">{cartCount}</span>
            <span>Vai al Carrello</span>
            <span>€{cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {selected && <ItemSheet item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
