// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css'; // CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <--- AGREGA ESTO (JS de Bootstrap)
import './index.css'; // Tus colores personalizados

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)