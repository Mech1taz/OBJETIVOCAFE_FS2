import React from 'react';
import { getUsers } from '../../utils/authUtils';

export const AdminUsuarios: React.FC = () => {
    const users = getUsers();

    return (
        <div>
            <h2 className="mb-4">Gestión de Usuarios</h2>
            <ul className="list-group shadow-sm">
                {users.length === 0 ? (
                    <li className="list-group-item text-center">No hay usuarios registrados.</li>
                ) : (
                    users.map((u, i) => (
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">{u.nombre}</h5>
                                <small className="text-muted">{u.email}</small>
                            </div>
                            <span className="badge bg-primary rounded-pill">Cliente</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};