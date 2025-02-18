package com.pkdoc.papers.users;

import com.pkdoc.papers.users.dtos.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(userMapper::toUserDTO).collect(Collectors.toList());
    }

    public Optional<UserDTO> findById(Long id) {
        return userRepository.findById(id).map(userMapper::toUserDTO);
    }

    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email).map(userMapper::toUserDTO);
    }

    public UserDTO save(UserDTO userDTO) {
        return userMapper.toUserDTO(userRepository.save(userMapper.toUser(userDTO))); // this is stupid
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
