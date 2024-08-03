package com.pkdoc.papers.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pkdoc.papers.model.Paper;
import com.pkdoc.papers.service.PaperService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/papers")
public class PapersController {

    @Autowired
    private PaperService paperService;

    @GetMapping
    public List<Paper> getAllPapers() {
        return paperService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paper> getPaperById(@PathVariable Long id) {
        Optional<Paper> paper = paperService.findById(id);
        if (paper.isPresent()) {
            return ResponseEntity.ok(paper.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Paper createPaper(@Valid @RequestBody Paper paper) {
        return paperService.save(paper);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paper> updatePaper(@PathVariable Long id, @Valid @RequestBody Paper paperDetails) {
        Optional<Paper> optionalPaper = paperService.findById(id);
        if (optionalPaper.isPresent()) {
            Paper paper = optionalPaper.get();
            paper.setTitle(paperDetails.getTitle());
            paper.setAbstractText(paperDetails.getAbstractText());
            paper.setAuthor(paperDetails.getAuthor());
            return ResponseEntity.ok(paperService.save(paper));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaper(@PathVariable Long id) {
        if (paperService.findById(id).isPresent()) {
            paperService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
}
