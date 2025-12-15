import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
    id: number;
    clienteNombre: string;
    total: number;
    fecha: string;
    detalles: string;
    estado: string;
}

export const AdminResumen: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const fetchOrders = () => {
        axios.get('http://localhost:8080/api/orders')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Para cambiar estado
    const handleEstadoChange = (id: number, nuevoEstado: string) => {
        axios.put(`http://localhost:8080/api/orders/${id}/status?nuevoEstado=${nuevoEstado}`)
            .then(() => {
                fetchOrders(); 
                alert('Estado actualizado correctamente');
            })
            .catch(() => alert('Error al actualizar estado'));
    };

    const totalVentas = orders.reduce((sum, order) => sum + order.total, 0);

    return (
        <div>
            <h2 className="mb-4">Resumen de Ventas</h2>
            
            <div className="card shadow-sm mb-4">
                <div className="card-body bg-success text-white">
                    <h3>Total Ventas: ${totalVentas.toLocaleString('es-CL')}</h3>
                </div>
            </div>

            <table className="table table-bordered table-hover bg-white shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Detalle</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.clienteNombre}</td>
                            <td><small>{order.detalles}</small></td>
                            <td>${order.total.toLocaleString('es-CL')}</td>
                            <td>
                                <select 
                                    className={`form-select form-select-sm ${
                                        order.estado === 'Entregado' ? 'bg-success text-white' : 
                                        order.estado === 'Pagado' ? 'bg-primary text-white' : 'bg-warning'
                                    }`}
                                    value={order.estado || 'Pendiente'}
                                    onChange={(e) => handleEstadoChange(order.id, e.target.value)}
                                >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Pagado">Pagado</option>
                                    <option value="Entregado">Entregado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};