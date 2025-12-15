import React, { useEffect, useState } from 'react';

// BACKEND
interface Usuario {
    id: number;
    nombre: string;
    email: string;
    role: string;
    rut?: string;
}

export const AdminUsuarios: React.FC = () => {
    const [users, setUsers] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/users') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor');
                }
                return response.json();
            })
            .then(data => {
                console.log("Usuarios cargados desde BD:", data);
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Fallo la conexión:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Usuarios</h2>
            
            {loading && <p>Cargando datos...</p>}

            <ul className="list-group shadow-sm">
                {!loading && users.length === 0 ? (
                    <li className="list-group-item text-center">
                        No se encontraron usuarios o hubo un error de conexión.
                    </li>
                ) : (
                    users.map((u) => (
                        <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">{u.nombre}</h5>
                                <small className="text-muted">{u.email}</small>
                                {u.rut && <div className="text-muted" style={{fontSize: '0.8rem'}}>RUT: {u.rut}</div>}
                            </div>
                            
                            <span 
                                className={`badge rounded-pill ${u.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}
                                style={{ fontSize: '0.9rem', padding: '10px 15px' }}
                            >
                                {u.role === 'admin' ? 'Admin' : 'Cliente'}
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};