package com.ucat.api.services;

import com.ucat.api.dto.*;
import com.ucat.api.dto.auth.LoginRequest;
import com.ucat.api.dto.auth.PasswordRecoveryRequest;
import com.ucat.api.dto.auth.PasswordResetRequest;
import com.ucat.api.dto.auth.SignUpRequest;
import com.ucat.api.entities.User;
import com.ucat.api.repositories.UserRepository;
import com.ucat.api.utils.JwtUtil;
import com.ucat.api.utils.SmtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final SmtpUtil smtpUtil;

    private static final int MAGIC_LINK_EXPIRATION_MINUTES = 15;
    private static final int MAGIC_LINK_RESEND_COOLDOWN_SECONDS = 30;

    String generateMagicToken() {
        return UUID.randomUUID().toString();
    }

    public ApiResponse signup(SignUpRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new ApiResponse(false, "Username is already taken!", null);
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new ApiResponse(false, "Email is already taken!", null);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setEmailVerified(false);

        String token = generateMagicToken();
        user.setMagicToken(token);
        user.setMagicTokenExpiry(LocalDateTime.now().plusMinutes(MAGIC_LINK_EXPIRATION_MINUTES));
        user.setLastMagicLinkSentAt(LocalDateTime.now());

        userRepository.save(user);

        String link = "http://localhost:3000/verify-email?token=" + token;
        smtpUtil.send(request.getEmail(), "Verify your email",
                "Click the link to verify your email: " + link);

        return new ApiResponse(true, "Signup successful! Please check your email for a verification link.", null);
    }

    public ApiResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!user.isEmailVerified()) {
                return new ApiResponse(false, "Please verify your email before logging in.", null);
            }
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String jwt = jwtUtil.generateToken(user.getUsername());
                return new ApiResponse(true, "Login successful.", jwt);
            }
        }
        return new ApiResponse(false, "Invalid email or password.", null);
    }

    public ApiResponse verifyEmailWithToken(String token) {
        Optional<User> userOpt = userRepository.findByMagicToken(token);
        if (userOpt.isEmpty()) {
            return new ApiResponse(false, "Invalid or expired verification link.", null);
        }

        User user = userOpt.get();

        if (user.getMagicTokenExpiry().isBefore(LocalDateTime.now())) {
            return new ApiResponse(false, "Verification link has expired. Please request a new one.", null);
        }

        user.setEmailVerified(true);
        user.setMagicToken(null);
        user.setMagicTokenExpiry(null);
        userRepository.save(user);

        return new ApiResponse(true, "Email successfully verified!", null);
    }

    public ApiResponse verifyToken(String token){
        String username = jwtUtil.extractUsername(token);
        if(userRepository.findByUsername(username).isPresent()){
            if(jwtUtil.validateToken(token,username)){
                return new ApiResponse(true, "Token is valid!", null);
            }
        }
        return new ApiResponse(false, "Token is not valid.", null);
    }

    public void sendEmailChangeVerification(String newEmail, String token) {
        String link = "http://localhost:3000/confirm-pending-email?token=" + token;
        smtpUtil.send(newEmail,"Verify your email!",
                "Click the link to verify your email: " + link
                );
    }

    public ApiResponse resendUpdateEmailMagicLink(String email){
        Optional<User> userOpt = userRepository.findByEmailUpdateToken(email);
        if (userOpt.isEmpty()) {
            return new ApiResponse(false, "User not found.", null);
        }

        User user = userOpt.get();
        LocalDateTime now = LocalDateTime.now();

        if (user.getLastEmailUpdateRequestedAt() != null &&
                user.getLastEmailUpdateRequestedAt().plusSeconds(MAGIC_LINK_RESEND_COOLDOWN_SECONDS).isAfter(now)) {
            return new ApiResponse(false, "Please wait before requesting another verification link.", null);
        }

        String token = generateMagicToken();
        user.setEmailUpdateToken(token);
        user.setEmailUpdateTokenExpiry(now.plusMinutes(MAGIC_LINK_EXPIRATION_MINUTES));
        user.setLastEmailUpdateRequestedAt(now);
        userRepository.save(user);

        String link = "http://localhost:3000/confirm-pending-email?token=" + token;
        smtpUtil.send(email, "Your new verification link",
                "Click the link to verify your email: " + link);

        return new ApiResponse(true, "A new verification link has been sent to your email.", null);
    }

    public ApiResponse resendMagicLink(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return new ApiResponse(false, "User not found.", null);
        }

        User user = userOpt.get();
        LocalDateTime now = LocalDateTime.now();

        if (user.getLastMagicLinkSentAt() != null &&
                user.getLastMagicLinkSentAt().plusSeconds(MAGIC_LINK_RESEND_COOLDOWN_SECONDS).isAfter(now)) {
            return new ApiResponse(false, "Please wait before requesting another verification link.", null);
        }

        String token = generateMagicToken();
        user.setMagicToken(token);
        user.setMagicTokenExpiry(now.plusMinutes(MAGIC_LINK_EXPIRATION_MINUTES));
        user.setLastMagicLinkSentAt(now);
        userRepository.save(user);

        String link = "http://localhost:3000/verify-email?token=" + token;
        smtpUtil.send(email, "Your new verification link",
                "Click the link to verify your email: " + link);

        return new ApiResponse(true, "A new verification link has been sent to your email.", null);
    }

    public ApiResponse recoverPassword(PasswordRecoveryRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            // For security, don't reveal whether email exists
            return new ApiResponse(true, "If this email exists, a reset link will be sent.", null);
        }

        User user = userOpt.get();

        if (user.getLastPasswordResetRequestedAt() != null &&
                user.getLastPasswordResetRequestedAt().plusMinutes(2).isAfter(LocalDateTime.now())) {
            return new ApiResponse(false, "You can only request a password reset once every 2 minutes.", null);
        }

        String token = generateMagicToken();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(30));
        user.setLastPasswordResetRequestedAt(LocalDateTime.now());

        userRepository.save(user);

        String link = "http://localhost:3000/reset-password?token=" + token;
        smtpUtil.send(user.getEmail(), "Reset your password",
                "Click this link to reset your password: " + link + "\nThis link expires in 30 minutes.");

        return new ApiResponse(true, "If this email exists, a reset link will be sent.", null);
    }

    public ApiResponse resetPassword(PasswordResetRequest req) {
        Optional<User> userOpt = userRepository.findByResetToken(req.getToken());
        if (userOpt.isEmpty()) {
            return new ApiResponse(false, "Invalid or expired token.", null);
        }

        User user = userOpt.get();

        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return new ApiResponse(false, "Token expired. Please request a new one.", null);
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return new ApiResponse(true, "Password successfully reset.", null);
    }

    public ApiResponse verifyPendingEmail(String token) {

        Optional<User> userOpt = userRepository.findByEmailUpdateToken(token);
        if (userOpt.isEmpty()) {
            return new ApiResponse(false, "Invalid or expired verification link.", null);
        }

        User user = userOpt.get();

        if (user.getEmailUpdateTokenExpiry().isBefore(LocalDateTime.now())) {
            return new ApiResponse(false, "Verification link has expired. Please request a new one.", null);
        }

        user.setEmail(user.getPendingEmail());
        user.setEmailUpdateToken(null);
        user.setEmailUpdateTokenExpiry(null);
        user.setPendingEmail(null);
        userRepository.save(user);

        return new ApiResponse(true, "Email successfully changed!", null);
    }
}
