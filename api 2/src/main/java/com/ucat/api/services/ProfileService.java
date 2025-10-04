package com.ucat.api.services;

import com.ucat.api.dto.ApiResponse;
import com.ucat.api.entities.User;
import com.ucat.api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepo;
    private final AuthService authService;

    private static final int MAGIC_LINK_EXPIRATION_MINUTES = 15;

    public ApiResponse deleteAccount(String username) {
        if(!userRepo.findByUsername(username).isPresent()){
            return new ApiResponse(false,
                    "User does not exist.",
                    null);
        }

        Optional<User> user = userRepo.findByUsername(username);

        userRepo.delete(user.get());

        return new ApiResponse(true,
                "User deleted successfully",
                null);
    }

    public ApiResponse updateEmail(String newEmail, String username) {
        Optional<User> optUser = userRepo.findByUsername(username);
        if (optUser.isEmpty()) {
            return new ApiResponse(false, "User doesn't exist.", null);
        }

        User user = optUser.get();

        // Check if it's the same email
        if (user.getEmail().equalsIgnoreCase(newEmail)) {
            return new ApiResponse(false, "This email is already in use.", null);
        }

        if(userRepo.findByEmail(newEmail).isPresent()){
            return new ApiResponse(false,
                    "Email is already in use.",
                    null);
        }

        // Generate a secure token
        String token = authService.generateMagicToken();

        // Store the pending email + token
        user.setPendingEmail(newEmail);
        user.setEmailUpdateToken(token);
        user.setEmailUpdateTokenExpiry(LocalDateTime.now().plusMinutes(MAGIC_LINK_EXPIRATION_MINUTES));
        user.setLastEmailUpdateRequestedAt(LocalDateTime.now());
        userRepo.save(user);

        // Send the verification email
        authService.sendEmailChangeVerification(newEmail, token);

        return new ApiResponse(true,
                "Verification link sent to the new email. Your account remains active until confirmation.",
                null);
    }
}
