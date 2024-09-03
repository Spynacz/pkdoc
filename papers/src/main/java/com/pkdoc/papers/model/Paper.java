package com.pkdoc.papers.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "PAPER")
@Data
public class Paper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String abstractText;

    private String author;

    @ManyToOne
    private User uploader;

    private boolean privateOnly;

    @Enumerated(EnumType.STRING)
    private PaperType type;

    private String keywords;
}
