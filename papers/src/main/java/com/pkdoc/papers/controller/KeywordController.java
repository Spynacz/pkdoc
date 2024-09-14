package com.pkdoc.papers.controller;

import com.pkdoc.papers.DTOs.KeywordResponseDTO;
import com.pkdoc.papers.service.KeywordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/keywords")
public class KeywordController {

    private final KeywordService keywordService;

    @Autowired
    public KeywordController(KeywordService keywordService) {
        this.keywordService = keywordService;
    }

    @GetMapping
    public List<KeywordResponseDTO> getAllKeywords() {
        return keywordService.findAll();
    }
}
