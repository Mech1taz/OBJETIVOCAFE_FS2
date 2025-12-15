package com.objetivocafe.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private String password;
    private String role; // "admin" o "client"

    // --- AQUÍ ESTÁ EL CAMBIO ---
    // unique = true: La base de datos impedirá que se repita el RUT
    @Column(unique = true) 
    private String rut;

    // CONSTRUCTOR VACÍO
    public User() {}

    // CONSTRUCTOR CON DATOS
    public User(String nombre, String email, String password, String rut, String role) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rut = rut;
        this.role = role;
    }


    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }
}