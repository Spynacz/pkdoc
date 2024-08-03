package com.pkdoc.papers.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pkdoc.papers.model.Paper;
import com.pkdoc.papers.repository.PaperRepository;

@Service
public class PaperService {

    @Autowired
    private PaperRepository paperRepository;

    public List<Paper> findAll() {
        return paperRepository.findAll();
    }

    public Optional<Paper> findById(Long id) {
        return paperRepository.findById(id);
    }

    public Paper save(Paper paper) {
        return paperRepository.save(paper);
    }

    public void deleteById(Long id) {
        paperRepository.deleteById(id);
    }
}

