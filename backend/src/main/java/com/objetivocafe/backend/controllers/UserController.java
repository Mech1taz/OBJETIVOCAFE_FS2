package com.objetivocafe.backend.controllers;

import com.objetivocafe.backend.models.User;
import com.objetivocafe.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. OBTENER TODOS LOS USUARIOS
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2. REGISTRAR USUARIO (CON VALIDACIÓN DE RUT Y EMAIL)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        
        // A) Validar si el RUT ya existe
        if (userRepository.findByRut(user.getRut()) != null) {
            return ResponseEntity
                .badRequest()
                .body("Error: El RUT " + user.getRut() + " ya está registrado.");
        }

        // B) Validar si el Email ya existe
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity
                .badRequest()
                .body("Error: El correo " + user.getEmail() + " ya está registrado.");
        }

        // C) Si pasa las validaciones, configuramos rol y guardamos
        if (user.getRole() == null) {
            user.setRole("client"); 
        }
        
        User nuevoUsuario = userRepository.save(user);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // 3. LOGIN DE USUARIO
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credenciales) {
        String email = credenciales.get("email");
        String password = credenciales.get("password");

        User user = userRepository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }
}