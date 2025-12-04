// src/pages/PaginaUsuario.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { getOrders } from '../utils/orderUtils'; // Asegúrate de tener este archivo
import type { Order } from '../types';

export const PaginaUsuario: React.FC = () => {
    const { user, logout } = useAuth();
    const [misOrdenes, setMisOrdenes] = useState<Order[]>([]);

    // Cargar las órdenes al entrar a la página
    useEffect(() => {
        if (user) {
            const todasLasOrdenes = getOrders();
            // Filtramos solo las de este usuario
            const ordenesUsuario = todasLasOrdenes.filter(o => o.usuarioEmail === user.email);
            // Las mostramos de la más nueva a la más vieja
            setMisOrdenes(ordenesUsuario.reverse());
        }
    }, [user]);

    if (!user) {
        return (
            <div className="container mt-5 text-center">
                <h2>Debes iniciar sesión primero.</h2>
                <Link to="/login" className="btn btn-primary mt-3">Ir al Login</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            {/* Sección de Datos Personales */}
            <div className="row mb-5">
                <div className="col-md-4">
                    <div className="card shadow p-4 border-0 bg-light">
                        <h3 className="mb-3 text-primary">Mi Perfil</h3>
                        <div className="mb-2"><strong>Nombre:</strong> {user.nombre}</div>
                        <div className="mb-2"><strong>Email:</strong> {user.email}</div>
                        <div className="mb-4"><strong>Rut:</strong> {user.rut || 'No informado'}</div>
                        <button className="btn btn-outline-danger w-100" onClick={logout}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Sección de Historial de Pedidos */}
                <div className="col-md-8">
                    <h3 className="mb-4">📜 Historial de Pedidos</h3>
                    
                    {misOrdenes.length === 0 ? (
                        <div className="alert alert-info">
                            Aún no has realizado compras. <Link to="/cafes">¡Ve al catálogo!</Link>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {misOrdenes.map((orden) => (
                                <div key={orden.id} className="card shadow-sm border-0">
                                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                        <span className="fw-bold text-primary">{orden.id}</span>
                                        <span className="badge bg-secondary">{orden.fecha}</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-8">
                                                <ul className="mb-0 small text-muted ps-3">
                                                    {orden.items.map((item, index) => (
                                                        <li key={index}>
                                                            {item.cantidad}x {item.product.nombre} ({item.opcionSeleccionada})
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="col-md-4 text-end mt-3 mt-md-0">
                                                <div className="fw-bold fs-5">${orden.total.toLocaleString('es-CL')}</div>
                                                {/* Estado del pedido con colores dinámicos */}
                                                <span className={`badge ${
                                                    orden.estado === 'Entregado' ? 'bg-success' : 
                                                    orden.estado === 'Enviado' ? 'bg-info' : 'bg-warning text-dark'
                                                }`}>
                                                    {orden.estado}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};