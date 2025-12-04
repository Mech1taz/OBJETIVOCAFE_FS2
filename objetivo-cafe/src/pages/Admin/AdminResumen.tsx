import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { getOrders } from '../../utils/orderUtils';
// CORRECCIÓN: Importamos la función con el nombre correcto para evitar el error
import { getRegisteredUsers } from '../../utils/authUtils'; 

export const AdminResumen: React.FC = () => {
    const { products } = useProducts();
    // Usamos la función correcta para obtener usuarios
    const users = getRegisteredUsers(); 
    const orders = getOrders();

    // Calcular total sumando la propiedad 'total' de cada orden real
    const totalVentas = orders.reduce((sum, order) => sum + order.total, 0);

    return (
        <div>
            <h2 className="mb-4">Resumen General</h2>
            <div className="row">
                {/* Tarjeta de Usuarios */}
                <div className="col-md-4">
                    <div className="card text-white shadow-sm mb-3" style={{ backgroundColor: '#A6634B' }}>
                        <div className="card-header">Usuarios Registrados</div>
                        <div className="card-body">
                            <h1 className="card-title text-center">{users.length}</h1>
                        </div>
                    </div>
                </div>

                {/* Tarjeta de Productos */}
                <div className="col-md-4">
                    <div className="card text-dark bg-warning bg-opacity-25 shadow-sm mb-3">
                        <div className="card-header fw-bold">Total Productos</div>
                        <div className="card-body">
                            <h1 className="card-title text-center">{products.length}</h1>
                        </div>
                    </div>
                </div>

                {/* Tarjeta de Ventas */}
                <div className="col-md-4">
                    <div className="card text-white bg-success shadow-sm mb-3">
                        <div className="card-header">Ventas Totales</div>
                        <div className="card-body">
                            <h1 className="card-title text-center">
                                ${totalVentas.toLocaleString('es-CL')}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};