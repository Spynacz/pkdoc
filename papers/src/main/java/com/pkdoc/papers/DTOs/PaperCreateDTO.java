package com.pkdoc.papers.DTOs;

import java.time.LocalDate;
import java.util.List;

import com.pkdoc.papers.model.PaperType;

import lombok.Data;

@Data
public class PaperCreateDTO {
    private String title;
    private String abstractText;
    private String authors;
    private LocalDate publishDate;
    private boolean privateOnly;
    private PaperType type;
    private List<String> keywords;
}
