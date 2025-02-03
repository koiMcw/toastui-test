package com.thymeleaf.tutorial.controller;

import com.thymeleaf.tutorial.common.PageUtil;
import com.thymeleaf.tutorial.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Files;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/")
public class HomeApiController {

    // 샘플 데이터
    private final List<UserDto> users = IntStream.rangeClosed(1, 100)
            .mapToObj(i -> new UserDto(i, "User" + i, "user" + i + "@example.com", i % 2 == 0 ? "man" : "woman", 20 + (i % 30), "H" + (i % 5)))
            .collect(Collectors.toList());
    //이미지 업로드 경로
    private final String uploadDir = Paths.get("C:", "tui-editor", "upload").toString();

    @GetMapping("/users")
    public ResponseEntity<ToastUIGridResponseDto> getUsers(
            @ModelAttribute PaginationRequestDto params
    ) {
        // 데이터 필터링(검색)
        List<UserDto> filteredUsers = new ArrayList<>();
        List<String> keywordList = params.getKeyword();
        int page =   params.getPage();
        int perPage = params.getPerPage();

        if (keywordList != null && !keywordList.isEmpty()) {
            for(UserDto user : users) {
                for(String keyword : keywordList) {
                    if(user.toString().contains(keyword)) {
                        filteredUsers.add(user);
                    }
                }
            }
        }else{
            filteredUsers.addAll(users);
        }

        ToastUIGridResponseDto response = PageUtil.paginate(filteredUsers,page,perPage);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
    @GetMapping("/getUsers")
    public ResponseEntity<BasicResponseDto> getUsers() {

        BasicResponseDto response = new BasicResponseDto();
        response.setResponseCd("0000");
        response.setResponseMsg("Success");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
    @PostMapping("/createUsers")
    public ResponseEntity<BasicResponseDto> createUsers() {

        BasicResponseDto response = new BasicResponseDto();
        response.setResponseCd("0000");
        response.setResponseMsg("Success");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
    @PutMapping("/updateUsers")
    public ResponseEntity<BasicResponseDto> updateUsers() {

        BasicResponseDto response = new BasicResponseDto();
        response.setResponseCd("0000");
        response.setResponseMsg("Success");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
    @DeleteMapping("/deleteUsers")
    public ResponseEntity<BasicResponseDto> deleteUsers() {

        BasicResponseDto response = new BasicResponseDto();
        response.setResponseCd("0000");
        response.setResponseMsg("Success");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
    @PostMapping("/image-upload")
    public String uploadEditorImage(@RequestParam final MultipartFile image){
        if(image.isEmpty()){
            return "";
        }
        String orgFilename = image.getOriginalFilename();
        String uuid = UUID.randomUUID().toString().replaceAll("-","");
        String extension = orgFilename.substring(orgFilename.lastIndexOf(".")+1);
        String saveFilename = uuid + "." + extension;
        String fileFullPath = Paths.get(uploadDir + File.separator + saveFilename).toString();

        File dir = new File(uploadDir);
        if(dir.exists() == false){
            dir.mkdirs();
        }

        try{
            //파일 저장
            File uploadFile = new File(fileFullPath);
            image.transferTo(uploadFile);
            return saveFilename;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    /* 디스크에 업로드된 파일을 byte[]로 반환
     * @param filename 디스크에 업로드된 파일명
     * @return image byte array
     */
    @GetMapping(value = "/image-print", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    public byte[] printEditorImage(@RequestParam final String filename) {
        // 업로드된 파일의 전체 경로
        String fileFullPath = Paths.get(uploadDir, filename).toString();

        // 파일이 없는 경우 예외 throw
        File uploadedFile = new File(fileFullPath);
        if (uploadedFile.exists() == false) {
            throw new RuntimeException();
        }

        try {
            // 이미지 파일을 byte[]로 변환 후 반환
            byte[] imageBytes = Files.readAllBytes(uploadedFile.toPath());
            return imageBytes;

        } catch (IOException e) {
            // 예외 처리
            throw new RuntimeException(e);
        }
    }
}
