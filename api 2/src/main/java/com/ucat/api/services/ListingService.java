package com.ucat.api.services;

import com.ucat.api.entities.Listing;
import com.ucat.api.repositories.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ListingService {
    private final ListingRepository listingRepository;

    public Listing createListing(Listing listing){
        return listingRepository.save(listing);
    }

    public Optional<Listing> getListingById(Long id){
        return listingRepository.findById(id);
    }

    public Listing updateListing(Long id, Listing updatedListing){
        return listingRepository.findById(id).map(listing -> {
            listing.setTitle(updatedListing.getTitle());
            listing.setDescription(updatedListing.getDescription());
            listing.setPrice(updatedListing.getPrice());
            listing.setCategory(updatedListing.getCategory());
            listing.setStatus(updatedListing.getStatus());
            listing.setIsSold(updatedListing.getIsSold());
            listing.setUpdatedAt(java.time.LocalDateTime.now());
            return listingRepository.save(listing);
        }).orElseThrow(()-> new RuntimeException("Listing not found."));
    }

    public void deleteListing(Long id){
        if(!listingRepository.existsById(id)){
            throw new RuntimeException("Listing not found.");
        }
        listingRepository.deleteById(id);
    }
}
