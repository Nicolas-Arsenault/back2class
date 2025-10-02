package com.ucat.api.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(nullable = false, unique = true)
    private String name;

    // Bi-directional (optional)
    @OneToMany(mappedBy = "category")
    private List<Listing> listings;

    // getters & setters
}
