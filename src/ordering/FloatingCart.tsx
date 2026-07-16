import { ShoppingBag } from 'lucide-react';
import { useOrder } from './OrderContext';

export default function FloatingCart() {
  const { state, dispatch, cartCount, cartTotal } = useOrder();

  if (cartCount === 0 || state.isOpen) return null;

  return (
    <button
      type="button"
      className="floating-cart interactive"
      onClick={() => {
        dispatch({ type: 'OPEN', payload: state.orderType });
        dispatch({ type: 'SET_STEP', payload: 'cart' });
      }}
      aria-label={`Apri carrello — ${cartCount} prodotti`}
    >
      <div className="floating-cart-inner">
        <div className="relative">
          <ShoppingBag size={22} className="text-[#0f0e0d]" />
          <span className="floating-cart-badge">{cartCount}</span>
        </div>
        <div className="floating-cart-text">
          <span className="font-geist text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "'Geist', sans-serif" }}>
            Il tuo ordine
          </span>
          <span className="font-playfair text-lg leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
            €{cartTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </button>
  );
}
