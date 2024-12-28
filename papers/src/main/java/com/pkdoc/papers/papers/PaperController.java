package com.pkdoc.papers.papers;

import com.pkdoc.papers.papers.dtos.PaperCreateDTO;
import com.pkdoc.papers.papers.dtos.PaperQueryParamsDTO;
import com.pkdoc.papers.papers.dtos.PaperResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/papers")
public class PaperController {

    private final PaperService paperService;

    @Autowired
    public PaperController(PaperService paperService) {
        this.paperService = paperService;
    }

    @GetMapping
    public Page<PaperResponseDTO> getAllPapers(PaperQueryParamsDTO queryParams, Pageable pageable) {

        // Optional sorting logic, defaulting to "id" if no sorting provided
        Sort.Direction direction = (queryParams.getOrder() != null) ? Sort.Direction.fromString(queryParams.getOrder()) : Sort.Direction.ASC;
        Sort sorter = (queryParams.getSort() != null) ? Sort.by(direction, queryParams.getSort()) : Sort.by("id");
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sorter);

        return paperService.findAll(queryParams, sortedPageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaperResponseDTO> getPaperById(@PathVariable Long id) {
        Optional<PaperResponseDTO> paper = paperService.findById(id);
        return paper.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PaperResponseDTO> createPaper(@RequestBody PaperCreateDTO paperCreateDTO) {
        PaperResponseDTO savedPaper = paperService.save(paperCreateDTO);
        return new ResponseEntity<>(savedPaper, HttpStatus.CREATED);
    }

    @PostMapping("/create/multi")
    public void createMulti(@RequestBody List<PaperCreateDTO> papers) {
        papers.forEach(paperService::save);
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
