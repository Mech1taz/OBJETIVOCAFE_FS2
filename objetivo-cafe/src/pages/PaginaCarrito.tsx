import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { useCart } from '../hooks/useCart';

export const PaginaCarrito: React.FC = () => {
    const { cart, total, removeProduct, buy } = useCart();
    const navigate = useNavigate(); // Hook para redirigir

    // Función intermedia para comprar y luego redirigir
    const handleFinalize = () => {
        const exito = buy(); 
        if (exito) {
            navigate('/boleta'); 
        }
    };

    return (
        <div className="container mt-5">
            {/* Encabezado con estilo original */}
            <div className="p-4 text-center text-white shadow mb-4 rounded" style={{ backgroundColor: '#A6634B' }}>
                <h1 className="display-5" style={{ color: '#F2F2F2' }}>Tu Carrito</h1>
                <p style={{ color: '#F2F2F2' }}>Revisa tus productos antes de comprar</p>
            </div>

            {/* Lógica de Carrito Vacío / Lleno */}
            {cart.length === 0 ? (
                <div className="alert alert-info text-center p-5">
                    <h3>Tu carrito está vacío 🛒</h3>
                    <p>¿Por qué no agregas algo delicioso?</p>
                    <Link to="/cafes" className="btn btn-primary mt-3">Ir a comprar</Link>
                </div>
            ) : (
                <div className="table-responsive shadow rounded">
                    <table className="table table-bordered text-center align-middle mb-0">
                        <thead style={{ backgroundColor: '#F2F2F2' }}>
                            <tr>
                                <th>Producto</th>
                                <th>Opción</th>
                                <th>Cant</th>
                                <th>Subtotal</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {cart.map((item, i) => (
                                <tr key={i}>
                                    <td className="fw-bold">{item.product.nombre}</td>
                                    <td>{item.opcionSeleccionada}</td>
                                    <td>
                                        <span className="badge bg-secondary">{item.cantidad}</span>
                                    </td>
                                    <td>${(item.product.precio * item.cantidad).toLocaleString('es-CL')}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => removeProduct(item.product.id, item.opcionSeleccionada)}
                                            title="Eliminar producto"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Footer del Carrito (Total y Botón) */}
            {cart.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded shadow-sm">
                    <h3 className="mb-0" style={{ color: '#593831' }}>
                        Total: <span className="fw-bold">${total.toLocaleString('es-CL')}</span>
                    </h3>
                    <div className="d-flex gap-2">
                        <Link to="/cafes" className="btn btn-outline-secondary">
                            Seguir comprando
                        </Link>
                        <button className="btn btn-success btn-lg" onClick={handleFinalize}>
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};