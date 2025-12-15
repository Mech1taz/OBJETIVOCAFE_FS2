import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface Props {
    producto: Product;
    alAgregar: (prod: Product, op: string, cant: number) => void;
}

export const ContenidoDetalleProducto: React.FC<Props> = ({ producto, alAgregar }) => {
    
    if (!producto) return null;
    const OPCIONES_CAFE = ['Grano Entero', 'Molido Fino (Espresso)', 'Molido Medio (Filtro)', 'Molido Grueso (Prensa)'];

    const opciones = producto.tipo === 'cafe' ? OPCIONES_CAFE : []; 

    const [cantidad, setCantidad] = useState(1);
    const [molienda, setMolienda] = useState(opciones.length > 0 ? opciones[0] : 'N/A');
    
    const esCafe = producto.tipo === 'cafe';

    const handleAgregar = () => {
        alAgregar(producto, esCafe ? molienda : 'N/A', cantidad);
    };

    return (
        <div className="card shadow p-4 border-0">
            <div className="row g-5">
                <div className="col-md-5">
                    <img 
                        src={`/${producto.imagen}`} 
                        className="img-fluid rounded shadow-sm" 
                        alt={producto.nombre}
                        onError={(e) => (e.target as HTMLImageElement).src = '/img/placeholder.png'} 
                    />
                </div>
                <div className="col-md-7">
                    <h2 className="display-6 fw-bold mb-3">{producto.nombre}</h2>
                    <p className="lead fs-6">{producto.descripcionLarga || producto.descripcion}</p>
                    
                    <h3 className="mb-4" style={{ color: '#A6634B', fontWeight: 'bold' }}>
                        ${producto.precio.toLocaleString('es-CL')}
                    </h3>
                    
                    {esCafe && opciones.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label fw-bold">Seleccione molienda:</label>
                            <select className="form-select" value={molienda} onChange={(e) => setMolienda(e.target.value)}>
                                {opciones.map(op => <option key={op} value={op}>{op}</option>)}
                            </select>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="form-label fw-bold">Cantidad:</label>
                        <input type="number" className="form-control" min="1" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value) || 1)} style={{ maxWidth: '100px' }} />
                        <small className="text-muted">Stock disponible: {producto.stock}</small>
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-lg" onClick={handleAgregar}>Añadir al carrito</button>
                        <Link to={`/${producto.tipo}s`} className="btn btn-outline-secondary btn-lg">Volver</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};