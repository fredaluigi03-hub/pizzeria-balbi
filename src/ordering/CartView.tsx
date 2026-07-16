import { Minus, Plus, Trash2, Clock, ShoppingBag } from 'lucide-react';
import { useOrder } from './OrderContext';

export default function CartView() {
  const { state, dispatch, cartTotal, cartCount, deliveryFee } = useOrder();
  const total = cartTotal + deliveryFee;
  const prepTime = state.orderType === 'delivery' ? '35–50 min' : '20–30 min';

  if (cartCount === 0) {
    return (
      <div className="order-step-container flex flex-col items-center justify-center gap-6 py-20">
        <ShoppingBag size={48} className="text-gold/30" />
        <p className="font-playfair text-cream/40 text-xl italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          Il tuo carrello è vuoto
        </p>
        <button
          type="button"
          className="btn-outline-gold text-xs interactive"
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'menu' })}
        >
          Sfoglia il Menu
        </button>
      </div>
    );
  }

  return (
    <div className="order-step-container">
      <div className="mb-6">
        <p className="order-label mb-1">Il tuo ordine</p>
        <h2 className="order-heading">Carrello</h2>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {state.items.map((item) => (
          <div key={item.cartId} className="order-cart-row">
            <img src={item.image} alt={item.name} className="order-cart-img" />
            <div className="flex-1 min-w-0">
              <p className="font-playfair text-cream text-base leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</p>
              {item.specialRequest && (
                <p className="font-geist text-[10px] text-gold/60 mt-0.5 truncate" style={{ fontFamily: "'Geist', sans-serif" }}>
                  {item.specialRequest}
                </p>
              )}
              <p className="font-playfair text-gold text-base mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                €{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="order-qty-ctrl order-qty-ctrl--sm">
                <button
                  type="button"
                  className="interactive"
                  onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { cartId: item.cartId, qty: item.quantity - 1 } })}
                >
                  <Minus size={11} />
                </button>
                <span className="font-geist text-cream text-sm w-5 text-center" style={{ fontFamily: "'Geist', sans-serif" }}>{item.quantity}</span>
                <button
                  type="button"
                  className="interactive"
                  onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { cartId: item.cartId, qty: item.quantity + 1 } })}
                >
                  <Plus size={11} />
                </button>
              </div>
              <button
                type="button"
                className="interactive text-cream/30 hover:text-red-400 transition-colors"
                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.cartId })}
                aria-label="Rimuovi"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Estimated time */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-md mb-5" style={{ background: 'rgba(201,162,39,0.07)', border: '1px solid rgba(201,162,39,0.2)' }}>
        <Clock size={15} className="text-gold flex-shrink-0" />
        <div>
          <p className="font-geist text-[9px] uppercase tracking-[0.25em] text-gold/70" style={{ fontFamily: "'Geist', sans-serif" }}>Tempo stimato</p>
          <p className="font-playfair text-cream text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{prepTime}</p>
        </div>
      </div>

      {/* Totals */}
      <div className="order-totals">
        <div className="order-total-row">
          <span>Subtotale</span>
          <span>€{cartTotal.toFixed(2)}</span>
        </div>
        {deliveryFee > 0 && (
          <div className="order-total-row">
            <span>Spese di consegna</span>
            <span>€{deliveryFee.toFixed(2)}</span>
          </div>
        )}
        <div className="h-px my-2" style={{ background: 'rgba(201,162,39,0.2)' }} />
        <div className="order-total-row order-total-row--total">
          <span>Totale</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        className="btn-gold w-full mt-5 text-sm interactive"
        onClick={() => dispatch({ type: 'SET_STEP', payload: 'checkout' })}
      >
        Procedi al Checkout
      </button>

      <button
        type="button"
        className="w-full mt-3 text-center font-geist text-[10px] uppercase tracking-[0.2em] text-cream/35 hover:text-cream/60 transition-colors interactive"
        style={{ fontFamily: "'Geist', sans-serif" }}
        onClick={() => dispatch({ type: 'SET_STEP', payload: 'menu' })}
      >
        Aggiungi altri prodotti
      </button>
    </div>
  );
}
