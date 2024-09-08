package com.pkdoc.papers.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "PAPER")
@Data
public class Paper {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(name = "title")
    private String title;

    @Column(name = "abstract_text")
    private String abstractText;

    @Column(name = "authors")
    private String authors;

    @ManyToOne
    private User uploader;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @Column(name = "private_only")
    private boolean privateOnly;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private PaperType type;

    @ManyToMany
    @JoinTable(name = "paper_keywords",
               joinColumns = @JoinColumn(name = "paper_id"),
               inverseJoinColumns = @JoinColumn(name = "keyword_id"))
    private Set<Keyword> keywords;
}
