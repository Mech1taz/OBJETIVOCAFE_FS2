package com.objetivocafe.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Integer precio;
    private String tipo; // cafe, cafetera, accesorio
    private String imagen;
    private Integer stock;

    // Constructor Vacío (Obligatorio)
    public Product() {}

    // Constructor con datos
    public Product(String nombre, Integer precio, String tipo, String imagen, Integer stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.imagen = imagen;
        this.stock = stock;
    }

    @Column(length = 1000) // Permite textos largos
    private String descripcion;
    @Column(length = 2000)
    private String descripcionLarga;
    private String notas;

    // Getters (Necesarios para que Postman vea los datos)
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public Integer getPrecio() { return precio; }
    public String getTipo() { return tipo; }
    public String getImagen() { return imagen; }
    public Integer getStock() { return stock; }

    // Setters (Necesarios para guardar datos)
    public void setNombre(String nombre) { this.nombre = nombre; }
    public void setPrecio(Integer precio) { this.precio = precio; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public void setImagen(String imagen) { this.imagen = imagen; }
    public void setStock(Integer stock) { this.stock = stock; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getDescripcionLarga() { return descripcionLarga; }
    public void setDescripcionLarga(String descripcionLarga) { this.descripcionLarga = descripcionLarga; }
    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }
}