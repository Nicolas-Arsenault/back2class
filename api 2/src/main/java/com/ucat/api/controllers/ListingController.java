package com.ucat.api.controllers;

import com.ucat.api.dto.ApiResponse;
import com.ucat.api.dto.listings.CreateListingRequest;
import com.ucat.api.dto.listings.ListingObjSafe;
import com.ucat.api.dto.listings.UpdateListingRequest;
import com.ucat.api.entities.Listing;
import com.ucat.api.services.ListingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/listings")
public class ListingController {
    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ApiResponse> createListing(
            @RequestBody CreateListingRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {


        ApiResponse resp = listingService.createListing(request,userDetails.getUsername());

        if(resp.isSuccess()){
            return ResponseEntity.ok(resp);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp);
        }
    }

    // READ single listing
    @GetMapping("/{id}")
    public ResponseEntity<ListingObjSafe> getListing(@PathVariable Long id) throws Exception {

        try{
            Optional<Listing> listing = listingService.getListingById(id);
            Listing realListing = listing.get();
            return ResponseEntity.ok(new ListingObjSafe(realListing));
        }
        catch(Exception ex){
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateListing(
            @PathVariable Long id,
            @RequestBody UpdateListingRequest request,
            @AuthenticationPrincipal UserDetails user) {

        ApiResponse response = listingService.
                    updateListing(id, request, user.getUsername());

        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteListing(@PathVariable Long id,
                                              @AuthenticationPrincipal UserDetails user) {

        ApiResponse resp = listingService.deleteListing(id, user.getUsername());

        if(resp.isSuccess()){
            return ResponseEntity.ok(resp);

        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).
                    body(resp);
        }
    }
}