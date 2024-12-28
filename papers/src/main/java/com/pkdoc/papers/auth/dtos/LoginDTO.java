package com.pkdoc.papers.auth.dtos;

import lombok.Data;

@Data
public class LoginDTO {
    private String email;
    private String password;
}

