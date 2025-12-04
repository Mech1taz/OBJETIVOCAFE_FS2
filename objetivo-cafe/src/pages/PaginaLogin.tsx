import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/authUtils';

export const PaginaLogin: React.FC = () => {
    const navigate = useNavigate();
    // Cambiamos el nombre del estado a 'emailOrUser' para ser más claros
    const [emailOrUser, setEmailOrUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Intentamos loguear con el valor ingresado (sea Admin o un email)
        if (loginUser(emailOrUser, password)) {
            // Si el usuario es el Admin, podrías redirigir directo al panel, 
            // pero por estándar lo mandamos a su perfil o inicio.
            if (emailOrUser === 'Admin') {
                navigate('/admin/resumen'); // Redirección inteligente para Admin
            } else {
                navigate('/usuario'); // Redirección para clientes
            }
        } else {
            setError("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="shadow rounded p-4 bg-white">
                        <h1 className="text-center mb-4">Iniciar Sesión</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Usuario o E-mail:</label>
                                {/* CAMBIO CRÍTICO: type="text" para permitir escribir "Admin" */}
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    required 
                                    placeholder="Ej: Admin o juan@correo.cl"
                                    onChange={e => setEmailOrUser(e.target.value)} 
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Contraseña:</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    required 
                                    onChange={e => setPassword(e.target.value)} 
                                />
                            </div>
                            
                            {error && <div className="alert alert-danger text-center">{error}</div>}

                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary px-4 w-100">Ingresar</button>
                                <br/><br/>
                                <Link to="/registro" className="btn btn-link">¿No tienes cuenta? Regístrate</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
    );
};