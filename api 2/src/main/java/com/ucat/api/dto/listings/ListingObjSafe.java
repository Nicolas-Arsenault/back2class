package com.ucat.api.dto.listings;

import com.ucat.api.entities.Listing;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ListingObjSafe {
    public ListingObjSafe(Listing listing){
        listingId = listing.getListingId();
        user_id = listing.getUser().getId();
        username = listing.getUser().getUsername();
        category = new CategoryDTO(listing.getCategory());
        title = listing.getTitle();
        description = listing.getDescription();
        price = listing.getPrice();
        status = listing.getStatus();
        isSold = listing.getIsSold();
        createdAt = listing.getCreatedAt();
        updatedAt = listing.getUpdatedAt();
        images = listing.getImages().stream()
                .map(ListingImageDTO::new)
                .toList(); // or Collectors.toList() in older Java
    }

    private Long listingId;
    private Long user_id;
    private String username;
    private CategoryDTO category;
    private String title;
    private String description;
    private Double price;
    private String status;
    private Boolean isSold;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ListingImageDTO> images;
}
