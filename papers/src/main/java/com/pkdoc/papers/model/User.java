package com.pkdoc.papers.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "ACCOUNT")
@Data
public class User {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "id")
        private Long id;

        @NotBlank
        @Column(name = "email")
        private String email;

        @NotBlank
        @Column(name = "password")
        private String password;

        @Enumerated(EnumType.STRING)
        @Column(name = "role")
        private Role role;

        @Column(name = "name")
        private String name;

        @Column(name = "department")
        private String department;
}
