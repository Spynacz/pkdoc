package com.pkdoc.papers.repository;

import com.pkdoc.papers.model.Paper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {
    Page<Paper> findAll(Specification<Paper> spec, Pageable pageable);
}
