package com.thymeleaf.tutorial.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class UserDto {
    // Getters and Setters
    private int id;
    private String name;
    private String email;
    private String gender;
    private int age;
    private String hobby;
    private String birthday;
//    private LocalDateTime createdAt;
//    private LocalDateTime updatedAt;


    public UserDto(int id, String name, String email, String gender, int age, String hobby, String birthday) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.age = age;
        this.hobby = hobby;
        this.birthday = birthday;
    }

}

