package com.pkdoc.papers.auth.dtos;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private long userId;
    private String email;
    private String token;
    private String refreshToken;
}
