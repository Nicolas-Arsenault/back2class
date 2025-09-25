package com.ucat.api.utils;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MagicTokenUtil {

    public String generateMagicToken() {
        return UUID.randomUUID().toString();
    }

}
