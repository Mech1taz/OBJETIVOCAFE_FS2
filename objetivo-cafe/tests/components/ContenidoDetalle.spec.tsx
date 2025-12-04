import '@testing-library/jest-dom'; // Para evitar el error de toBeInTheDocument
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ContenidoDetalleProducto } from '../../src/components/ContenidoDetalleProducto';
import type { Product } from '../../src/types';
import React from 'react';

const productoMock: Product = {
    id: 1, 
    nombre: 'Café Detalle', 
    precio: 9990, 
    tipo: 'cafe', 
    opciones: ['Grano'], 
    imagen: 'img/test.png', 
    descripcion: 'Desc',
    stock: 20 
};

describe('Componente: ContenidoDetalleProducto', () => {
    it('debe mostrar el precio y el botón de añadir', () => {
        // 'vi.fn()' es una función falsa para simular el click
        const funcionFalsa = vi.fn(); 

        render(
            <BrowserRouter>
                <ContenidoDetalleProducto producto={productoMock} alAgregar={funcionFalsa} />
            </BrowserRouter>
        );

        // Verificamos que esté el botón
        const boton = screen.getByRole('button', { name: /añadir al carrito/i });
        expect(boton).toBeInTheDocument();

        // Verificamos el precio
        expect(screen.getByText(/\$9.990/)).toBeInTheDocument();
    });
});