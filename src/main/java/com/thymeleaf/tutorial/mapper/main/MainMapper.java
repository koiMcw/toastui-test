package com.thymeleaf.tutorial.mapper.main;


import com.thymeleaf.tutorial.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper
public interface MainMapper {

    UserDto getUserInfo(String id);

}

