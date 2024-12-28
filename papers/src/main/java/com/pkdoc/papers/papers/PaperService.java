package com.pkdoc.papers.papers;

import com.pkdoc.papers.keywords.KeywordRepository;
import com.pkdoc.papers.papers.dtos.PaperCreateDTO;
import com.pkdoc.papers.papers.dtos.PaperQueryParamsDTO;
import com.pkdoc.papers.papers.dtos.PaperResponseDTO;
import com.pkdoc.papers.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaperService {

    private final PaperRepository paperRepository;
    private final KeywordRepository keywordRepository;
    private final PaperMapper paperMapper;
    private final UserRepository userRepository;

    @Autowired
    public PaperService(PaperRepository paperRepository, KeywordRepository keywordRepository, PaperMapper paperMapper, UserRepository userRepository) {
        this.paperRepository = paperRepository;
        this.keywordRepository = keywordRepository;
        this.paperMapper = paperMapper;
        this.userRepository = userRepository;
    }

    public Page<PaperResponseDTO> findAll(PaperQueryParamsDTO queryParams, Pageable pageable) {
        Specification<Paper> spec = Specification.where(null);

        if (queryParams.getUser() > -1) {
            spec = spec.and(PaperSpec.hasUser(queryParams.getUser()));
        }
        if (queryParams.getTypes() != null && !queryParams.getTypes().isEmpty()) {
            spec = spec.and(PaperSpec.hasTypes(queryParams.getTypes()));
        }
        if (queryParams.getTitle() != null && !queryParams.getTitle().isEmpty()) {
            spec = spec.and(PaperSpec.hasTitle(queryParams.getTitle()));
        }
        if (queryParams.getAuthors() != null && !queryParams.getAuthors().isEmpty()) {
            spec = spec.and(PaperSpec.hasAuthors(queryParams.getAuthors()));
        }
        if (queryParams.getKeywords() != null && !queryParams.getKeywords().isEmpty()) {
            spec = spec.and(PaperSpec.hasKeywords(queryParams.getKeywords()));
        }
        if (queryParams.getFromDate() != null || queryParams.getToDate() != null) {
            spec = spec.and(PaperSpec.hasDate(queryParams.getFromDate(), queryParams.getToDate()));
        }

        Page<Paper> papers = paperRepository.findAll(spec, pageable);

        List<PaperResponseDTO> paperResponseDTOs = papers.stream().map(paperMapper::toPaperResponseDTO).toList();
        return new PageImpl<>(paperResponseDTOs, pageable, papers.getTotalElements());
    }

    public Optional<PaperResponseDTO> findById(Long id) {
        return paperRepository.findById(id).map(paperMapper::toPaperResponseDTO);
    }

    public PaperResponseDTO save(PaperCreateDTO paperCreateDTO) {
        return paperMapper.toPaperResponseDTO(
                paperRepository.save(paperMapper.toPaper(paperCreateDTO, userRepository, keywordRepository)));
    }

    public void deleteById(Long id) {
        paperRepository.deleteById(id);
    }
}
