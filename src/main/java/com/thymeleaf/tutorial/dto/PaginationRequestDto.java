package com.thymeleaf.tutorial.dto;

import groovyjarjarantlr4.v4.runtime.misc.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class PaginationRequestDto {
    @NotNull
    private Integer page  = 1;              // 현재 페이지
    @NotNull
    private Integer perPage = 10;           // 페이지 당 데이터 개수
    private String sortColumn;              // 정렬 컬럼
    private boolean sortAscending = true;   // 정렬 기준
    private List<String> keyword;           // 검색 키워드
    private String startDate;
    private String endDate;

    @Builder
    public PaginationRequestDto(Integer page, Integer perPage,String sortColumn, boolean sortAscending, List<String> keyword, String startDate, String endDate) {
        this.page = page;
        this.perPage = perPage;
        this.sortColumn = sortColumn;
        this.sortAscending = sortAscending;
        this.keyword = keyword;
        this.startDate = startDate;
        this.endDate = endDate;
    }

}
