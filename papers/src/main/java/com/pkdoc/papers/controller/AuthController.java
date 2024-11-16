package com.pkdoc.papers.controller;

import com.pkdoc.papers.DTOs.AuthResponseDTO;
import com.pkdoc.papers.DTOs.LoginDTO;
import com.pkdoc.papers.DTOs.RegisterDTO;
import com.pkdoc.papers.config.JwtAuthProvider;
import com.pkdoc.papers.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final JwtAuthProvider jwtAuthProvider;

    @Autowired
    public AuthController(AuthService authService, JwtAuthProvider jwtAuthProvider) {
        this.authService = authService;
        this.jwtAuthProvider = jwtAuthProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginDTO loginDTO) {
        AuthResponseDTO authResponse = authService.login(loginDTO);
        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid RegisterDTO registerDTO) {
        AuthResponseDTO authResponse = authService.register(registerDTO);

        String token = jwtAuthProvider.createToken(registerDTO.getEmail());
        authResponse.setToken(token);

        return ResponseEntity.ok().body(authResponse);
    }

//    @PostMapping("/refresh")
//    public ResponseEntity<AuthResponseDTO> refresh(@RequestBody @Valid RefreshTokenDTO refreshTokenDTO) {
//        String email = jwtAuthProvider.extractEmail(refreshTokenDTO.getToken());
//
//        String newToken = jwtAuthProvider.createToken(email);
//        String newRefreshToken = jwtAuthProvider.createRefreshToken(email);
//
//        AuthResponseDTO authResponse = authService.refresh(refreshTokenDTO.getToken());
//        authResponse.setToken(newToken);
//        authResponse.setRefreshToken(newRefreshToken);
//
//        return ResponseEntity.ok().body(authResponse);
//    }
}
