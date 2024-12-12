package com.example.demo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.DataService;

@RestController
@RequestMapping("/v1/data")
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {
    private final DataService dataService;

    public DataController(DataService dataService){
        this.dataService = dataService;
    }

}
