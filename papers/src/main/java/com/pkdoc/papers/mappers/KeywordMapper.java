package com.pkdoc.papers.mappers;

import com.pkdoc.papers.DTOs.KeywordResponseDTO;
import com.pkdoc.papers.model.Keyword;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface KeywordMapper {

    KeywordResponseDTO toKeywordResponseDTO(Keyword keyword);
}
