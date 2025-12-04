import type { CartItem, Product } from '../types';

const CART_KEY = 'carrito-objetivo';
const HISTORY_KEY = 'historial-ventas';

// --- OBTENER ---
export const getCart = (): CartItem[] => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const getSalesHistory = (): CartItem[][] => {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
};

// --- GUARDAR ---
export const saveCart = (cart: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// --- AGREGAR (Faltaba) ---
export const addToCart = (product: Product, opcion: string, cantidad: number) => {
    const cart = getCart();
    const index = cart.findIndex(i => i.product.id === product.id && i.opcionSeleccionada === opcion);

    if (index >= 0) {
        cart[index].cantidad += cantidad;
    } else {
        cart.push({ product, opcionSeleccionada: opcion, cantidad });
    }
    saveCart(cart);
};

// --- ELIMINAR (Faltaba) ---
export const removeFromCart = (productId: number, opcion: string) => {
    const cart = getCart();
    const newCart = cart.filter(i => !(i.product.id === productId && i.opcionSeleccionada === opcion));
    saveCart(newCart);
};

// --- LIMPIAR (Faltaba) ---
export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
};

// --- CÁLCULOS ---
export const calculateTotal = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + (item.product.precio * item.cantidad), 0);
};

// --- FINALIZAR ---
export const finalizePurchase = (cart: CartItem[]) => {
    const history = getSalesHistory();
    history.push(cart);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    clearCart();
};