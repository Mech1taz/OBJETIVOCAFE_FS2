import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContenidoMetodos } from '../../src/components/ContenidoMetodos';
import React from 'react';

describe('Componente: ContenidoMetodos', () => {
    it('debe mostrar los 3 métodos de preparación principales', () => {
        render(<ContenidoMetodos />);

        // Buscamos los títulos de las tarjetas
        expect(screen.getByText('Prensa Francesa')).toBeInTheDocument();
        expect(screen.getByText('V60 / Filtro')).toBeInTheDocument();
        expect(screen.getByText('Moka Italiana')).toBeInTheDocument();
    });
});