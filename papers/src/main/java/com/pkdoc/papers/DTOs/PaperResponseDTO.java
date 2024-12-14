package com.pkdoc.papers.DTOs;

import com.pkdoc.papers.model.PaperType;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class PaperResponseDTO {

    private Long id;
    private String title;
    private String abstractText;
    private String authors;
    private UserPaperDTO uploader;
    private LocalDate publishDate;
    private boolean privateOnly;
    private PaperType type;
    private int points;
    private Set<KeywordResponseDTO> keywords;
}
