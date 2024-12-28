package com.pkdoc.papers.papers.dtos;

import com.pkdoc.papers.papers.PaperType;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class PaperCreateDTO {
    private String title;
    private String abstractText;
    private String authors;
    private LocalDate publishDate;
    private boolean privateOnly;
    private PaperType type;
    private Set<String> keywords;
    private int points;
    private Long uploader;
}
