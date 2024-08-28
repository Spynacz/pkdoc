package com.pkdoc.papers.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pkdoc.papers.DTOs.LoginDTO;
import com.pkdoc.papers.DTOs.RegisterDTO;
import com.pkdoc.papers.DTOs.UserDTO;
import com.pkdoc.papers.mappers.UserMapper;
import com.pkdoc.papers.model.User;
import com.pkdoc.papers.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(userMapper::toUserDTO).collect(Collectors.toList());
    }

    public Optional<UserDTO> findById(Long id) {
        return Optional.of(userMapper.toUserDTO(userRepository.findById(id).orElse(null)));
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public UserDTO login(LoginDTO loginDTO) {
        User user = userRepository.findByEmailIgnoreCase(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return userMapper.toUserDTO(user);
        } else {
            throw new RuntimeException("Invalid password"); // TODO: add HTTP code
        }
    }

    public UserDTO register(RegisterDTO registerDTO) {
        if (userRepository.findByEmailIgnoreCase(registerDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Username taken"); // TODO: add HTTP code
        }

        User user = userMapper.registerToUser(registerDTO);
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        User savedUser = userRepository.save(user);
        return userMapper.toUserDTO(savedUser);
    }

}
