import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '../types';
// Importamos SweetAlert2 para las notificaciones bonitas
import Swal from 'sweetalert2'; 

import { getCart, calculateTotal, clearCart as clearCartUtil, addToCart, removeFromCart } from '../utils/cartUtils'; 
import { getStock } from '../utils/orderUtils';

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

    // --- AGREGAR PRODUCTO (AHORA CON SWAL) ---
    const addProduct = (product: Product, opcion: string, cantidad: number) => {
        const stockActual = getStock(product.id);
        const itemEnCarrito = cart.find(i => i.product.id === product.id);
        const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

        // Validación de Stock con Alerta Roja
        if ((cantidad + cantidadEnCarrito) > stockActual) {
            Swal.fire({
                icon: 'error',
                title: 'Stock Insuficiente',
                text: `Solo quedan ${stockActual} unidades disponibles de este café.`,
                confirmButtonColor: '#A6634B'
            });
            return;
        }

        addToCart(product, opcion, cantidad);
        refreshCart();

        // ✅ Notificación de Éxito (Se cierra sola en 1.5 segundos)
        Swal.fire({
            icon: 'success',
            title: '¡Agregado!',
            text: 'El producto ya está en tu carrito 🛒',
            showConfirmButton: false, // No hace falta botón
            timer: 1500, // Se va sola en 1.5 seg
            timerProgressBar: true
        });
    };

    // --- ELIMINAR PRODUCTO ---
    const removeProduct = (productId: number, opcion: string) => {
        removeFromCart(productId, opcion);
        refreshCart();
        
        // Opcional: Una pequeña notificación tipo "Toast" en la esquina
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
        Toast.fire({
            icon: 'info',
            title: 'Producto eliminado'
        });
    };

    // --- VACIAR CARRITO ---
    const vaciarCarrito = () => {
        clearCartUtil(); 
        refreshCart();   
    };

    return { 
        cart, 
        total,
        totalItems: cart.reduce((sum, item) => sum + item.cantidad, 0),
        addProduct, 
        removeProduct,
        vaciarCarrito, 
        refreshCart
    };
};