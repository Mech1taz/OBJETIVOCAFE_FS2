import React from 'react';
import { useCart } from '../hooks/useCart'; // Tu hook actualizado
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export const PaginaCarrito: React.FC = () => {
    // 1. Obtenemos las funciones del hook 
    const { cart, removeProduct, vaciarCarrito, total } = useCart();
    
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePagar = async () => {
        // Validación de usuario
        if (!user) {
            Swal.fire('Atención', 'Debes iniciar sesión para comprar.', 'warning');
            navigate('/login');
            return;
        }

        // Preparar datos para Java
        const ordenDeCompra = {
            cliente: user.nombre || user.email, 
            total: total,
            items: cart.map(item => ({
                id: item.product.id,
                cantidad: item.cantidad
            }))
        };

        try {
            // Enviamos a Java
            await axios.post('http://localhost:8080/api/orders', ordenDeCompra);
            vaciarCarrito(); 
            
            Swal.fire('¡Éxito!', 'Tu compra ha sido registrada en la base de datos.', 'success');
            navigate('/'); 

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo procesar la compra. Revisa que el Backend esté corriendo.', 'error');
        }
    };

    if (cart.length === 0) {
        return <div className="container mt-5"><h2>Tu carrito está vacío 🛒</h2></div>;
    }

    return (
        <div className="container mt-5">
            <h2>Tu Carrito</h2>
            <table className="table">
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={`${item.product.id}-${item.opcionSeleccionada}-${index}`}>
                            
                            <td>
                                {item.product.nombre} <br/>
                                <small className="text-muted">({item.opcionSeleccionada})</small>
                            </td>
                            
                            <td>
                                {item.cantidad} x ${item.product.precio.toLocaleString('es-CL')}
                            </td>
                            
                            <td>
                                <button 
                                    onClick={() => removeProduct(item.product.id, item.opcionSeleccionada)} 
                                    className="btn btn-danger btn-sm"
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-end">
                <h3>Total: ${total.toLocaleString('es-CL')}</h3>
                <button onClick={handlePagar} className="btn btn-success btn-lg mt-3">
                    Pagar y Guardar Pedido
                </button>
            </div>
        </div>
    );
};