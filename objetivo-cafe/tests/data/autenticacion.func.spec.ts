import { describe, it, expect, beforeEach } from 'vitest';
import { 
    registerUser, loginUser, logoutUser, getCurrentUser, getUsers 
} from '../../src/utils/authUtils';
import type { User } from '../../src/types';

const USER_TEST: User = { nombre: 'Test', email: 'test@mail.com', password: '123' };

describe('LÓGICA DE NEGOCIO: Autenticación', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('debe registrar un usuario nuevo', () => {
        const exito = registerUser(USER_TEST);
        expect(exito).toBe(true);
        expect(getUsers().length).toBe(1);
    });

    it('debe iniciar sesión con credenciales correctas', () => {
        registerUser(USER_TEST);
        const login = loginUser('test@mail.com', '123');
        expect(login).toBe(true);
        expect(getCurrentUser()?.nombre).toBe('Test');
    });

    it('debe fallar login con contraseña incorrecta', () => {
        registerUser(USER_TEST);
        const login = loginUser('test@mail.com', 'badpass');
        expect(login).toBe(false);
        expect(getCurrentUser()).toBeNull();
    });

    it('debe cerrar sesión correctamente', () => {
        registerUser(USER_TEST);
        loginUser('test@mail.com', '123');
        logoutUser();
        expect(getCurrentUser()).toBeNull();
    });

    it('no debe permitir emails duplicados', () => {
        registerUser(USER_TEST);
        const duplicado = registerUser(USER_TEST);
        expect(duplicado).toBe(false);
    });
});