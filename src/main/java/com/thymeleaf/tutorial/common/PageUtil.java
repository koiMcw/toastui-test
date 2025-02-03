package com.thymeleaf.tutorial.common;

import com.thymeleaf.tutorial.dto.PaginationResponseDto;
import com.thymeleaf.tutorial.dto.ToastUIGridResponseDto;

import java.util.List;

public class PageUtil {
    public static <T> ToastUIGridResponseDto paginate(List<T> data, int page, int perPage) {
        int totalSize = data.size();
        int startIndex = (page - 1) * perPage;
        int endIndex = Math.min(startIndex + perPage, totalSize);

        // 페이징된 데이터 추출
        List<T> pagedData = data.subList(startIndex, endIndex);

        // Pagination 객체 생성
        PaginationResponseDto pagination = PaginationResponseDto.builder()
                .page(page)
                .totalCount(data.size()) // 전체 데이터 개수
                .perPage(perPage)
                .build();

        // 응답 데이터 생성
        ToastUIGridResponseDto response = new ToastUIGridResponseDto(pagedData, pagination);

        // Pagination DTO 생성
        return response;
    }
}
