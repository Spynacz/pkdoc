package com.pkdoc.papers.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ErrorResponseDTO {
    private int status;
    private String message;
    private String error;
    private String path;
    private LocalDateTime timestamp;

    public ErrorResponseDTO(int status, String message, String error, String path) {
        this.status = status;
        this.message = message;
        this.error = error;
        this.path = path;
        this.timestamp = LocalDateTime.now();
    }
}
