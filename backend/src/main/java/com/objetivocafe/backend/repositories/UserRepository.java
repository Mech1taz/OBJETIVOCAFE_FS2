package com.objetivocafe.backend.repositories;

import com.objetivocafe.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // Buscar usuario por Email (ya lo tenías)
    User findByEmail(String email);
    
    // --- NUEVO: Buscar usuario por RUT ---
    User findByRut(String rut);
}