package com.ucat.api.controllers;

import com.ucat.api.dto.*;
import com.ucat.api.services.AuthService;
import com.ucat.api.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmailWithToken(@RequestParam("token") String token) {
        return ResponseEntity.ok(authService.verifyEmailWithToken(token));
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerification(@RequestBody EmailRequest req) {
        return ResponseEntity.ok(authService.resendMagicLink(req.getEmail()));
    }

    @PostMapping("/recover-password")
    public ResponseEntity<String> recoverPassword(@RequestBody PasswordRecoveryRequest req) {
        return ResponseEntity.ok(authService.recoverPassword(req));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest req) {
        return ResponseEntity.ok(authService.resetPassword(req));
    }
}
