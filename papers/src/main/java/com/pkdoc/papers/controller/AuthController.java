package com.pkdoc.papers.controller;

import com.pkdoc.papers.DTOs.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pkdoc.papers.config.UserAuthProvider;
import com.pkdoc.papers.service.AuthService;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final UserAuthProvider userAuthProvider;

    @Autowired
    public AuthController(AuthService authService, UserAuthProvider userAuthProvider) {
        this.authService = authService;
        this.userAuthProvider = userAuthProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginDTO loginDTO) {
        AuthResponseDTO authResponse = authService.login(loginDTO);
        authResponse.setToken(userAuthProvider.createToken(authResponse.getEmail()));
        authResponse.setRefreshToken(userAuthProvider.createRefreshToken(authResponse.getEmail()));
        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid RegisterDTO registerDTO) {
        AuthResponseDTO authResponse = authService.register(registerDTO);
        authResponse.setToken(userAuthProvider.createToken(authResponse.getEmail()));
        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(@RequestBody @Valid RefreshTokenDTO refreshTokenDTO) {
        AuthResponseDTO authResponse = authService.refresh(refreshTokenDTO.getToken());
        return ResponseEntity.ok().body(authResponse);
    }
}
