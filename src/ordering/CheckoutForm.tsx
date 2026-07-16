import { useState } from 'react';
import { User, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { useOrder } from './OrderContext';
import type { CustomerInfo } from './types';

type Field = { key: keyof CustomerInfo; label: string; icon: React.ElementType; type?: string; placeholder: string; required?: boolean };

export default function CheckoutForm() {
  const { state, dispatch } = useOrder();
  const [info, setInfo] = useState<CustomerInfo>(state.customer);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const isDelivery = state.orderType === 'delivery';

  const fields: Field[] = [
    { key: 'name', label: 'Nome e Cognome', icon: User, placeholder: 'Mario Rossi', required: true },
    { key: 'phone', label: 'Telefono', icon: Phone, type: 'tel', placeholder: '+39 320 123 4567', required: true },
    { key: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'mario@email.com', required: true },
    ...(isDelivery
      ? [{ key: 'address' as keyof CustomerInfo, label: 'Indirizzo di Consegna', icon: MapPin, placeholder: 'Via Roma 1, Atripalda (AV)', required: true }]
      : []),
    { key: 'notes', label: 'Note sull\'Ordine', icon: FileText, placeholder: 'Citofonare al secondo piano...', required: false },
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!info.name.trim()) newErrors.name = 'Campo obbligatorio';
    if (!info.phone.trim()) newErrors.phone = 'Campo obbligatorio';
    if (!info.email.trim()) newErrors.email = 'Campo obbligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) newErrors.email = 'Email non valida';
    if (isDelivery && !info.address.trim()) newErrors.address = 'Campo obbligatorio per la consegna';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch({ type: 'SET_CUSTOMER', payload: info });
    dispatch({ type: 'SET_STEP', payload: 'payment' });
  };

  return (
    <div className="order-step-container">
      <div className="mb-7">
        <p className="order-label mb-1">I tuoi dati</p>
        <h2 className="order-heading">Checkout</h2>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-4">
          {fields.map(({ key, label, icon: Icon, type, placeholder, required }) => (
            <div key={key}>
              <label className="order-field-label" htmlFor={`field-${key}`}>
                <Icon size={12} className="text-gold/60" />
                {label}
                {required && <span className="text-gold ml-0.5">*</span>}
              </label>
              {key === 'notes' ? (
                <textarea
                  id={`field-${key}`}
                  className={`order-textarea mt-1${errors[key] ? ' order-input--error' : ''}`}
                  placeholder={placeholder}
                  rows={3}
                  value={info[key]}
                  onChange={(e) => setInfo((p) => ({ ...p, [key]: e.target.value }))}
                />
              ) : (
                <input
                  id={`field-${key}`}
                  type={type ?? 'text'}
                  className={`order-input mt-1${errors[key] ? ' order-input--error' : ''}`}
                  placeholder={placeholder}
                  value={info[key]}
                  onChange={(e) => setInfo((p) => ({ ...p, [key]: e.target.value }))}
                />
              )}
              {errors[key] && (
                <p className="font-geist text-[10px] text-red-400 mt-1" style={{ fontFamily: "'Geist', sans-serif" }}>{errors[key]}</p>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="btn-gold w-full mt-7 text-sm interactive">
          Continua al Pagamento
        </button>
      </form>
    </div>
  );
}
