import type { CartItem, Order, OrderStatus } from '../types';
import { productsBase } from '../data/productsBase'; // Asume que productsBase está exportado

const ORDERS_KEY = 'ordenes-compras';
const STOCK_KEY = 'stock-actualizado';

// --- GESTIÓN DE STOCK ---

/** Obtiene el stock actual, priorizando localStorage sobre el valor base. */
export const getStock = (productId: number): number => {
    const storedStock = JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');
    
    // 1. Si hay un stock guardado (cambiado), lo usamos.
    if (storedStock[productId] !== undefined) {
        return storedStock[productId];
    }
    
    // 2. Si no hay cambios guardados, buscamos el valor base.
    const productoBase = productsBase.find(p => p.id === productId);
    
    // 3. Devolvemos el stock base, o 0 si no se encuentra.
    return productoBase ? productoBase.stock : 0;
};

/** Resta stock al comprar y guarda el nuevo inventario. */
export const updateStockAfterPurchase = (cart: CartItem[]) => {
    const storedStock = JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');

    cart.forEach(item => {
        const currentStock = getStock(item.product.id);
        const newStock = Math.max(0, currentStock - item.cantidad);
        storedStock[item.product.id] = newStock;
    });

    localStorage.setItem(STOCK_KEY, JSON.stringify(storedStock));
};

// --- GESTIÓN DE ÓRDENES (SEGUIMIENTO) ---

export const getOrders = (): Order[] => {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
};

export const createOrder = (cart: CartItem[], userEmail: string, total: number) => {
    const orders = getOrders();
    
    const newOrder: Order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        fecha: new Date().toLocaleDateString('es-CL'),
        items: cart,
        total: total,
        usuarioEmail: userEmail,
        estado: 'Pagado'
    };

    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    
    // Descuenta el stock inmediatamente
    updateStockAfterPurchase(cart);
    
    return newOrder.id;
};

/** Admin cambia el estado de la orden. */
export const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index >= 0) {
        orders[index].estado = newStatus;
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
};