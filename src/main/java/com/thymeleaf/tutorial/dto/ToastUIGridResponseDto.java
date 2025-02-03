package com.thymeleaf.tutorial.dto;

import lombok.*;

import java.util.List;

@Getter
@ToString
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class  ToastUIGridResponseDto {
    private boolean result;
    private GridData data;
    public ToastUIGridResponseDto(List<?> contents, PaginationResponseDto pagination) {

        this.result = true;
        this.data = GridData.builder()
                .contents(contents)
                .pagination(PaginationResponseDto.builder()
                .page(pagination.getPage())
                .totalCount(pagination.getTotalCount())
                .perPage(pagination.getPerPage())
                .build()
                )
                .build();
    }
}
