package com.example.demo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.ApplicationFormService;

@RestController
@RequestMapping("/v1/applicationform")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationFormController {
    private final ApplicationFormService applicationFormService;

    public ApplicationFormController(ApplicationFormService applicationFormService){
        this.applicationFormService = applicationFormService;
    }
}
