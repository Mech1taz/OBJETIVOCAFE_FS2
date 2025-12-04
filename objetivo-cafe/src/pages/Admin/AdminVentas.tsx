import React from 'react';
import { getOrders, updateOrderStatus } from '../../utils/orderUtils'; // <--- Importamos utilidades de órdenes
import type { OrderStatus } from '../../types';

export const AdminVentas: React.FC = () => {
    const orders = getOrders(); 

    // Función para que el Admin cambie el estado del pedido
    const handleStatusChange = (orderId: string, newStatus: string) => {
        updateOrderStatus(orderId, newStatus as OrderStatus);
        window.location.reload(); // Recargamos para ver el cambio (simple)
    };

    return (
        <div>
            <h2 className="mb-4">Historial de Ventas (Órdenes)</h2>
            <div className="table-responsive bg-white shadow-sm rounded">
                <table className="table table-bordered mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID Orden</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan={6} className="text-center p-3">No hay ventas registradas.</td></tr>
                        ) : (
                            // Mostramos las órdenes más recientes primero
                            orders.slice().reverse().map((order) => (
                                <tr key={order.id}>
                                    <td><strong>{order.id}</strong></td>
                                    <td>{order.usuarioEmail}</td>
                                    <td>{order.fecha}</td>
                                    <td className="fw-bold text-success">${order.total.toLocaleString('es-CL')}</td>
                                    <td>
                                        <span className={`badge ${
                                            order.estado === 'Entregado' ? 'bg-success' : 
                                            order.estado === 'Enviado' ? 'bg-primary' : 'bg-warning text-dark'
                                        }`}>
                                            {order.estado}
                                        </span>
                                    </td>
                                    <td>
                                        {/* Selector para cambiar estado */}
                                        <select 
                                            className="form-select form-select-sm" 
                                            value={order.estado}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="Pagado">Pagado</option>
                                            <option value="Preparando">Preparando</option>
                                            <option value="Enviado">Enviado</option>
                                            <option value="Entregado">Entregado</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};