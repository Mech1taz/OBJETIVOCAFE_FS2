import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Layouts ---
import { LayoutPrincipal } from './components/layout/LayoutPrincipal';
import { AdminLayout } from './components/layout/AdminLayout';

// --- Guards ---
import { AdminGuard } from './components/AdminGuard'; // Componente de Protección

// --- Páginas Públicas (Tienda) ---
import { HomePage } from './pages/HomePage';
import { PaginaCatalogo } from './pages/PaginaCatalogo';
import { PaginaDetalleProducto } from './pages/PaginaDetalleProducto';
import { PaginaCarrito } from './pages/PaginaCarrito';
import { PaginaMetodos } from './pages/PaginaMetodos';
import { PaginaBoleta } from './pages/PaginaBoleta';

// --- Páginas de Usuario ---
import { PaginaLogin } from './pages/PaginaLogin';
import { PaginaRegistro } from './pages/PaginaRegistro';
import { PaginaUsuario } from './pages/PaginaUsuario';
import { PaginaMisPedidos } from './pages/PaginaMisPedidos';

// --- Páginas de Administración ---
import { AdminResumen } from './pages/Admin/AdminResumen';
import { AdminProductos } from './pages/Admin/AdminProductos';
import { AdminUsuarios } from './pages/Admin/AdminUsuarios';
import { AdminVentas } from './pages/Admin/AdminVentas';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 🏠 RUTAS PÚBLICAS (Usan LayoutPrincipal) */}
        <Route path="/" element={<LayoutPrincipal />}>
          
          {/* Portada Principal */}
          <Route index element={<HomePage />} />
          
          {/* Catálogos */}
          <Route path="cafes" element={<PaginaCatalogo tipo="cafe" />} />
          <Route path="cafeteras" element={<PaginaCatalogo tipo="cafetera" />} />
          <Route path="accesorios" element={<PaginaCatalogo tipo="accesorio" />} />
          
          {/* Detalle de Producto */}
          <Route path="productos/:id" element={<PaginaDetalleProducto />} />
          
          {/* Utilidades */}
          <Route path="carrito" element={<PaginaCarrito />} />
          <Route path="boleta" element={<PaginaBoleta />} />
          <Route path="metodos" element={<PaginaMetodos />} />

          {/* Autenticación y Usuario */}
          <Route path="login" element={<PaginaLogin />} />
          <Route path="registro" element={<PaginaRegistro />} />
          
          {/* Rutas de Perfil/Pedidos */}
          <Route path="usuario" element={<PaginaUsuario />} />
          <Route path="usuario/pedidos" element={<PaginaMisPedidos />} />
        </Route>

        {/* 🔐 RUTAS DE ADMINISTRACIÓN (PROTEGIDAS) */}
        {/* Usamos AdminGuard para verificar el rol del usuario antes de cargar el layout */}
        <Route path="/admin" element={<AdminGuard />}> 
            {/* Anidamos el Layout y las páginas aquí */}
          <Route element={<AdminLayout />}>
            <Route index element={<AdminResumen />} /> 
            <Route path="resumen" element={<AdminResumen />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="ventas" element={<AdminVentas />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;