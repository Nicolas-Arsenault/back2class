package com.ucat.api.controllers;

import com.ucat.api.dto.ApiResponse;
import com.ucat.api.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProfile(@PathVariable Long id,
                                                     @AuthenticationPrincipal UserDetails user){
        ApiResponse resp = profileService.deleteAccount(id,user.getUsername());
        if(resp.isSuccess()){
            return ResponseEntity.ok(resp);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(resp);
        }
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<ApiResponse> updateEmail(@PathVariable Long id,
                                                    @RequestBody String email,
                                                   @AuthenticationPrincipal UserDetails user){
        ApiResponse resp = profileService.updateEmail(id,email,user.getUsername());
        if(resp.isSuccess()){
            return ResponseEntity.ok(resp);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(resp);
        }
    }
}
