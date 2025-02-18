package com.pkdoc.papers.papers;

import com.pkdoc.papers.keywords.Keyword;
import com.pkdoc.papers.papers.dtos.PaperCreateDTO;
import com.pkdoc.papers.papers.dtos.PaperResponseDTO;
import com.pkdoc.papers.users.User;
import com.pkdoc.papers.keywords.KeywordRepository;
import com.pkdoc.papers.users.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PaperMapper {

    PaperResponseDTO toPaperResponseDTO(Paper paper);

    @Mapping(source = "uploader", target = "uploader", qualifiedByName = "mapUploaderIdToUploader")
    @Mapping(source = "keywords", target = "keywords", qualifiedByName = "mapKeywordsStringsToKeywords")
    Paper toPaper(PaperCreateDTO paperCreateDTO, @Context UserRepository userRepository, @Context KeywordRepository keywordRepository);

    @Named("mapUploaderIdToUploader")
    default User mapUploaderIdToUploader(Long uploaderId, @Context UserRepository userRepository) {
        return userRepository.findById(uploaderId).orElseThrow(
                () -> new EntityNotFoundException("User not found " + uploaderId));
    }

    @Named("mapKeywordsStringsToKeywords")
    default Set<Keyword> mapKeywordsStringsToKeywords(Set<String> keywords, @Context KeywordRepository keywordRepository) {
        if (keywords == null || keywords.isEmpty()) {
            return null;
        }
        return keywords.stream().map(k -> keywordRepository.findByText(k).orElseGet(() -> {
            Keyword keyword = new Keyword();
            keyword.setText(k);
            return keywordRepository.save(keyword);
        })).collect(Collectors.toSet());
    }
}
