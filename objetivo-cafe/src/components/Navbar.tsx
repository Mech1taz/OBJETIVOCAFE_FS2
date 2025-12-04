import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth'; 

export const Navbar: React.FC = () => {
    const { cart } = useCart();
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();

    const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Objetivo Café</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><NavLink className="nav-link" to="/cafes">Café</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/cafeteras">Cafeteras</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/accesorios">Accesorios</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/metodos">Guía</NavLink></li>
                    </ul>

                    <ul className="navbar-nav align-items-center">
                        
                        <li className="nav-item me-3">
                            <NavLink className="nav-link position-relative" to="/carrito">
                                <i className="fas fa-shopping-cart"></i> Carrito
                                {totalItems > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {totalItems}
                                    </span>
                                )}
                            </NavLink>
                        </li>

                        {user ? (
                            <li className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle active text-warning" 
                                    href="#" 
                                    role="button" 
                                    data-bs-toggle="dropdown"
                                >
                                    Hola, {user.nombre}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" to="/usuario">Mi Perfil</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/resumen">Panel Admin</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="fas fa-user"></i> Iniciar Sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};