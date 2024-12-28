package com.pkdoc.papers.keywords;

import com.pkdoc.papers.keywords.dtos.KeywordResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface KeywordMapper {

    KeywordResponseDTO toKeywordResponseDTO(Keyword keyword);
}
