import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { OrderState, OrderAction, CustomerInfo } from './types';

const DELIVERY_FEE = 2;

const defaultCustomer: CustomerInfo = { name: '', phone: '', email: '', address: '', notes: '' };

const initialState: OrderState = {
  isOpen: false,
  orderType: null,
  step: 'type',
  items: [],
  customer: defaultCustomer,
  payment: null,
  orderId: null,
};

function reducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        isOpen: true,
        orderType: action.payload,
        step: action.payload ? 'menu' : 'type',
      };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'SET_TYPE':
      return { ...state, orderType: action.payload, step: 'menu' };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) =>
          i.menuItemId === action.payload.menuItemId &&
          i.specialRequest === action.payload.specialRequest
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cartId === existing.cartId ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, cartId: `${action.payload.menuItemId}-${Date.now()}` },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.cartId !== action.payload) };
    case 'UPDATE_QTY':
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.cartId !== action.payload.cartId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.payload.cartId ? { ...i, quantity: action.payload.qty } : i
        ),
      };
    case 'SET_CUSTOMER':
      return { ...state, customer: action.payload };
    case 'SET_PAYMENT':
      return { ...state, payment: action.payload };
    case 'CONFIRM_ORDER':
      return {
        ...state,
        step: 'confirmation',
        orderId: 'BLB-' + Date.now().toString(36).toUpperCase().slice(-6),
      };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

type ContextValue = {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
  cartTotal: number;
  cartCount: number;
  deliveryFee: number;
};

const OrderContext = createContext<ContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cartTotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const deliveryFee = state.orderType === 'delivery' && cartTotal > 0 ? DELIVERY_FEE : 0;

  return (
    <OrderContext.Provider value={{ state, dispatch, cartTotal, cartCount, deliveryFee }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
}
