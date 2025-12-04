import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ContenidoDetalleProducto } from '../components/ContenidoDetalleProducto';

export const PaginaDetalleProducto: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const idProducto = parseInt(id || '0');

    // 1. Obtenemos los datos y el estado de carga del Hook
    const { getProductById, loading, error, refreshProducts } = useProducts(); 
    const { addProduct } = useCart();

    // Forzamos una recarga de datos al entrar, por si acaso
    useEffect(() => {
        refreshProducts();
    }, []);

    // 2. MIENTRAS CARGA: Mostrar spinner (Evita la pantalla blanca)
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2 text-muted">Cargando producto...</p>
                </div>
            </div>
        );
    }

    // 3. SI HAY ERROR (Ej: Backend apagado)
    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">
                    <h4>Error de Conexión</h4>
                    <p>{error}</p>
                    <small>Verifica que el servidor Java (Spring Boot) esté corriendo.</small>
                </div>
                <Link to="/" className="btn btn-outline-secondary">Volver al Inicio</Link>
            </div>
        );
    }

    // 4. BUSCAR PRODUCTO
    const producto = getProductById(idProducto);

    // 5. SI NO EXISTE EL ID
    if (!producto) {
        return (
            <div className="container mt-5 text-center">
                <h2>Producto no encontrado 😢</h2>
                <p>El producto con ID <strong>{idProducto}</strong> no existe en la base de datos.</p>
                <Link to="/cafes" className="btn btn-primary">Volver al Catálogo</Link>
            </div>
        );
    }

    // 6. ÉXITO: Mostrar el detalle
    return (
        <ContenidoDetalleProducto 
            producto={producto} 
            alAgregar={addProduct} 
        />
    );
};