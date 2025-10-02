package com.ucat.api.dto.listings;

import com.ucat.api.entities.Category;
import lombok.Data;

@Data
public class CategoryDTO {
    private Long categoryId;
    private String name;

    public CategoryDTO(Category category) {
        this.categoryId = category.getCategoryId();
        this.name = category.getName();
    }
}

