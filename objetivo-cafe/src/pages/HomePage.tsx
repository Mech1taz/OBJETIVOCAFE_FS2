// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    return (
        <div>
            <div className="hero-section rounded shadow-sm">
                <h1 className="display-3 fw-bold" style={{ color: '#F2F2F2' }}>
                    Bienvenido a Objetivo Café
                </h1>
                <p className="lead fs-3" style={{ color: '#F2F2F2' }}>
                    Descubre el mundo del café y más
                </p>
            </div>

            
            <div className="container my-5 pb-5">
                <div className="row g-4">
                    
                    
                    <div className="col-md-3">
                        <div className="card home-card shadow h-100">
                            <img src="/img/cafe_colombia.png" className="card-img-top" alt="Cafés" />
                            <div className="card-body text-center d-flex flex-column">
                                <h5 className="card-title mb-3">Cafés</h5>
                                <Link to="/cafes" className="btn btn-primary mt-auto">Ver más</Link>
                            </div>
                        </div>
                    </div>

                    
                    <div className="col-md-3">
                        <div className="card home-card shadow h-100">
                            <img src="/img/italiana_350ml.png" className="card-img-top" alt="Cafeteras" />
                            <div className="card-body text-center d-flex flex-column">
                                <h5 className="card-title mb-3">Cafeteras</h5>
                                <Link to="/cafeteras" className="btn btn-primary mt-auto">Ver más</Link>
                            </div>
                        </div>
                    </div>

                    
                    <div className="col-md-3">
                        <div className="card home-card shadow h-100">
                            <img src="/img/pesa_timemore.png" className="card-img-top" alt="Accesorios" />
                            <div className="card-body text-center d-flex flex-column">
                                <h5 className="card-title mb-3">Accesorios</h5>
                                <Link to="/accesorios" className="btn btn-primary mt-auto">Ver más</Link>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3">
                        <div className="card home-card shadow h-100">
                            {/* Asegúrate de tener una imagen para esto, o usa una genérica */}
                            <img src="/img/chemex.png" className="card-img-top" alt="Guías" /> 
                            <div className="card-body text-center d-flex flex-column">
                                <h5 className="card-title mb-3">Guías y Métodos</h5>
                                <Link to="/metodos" className="btn btn-primary mt-auto">Ver más</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};