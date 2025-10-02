package com.ucat.api.dto.auth;

import lombok.Data;

@Data
public class PasswordRecoveryRequest {
    private String email;
}

