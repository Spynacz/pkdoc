package com.pkdoc.papers.DTOs;

import com.pkdoc.papers.model.PaperType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaperQueryParamsDTO {
    private String sort;
    private String order = "ASC";
    private long page;
    private long size;
    private long user = -1;
    private String title;
    private PaperType type;
    private List<String> authors;
    private List<String> keywords;
}
