package com.pkdoc.papers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pkdoc.papers.model.Paper;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {

}
