package com.thymeleaf.tutorial.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GridData {
    private List<?> contents;
    private PaginationResponseDto pagination;
}
