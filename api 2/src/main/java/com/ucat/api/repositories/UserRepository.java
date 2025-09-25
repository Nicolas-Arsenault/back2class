package com.ucat.api.repositories;

import com.ucat.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByMagicToken(String token);

    Optional<User> findByResetToken(String resetToken);
}
