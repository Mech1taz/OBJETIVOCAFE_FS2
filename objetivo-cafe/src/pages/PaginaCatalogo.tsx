import React from 'react';
import { TarjetaProducto } from '../components/TarjetaProducto';
import { useProducts } from '../hooks/useProducts';
import type { ProductType } from '../types';

interface Props { tipo: ProductType; }

export const PaginaCatalogo: React.FC<Props> = ({ tipo }) => {
    const { products } = useProducts();
    
    // Filtramos para mostrar solo Cafés, Cafeteras o Accesorios según corresponda
    const productosFiltrados = products.filter(p => p.tipo === tipo);
    
    // Título dinámico (ej: "Nuestros Cafés", "Nuestras Cafeteras")
    const titulo = tipo === 'cafe' ? 'Cafés' : (tipo.charAt(0).toUpperCase() + tipo.slice(1) + 's');

    return (
        // Contenedor principal con margen superior
        <div className="container mt-4">
            <h1 className="mb-4">Nuestros {titulo}</h1>
            
            {/* Fila de productos */}
            <div className="row">
                {productosFiltrados.map(producto => (
                    <TarjetaProducto key={producto.id} producto={producto} />
                ))}
                
                {productosFiltrados.length === 0 && (
                    <div className="col-12">
                        <p className="alert alert-warning">No hay productos disponibles en esta categoría.</p>
                    </div>
                )}
            </div>
        </div>
    );
};