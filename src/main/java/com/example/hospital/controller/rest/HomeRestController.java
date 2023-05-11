package com.example.hospital.controller.rest;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController

public class HomeRestController {

    @GetMapping("/home")
    public String home(){
        var u = SecurityContextHolder.getContext().getAuthentication();
        return "Hello spring";
    }
}
