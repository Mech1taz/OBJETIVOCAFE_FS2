import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { TarjetaProducto } from '../../src/components/TarjetaProducto';
import type { Product } from '../../src/types';
import React from 'react';

const productoMock: Product = {
    id: 99,
    nombre: 'Café Test Visual', // <--- EL NOMBRE ES ESTE
    precio: 5000,
    tipo: 'cafe',
    opciones: [],
    imagen: 'img/test.png',
    descripcion: 'Descripción de prueba',
    stock: 10
};

describe('Componente: TarjetaProducto', () => {
    it('debe renderizar nombre y precio', async () => {
        render(
            <BrowserRouter>
                <TarjetaProducto producto={productoMock} />
            </BrowserRouter>
        );
        
        // CORREGIDO: Ahora buscamos el mismo nombre que pusimos en el mock
        expect(await screen.findByText('Café Test Visual')).toBeInTheDocument();
        
        // Verificamos el precio
        expect(screen.getByText(/\$5.000/)).toBeInTheDocument();
    });
});