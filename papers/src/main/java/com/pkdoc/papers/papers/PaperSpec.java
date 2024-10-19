package com.pkdoc.papers.papers;

import com.pkdoc.papers.model.Keyword;
import com.pkdoc.papers.model.Paper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PaperSpec {

    public static Specification<Paper> hasUser(long userId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("uploader").get("id"), userId);
    }

    public static Specification<Paper> hasTypes(List<String> types) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> typePredicates = new ArrayList<>();
            for (String type : types) {
                typePredicates.add(criteriaBuilder.equal(criteriaBuilder.lower(root.get("type")), type.toString().toLowerCase()));
            }
            return criteriaBuilder.or(typePredicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Paper> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Paper> hasAuthors(List<String> authors) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> authorPredicates = new ArrayList<>();
            for (String author : authors) {
                authorPredicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("authors")), "%" + author.toLowerCase() + "%"));
            }
            return criteriaBuilder.or(authorPredicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Paper> hasKeywords(List<String> keywords) {
        return (root, query, criteriaBuilder) -> {
            Join<Paper, Keyword> keywordJoin = root.join("keywords");

            List<Predicate> keywordPredicates = new ArrayList<>();
            for (String keyword : keywords) {
                String keywordLower = keyword.toLowerCase();
                keywordPredicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(keywordJoin.get("text")), keywordLower),
                        criteriaBuilder.like(criteriaBuilder.lower(keywordJoin.get("text")), keywordLower + " %"),
                        criteriaBuilder.like(criteriaBuilder.lower(keywordJoin.get("text")), "% " + keywordLower),
                        criteriaBuilder.like(criteriaBuilder.lower(keywordJoin.get("text")), "% " + keywordLower + " %")
                ));
            }

            return criteriaBuilder.or(keywordPredicates.toArray(new Predicate[0]));
        };
    }
}
