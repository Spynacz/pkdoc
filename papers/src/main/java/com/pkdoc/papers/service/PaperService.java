package com.pkdoc.papers.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pkdoc.papers.DTOs.PaperCreateDTO;
import com.pkdoc.papers.model.Keyword;
import com.pkdoc.papers.model.Paper;
import com.pkdoc.papers.repository.KeywordRepository;
import com.pkdoc.papers.repository.PaperRepository;

@Service
public class PaperService {

    private final PaperRepository paperRepository;
    private final KeywordRepository keywordRepository;

    @Autowired
    public PaperService(PaperRepository paperRepository, KeywordRepository keywordRepository) {
        this.paperRepository = paperRepository;
        this.keywordRepository = keywordRepository;
    }

    public List<Paper> findAll() {
        return paperRepository.findAll();
    }

    public Page<Paper> findAll(Pageable pageable) {
        return paperRepository.findAll(pageable);
    }

    public Optional<Paper> findById(Long id) {
        return paperRepository.findById(id);
    }

    public Paper save(PaperCreateDTO paperCreateDTO) {
        Paper paper = new Paper();
        paper.setTitle(paperCreateDTO.getTitle());
        paper.setAbstractText(paperCreateDTO.getAbstractText());
        paper.setAuthors(paperCreateDTO.getAuthors());
        paper.setPublishDate(paperCreateDTO.getPublishDate());
        paper.setPrivateOnly(paperCreateDTO.isPrivateOnly());
        paper.setType(paperCreateDTO.getType());

        Set<Keyword> keywords = new HashSet<>();

        for (String keywordString : paperCreateDTO.getKeywords()) {
            Keyword keyword = keywordRepository.findByKeyword(keywordString)
                    .orElseGet(() -> {
                        Keyword newKeyword = new Keyword();
                        newKeyword.setKeyword(keywordString);
                        return keywordRepository.save(newKeyword);
                    });
            keywords.add(keyword);
        }

        paper.setKeywords(keywords);
        return paperRepository.save(paper);
    }

    public void deleteById(Long id) {
        paperRepository.deleteById(id);
    }
}
