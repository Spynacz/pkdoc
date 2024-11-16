package com.pkdoc.papers.DTOs;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private long userId;
    private String email;
    private String token;
    private String refreshToken;
}
