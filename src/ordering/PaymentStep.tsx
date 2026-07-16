import { CreditCard, Smartphone, Banknote, Store } from 'lucide-react';
import { useOrder } from './OrderContext';
import type { PaymentMethod } from './types';

const methods: { id: PaymentMethod; label: string; sub: string; icon: React.ElementType; accent: string }[] = [
  { id: 'card', label: 'Carta di Credito / Debito', sub: 'Visa, Mastercard, Amex', icon: CreditCard, accent: '#c9a227' },
  { id: 'apple_pay', label: 'Apple Pay', sub: 'Paga con Touch ID o Face ID', icon: Smartphone, accent: '#f0ece4' },
  { id: 'google_pay', label: 'Google Pay', sub: 'Paga con il tuo dispositivo Android', icon: Smartphone, accent: '#4CAF50' },
  { id: 'cash', label: 'Contanti', sub: 'Paga alla consegna / al ritiro', icon: Banknote, accent: '#c9a227' },
  { id: 'pay_at_pickup', label: 'Paga al Ritiro', sub: 'Contanti o carta direttamente in pizzeria', icon: Store, accent: '#c9a227' },
];

export default function PaymentStep() {
  const { state, dispatch, cartTotal, deliveryFee } = useOrder();
  const total = cartTotal + deliveryFee;

  const handleConfirm = () => {
    if (!state.payment) return;
    dispatch({ type: 'CONFIRM_ORDER' });
  };

  return (
    <div className="order-step-container">
      <div className="mb-7">
        <p className="order-label mb-1">Scegli come pagare</p>
        <h2 className="order-heading">Pagamento</h2>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {methods.map((m) => {
          const Icon = m.icon;
          const active = state.payment === m.id;
          return (
            <button
              key={m.id}
              type="button"
              className="order-pay-method interactive"
              data-active={active}
              onClick={() => dispatch({ type: 'SET_PAYMENT', payload: m.id })}
              style={active ? { borderColor: m.accent, background: `${m.accent}12` } : undefined}
            >
              <div
                className="order-pay-icon"
                style={{
                  background: `${m.accent}18`,
                  borderColor: `${m.accent}44`,
                }}
              >
                <Icon size={18} style={{ color: m.accent }} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-playfair text-cream text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{m.label}</p>
                <p className="font-geist text-cream/45 text-[11px] mt-0.5" style={{ fontFamily: "'Geist', sans-serif" }}>{m.sub}</p>
              </div>
              <div
                className="order-pay-radio"
                style={active ? { borderColor: m.accent, background: m.accent } : undefined}
              />
            </button>
          );
        })}
      </div>

      {/* Total recap */}
      <div className="order-totals mb-6">
        <div className="order-total-row--total flex justify-between">
          <span className="font-playfair text-cream text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Totale da pagare</span>
          <span className="font-playfair text-gold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>€{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Stripe-ready notice */}
      <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-md" style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.15)' }}>
        <CreditCard size={13} className="text-gold/50" />
        <p className="font-geist text-[10px] text-cream/35 leading-relaxed" style={{ fontFamily: "'Geist', sans-serif" }}>
          I pagamenti con carta saranno elaborati in sicurezza tramite Stripe.
        </p>
      </div>

      <button
        type="button"
        className="btn-gold w-full text-sm interactive"
        disabled={!state.payment}
        style={!state.payment ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
        onClick={handleConfirm}
      >
        Conferma Ordine — €{total.toFixed(2)}
      </button>
    </div>
  );
}
