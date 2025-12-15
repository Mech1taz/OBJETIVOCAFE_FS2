package com.objetivocafe.backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clienteNombre;
    private Integer total;
    private LocalDateTime fecha;
    
    @Column(columnDefinition = "TEXT")
    private String detalles;

    // --- NUEVO CAMPO ---
    private String estado; // "Pendiente", "Pagado", "Entregado"

    @PrePersist
    protected void onCreate() {
        fecha = LocalDateTime.now();
        if (estado == null) estado = "Pendiente"; // Valor por defecto
    }

    // Getters y Setters (¡No olvides agregarlos!)
    public Long getId() { return id; }
    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }
    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }
    public String getDetalles() { return detalles; }
    public void setDetalles(String detalles) { this.detalles = detalles; }
    public LocalDateTime getFecha() { return fecha; }
    
    // Getter y Setter del nuevo campo
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}