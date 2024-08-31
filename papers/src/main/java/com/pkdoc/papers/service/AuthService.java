package com.pkdoc.papers.service;

import com.auth0.jwt.JWT;
import com.pkdoc.papers.DTOs.*;
import com.pkdoc.papers.config.UserAuthProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pkdoc.papers.mappers.UserMapper;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final UserAuthProvider userAuthProvider;

    @Autowired
    public AuthService(UserService userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper, UserAuthProvider userAuthProvider) {
        this.userService = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.userAuthProvider = userAuthProvider;
    }

    public AuthResponseDTO login(LoginDTO loginDTO) {
        UserDTO user = userService.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return userMapper.toAuthResponseDTO(user);
        } else {
            throw new RuntimeException("Invalid password"); // TODO: add HTTP code
        }
    }

    public AuthResponseDTO register(RegisterDTO registerDTO) {
        if (userService.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new RuntimeException("User account with this email already exists"); // TODO: add HTTP code
        }

        UserDTO user = userMapper.registerToUserDTO(registerDTO);
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        UserDTO savedUser = userService.save(user);
        return userMapper.toAuthResponseDTO(savedUser);
    }

    public AuthResponseDTO refresh(String refreshToken) {
        if (!userAuthProvider.validateRefreshToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String email = JWT.decode(refreshToken).getSubject();
        UserDTO user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AuthResponseDTO authResponse = userMapper.toAuthResponseDTO(user);
        authResponse.setToken(userAuthProvider.createToken(email));
        authResponse.setRefreshToken(userAuthProvider.createRefreshToken(email));

        return authResponse;
    }
}
