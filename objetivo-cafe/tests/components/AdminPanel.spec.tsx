import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../../src/components/layout/AdminLayout';
import { AdminProductos } from '../../src/pages/Admin/AdminProductos';
import { AdminResumen } from '../../src/pages/Admin/AdminResumen';
import { AdminUsuarios } from '../../src/pages/Admin/AdminUsuarios';
import React from 'react';

vi.mock('../../src/hooks/useProducts', () => ({
    useProducts: () => ({
        products: [
            // Agregamos stock aquí abajo 👇
            { id: 1, nombre: 'Café Mock Admin', precio: 10000, tipo: 'cafe', opciones: [], stock: 50 }
        ],
        refreshProducts: vi.fn()
    })
}));

vi.mock('../../src/utils/authUtils', () => ({
    getUsers: () => [
        { nombre: 'Cliente Test', email: 'cliente@test.com' }
    ]
}));

vi.mock('../../src/utils/cartUtils', () => ({
    getSalesHistory: () => []
}));

describe('PANEL DE ADMINISTRACIÓN', () => {

    // Prueba 1: Verificar que la Barra Lateral (Sidebar) se renderiza
    it('debe mostrar el menú lateral con las opciones correctas', () => {
        render(
            <BrowserRouter>
                <AdminLayout />
            </BrowserRouter>
        );
        // Buscamos los enlaces del menú
        expect(screen.getByText(/Resumen/i)).toBeInTheDocument();
        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
        expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
        expect(screen.getByText(/Ventas/i)).toBeInTheDocument();
    });

    // Prueba 2: Verificar el Resumen General
    it('debe mostrar las tarjetas de estadísticas en el Resumen', () => {
        render(<AdminResumen />);
        
        // Verificamos que aparezcan los títulos de las tarjetas
        expect(screen.getByText('Usuarios Registrados')).toBeInTheDocument();
        expect(screen.getByText('Total Productos')).toBeInTheDocument();
        expect(screen.getByText('Ventas Totales')).toBeInTheDocument();
    });

    // Prueba 3: Verificar la Tabla de Productos
    it('debe listar los productos en la tabla de administración', () => {
        render(<AdminProductos />);
        
        // Debe aparecer el producto que "mockeamos" arriba
        expect(screen.getByText('Café Mock Admin')).toBeInTheDocument();
        expect(screen.getByText('$10.000')).toBeInTheDocument();
    });

    // Prueba 4: Interacción - Botón Agregar Producto
    it('debe mostrar el formulario al hacer clic en Agregar Producto', () => {
        render(<AdminProductos />);
        
        // 1. Buscamos el botón
        const botonAgregar = screen.getByText(/\+ Agregar Producto/i);
        
        // 2. Hacemos clic
        fireEvent.click(botonAgregar);
        
        // 3. Verificamos que aparezca el título del formulario
        expect(screen.getByText('Nuevo Producto')).toBeInTheDocument();
        expect(screen.getByText('Ruta Imagen')).toBeInTheDocument();
    });

    // Prueba 5: Verificar lista de Usuarios
    it('debe mostrar la lista de usuarios registrados', () => {
        render(<AdminUsuarios />);
        
        // Debe aparecer el usuario del mock
        expect(screen.getByText('Cliente Test')).toBeInTheDocument();
        expect(screen.getByText('cliente@test.com')).toBeInTheDocument();
    });

});