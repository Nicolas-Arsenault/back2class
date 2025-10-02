package com.ucat.api.dto.listings;

import com.ucat.api.entities.ListingImage;
import lombok.Data;

@Data
public class ListingImageDTO {
    private Long imageId;
    private String url;

    public ListingImageDTO(ListingImage img) {
        this.imageId = img.getImageId();
        this.url = img.getImageUrl();
    }
}
