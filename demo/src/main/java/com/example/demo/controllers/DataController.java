package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.HighschoolDTO;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.services.DataService;

@RestController
@RequestMapping("/v1/data")
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {
    private final DataService dataService;

    public DataController(DataService dataService){
        this.dataService = dataService;
    }

    @GetMapping("/highschool")
    public ResponseEntity<List<Highschool>> getAllHighschools() {
        return ResponseEntity.ok(dataService.getAllHighschools());
    }

    @GetMapping("/highschool/{id}")
    public ResponseEntity<Highschool> getHighschool(@PathVariable Long id) {
        Highschool highschool = dataService.getOneHighschoolById(id);
        if (highschool != null) {
            return ResponseEntity.ok(highschool);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/highschool")
    public ResponseEntity<Highschool> saveHighschool(@RequestBody HighschoolDTO highschoolDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dataService.saveHighschool(highschoolDTO));
    }

    @DeleteMapping("/highschool/{id}")
    public ResponseEntity<Void> deleteHighschool(@PathVariable Long id) {
        boolean deleted = dataService.deleteHighschoolById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
