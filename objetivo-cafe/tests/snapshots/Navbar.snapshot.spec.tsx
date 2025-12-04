import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../../src/components/Navbar';
import React from 'react';

describe('Snapshot: Navbar', () => {
    it('debe coincidir con el diseño esperado', () => {
        const { container } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        expect(container).toMatchSnapshot();
    });
});