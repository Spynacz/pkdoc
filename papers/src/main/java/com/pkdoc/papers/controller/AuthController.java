package com.pkdoc.papers.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pkdoc.papers.DTOs.LoginDTO;
import com.pkdoc.papers.DTOs.RegisterDTO;
import com.pkdoc.papers.DTOs.UserDTO;
import com.pkdoc.papers.config.UserAuthProvider;
import com.pkdoc.papers.service.UserService;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;
    private final UserAuthProvider userAuthProvider;

    @Autowired
    public AuthController(UserService userService, UserAuthProvider userAuthProvider) {
        this.userService = userService;
        this.userAuthProvider = userAuthProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody @Valid LoginDTO loginDTO) {
        UserDTO userDTO = userService.login(loginDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO.getEmail()));
        return ResponseEntity.created(URI.create("/api/users/" + userDTO.getId())).body(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid RegisterDTO registerDTO) {
        UserDTO user = userService.register(registerDTO);
        user.setToken(userAuthProvider.createToken(user.getEmail()));
        return ResponseEntity.created(URI.create("/api/users/" + user.getId())).body(user);
    }

}
