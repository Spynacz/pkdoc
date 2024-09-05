package com.pkdoc.papers.service;

import com.pkdoc.papers.model.Paper;
import com.pkdoc.papers.model.SortAndPageParams;
import com.pkdoc.papers.repository.PaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaperService {

    private final PaperRepository paperRepository;

    @Autowired
    public PaperService(PaperRepository paperRepository) {
        this.paperRepository = paperRepository;
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

    public Paper save(Paper paper) {
        return paperRepository.save(paper);
    }

    public void deleteById(Long id) {
        paperRepository.deleteById(id);
    }
}

