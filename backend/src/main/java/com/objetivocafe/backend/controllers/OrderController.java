package com.objetivocafe.backend.controllers;

import com.objetivocafe.backend.models.Order;
import com.objetivocafe.backend.models.Product;
import com.objetivocafe.backend.repositories.OrderRepository;
import com.objetivocafe.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    // 1. OBTENER TODAS LAS COMPRAS (Para el Admin - Resumen Compra)
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 2. CREAR COMPRA Y REDUCIR STOCK
    // Recibe un JSON con: { "cliente": "Juan", "total": 15000, "items": [ { "id": 1, "cantidad": 2 } ] }
    @PostMapping
    @SuppressWarnings("unchecked")
    public Order createOrder(@RequestBody Map<String, Object> payload) {
        
        // A. Guardar la Orden en BD
        Order newOrder = new Order();
        newOrder.setClienteNombre((String) payload.get("cliente"));
        newOrder.setTotal((Integer) payload.get("total"));
        
        // Convertimos la lista de items a texto para el detalle
        List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");
        String detalles = "";

        // B. PROCESO DE REDUCCIÓN DE STOCK
        for (Map<String, Object> item : items) {
            Long prodId = Long.valueOf(item.get("id").toString());
            Integer cantidad = (Integer) item.get("cantidad");

            // 1. Buscamos el producto
            Product producto = productRepository.findById(prodId).orElse(null);
            
            if (producto != null) {
                // 2. Agregamos al texto del recibo
                detalles += producto.getNombre() + " x" + cantidad + ", ";
                
                // 3. RESTAMOS STOCK (Aquí está la clave)
                int nuevoStock = producto.getStock() - cantidad;
                if (nuevoStock < 0) nuevoStock = 0; // Evitar negativos
                
                producto.setStock(nuevoStock);
                productRepository.save(producto); // Guardamos el nuevo stock
            }
        }

        newOrder.setDetalles(detalles);
        return orderRepository.save(newOrder);
    }
    // 3. ACTUALIZAR ESTADO (PUT)
    // URL: /api/orders/{id}/status?nuevoEstado=Entregado
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam String nuevoEstado) {
        return orderRepository.findById(id)
            .map(order -> {
                order.setEstado(nuevoEstado);
                return orderRepository.save(order);
            })
            .orElse(null);
    }
}