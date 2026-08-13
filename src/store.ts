import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  option?: string;
}

interface AppState {
  theme: 'dark' | 'light';
  language: 'th' | 'en';
  user: User | null;
  cart: CartItem[];
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (lang: 'th' | 'en') => void;
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  language: 'th',
  user: null,
  cart: [],
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setUser: (user) => set({ user }),
  addToCart: (item) => set((state) => {
    // Generate a unique ID that includes the option
    const uniqueId = item.option ? `${item.id}-${item.option}` : item.id;
    const existing = state.cart.find(i => i.id === uniqueId);
    if (existing) {
      return { cart: state.cart.map(i => i.id === uniqueId ? { ...i, quantity: i.quantity + item.quantity } : i) };
    }
    return { cart: [...state.cart, { ...item, id: uniqueId }] };
  }),
  removeFromCart: (cartItemId) => set((state) => ({
    cart: state.cart.filter(i => i.id !== cartItemId)
  })),
  clearCart: () => set({ cart: [] }),
}));
