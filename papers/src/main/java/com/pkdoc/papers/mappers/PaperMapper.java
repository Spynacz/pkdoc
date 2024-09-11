package com.pkdoc.papers.mappers;

import com.pkdoc.papers.DTOs.PaperCreateDTO;
import com.pkdoc.papers.DTOs.PaperResponseDTO;
import com.pkdoc.papers.model.Keyword;
import com.pkdoc.papers.model.Paper;
import com.pkdoc.papers.model.User;
import com.pkdoc.papers.repository.KeywordRepository;
import com.pkdoc.papers.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PaperMapper {

    @Mapping(source = "uploader.id", target = "uploader.id")
    @Mapping(source = "uploader.name", target = "uploader.name")
    PaperResponseDTO toPaperResponseDTO(Paper paper);

    @Mapping(source = "uploaderId", target = "uploader", qualifiedByName = "mapUploaderIdToUploader")
    @Mapping(source = "keywords", target = "keywords", qualifiedByName = "mapKeywordsStringsToKeywords")
    Paper toPaper(PaperCreateDTO paperCreateDTO, @Context UserRepository userRepository, @Context KeywordRepository keywordRepository);

    @Named("mapUploaderIdToUploader")
    default User mapUploaderIdToUploader(Long uploaderId, @Context UserRepository userRepository) {
        return userRepository.findById(uploaderId).orElseThrow(
                () -> new EntityNotFoundException("User not found " + uploaderId));
    }

    @Named("mapKeywordsStringsToKeywords")
    default Set<Keyword> mapKeywordsStringsToKeywords(Set<String> keywords, @Context KeywordRepository keywordRepository) {
        return keywords.stream().map(k -> keywordRepository.findByKeyword(k).orElseGet(() -> {
            Keyword keyword = new Keyword();
            keyword.setKeyword(k);
            return keywordRepository.save(keyword);
        })).collect(Collectors.toSet());
    }
}
