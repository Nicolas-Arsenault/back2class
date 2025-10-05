package com.ucat.api.controllers;

import com.ucat.api.dto.ApiResponse;
import com.ucat.api.dto.EmailChangeRequest;
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

    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteProfile(@AuthenticationPrincipal UserDetails user){
        ApiResponse resp = profileService.deleteAccount(user.getUsername());
        if(resp.isSuccess()){
            return ResponseEntity.ok(resp);
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(resp);
        }
    }

    @GetMapping("/username")
    @ResponseBody
    public String getUsername(@AuthenticationPrincipal UserDetails user){
        return user.getUsername();
    }


    @PutMapping("/email")
    public ResponseEntity<ApiResponse> updateEmail(@RequestBody EmailChangeRequest email,
                                                   @AuthenticationPrincipal UserDetails user){
        ApiResponse resp = profileService.updateEmail(email.getEmail(),user.getUsername());
        if(resp.isSuccess()){
            return ResponseEntity.ok(resp);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(resp);
        }
    }
}
