import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { useOrder } from './OrderContext';

const TRACKING_STEPS = [
  { id: 'received', label: 'Ordine ricevuto', sub: 'La tua richiesta è stata confermata' },
  { id: 'preparing', label: 'In preparazione', sub: 'Il pizzaiolo sta preparando il tuo ordine' },
  { id: 'cooking', label: 'In cottura', sub: 'La pizza è nel forno a legna a 485°C' },
  { id: 'ready', label: 'Pronto', sub: 'Quasi pronto — ancora qualche minuto' },
  { id: 'done', label: 'Consegnato / Pronto al ritiro', sub: 'Buon appetito!' },
];

export default function Confirmation() {
  const { state, dispatch, cartTotal, deliveryFee } = useOrder();
  const total = cartTotal + deliveryFee;
  const isDelivery = state.orderType === 'delivery';
  const estTime = isDelivery ? '35–50 min' : '20–30 min';
  const activeStep = 1; // "In preparazione" as initial state

  return (
    <div className="order-step-container">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #b8960c, #e8c547)', boxShadow: '0 0 40px rgba(201,162,39,0.4)' }}>
            <CheckCircle size={36} className="text-[#0f0e0d]" />
          </div>
        </div>
        <h2 className="font-playfair text-cream text-3xl" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}>
          Ordine Confermato!
        </h2>
        <p className="font-geist text-cream/50 text-sm mt-2" style={{ fontFamily: "'Geist', sans-serif" }}>
          Grazie per aver scelto Pizzeria Balbi
        </p>

        <div className="inline-block mt-4 px-6 py-2 rounded-full" style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.35)' }}>
          <span className="font-geist text-[10px] uppercase tracking-[0.3em] text-gold/70" style={{ fontFamily: "'Geist', sans-serif" }}>N° ordine</span>
          <p className="font-playfair text-gold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{state.orderId}</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass rounded-md p-4 flex items-start gap-3">
          <Clock size={16} className="text-gold mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-geist text-[9px] uppercase tracking-[0.22em] text-cream/40" style={{ fontFamily: "'Geist', sans-serif" }}>Tempo stimato</p>
            <p className="font-playfair text-cream text-base mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{estTime}</p>
          </div>
        </div>
        <div className="glass rounded-md p-4 flex items-start gap-3">
          <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-geist text-[9px] uppercase tracking-[0.22em] text-cream/40" style={{ fontFamily: "'Geist', sans-serif" }}>
              {isDelivery ? 'Consegna a' : 'Ritiro in'}
            </p>
            <p className="font-playfair text-cream text-sm mt-0.5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {isDelivery ? state.customer.address || '—' : 'Pizzeria Balbi, Atripalda'}
            </p>
          </div>
        </div>
      </div>

      {/* Order tracking */}
      <div className="mb-6">
        <p className="font-geist text-[9px] uppercase tracking-[0.3em] text-gold/65 mb-4" style={{ fontFamily: "'Geist', sans-serif" }}>
          Stato dell'ordine
        </p>
        <div className="flex flex-col gap-0">
          {TRACKING_STEPS.map((step, i) => {
            const isDone = i < activeStep;
            const isCurrent = i === activeStep;
            return (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: isDone || isCurrent
                        ? 'linear-gradient(135deg, #b8960c, #e8c547)'
                        : 'rgba(255,255,255,0.06)',
                      border: isDone || isCurrent ? 'none' : '1px solid rgba(201,162,39,0.2)',
                    }}
                  >
                    {isDone ? (
                      <CheckCircle size={14} className="text-[#0f0e0d]" />
                    ) : isCurrent ? (
                      <div className="w-3 h-3 rounded-full bg-[#0f0e0d] animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    )}
                  </div>
                  {i < TRACKING_STEPS.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: i < activeStep ? '#c9a227' : 'rgba(201,162,39,0.15)', minHeight: '28px' }} />
                  )}
                </div>
                <div className="pb-4 pt-1">
                  <p
                    className="font-geist text-sm"
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      color: isDone || isCurrent ? '#f0ece4' : 'rgba(240,236,228,0.3)',
                      fontWeight: isCurrent ? 500 : 400,
                    }}
                  >
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="font-geist text-[11px] text-gold/60 mt-0.5" style={{ fontFamily: "'Geist', sans-serif" }}>
                      {step.sub}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order summary */}
      <div className="order-totals mb-6">
        <p className="font-geist text-[9px] uppercase tracking-[0.28em] text-gold/65 mb-3" style={{ fontFamily: "'Geist', sans-serif" }}>
          Riepilogo ordine
        </p>
        {state.items.map((item) => (
          <div key={item.cartId} className="order-total-row">
            <span>{item.quantity}x {item.name}</span>
            <span>€{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="h-px my-2" style={{ background: 'rgba(201,162,39,0.2)' }} />
        {deliveryFee > 0 && (
          <div className="order-total-row"><span>Consegna</span><span>€{deliveryFee.toFixed(2)}</span></div>
        )}
        <div className="order-total-row order-total-row--total">
          <span>Totale pagato</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-center gap-3 p-4 rounded-md mb-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,162,39,0.15)' }}>
        <Phone size={15} className="text-gold/60 flex-shrink-0" />
        <p className="font-geist text-cream/50 text-xs leading-relaxed" style={{ fontFamily: "'Geist', sans-serif" }}>
          Per qualsiasi necessità chiama{' '}
          <a href="tel:+393773727225" className="text-gold interactive">+39 377 372 7225</a>
        </p>
      </div>

      <button
        type="button"
        className="btn-outline-gold w-full text-xs interactive"
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Torna alla Home
      </button>
    </div>
  );
}
