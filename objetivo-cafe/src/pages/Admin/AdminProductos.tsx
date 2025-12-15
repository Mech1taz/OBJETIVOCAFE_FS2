import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import type { Product, ProductType } from '../../types';

export const AdminProductos: React.FC = () => {
    // Hooks para obtener datos del backend
    const { products, refreshProducts } = useProducts(); 
    
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    // Estado del formulario (Ahora incluye STOCK)
    const [formData, setFormData] = useState({
        nombre: '',
        precio: 0,
        stock: 0, // <--- Nuevo campo importante
        tipo: 'cafe' as ProductType,
        imagen: ''
    });

    // Cargar datos en el formulario al editar
    useEffect(() => {
        if (editingProduct) {
            setFormData({
                nombre: editingProduct.nombre,
                precio: editingProduct.precio,
                stock: editingProduct.stock, // <--- Cargamos el stock real
                tipo: editingProduct.tipo,
                imagen: editingProduct.imagen,
            });
            setShowForm(true);
        } else {
            // Limpiar formulario
            setFormData({ nombre: '', precio: 0, stock: 0, tipo: 'cafe', imagen: '' });
        }
    }, [editingProduct]);

    // ----------------------------------------------------
    // Handlers
    // ----------------------------------------------------
    const handleEditClick = (product: Product) => {
        setEditingProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir para ver el form
    };

    const handleSaveOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = 'http://localhost:8080/api/products';
        
        try {
            let response;

            if (editingProduct) {
                //PUT
                response = await fetch(`${url}/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...formData,
                        id: editingProduct.id 
                    })
                });
            } else {
                //POST
                response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...formData,
                        opciones: formData.tipo === 'cafe' ? ["Grano entero", "Molido"] : [] 
                    })
                });
            }

            if (response.ok) {
                alert(editingProduct ? "¡Producto actualizado!" : "¡Producto creado!");
                setEditingProduct(null);
                setShowForm(false);
                refreshProducts(); 
            } else {
                alert("Error al guardar en el servidor.");
            }

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el Backend.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Seguro que quieres borrar este producto?")) return;

        try {
            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Producto eliminado");
                refreshProducts();
            } else {
                alert("Error al eliminar");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Productos</h2>
                <button 
                    className={`btn ${showForm ? 'btn-secondary' : 'btn-success'}`} 
                    onClick={() => {
                        setEditingProduct(null); 
                        setShowForm(!showForm); 
                    }}
                >
                    {showForm ? 'Cancelar / Ocultar' : '+ Agregar Producto'}
                </button>
            </div>

            {/* Formulario */}
            {showForm && (
                <div className="card p-4 mb-4 shadow border-0 bg-light">
                    <h4 className="mb-3 text-primary">
                        {editingProduct ? `Editar Producto ID: ${editingProduct.id}` : 'Nuevo Producto'}
                    </h4>
                    <form onSubmit={handleSaveOrUpdate}>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label fw-bold">Nombre</label>
                                <input type="text" className="form-control" required 
                                    value={formData.nombre}
                                    onChange={e => setFormData({...formData, nombre: e.target.value})} />
                            </div>
                            
                            <div className="col-md-2">
                                <label className="form-label fw-bold">Precio</label>
                                <input type="number" className="form-control" required min="0"
                                    value={formData.precio}
                                    onChange={e => setFormData({...formData, precio: parseInt(e.target.value) || 0})} />
                            </div>

                            {/* --- CAMPO STOCK NUEVO --- */}
                            <div className="col-md-2">
                                <label className="form-label fw-bold">Stock</label>
                                <input type="number" className="form-control" required min="0"
                                    value={formData.stock}
                                    onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Tipo</label>
                                <select className="form-select" 
                                    value={formData.tipo}
                                    onChange={e => setFormData({...formData, tipo: e.target.value as ProductType})}
                                    >
                                    <option value="cafe">Café</option>
                                    <option value="cafetera">Cafetera</option>
                                    <option value="accesorio">Accesorio</option>
                                </select>
                            </div>
                            
                            <div className="col-md-12">
                                <label className="form-label fw-bold">Ruta Imagen</label>
                                <input type="text" className="form-control" placeholder="img/ejemplo.png"
                                    value={formData.imagen}
                                    onChange={e => setFormData({...formData, imagen: e.target.value})} />
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary me-2">
                                {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla */}
            <div className="table-responsive bg-white shadow-sm rounded">
                <table className="table table-hover mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>
                                    <img src={`/${p.imagen}`} alt="" style={{width:'40px', height:'40px', objectFit:'contain'}} 
                                         onError={(e) => (e.target as HTMLImageElement).src = '/img/placeholder.png'}/>
                                </td>
                                <td className="fw-bold">{p.nombre}</td>
                                <td><span className="badge bg-secondary">{p.tipo}</span></td>
                                <td>${p.precio.toLocaleString('es-CL')}</td>
                                <td>
                                    <span className={`badge ${p.stock < 5 ? 'bg-danger' : 'bg-success'}`}>
                                        {p.stock}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEditClick(p)}>
                                        ✏️ Editar
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(p.id)}>
                                        🗑️ Borrar
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