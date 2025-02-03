package com.thymeleaf.tutorial.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {

        return "content/home"; // templates/content/home.html
    }

    @GetMapping("/about")
    public String about() {
        return "content/about"; // templates/content/about.html (추가로 생성)
    }
    @GetMapping("/pay")
    public String pay() {
        return "content/pay"; // templates/content/about.html (추가로 생성)
    }
    @GetMapping("/isVerifyMember")
    public String isVerifyMember() {
        return "content/isVerifyMember"; // templates/content/about.html (추가로 생성)
    }
    @GetMapping("/login")
    public String login(Model model) {
        return "/content/authScreen/login";
    }

    @PostMapping("/verifyPhone")
    public String showPhoneAuthPage(
            @RequestParam("phoneNumber") String phoneNumber,
            Model model
    ) {
        model.addAttribute("phoneNumber", phoneNumber);
        return "/content/authScreen/verify-phone";
    }
}