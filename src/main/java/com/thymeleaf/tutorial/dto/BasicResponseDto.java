package com.thymeleaf.tutorial.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BasicResponseDto {

    private String responseCd;
    private String responseMsg;

}
