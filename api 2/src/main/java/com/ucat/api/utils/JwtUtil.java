package com.ucat.api.utils;

import com.ucat.api.repositories.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY; //make it take from app properties
    @Value("${jwt.expiration}")
    private int EXPIRATION;
    private SecretKey key;
    @Autowired
    private UserRepository userRepo;

    @PostConstruct
    public void init(){
        key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
// Might need this for the frontend... dont know yet.
//    public boolean userExists(String token){
//        String username = extractUsername(token);
//        return userRepo.findByUsername(username).isPresent();
//    }

    public String generateToken(String username){
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+EXPIRATION))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public String extractUsername(String token){
        return getClaims(token).getSubject();
    }

    public boolean validateToken(String token, String username){
        final String extractedUsername = extractUsername(token);
        return(extractedUsername.equals(username) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token){
        final Date expiration = getClaims(token).getIssuedAt();
        return expiration.before(new Date());
    }

    private Claims getClaims(String token){
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


}
