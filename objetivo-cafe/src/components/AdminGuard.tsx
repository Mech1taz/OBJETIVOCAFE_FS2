import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';

export const AdminGuard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(false);
    const [isChecking, setIsChecking] = useState(true); // Nuevo estado para controlar la carga

    useEffect(() => {
        // 1. Verificamos permisos
        if (!user || user.role !== 'admin') {
            
            // 2. Disparamos la alerta
            Swal.fire({
                title: '¡Acceso Denegado!',
                text: 'Esta zona es solo para el Administrador.',
                imageUrl: '/img/acceso_denegado.gif',
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Acceso denegado',
                confirmButtonText: 'Volver al inicio',
                confirmButtonColor: '#A6634B',
                allowOutsideClick: false,
                allowEscapeKey: false,
                background: '#fff'
            }).then(() => {
                // 3. Al cerrar, redirigimos y terminamos el chequeo
                navigate('/');
                setIsChecking(false);
            });

        } else {
            // Si es admin, todo bien
            setIsAllowed(true);
            setIsChecking(false);
        }
    }, [user, navigate]);

    // MIENTRAS CARGA/VERIFICA/MUESTRA ALERTA:
    // Mostramos un contenedor vacío o un spinner para evitar el "blanco roto"
    if (isChecking) {
        return <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}></div>;
    }

    // SI NO TIENE PERMISO (Y ya cerró la alerta, aunque el navigate lo saca antes):
    if (!isAllowed) return null; 

    // SI TIENE PERMISO:
    return <Outlet />;
};