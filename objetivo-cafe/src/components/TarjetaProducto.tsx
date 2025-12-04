import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface Props { producto: Product; }

export const TarjetaProducto: React.FC<Props> = ({ producto }) => {
    const precioDisplay = producto.precio.toLocaleString('es-CL');

    return (
        <div className="col-sm-4 mb-4">
            <div className="card m-2 shadow h-100" style={{ borderRadius: '1rem', overflow: 'hidden', border: 'none' }}>

                <img
                    src={`/${producto.imagen}`}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{
                        height: '220px',
                        objectFit: 'cover',
                        width: '100%'
                    }}
                />

                <div className="card-body d-flex flex-column text-center">


                    <h4 className="card-title">{producto.nombre}</h4>

                    <h4 className="mt-auto fw-bold" style={{ color: '#A6634B' }}>
                        ${precioDisplay}
                    </h4>

                    <p className="card-text flex-grow-1">
                        {producto.descripcion || 'Café de especialidad.'}
                    </p>

                    <Link to={`/productos/${producto.id}`} className="btn btn-primary mt-auto">
                        Ver más...
                    </Link>
                </div>
            </div>
        </div>
    );
};