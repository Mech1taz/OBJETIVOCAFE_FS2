// src/pages/PaginaRegistro.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/authUtils';

export const PaginaRegistro: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ rut: '', nombre: '', password: '', email: '' });
    const [repass, setRepass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== repass) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (registerUser(formData)) {
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            navigate('/login');
        } else {
            setError('El correo ya está registrado.');
        }
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="shadow rounded p-4 bg-white">
                        <h1 className="text-center mb-4">Registro de Usuarios</h1>

                        <form onSubmit={handleSubmit}>
                            {/* RUT */}
                            <div className="mb-3">
                                <label className="form-label">Rut</label>
                                <input type="text" required className="form-control" 
                                    onChange={e => setFormData({...formData, rut: e.target.value})} />
                            </div>
                            {/* Nombre */}
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" required className="form-control" 
                                    onChange={e => setFormData({...formData, nombre: e.target.value})} />
                            </div>
                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label">E-mail:</label>
                                <input type="email" required className="form-control" 
                                    onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>
                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" required className="form-control" 
                                    onChange={e => setFormData({...formData, password: e.target.value})} />
                            </div>
                            {/* Repetir Password */}
                            <div className="mb-3">
                                <label className="form-label">Reingrese Password</label>
                                <input type="password" required className="form-control" 
                                    onChange={e => { setRepass(e.target.value); setError(''); }} />
                                {error && <small className="form-text text-danger">{error}</small>}
                            </div>

                            <div className="mt-3 text-center">
                                <button className="btn btn-primary px-4 me-2" type="submit">Registrar</button>
                                <button className="btn btn-secondary px-4" type="reset" 
                                    onClick={() => {setFormData({rut:'', nombre:'', password:'', email:''}); setRepass(''); setError('');}}>
                                    Limpiar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
    );
};