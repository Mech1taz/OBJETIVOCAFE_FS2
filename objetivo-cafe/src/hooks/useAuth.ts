// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import type { User } from '../types';
import { getCurrentUser, logoutUser } from '../utils/authUtils';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(getCurrentUser());

    useEffect(() => {
        const checkUser = () => {
            setUser(getCurrentUser());
        };
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, []);

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return { user, logout };
};
