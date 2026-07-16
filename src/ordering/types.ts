export type OrderType = 'takeaway' | 'delivery';
export type MenuCategory = 'pizze' | 'dolci' | 'birre';
export type PaymentMethod = 'card' | 'apple_pay' | 'google_pay' | 'cash' | 'pay_at_pickup';
export type OrderStep = 'type' | 'menu' | 'cart' | 'checkout' | 'payment' | 'confirmation';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients?: string;
  price: number;
  category: MenuCategory;
  image: string;
  badge?: string;
}

export interface CartItem {
  cartId: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: MenuCategory;
  specialRequest?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface OrderState {
  isOpen: boolean;
  orderType: OrderType | null;
  step: OrderStep;
  items: CartItem[];
  customer: CustomerInfo;
  payment: PaymentMethod | null;
  orderId: string | null;
}

export type OrderAction =
  | { type: 'OPEN'; payload: OrderType | null }
  | { type: 'CLOSE' }
  | { type: 'SET_TYPE'; payload: OrderType }
  | { type: 'SET_STEP'; payload: OrderStep }
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'cartId'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { cartId: string; qty: number } }
  | { type: 'SET_CUSTOMER'; payload: CustomerInfo }
  | { type: 'SET_PAYMENT'; payload: PaymentMethod }
  | { type: 'CONFIRM_ORDER' }
  | { type: 'RESET' };
