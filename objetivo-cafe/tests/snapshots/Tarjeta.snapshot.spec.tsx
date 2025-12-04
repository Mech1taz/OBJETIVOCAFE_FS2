import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { TarjetaProducto } from '../../src/components/TarjetaProducto';
import type { Product } from '../../src/types';
import React from 'react'; // Importante para JSX

const PRODUCTO_MOCK: Product = {
    id: 50, 
    nombre: 'Café Snapshot', 
    precio: 5000, 
    tipo: 'cafe', 
    opciones: ['Grano'], 
    imagen: 'img/test.png',
    descripcion: 'Descripción para la foto',
    stock: 10 
};

describe('Snapshot: TarjetaProducto', () => {
    it('debe mantener el diseño visual de la tarjeta', () => {
        const { container } = render(
            <BrowserRouter>
                <TarjetaProducto producto={PRODUCTO_MOCK} />
            </BrowserRouter>
        );
        expect(container).toMatchSnapshot();
    });
});