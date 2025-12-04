package com.objetivocafe.backend.controllers;

import com.objetivocafe.backend.models.Product;
import com.objetivocafe.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Permite que React entre
public class ProductController {

    @Autowired
    private ProductRepository repository;

    // 1. LEER TODOS (GET)
    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    // 2. CREAR UNO (POST)
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return repository.save(product);
    }
    
    // 2.1. CREAR MUCHOS (POST Masivo - Batch)
    @PostMapping("/batch")
    public List<Product> createProducts(@RequestBody List<Product> products) {
        return repository.saveAll(products);
    }

    // 3. ACTUALIZAR (PUT) - ¡NUEVO!
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        // Buscamos si existe el producto con ese ID
        Optional<Product> productOptional = repository.findById(id);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            
            // Actualizamos los datos
            product.setNombre(productDetails.getNombre());
            product.setPrecio(productDetails.getPrecio());
            product.setTipo(productDetails.getTipo());
            product.setImagen(productDetails.getImagen());
            product.setStock(productDetails.getStock());
            product.setDescripcion(productDetails.getDescripcion());
            product.setDescripcionLarga(productDetails.getDescripcionLarga());
            product.setNotas(productDetails.getNotas());

            // Guardamos los cambios
            Product updatedProduct = repository.save(product);
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 4. ELIMINAR (DELETE) - ¡NUEVO!
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content (Éxito)
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}