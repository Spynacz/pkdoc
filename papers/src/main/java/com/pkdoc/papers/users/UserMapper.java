package com.pkdoc.papers.users;

import com.pkdoc.papers.auth.dtos.AuthResponseDTO;
import com.pkdoc.papers.users.dtos.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pkdoc.papers.auth.dtos.RegisterDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "token", ignore = true)
    UserDTO toUserDTO(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    User registerToUser(RegisterDTO registerDTO);

    @Mapping(target = "password", ignore = true)
    UserDTO registerToUserDTO(RegisterDTO registerDTO);

    @Mapping(target = "role", ignore = true) // TODO: figure out role
    User toUser(UserDTO userDTO);

    @Mapping(target = "userId", source = "id")
    AuthResponseDTO toAuthResponseDTO(UserDTO userDTO);
}
