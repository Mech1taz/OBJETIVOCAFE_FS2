import type { User } from '../types';

const USERS_KEY = "users_db";
const SESSION_KEY = "current_user";

// --- DEFINICIÓN DEL ADMIN MAESTRO ---
const ADMIN_CREDENTIALS: User = {
    nombre: "Administrador Jefe",
    email: "Admin",        
    password: "Admin123", 
    role: "admin",         
    rut: "00.000.000-0"
};

// --- OBTENER USUARIOS (Función Principal) ---
export const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

// --- ALIAS PARA LOS TESTS (Esto arregla el error) ---
// Los tests buscan 'getRegisteredUsers', así que le damos la misma función con otro nombre.
export const getRegisteredUsers = getUsers;


// --- REGISTRO ---
export const registerUser = (newUser: User): boolean => {
    const users = getUsers();
    
    // Validar si el email ya existe
    if (users.some(u => u.email === newUser.email)) {
        return false; 
    }

    // Forzamos el rol a 'client' para registros normales
    const userWithRole: User = {
        ...newUser,
        role: 'client' 
    };

    users.push(userWithRole);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
};

// --- LOGIN ---
export const loginUser = (emailOrUser: string, pass: string): boolean => {
    
    // 1. REVISAR SI ES EL ADMIN MAESTRO
    if (emailOrUser === ADMIN_CREDENTIALS.email && pass === ADMIN_CREDENTIALS.password) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(ADMIN_CREDENTIALS));
        window.dispatchEvent(new Event("storage"));
        return true;
    }

    // 2. SI NO ES ADMIN, BUSCAR EN USUARIOS REGISTRADOS
    const users = getUsers();
    const foundUser = users.find(u => u.email === emailOrUser && u.password === pass);

    if (foundUser) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(foundUser));
        window.dispatchEvent(new Event("storage")); 
        return true;
    }

    return false;
};

// --- LOGOUT ---
export const logoutUser = () => {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("storage"));
};

// --- OBTENER USUARIO ACTUAL ---
export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem(SESSION_KEY);
    return user ? JSON.parse(user) : null;
};