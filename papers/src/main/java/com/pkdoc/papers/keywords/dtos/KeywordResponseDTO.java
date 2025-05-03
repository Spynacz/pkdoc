package com.pkdoc.papers.keywords.dtos;

import lombok.Data;

import java.io.Serializable;

@Data
public class KeywordResponseDTO implements Serializable {

    private long id;
    private String text;
}
