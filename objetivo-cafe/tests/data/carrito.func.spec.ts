import { describe, it, expect, beforeEach } from 'vitest';
import { 
    calculateTotal, 
    getCart, 
    addToCart, 
    removeFromCart, 
    finalizePurchase, 
    clearCart,
    getSalesHistory
} from '../../src/utils/cartUtils';
import type { CartItem, Product } from '../../src/types';

// Mock basado en tu ID 1
const PRODUCTO_PRUEBA: Product = { 
    id: 1, 
    nombre: 'Café de Colombia 250g', 
    precio: 12990, 
    tipo: 'cafe', 
    opciones: ['Grano entero'], 
    imagen: 'img/cafe_colombia.png',
    stock: 20
};

describe('LOGICA_DEL_CARRITO', () => {
    beforeEach(() => {
        clearCart();
        localStorage.removeItem('historial-ventas');
    });

    // 1. Cálculo del Total (AQUÍ ESTABA EL ERROR)
    it('debe_calcular_el_total_correctamente', () => {
        // Borramos 'precio: 12990' de aquí abajo porque ya está dentro de 'product'
        const item1: CartItem = { 
            product: PRODUCTO_PRUEBA, 
            opcionSeleccionada: 'Grano entero', 
            cantidad: 2 
        };
        
        // Borramos 'precio: 10000' del objeto principal
        const item2: CartItem = { 
            product: { ...PRODUCTO_PRUEBA, id: 2, precio: 10000 }, 
            opcionSeleccionada: 'Molido', 
            cantidad: 1 
        };

        // Cálculo esperado: (12990 * 2) + (10000 * 1) = 35980
        const total = calculateTotal([item1, item2]);
        expect(total).toBe(35980);
    });

    // ... (El resto de las pruebas siguen igual y están correctas) ...

    it('debe_agregar_producto_nuevo_al_carrito', () => {
        addToCart(PRODUCTO_PRUEBA, 'Grano entero', 1);
        const carrito = getCart();
        expect(carrito.length).toBe(1);
        expect(carrito[0].product.nombre).toBe('Café de Colombia 250g');
    });

    it('debe_sumar_cantidad_si_ya_existe', () => {
        addToCart(PRODUCTO_PRUEBA, 'Grano entero', 2);
        addToCart(PRODUCTO_PRUEBA, 'Grano entero', 3);
        const carrito = getCart();
        expect(carrito[0].cantidad).toBe(5);
    });

    it('debe_eliminar_producto_del_carrito', () => {
        addToCart(PRODUCTO_PRUEBA, 'Grano entero', 1);
        removeFromCart(1, 'Grano entero'); 
        expect(getCart().length).toBe(0);
    });

    it('debe_guardar_historial_y_vaciar_carrito', () => {
        addToCart(PRODUCTO_PRUEBA, 'Grano entero', 1);
        finalizePurchase(getCart());
        expect(getCart().length).toBe(0);
        expect(getSalesHistory().length).toBe(1);
    });
});