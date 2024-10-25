package com.pkdoc.papers.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaperQueryParamsDTO {
    private String sort;
    private String order = "ASC";
    private long page;
    private long size;
    private long user = -1;
    private String title;
    private List<String> types;
    private List<String> authors;
    private List<String> keywords;
    private LocalDate fromDate;
    private LocalDate toDate;
}
