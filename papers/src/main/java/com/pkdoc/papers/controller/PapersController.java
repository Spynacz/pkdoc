package com.pkdoc.papers.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pkdoc.papers.DTOs.PaperCreateDTO;
import com.pkdoc.papers.model.Paper;
import com.pkdoc.papers.service.PaperService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/papers")
public class PapersController {

    private final PaperService paperService;

    @Autowired
    public PapersController(PaperService paperService) {
        this.paperService = paperService;
    }

    @GetMapping
    public Page<Paper> getAllPapers(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false, defaultValue = "ASC") String sortDirection,
            Pageable pageable) {

        // Optional sorting logic, defaulting to "id" if no sorting provided
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Sort sort = (sortBy != null) ? Sort.by(direction, sortBy) : Sort.by("id");
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        return paperService.findAll(sortedPageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paper> getPaperById(@PathVariable Long id) {
        Optional<Paper> paper = paperService.findById(id);
        return paper.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Paper> createPaper(@RequestBody PaperCreateDTO paperCreateDTO) {
        Paper savedPaper = paperService.save(paperCreateDTO);
        return new ResponseEntity<>(savedPaper, HttpStatus.CREATED);
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<Paper> updatePaper(@PathVariable Long id, @Valid @RequestBody PaperCreateDTO paperDetails) {
    //     Optional<Paper> optionalPaper = paperService.findById(id);
    //     if (optionalPaper.isPresent()) {
    //         Paper paper = optionalPaper.get();
    //         paper.setTitle(paperDetails.getTitle());
    //         paper.setAbstractText(paperDetails.getAbstractText());
    //         paper.setAuthors(paperDetails.getAuthors());
    //         return ResponseEntity.ok(paperService.save(paper));
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaper(@PathVariable Long id) {
        if (paperService.findById(id).isPresent()) {
            paperService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
