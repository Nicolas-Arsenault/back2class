package com.ucat.api.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "pending_email", unique = true)
    private String pendingEmail;

    @Column(name = "email_update_token")
    private String emailUpdateToken;

    private LocalDateTime emailUpdateTokenExpiry;

    private LocalDateTime lastEmailUpdateRequestedAt;

    private String resetToken;

    private LocalDateTime lastPasswordResetRequestedAt;

    private LocalDateTime resetTokenExpiry;

    private String password;

    private boolean emailVerified;

    private String magicToken;

    private LocalDateTime magicTokenExpiry;

    private LocalDateTime lastMagicLinkSentAt;

    // Add any additional fields if necessary (e.g., createdAt)
}
