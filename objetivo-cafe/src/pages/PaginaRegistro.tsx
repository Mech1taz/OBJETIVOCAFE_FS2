import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const PaginaRegistro: React.FC = () => {
    const navigate = useNavigate();
    
    const initialState = {
        rut: '',
        nombre: '',
        password: '',
        confirmPassword: '',
        email: ''
    };

    const [formData, setFormData] = useState(initialState);

    // Función para limpiar el formulario
    const handleLimpiar = () => {
        setFormData(initialState);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. VALIDACIONES
        if (!formData.email.includes('@')) {
            Swal.fire('Error', 'El correo debe contener un "@"', 'error');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }

        try {
            // Enviamos los datos a Java
            await axios.post('http://localhost:8080/api/users/register', {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                rut: formData.rut, 
                role: 'client' 
            });
            
            Swal.fire('¡Registro Exitoso!', 'Usuario creado correctamente.', 'success');
            navigate('/login'); 

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo registrar el usuario. Intenta con otro correo.', 'error');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-4 text-center" style={{ fontFamily: 'serif' }}>Registro de Usuarios</h2>
            
            <div className="card p-4 border-0 shadow-sm">
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label className="form-label">Rut</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={formData.rut}
                            onChange={e => setFormData({...formData, rut: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={formData.nombre}
                            onChange={e => setFormData({...formData, nombre: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Reingrese Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">E-mail:</label>
                        <input 
                            type="email" 
                            className="form-control"
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="d-flex gap-2 justify-content-center">
                        <button 
                            type="submit" 
                            className="btn btn-lg text-white" 
                            style={{ backgroundColor: '#A6634B', minWidth: '120px' }}
                        >
                            Registrar
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={handleLimpiar}
                            className="btn btn-secondary btn-lg" 
                            style={{ backgroundColor: '#6c757d', minWidth: '120px' }}
                        >
                            Limpiar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};