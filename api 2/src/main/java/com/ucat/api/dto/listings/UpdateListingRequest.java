package com.ucat.api.dto.listings;

import lombok.Data;

import java.util.List;

@Data
public class UpdateListingRequest {
    private Long categoryId;
    private String title;
    private String description;
    private Double price;
    private String status;
    private Boolean isSold;
    private List<String> imageUrls; // new images
}
