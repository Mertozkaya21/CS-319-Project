package com.example.demo.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.event.TourParticipantSurvey;
import com.example.demo.exceptions.GuideNotFoundException;
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

    @PostMapping
    public ResponseEntity<TourParticipantSurvey> addSurvey(@RequestBody TourParticipantSurvey survey) throws GuideNotFoundException {
        TourParticipantSurvey savedSurvey = surveyService.addSurvey(survey);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSurvey);
    }

    @GetMapping
    public ResponseEntity<List<TourParticipantSurvey>> getAllSurveys() {
        List<TourParticipantSurvey> surveys = surveyService.getAllSurveys();
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<TourParticipantSurvey>> getSurveysByTour(@PathVariable Long tourId) {
        List<TourParticipantSurvey> surveys = surveyService.getSurveysByTour(tourId);
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/guide/{guideId}")
    public ResponseEntity<List<TourParticipantSurvey>> getSurveysByGuide(@PathVariable Long guideId) {
        List<TourParticipantSurvey> surveys = surveyService.getSurveysByGuide(guideId);
        return ResponseEntity.ok(surveys);
    }

    @DeleteMapping("/{surveyId}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable Long surveyId) {
        surveyService.deleteSurvey(surveyId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/info-cards")
    public ResponseEntity<Map<String, Long>> getInfoCardStats() {
        return ResponseEntity.ok(surveyService.getInfoCardStats());
    }

    // @GetMapping("/departments")
    // public ResponseEntity<List<Map<String, Object>>> getDepartmentDistribution() {
    //     return ResponseEntity.ok(surveyService.getDepartmentDistribution());
    // }
}
