import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';

export const PaginaLogin: React.FC = () => {
    // 1. Estados para los inputs del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 2. Traemos la función 'login' de tu hook useAuth
    const { login } = useAuth(); 
    
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evitar recarga de página

        try {
            // 3. Conexión al Backend (Java)
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email: email,
                password: password
            });

            // 4. Si Java responde OK 
            login(response.data); 

            // 5. Feedback visual y redirección
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: `Hola de nuevo, ${response.data.nombre}`,
                timer: 2000,
                showConfirmButton: false
            });

            navigate('/'); // Te lleva al Home

        } catch (error) {
            console.error(error);
            // 6. Si falla (401 o servidor apagado)
            Swal.fire({
                icon: 'error',
                title: 'Error de acceso',
                text: 'El correo o la contraseña son incorrectos.',
                confirmButtonColor: '#A6634B'
            });
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow p-4 border-0" style={{ width: '400px', backgroundColor: '#f8f9fa' }}>
                <h2 className="text-center mb-4" style={{ fontFamily: 'serif', color: '#333' }}>Iniciar Sesión</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Input Email */}
                    <div className="mb-3">
                        <label className="form-label">Usuario o E-mail:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn w-100 text-white mb-3"
                        style={{ backgroundColor: '#A6634B', borderColor: '#A6634B' }}
                    >
                        Ingresar
                    </button>
                    
                    <div className="text-center">
                        <Link to="/registro" className="text-decoration-none" style={{ color: '#007bff' }}>
                            ¿No tienes cuenta? Regístrate
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};