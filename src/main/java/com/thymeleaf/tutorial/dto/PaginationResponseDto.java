package com.thymeleaf.tutorial.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaginationResponseDto {
    @Builder
    public PaginationResponseDto(Integer page, Integer totalCount, Integer perPage) {
        this.page = page;
        this.totalCount = totalCount;
        this.perPage = perPage;
    }

    private Integer page;
    private Integer totalCount;
    private Integer perPage;
}
