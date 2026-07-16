import { ShoppingBag, Home } from 'lucide-react';
import { useOrder } from './OrderContext';

export default function TypeSelector() {
  const { dispatch } = useOrder();

  return (
    <div className="order-step-container">
      <div className="text-center mb-10">
        <p className="order-label mb-3">Come desideri ricevere il tuo ordine?</p>
        <h2 className="order-heading">Scegli il Servizio</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto">
        <button
          type="button"
          className="order-type-card interactive group"
          onClick={() => dispatch({ type: 'SET_TYPE', payload: 'takeaway' })}
        >
          <div className="order-type-icon" style={{ background: 'rgba(201,162,39,0.12)', borderColor: 'rgba(201,162,39,0.4)' }}>
            <ShoppingBag size={28} className="text-gold" />
          </div>
          <h3 className="order-type-title">Takeaway</h3>
          <p className="order-type-sub">Ritiro in pizzeria</p>
          <p className="order-type-desc">
            Ordina ora, passa a ritirare.<br />
            Pronto in 20–30 min.
          </p>
          <div className="order-type-cta">Seleziona</div>
        </button>

        <button
          type="button"
          className="order-type-card interactive group"
          onClick={() => dispatch({ type: 'SET_TYPE', payload: 'delivery' })}
        >
          <div className="order-type-icon" style={{ background: 'rgba(232,197,71,0.12)', borderColor: 'rgba(232,197,71,0.4)' }}>
            <Home size={28} style={{ color: '#e8c547' }} />
          </div>
          <h3 className="order-type-title">Delivery</h3>
          <p className="order-type-sub">Consegna a domicilio</p>
          <p className="order-type-desc">
            Ti portiamo la pizza a casa.<br />
            +€2.00 spese di consegna.
          </p>
          <div className="order-type-cta" style={{ color: '#e8c547', borderColor: '#e8c547' }}>Seleziona</div>
        </button>
      </div>
    </div>
  );
}
