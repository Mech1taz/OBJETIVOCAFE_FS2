import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

export const PaginaBoleta: React.FC = () => {
    const [compra, setCompra] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [numeroBoleta] = useState(Math.floor(Math.random() * 1000000)); // Número aleatorio
    const navigate = useNavigate();

    useEffect(() => {
        // Leer la última compra guardada
        const data = localStorage.getItem('ultimaCompra');
        if (data) {
            const items: CartItem[] = JSON.parse(data);
            setCompra(items);
            const totalCalc = items.reduce((sum, item) => sum + (item.product.precio * item.cantidad), 0);
            setTotal(totalCalc);
            
            // Opcional: Limpiar la última compra al salir (descomentar si se desea)
            // return () => localStorage.removeItem('ultimaCompra');
        } else {
            // Si no hay compra, volver al inicio
            navigate('/');
        }
    }, [navigate]);

    if (compra.length === 0) return null;

    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-lg mx-auto" style={{ maxWidth: '600px', borderTop: '5px solid #A6634B' }}>
                <div className="card-body p-5">
                    
                    <div className="text-center mb-4">
                        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#A6634B' }}>Objetivo Café</h2>
                        <p className="text-muted">Comprobante de Compra</p>
                        <hr />
                    </div>

                    <div className="d-flex justify-content-between mb-3 text-muted small">
                        <span>Boleta N°: <strong>{numeroBoleta}</strong></span>
                        <span>Fecha: {new Date().toLocaleDateString('es-CL')}</span>
                    </div>

                    <table className="table table-borderless">
                        <thead className="border-bottom">
                            <tr>
                                <th>Producto</th>
                                <th className="text-end">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compra.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        <div>{item.product.nombre}</div>
                                        <small className="text-muted">
                                            {item.cantidad} x ${item.product.precio.toLocaleString('es-CL')} 
                                            {item.opcionSeleccionada !== 'N/A' ? ` / ${item.opcionSeleccionada}` : ''}
                                        </small>
                                    </td>
                                    <td className="text-end">
                                        ${(item.product.precio * item.cantidad).toLocaleString('es-CL')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="border-top">
                            <tr>
                                <th className="pt-3 fs-5">TOTAL PAGADO</th>
                                <th className="pt-3 fs-5 text-end text-success">
                                    ${total.toLocaleString('es-CL')}
                                </th>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="mt-5 text-center d-print-none">
                        <p className="small text-muted">¡Gracias por preferirnos!</p>
                        <button className="btn btn-outline-dark me-2" onClick={() => window.print()}>
                            Imprimir
                        </button>
                        <Link to="/usuario" className="btn btn-primary">
                            Ir a Mis Pedidos
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};