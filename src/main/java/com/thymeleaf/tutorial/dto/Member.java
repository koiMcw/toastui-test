package com.thymeleaf.tutorial.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Member {
    private Long id;
    private String email;
    private String password;
    private boolean isVerified = false; // Defaults to false
    private String verificationToken;

    @Builder
    public Member(Long id,String email, String password, boolean isVerified, String verificationToken) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.isVerified = isVerified;
        this.verificationToken = verificationToken;
    }
}
