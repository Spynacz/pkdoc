package com.pkdoc.papers.controller;

import com.pkdoc.papers.model.Paper;
import com.pkdoc.papers.service.PaperService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
