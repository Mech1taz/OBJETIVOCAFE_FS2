package com.objetivocafe.backend.repositories;

import com.objetivocafe.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // ¡Listo! No necesitas escribir nada más aquí.
}