import { useState, useEffect } from 'react';
import type { User } from '../types';

// Nombre de la llave para guardar en el navegador
const USER_STORAGE_KEY = 'usuario_sesion';

export const useAuth = () => {
    // 1. Intentamos leer el usuario guardado al iniciar
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 2. Función LOGIN 
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
    };

    // 3. Función LOGOUT
    const logout = () => {
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
        window.dispatchEvent(new Event('storage'));
        window.location.href = '/login'; // Redirigir al login
    };

    // 4. Ver cambios en otra pestaña 
    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem(USER_STORAGE_KEY);
            setUser(savedUser ? JSON.parse(savedUser) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // 5. Retornamos todo lo que necesita la PaginaLogin
    return { 
        user, 
        login,  // <--- ¡AQUÍ ESTÁ LA SOLUCIÓN!
        logout 
    };
};