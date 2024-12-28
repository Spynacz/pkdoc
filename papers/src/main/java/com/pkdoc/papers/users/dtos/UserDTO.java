package com.pkdoc.papers.users.dtos;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String token;
    private String password;
}
