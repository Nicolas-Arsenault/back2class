package com.ucat.api.services;

import com.ucat.api.dto.EmailRequest;
import com.ucat.api.dto.LoginRequest;
import com.ucat.api.dto.PasswordRecoveryRequest;
import com.ucat.api.dto.SignUpRequest;
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
    private static final int MAGIC_LINK_RESEND_COOLDOWN_SECONDS = 120;

    public String signup(SignUpRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username is already taken!";
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email is already taken!";
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

        String link = "http://localhost:8080/api/auth/verify-email?token=" + token;
        smtpUtil.send(request.getEmail(), "Verify your email",
                "Click the link to verify your email: " + link);

        return "Signup successful! Please check your email for a verification link.";
    }

    public String verifyEmailWithToken(String token) {
        Optional<User> userOpt = userRepository.findByMagicToken(token);
        if (userOpt.isEmpty()) {
            return "Invalid or expired verification link.";
        }

        User user = userOpt.get();

        if (user.getMagicTokenExpiry().isBefore(LocalDateTime.now())) {
            return "Verification link has expired. Please request a new one.";
        }

        user.setEmailVerified(true);
        user.setMagicToken(null); // Invalidate token
        user.setMagicTokenExpiry(null);
        userRepository.save(user);

        return "Email successfully verified!";
    }

    public String resendMagicLink(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return "User not found.";

        User user = userOpt.get();

        // Check rate limiting
        LocalDateTime now = LocalDateTime.now();
        if (user.getLastMagicLinkSentAt() != null &&
                user.getLastMagicLinkSentAt().plusSeconds(MAGIC_LINK_RESEND_COOLDOWN_SECONDS).isAfter(now)) {
            long secondsRemaining = user.getLastMagicLinkSentAt()
                    .plusSeconds(MAGIC_LINK_RESEND_COOLDOWN_SECONDS)
                    .minusSeconds(now.getSecond())
                    .getSecond();

            return "Please wait before requesting another verification link.";
        }

        // Generate new token
        String token = generateMagicToken();
        user.setMagicToken(token);
        user.setMagicTokenExpiry(now.plusMinutes(MAGIC_LINK_EXPIRATION_MINUTES));
        user.setLastMagicLinkSentAt(now);
        userRepository.save(user);

        String link = "http://localhost:8080/api/auth/verify-email?token=" + token;
        smtpUtil.send(email, "Your new verification link",
                "Click the link to verify your email: " + link);

        return "A new verification link has been sent to your email.";
    }

    private String generateMagicToken() {
        return UUID.randomUUID().toString();
    }

    // Placeholder for login (you might want to rework this for JWT after email verification)
    public String login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!user.isEmailVerified()) return "Please verify your email before logging in.";
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return jwtUtil.generateToken(user.getUsername());
            }
        }
        return "Invalid email or password.";
    }

    public String recoverPassword(PasswordRecoveryRequest req) {
        return "Not implemented yet.";
    }
}
