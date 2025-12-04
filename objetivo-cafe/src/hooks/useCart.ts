import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '../types';

// Importamos las utilidades necesarias
import { getCart, saveCart, calculateTotal, clearCart, addToCart, removeFromCart, finalizePurchase } from '../utils/cartUtils'; // Agregué finalizePurchase por si acaso, aunque usaremos createOrder
import { createOrder, getStock } from '../utils/orderUtils';
import { getCurrentUser } from '../utils/authUtils';

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>(getCart());
    const [total, setTotal] = useState(0);

    const refreshCart = useCallback(() => {
        const savedCart = getCart();
        setCart(savedCart);
        setTotal(calculateTotal(savedCart));
    }, []);

    useEffect(() => {
        refreshCart();
        
        window.addEventListener('storage', refreshCart);
        return () => window.removeEventListener('storage', refreshCart);
    }, [refreshCart]);

    // --- AGREGAR CON VALIDACIÓN DE STOCK ---
    const addProduct = (product: Product, opcion: string, cantidad: number) => {
        const stockActual = getStock(product.id);
        
        const itemEnCarrito = cart.find(i => i.product.id === product.id);
        const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

        if ((cantidad + cantidadEnCarrito) > stockActual) {
            alert(`¡No hay suficiente stock! Solo quedan ${stockActual} unidades disponibles.`);
            return;
        }

        addToCart(product, opcion, cantidad);
        refreshCart();
        alert("Producto agregado");
    };

    // --- ELIMINAR PRODUCTO ---
    const removeProduct = (productId: number, opcion: string) => {
        removeFromCart(productId, opcion);
        refreshCart();
    };

    // --- COMPRAR ---
    const buy = (): boolean => {
        if (cart.length === 0) return false;
        
        const user = getCurrentUser();
        if (!user) {
            alert("Debes iniciar sesión para comprar.");
            return false; 
        }

        // 1. Crear la orden (Esto descuenta el stock internamente)
        const orderId = createOrder(cart, user.email, calculateTotal(cart));
        
        // 2. Guardar la 'ultimaCompra' para que la Boleta tenga qué mostrar
        localStorage.setItem('ultimaCompra', JSON.stringify(cart));

        // 3. Limpiar todo
        clearCart(); // Vaciar localStorage del carrito
        setCart([]); // Vaciar estado visual
        setTotal(0);
        
        alert(`¡Compra exitosa! Tu código de seguimiento es: ${orderId}`);
    

        return true; 
    };

    return { 
        cart, 
        total,
        totalItems: cart.reduce((sum, item) => sum + item.cantidad, 0), // Agregado para que el Navbar no falle
        totalPrice: total, // Agregado por compatibilidad
        addProduct, 
        removeProduct, 
        buy,
        refreshCart
    };
};