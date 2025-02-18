package com.pkdoc.papers.keywords;

import com.pkdoc.papers.keywords.dtos.KeywordResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final KeywordMapper keywordMapper;

    @Autowired
    public KeywordService(KeywordRepository keywordRepository, KeywordMapper keywordMapper) {
        this.keywordRepository = keywordRepository;
        this.keywordMapper = keywordMapper;
    }

    public List<KeywordResponseDTO> findAll() {
        return keywordRepository.findAll().stream().map(keywordMapper::toKeywordResponseDTO).toList();
    }
}
