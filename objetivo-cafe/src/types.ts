// src/types.ts

export type ProductType = 'cafe' | 'cafetera' | 'accesorio';
export type OrderStatus = 'Pagado' | 'Preparando' | 'Enviado' | 'Entregado';

export interface Product {
    id: number;
    nombre: string;
    precio: number;
    tipo: ProductType;
    opciones: string[];
    imagen: string;
    descripcion?: string;
    descripcionLarga?: string;
    notas?: string;
    // NUEVO: Campo de stock
    stock: number; 
}

export interface CartItem {
    product: Product;
    opcionSeleccionada: string;
    cantidad: number;
}

export interface User {
    nombre: string;
    email: string;
    password: string;
    rut?: string;
    role: 'admin' | 'client';
}

// NUEVO: Interfaz para el Seguimiento
export interface Order {
    id: string;          // Código único de la orden (ej: #ORD-123)
    fecha: string;       // Fecha de compra
    items: CartItem[];   // Lo que compró
    total: number;       // Dinero total
    usuarioEmail: string;// Quién lo compró
    estado: OrderStatus; // En qué paso va
}