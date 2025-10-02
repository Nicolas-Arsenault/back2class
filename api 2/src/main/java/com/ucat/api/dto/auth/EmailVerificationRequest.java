package com.ucat.api.dto.auth;

import lombok.Data;

@Data
public class EmailVerificationRequest {
    private String email;
    private String verificationCode;
}

