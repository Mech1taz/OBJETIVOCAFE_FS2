import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Product } from '../types';

// La URL de tu Backend Java
const API_URL = 'http://localhost:8080/api/products';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Función para cargar los datos desde el Backend
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            // 🚀 AQUÍ OCURRE LA MAGIA: Petición HTTP al servidor Java
            const response = await axios.get<Product[]>(API_URL);
            
            // Guardamos los datos reales de la Base de Datos
            setProducts(response.data);
            setError(null);
        } catch (err) {
            console.error("Error conectando con el Backend:", err);
            setError("No se pudo conectar con el servidor.");
            setProducts([]); // En caso de error, lista vacía
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar al montar el componente
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Buscar producto por ID (ahora busca en la lista traída de Java)
    const getProductById = (id: number): Product | undefined => {
        return products.find(p => p.id === id);
    };
    
    return { 
        products, 
        getProductById,
        refreshProducts: fetchProducts, 
        loading,
        error
    };
};