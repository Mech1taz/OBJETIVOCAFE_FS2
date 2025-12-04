import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface Props {
    producto: Product;
    alAgregar: (prod: Product, op: string, cant: number) => void;
}

export const ContenidoDetalleProducto: React.FC<Props> = ({ producto, alAgregar }) => {
    // 🛡️ BLINDAJE: Si producto.opciones no existe, usamos un array vacío por defecto
    const opciones = producto.opciones || []; 

    const [cantidad, setCantidad] = useState(1);
    // Usamos la variable segura 'opciones'
    const [molienda, setMolienda] = useState(opciones.length > 0 ? opciones[0] : 'N/A');
    
    const esCafe = producto.tipo === 'cafe';

    return (
        <div className="card shadow p-4 border-0">
            <div className="row g-5">
                
                {/* Imagen */}
                <div className="col-md-5">
                    <img 
                        src={`/${producto.imagen}`} 
                        className="img-fluid rounded shadow-sm" 
                        alt={producto.nombre} 
                    />
                </div>

                {/* Información */}
                <div className="col-md-7">
                    <h2 className="display-6 fw-bold mb-3">{producto.nombre}</h2>
                    
                    <p className="lead fs-6">
                        {producto.descripcionLarga || producto.descripcion}
                    </p>

                    {producto.notas && (
                        <div className="alert alert-light border mb-3">
                            <strong>Notas:</strong> {producto.notas}
                        </div>
                    )}
                    
                    <hr className="my-4" />
                    
                    <h3 className="mb-4" style={{ color: '#A6634B', fontWeight: 'bold' }}>
                        ${producto.precio.toLocaleString('es-CL')}
                    </h3>
                    
                    {/* Selector de Molienda (Solo si es Café y tiene opciones) */}
                    {esCafe && opciones.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label fw-bold">Seleccione molienda:</label>
                            <select 
                                className="form-select" 
                                value={molienda} 
                                onChange={(e) => setMolienda(e.target.value)}
                            >
                                {opciones.map(op => (
                                    <option key={op} value={op}>{op}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Selector de Cantidad */}
                    <div className="mb-4">
                        <label className="form-label fw-bold">Cantidad:</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            min="1" 
                            value={cantidad} 
                            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)} 
                            style={{ maxWidth: '100px' }}
                        />
                        <small className="text-muted">Stock disponible: {producto.stock}</small>
                    </div>

                    {/* Botones de Acción */}
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-primary btn-lg px-4" 
                            onClick={() => alAgregar(producto, esCafe ? molienda : 'N/A', cantidad)}
                        >
                            Añadir al carrito
                        </button>
                        
                        <Link to={`/${producto.tipo}s`} className="btn btn-outline-secondary btn-lg">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};