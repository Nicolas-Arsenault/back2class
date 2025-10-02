package com.ucat.api.dto.listings;
import lombok.Data;

import java.util.List;

@Data
public class CreateListingRequest {
    private Long categoryId;       // ID of the category
    private String title;
    private String description;
    private Double price;
    private List<String> imageUrls; // or another simple representation for images
}