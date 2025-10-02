package com.ucat.api.services;

import com.ucat.api.dto.ApiResponse;
import com.ucat.api.dto.listings.CreateListingRequest;
import com.ucat.api.dto.listings.UpdateListingRequest;
import com.ucat.api.entities.Category;
import com.ucat.api.entities.Listing;
import com.ucat.api.entities.ListingImage;
import com.ucat.api.entities.User;
import com.ucat.api.repositories.CategoryRepository;
import com.ucat.api.repositories.ListingImageRepository;
import com.ucat.api.repositories.ListingRepository;
import com.ucat.api.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ListingImageRepository listingImageRepository;

    public ListingService(ListingRepository listingRepository,
                          UserRepository userRepository,
                          CategoryRepository categoryRepository,
                          ListingImageRepository listingImageRepository) {
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.listingImageRepository = listingImageRepository;
    }

    @Transactional
    public ApiResponse createListing(CreateListingRequest dto, String username) {
        if(!userRepository.findByUsername(username).isPresent()){
            return new ApiResponse(false,
                    "Utilisateur non existant. Une erreur est survenue.",
                    null);
        }
        User user = userRepository.findByUsername(username).get();

        if(categoryRepository.findById(dto.getCategoryId()).isEmpty()){
            return new ApiResponse(false,
                    "Category inexistante.",
                    null);
        }

        if(dto.getImageUrls() != null && dto.getImageUrls().size() > 5){
            return new ApiResponse(false,
                    "Too many images. Please select 5 or less.",
                    null);
        }

        Category category = categoryRepository.findById(dto.getCategoryId()).get();

        Listing listing = new Listing();
        listing.setUser(user);
        listing.setCategory(category);
        listing.setTitle(dto.getTitle());
        listing.setDescription(dto.getDescription());
        listing.setPrice(dto.getPrice());

        // Handle images
        if (dto.getImageUrls() != null) {
            for (String url : dto.getImageUrls()) {
                ListingImage image = new ListingImage();
                image.setImageUrl(url);
                listing.addImage(image); // sets listing in image
            }
        }

        listingRepository.save(listing); // cascades images
        return new ApiResponse(true,
                "Post added with success.",
                null);
    }

    @Transactional
    public ApiResponse updateListing(Long id, UpdateListingRequest dto,
                                     String username) {

        if(!listingRepository.existsById(id)){
            return new ApiResponse(false,
                    "Post doesnt exist.", null);
        }

        Optional<Listing> wrapper = listingRepository.findById(id);
        Listing concernedListing = wrapper.get();

        if(!concernedListing.getUser().getUsername().equals(username)){
            return new ApiResponse(false,
                    "Not the owner of the post.",
                    null);
        }

        if(dto.getImageUrls() != null && dto.getImageUrls().size() > 5){
            return new ApiResponse(false,
                    "Please select 5 images or less.",
                    null);
        }

         listingRepository.findById(id).map(listing -> {

            if (dto.getTitle() != null) listing.setTitle(dto.getTitle());
            if (dto.getDescription() != null) listing.setDescription(dto.getDescription());
            if (dto.getPrice() != null) listing.setPrice(dto.getPrice());
            if (dto.getStatus() != null) listing.setStatus(dto.getStatus());
            if (dto.getIsSold() != null) listing.setIsSold(dto.getIsSold());

            // Update category properly
            if (dto.getCategoryId() != null) {
                Category category = categoryRepository.findById(dto.getCategoryId())
                        .orElseThrow(() -> new RuntimeException("Category not found"));
                listing.setCategory(category);
            }

            // Handle images
            if (dto.getImageUrls() != null) {
                // Remove old images from DB (important)
                listing.getImages().forEach(listingImageRepository::delete);
                listing.getImages().clear();

                // Add new images
                for (String url : dto.getImageUrls()) {
                    ListingImage image = new ListingImage();
                    image.setImageUrl(url);
                    listing.addImage(image);
                }
            }


            listing.setUpdatedAt(java.time.LocalDateTime.now());
            return listingRepository.save(listing);
        });

        return new ApiResponse(true,
                "Successfully modified the post!",
                null);
    }

    @Transactional
    public ApiResponse deleteListing(Long id, String username) {
        if(!listingRepository.existsById(id)){
            return new ApiResponse(false,
                    "Listing does not exist.",
                    null);
        }

        if(!listingRepository.findById(id).get().getUser().getUsername().equals(username)){
            return new ApiResponse(false,
                    "You do not own the post.",
                    null);
        }

        Listing listing = listingRepository.findById(id).get();
        listingRepository.delete(listing); // cascades images automatically because of CascadeType.ALL
        return new ApiResponse(true,
                "Post deleted successfully.",
                null);
    }

    public Optional<Listing> getListingById(Long id) throws Exception {

        Optional<Listing> listing = listingRepository.findById(id);
        if(listing.isEmpty()){
            throw new Exception("Listing not found.");
        }
        return listing;
    }

    public java.util.List<Listing> getAllListings() {
        return listingRepository.findAll();
    }
}
