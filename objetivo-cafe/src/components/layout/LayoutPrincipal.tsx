import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar'; // Sube 2 niveles para encontrar Navbar

export const LayoutPrincipal = () => {
    return (
        <>
            <Navbar />
            <main className="container">
                <Outlet />
            </main>
        </>
    );
};