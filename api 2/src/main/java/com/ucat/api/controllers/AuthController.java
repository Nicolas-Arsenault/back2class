package com.ucat.api.controllers;

import com.ucat.api.dto.*;
import com.ucat.api.services.AuthService;
import com.ucat.api.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody SignUpRequest request) {
        ApiResponse response = authService.signup(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        ApiResponse response = authService.login(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse> verifyEmailWithToken(@RequestParam("token") String token) {
        ApiResponse response = authService.verifyEmailWithToken(token);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<ApiResponse> resendVerification(@RequestBody EmailRequest req) {
        ApiResponse response = authService.resendMagicLink(req.getEmail());
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
        }
    }

    @PostMapping("/recover-password")
    public ResponseEntity<ApiResponse> recoverPassword(@RequestBody PasswordRecoveryRequest req) {
        ApiResponse response = authService.recoverPassword(req);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody PasswordResetRequest req) {
        ApiResponse response = authService.resetPassword(req);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
