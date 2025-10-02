package com.ucat.api.repositories;

import com.ucat.api.entities.ListingImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingImageRepository extends JpaRepository<ListingImage, Long> {
}
