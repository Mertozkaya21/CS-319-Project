package com.example.demo.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.services.TourParticipantSurveyService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/surveys")
@CrossOrigin(origins = "http://localhost:3000")
public class TourParticipantSurveyController {

    private final TourParticipantSurveyService surveyService;

    public TourParticipantSurveyController(TourParticipantSurveyService service) {
        this.surveyService = service;
    }

    @GetMapping("/info-cards")
    public ResponseEntity<Map<String, Long>> getInfoCardStats() {
        return ResponseEntity.ok(surveyService.getInfoCardStats());
    }

    @GetMapping("/departments")
    public ResponseEntity<List<Map<String, Object>>> getDepartmentDistribution() {
        return ResponseEntity.ok(surveyService.getDepartmentDistribution());
    }
}
