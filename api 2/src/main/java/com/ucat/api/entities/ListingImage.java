package com.ucat.api.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "ListingImages")
public class ListingImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    @Column(nullable = false)
    private String imageUrl;

    private Integer orderIndex = 0;

    // getters & setters
}
