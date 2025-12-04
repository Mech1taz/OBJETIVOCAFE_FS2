// src/pages/PaginaMisPedidos.tsx
import React, { useEffect, useState } from 'react';
import { getOrders } from '../utils/orderUtils';
import { getCurrentUser } from '../utils/authUtils';
import type { Order } from '../types';

export const PaginaMisPedidos: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const user = getCurrentUser();

    useEffect(() => {
        if (user) {
            // Filtramos solo las órdenes de este usuario
            const allOrders = getOrders();
            const myOrders = allOrders.filter(o => o.usuarioEmail === user.email);
            setOrders(myOrders.reverse()); // Las más nuevas primero
        }
    }, []);

    if (!user) return <div className="container mt-5">Inicia sesión para ver tus pedidos.</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">📦 Mis Pedidos y Seguimiento</h2>
            
            {orders.length === 0 ? (
                <div className="alert alert-info">Aún no has realizado compras.</div>
            ) : (
                <div className="row">
                    {orders.map(order => (
                        <div key={order.id} className="col-12 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white">
                                    <span>Orden: <strong>{order.id}</strong></span>
                                    <span>Fecha: {order.fecha}</span>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <h5 className="card-title">Estado del Envío:</h5>
                                            {/* Barra de Progreso Visual */}
                                            <div className="progress mb-3" style={{height: '25px'}}>
                                                <div 
                                                    className={`progress-bar ${order.estado === 'Entregado' ? 'bg-success' : 'bg-warning progress-bar-striped progress-bar-animated'}`} 
                                                    role="progressbar" 
                                                    style={{ 
                                                        width: order.estado === 'Pagado' ? '25%' : 
                                                               order.estado === 'Preparando' ? '50%' :
                                                               order.estado === 'Enviado' ? '75%' : '100%'
                                                    }}
                                                >
                                                    {order.estado}
                                                </div>
                                            </div>
                                            <ul>
                                                {order.items.map((item, i) => (
                                                    <li key={i}>
                                                        {item.cantidad}x {item.product.nombre} ({item.opcionSeleccionada})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col-md-4 text-end border-start">
                                            <h4>Total: ${order.total.toLocaleString('es-CL')}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};