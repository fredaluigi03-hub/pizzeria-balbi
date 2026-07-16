import { useEffect } from 'react';
import { X, ChevronLeft, ShoppingBag, Home, Truck } from 'lucide-react';
import { useOrder } from './OrderContext';
import TypeSelector from './TypeSelector';
import MenuBrowser from './MenuBrowser';
import CartView from './CartView';
import CheckoutForm from './CheckoutForm';
import PaymentStep from './PaymentStep';
import Confirmation from './Confirmation';
import type { OrderStep } from './types';

const STEPS: { id: OrderStep; label: string }[] = [
  { id: 'type', label: 'Tipo' },
  { id: 'menu', label: 'Menu' },
  { id: 'cart', label: 'Carrello' },
  { id: 'checkout', label: 'Dati' },
  { id: 'payment', label: 'Pagamento' },
  { id: 'confirmation', label: 'Conferma' },
];

const BACK_MAP: Partial<Record<OrderStep, OrderStep>> = {
  menu: 'type',
  cart: 'menu',
  checkout: 'cart',
  payment: 'checkout',
};

function StepContent() {
  const { state } = useOrder();
  switch (state.step) {
    case 'type': return <TypeSelector />;
    case 'menu': return <MenuBrowser />;
    case 'cart': return <CartView />;
    case 'checkout': return <CheckoutForm />;
    case 'payment': return <PaymentStep />;
    case 'confirmation': return <Confirmation />;
  }
}

export default function OrderingModal() {
  const { state, dispatch, cartCount } = useOrder();

  useEffect(() => {
    document.body.style.overflow = state.isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [state.isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.isOpen && state.step !== 'confirmation') {
        dispatch({ type: 'CLOSE' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.isOpen, state.step, dispatch]);

  if (!state.isOpen) return null;

  const stepIndex = STEPS.findIndex((s) => s.id === state.step);
  const showProgress = state.step !== 'confirmation';
  const backStep = BACK_MAP[state.step];
  const isFullMenu = state.step === 'menu';

  const OrderTypeLabel = state.orderType === 'delivery'
    ? <><Truck size={11} className="text-gold" />Delivery</>
    : state.orderType === 'takeaway'
    ? <><ShoppingBag size={11} className="text-gold" />Takeaway</>
    : null;

  return (
    <div className="order-modal-backdrop" onClick={() => state.step !== 'confirmation' && dispatch({ type: 'CLOSE' })}>
      <div
        className="order-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Sistema di ordinazione"
      >
        {/* Header */}
        <div className="order-modal-header">
          <div className="flex items-center gap-3">
            {backStep && (
              <button
                type="button"
                className="order-back-btn interactive"
                onClick={() => dispatch({ type: 'SET_STEP', payload: backStep })}
                aria-label="Indietro"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <div>
              <p className="font-geist text-[8px] uppercase tracking-[0.35em] text-gold/60" style={{ fontFamily: "'Geist', sans-serif" }}>
                Pizzeria Balbi
              </p>
              <h3 className="font-playfair text-cream text-lg leading-none mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {state.step === 'type' && 'Nuovo Ordine'}
                {state.step === 'menu' && 'Il Menu'}
                {state.step === 'cart' && 'Carrello'}
                {state.step === 'checkout' && 'I Tuoi Dati'}
                {state.step === 'payment' && 'Pagamento'}
                {state.step === 'confirmation' && 'Ordine Confermato'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {OrderTypeLabel && (
              <div className="order-type-pill interactive">
                {OrderTypeLabel}
              </div>
            )}
            {state.step === 'menu' && cartCount > 0 && (
              <button
                type="button"
                className="order-cart-pill interactive"
                onClick={() => dispatch({ type: 'SET_STEP', payload: 'cart' })}
              >
                <Home size={12} />
                <span>{cartCount}</span>
              </button>
            )}
            {state.step !== 'confirmation' && (
              <button
                type="button"
                className="order-close-btn interactive"
                onClick={() => dispatch({ type: 'CLOSE' })}
                aria-label="Chiudi"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {showProgress && (
          <div className="order-progress-bar" aria-hidden="true">
            <div
              className="order-progress-fill"
              style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Content */}
        <div className={`order-modal-body${isFullMenu ? ' order-modal-body--menu' : ''}`}>
          <StepContent />
        </div>
      </div>
    </div>
  );
}
