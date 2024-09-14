package com.pkdoc.papers.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Table(name = "KEYWORD")
@Entity
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "text")
    private String text;

    @ManyToMany(mappedBy = "keywords")
    private Set<Paper> papers;
}
