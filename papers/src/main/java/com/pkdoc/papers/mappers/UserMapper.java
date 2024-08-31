package com.pkdoc.papers.mappers;

import com.pkdoc.papers.DTOs.AuthResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pkdoc.papers.DTOs.RegisterDTO;
import com.pkdoc.papers.DTOs.UserDTO;
import com.pkdoc.papers.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "token", ignore = true)
    UserDTO toUserDTO(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    User registerToUser(RegisterDTO registerDTO);

    UserDTO registerToUserDTO(RegisterDTO registerDTO);

    @Mapping(target = "role", ignore = true) // TODO: figure out role
    User toUser(UserDTO userDTO);

    AuthResponseDTO toAuthResponseDTO(UserDTO userDTO);
}
