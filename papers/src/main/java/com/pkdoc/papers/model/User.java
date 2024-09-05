package com.pkdoc.papers.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "ACCOUNT")
@Data
public class User {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank
        private String email;

        @NotBlank
        private String password;

        @Enumerated(EnumType.STRING)
        private Role role;

        private String name;

        private String department;
}
