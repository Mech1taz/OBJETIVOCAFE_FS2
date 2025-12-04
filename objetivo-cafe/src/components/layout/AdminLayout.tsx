import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path ? 'active' : 'text-white';

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            {/* Barra Lateral */}
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }}>
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Admin Café</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/admin/resumen" className={`nav-link ${isActive('/admin/resumen')}`}>
                            📊 Resumen
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/productos" className={`nav-link ${isActive('/admin/productos')}`}>
                            📦 Productos
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/usuarios" className={`nav-link ${isActive('/admin/usuarios')}`}>
                            👥 Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/ventas" className={`nav-link ${isActive('/admin/ventas')}`}>
                            💰 Ventas
                        </Link>
                    </li>
                </ul>
                <hr />
                <div>
                    <Link to="/" className="btn btn-danger w-100">Volver a la Tienda</Link>
                </div>
            </div>

            {/* Contenido Principal (Aquí cambian las páginas) */}
            <div className="flex-grow-1 p-4 bg-light">
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};