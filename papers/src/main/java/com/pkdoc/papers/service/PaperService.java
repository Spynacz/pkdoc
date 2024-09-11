package com.pkdoc.papers.service;

import com.pkdoc.papers.DTOs.PaperCreateDTO;
import com.pkdoc.papers.DTOs.PaperResponseDTO;
import com.pkdoc.papers.mappers.PaperMapper;
import com.pkdoc.papers.model.Paper;
import com.pkdoc.papers.repository.KeywordRepository;
import com.pkdoc.papers.repository.PaperRepository;
import com.pkdoc.papers.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    public List<Paper> findAll() {
        return paperRepository.findAll();
    }

    public Page<PaperResponseDTO> findAll(Pageable pageable) {
        Page<Paper> papers = paperRepository.findAll(pageable);

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
