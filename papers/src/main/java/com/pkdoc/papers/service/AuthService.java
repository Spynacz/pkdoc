package com.pkdoc.papers.service;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.pkdoc.papers.DTOs.AuthResponseDTO;
import com.pkdoc.papers.DTOs.LoginDTO;
import com.pkdoc.papers.DTOs.RegisterDTO;
import com.pkdoc.papers.DTOs.UserDTO;
import com.pkdoc.papers.config.JwtAuthProvider;
import com.pkdoc.papers.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtAuthProvider jwtAuthProvider;

    @Autowired
    public AuthService(UserService userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper, JwtAuthProvider jwtAuthProvider) {
        this.userService = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.jwtAuthProvider = jwtAuthProvider;
    }

    public AuthResponseDTO login(LoginDTO loginDTO) throws BadCredentialsException {
        UserDTO user = userService.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Account with this email does not exist"));

        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return getAuthResponseDTO(user);
        } else {
            throw new BadCredentialsException("Invalid password");
        }
    }

    public AuthResponseDTO register(RegisterDTO registerDTO) {
        if (userService.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Account with this email already exists");
        }

        UserDTO user = userMapper.registerToUserDTO(registerDTO);
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        UserDTO savedUser = userService.save(user);
        return getAuthResponseDTO(savedUser);
    }

    public AuthResponseDTO refresh(String refreshToken) {
        if (!jwtAuthProvider.validateRefreshToken(refreshToken)) {
            throw new JWTVerificationException("Invalid refresh token");
        }

        String email = jwtAuthProvider.extractSubject(refreshToken);
        UserDTO user = userService.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        AuthResponseDTO authResponse = userMapper.toAuthResponseDTO(user);
        authResponse.setToken(jwtAuthProvider.createToken(email));
        authResponse.setRefreshToken(jwtAuthProvider.createRefreshToken(email));

        return authResponse;
    }

    private AuthResponseDTO getAuthResponseDTO(UserDTO user) {
        String token = jwtAuthProvider.createToken(user.getEmail());
        String refreshToken = jwtAuthProvider.createRefreshToken(user.getEmail());
        AuthResponseDTO authResponse = userMapper.toAuthResponseDTO(user);
        authResponse.setToken(token);
        authResponse.setRefreshToken(refreshToken);
        return authResponse;
    }
}
