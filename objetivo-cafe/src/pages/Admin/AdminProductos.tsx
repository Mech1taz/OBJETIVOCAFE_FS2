import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import type { Product, ProductType } from '../../types';

export const AdminProductos: React.FC = () => {
    // products: lista actual. refreshProducts: función para recargar la lista.
    const { products, refreshProducts } = useProducts(); 
    
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    // Estado para los inputs del formulario (unificados para crear/editar)
    const [formData, setFormData] = useState({
        nombre: '',
        precio: 0,
        tipo: 'cafe' as ProductType,
        imagen: ''
    });

    // Efecto para cargar los datos en el formulario al entrar en modo edición
    useEffect(() => {
        if (editingProduct) {
            setFormData({
                nombre: editingProduct.nombre,
                precio: editingProduct.precio,
                tipo: editingProduct.tipo,
                imagen: editingProduct.imagen,
            });
            setShowForm(true);
        } else {
            // Limpiar formulario si no estamos editando
            setFormData({ nombre: '', precio: 0, tipo: 'cafe', imagen: '' });
        }
    }, [editingProduct]);

    // ----------------------------------------------------
    // Handlers
    // ----------------------------------------------------
    const handleEditClick = (product: Product) => {
        setEditingProduct(product);
        // El useEffect se encargará de abrir el formulario y rellenar datos
    };

    const handleSaveOrUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Obtener la lista de precios actualizados guardada
        const storedUpdates = JSON.parse(localStorage.getItem("productosActualizados") || '{}');
        
        // El precio y nombre siempre se guardan aquí para anular la base
        const updatedData = { 
            precio: formData.precio, 
            nombre: formData.nombre,
            tipo: formData.tipo,
            imagen: formData.imagen
        };
        
        let idToUpdate: number;
        let alertMessage: string;

        if (editingProduct) {
            // --- MODO EDICIÓN (UPDATE) ---
            idToUpdate = editingProduct.id;
            alertMessage = `Producto ${idToUpdate} actualizado!`;
        } else {
            // --- MODO CREAR (CREATE) ---
            const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
            idToUpdate = maxId + 1;
            alertMessage = `Producto ID ${idToUpdate} agregado!`;

            const storedNewProducts = JSON.parse(localStorage.getItem("productosNuevos") || '[]');
            const newProductEntry: Product = {
                id: idToUpdate,
                ...formData,
                opciones: formData.tipo === 'cafe' ? ["Grano entero", "Molido"] : [],
                stock: 10 // Stock inicial por defecto
            };
            storedNewProducts.push(newProductEntry);
            localStorage.setItem("productosNuevos", JSON.stringify(storedNewProducts));
        }

        // 2. Guardar la actualización de datos
        storedUpdates[idToUpdate] = { ...storedUpdates[idToUpdate], ...updatedData };
        localStorage.setItem("productosActualizados", JSON.stringify(storedUpdates));

        // 3. Limpiar y recargar
        setEditingProduct(null);
        setShowForm(false);
        refreshProducts(); // ¡Recarga la lista para ver los cambios!
        alert(alertMessage);
    };

    // ----------------------------------------------------
    // RENDERIZADO
    // ----------------------------------------------------
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Productos</h2>
                
                {/* BOTÓN CORREGIDO: Sintaxis segura para evitar errores de TypeScript */}
                <button 
                    className={`btn ${showForm ? 'btn-danger' : 'btn-success'}`} 
                    onClick={() => {
                        setEditingProduct(null); 
                        setShowForm(!showForm); 
                    }}
                >
                    {showForm ? 'Ocultar Formulario' : '+ Agregar Producto'}
                </button>
            </div>

            {/* Formulario Unificado */}
            {showForm && (
                <div className="card p-4 mb-4 shadow-sm">
                    <h4>{editingProduct ? `Editar Producto ID ${editingProduct.id}` : 'Nuevo Producto'}</h4>
                    <form onSubmit={handleSaveOrUpdate}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label>Nombre</label>
                                <input type="text" className="form-control" required 
                                    value={formData.nombre}
                                    onChange={e => setFormData({...formData, nombre: e.target.value})} />
                            </div>
                            <div className="col-md-2 mb-3">
                                <label>Precio</label>
                                <input type="number" className="form-control" required 
                                    value={formData.precio}
                                    onChange={e => setFormData({...formData, precio: parseInt(e.target.value) || 0})} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label>Tipo</label>
                                <select className="form-select" 
                                    value={formData.tipo}
                                    onChange={e => setFormData({...formData, tipo: e.target.value as ProductType})}
                                    disabled={!!editingProduct} // Deshabilitar cambio de tipo en edición
                                    >
                                    <option value="cafe">Café</option>
                                    <option value="cafetera">Cafetera</option>
                                    <option value="accesorio">Accesorio</option>
                                </select>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label>Ruta Imagen</label>
                                <input type="text" className="form-control" placeholder="img/ejemplo.png"
                                    value={formData.imagen}
                                    onChange={e => setFormData({...formData, imagen: e.target.value})} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">
                            {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                        </button>
                    </form>
                </div>
            )}

            {/* Tabla de Productos */}
            <div className="table-responsive bg-white shadow-sm rounded">
                <table className="table table-hover mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td><span className="badge bg-secondary">{p.tipo}</span></td>
                                <td>${p.precio.toLocaleString('es-CL')}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button 
                                        className="btn btn-info text-white btn-sm" 
                                        onClick={() => handleEditClick(p)} 
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};