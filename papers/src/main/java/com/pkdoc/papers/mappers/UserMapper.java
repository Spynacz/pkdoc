package com.pkdoc.papers.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.pkdoc.papers.DTOs.RegisterDTO;
import com.pkdoc.papers.DTOs.UserDTO;
import com.pkdoc.papers.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toUserDTO(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    User registerToUser(RegisterDTO registerDTO);
}
