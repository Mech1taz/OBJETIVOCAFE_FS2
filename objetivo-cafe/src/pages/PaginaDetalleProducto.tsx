import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ContenidoDetalleProducto } from '../components/ContenidoDetalleProducto';

export const PaginaDetalleProducto: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const idProducto = parseInt(id || '0');

    // 1. Hooks
    const { getProductById, loading, error, refreshProducts } = useProducts(); 
    const { addProduct, cart } = useCart();

    useEffect(() => {
        refreshProducts();
    }, []);

    // --- SPINNERS Y ERRORES ---
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div>
                    <p className="mt-2 text-muted">Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">
                    <h4>Error de Conexión</h4>
                    <p>{error}</p>
                </div>
                <Link to="/" className="btn btn-outline-secondary">Volver al Inicio</Link>
            </div>
        );
    }

    // 2. Producto Base (La verdad absoluta de la BD)
    const productoBase = getProductById(idProducto);

    if (!productoBase) {
        return (
            <div className="container mt-5 text-center">
                <h2>Producto no encontrado </h2>
                <Link to="/cafes" className="btn btn-primary">Volver al Catálogo</Link>
            </div>
        );
    }
    const itemEnCarrito = cart.find(item => Number(item.product.id) === Number(productoBase.id));
    const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
    const stockVisual = Math.max(0, productoBase.stock - cantidadEnCarrito);
    const productoParaMostrar = {
        ...productoBase,
        stock: stockVisual 
    };

    return (
        <ContenidoDetalleProducto 
            producto={productoParaMostrar} 
            alAgregar={(p, opcion, cant) => addProduct(productoBase, opcion, cant)} 
        />
    );
};