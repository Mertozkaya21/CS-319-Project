package com.example.demo.services;

import com.example.demo.entities.event.TourParticipantSurvey;
import com.example.demo.repositories.event.TourParticipantSurveyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TourParticipantSurveyService {

    private final TourParticipantSurveyRepository tourParticipantSurveyRepository;

    public TourParticipantSurveyService(TourParticipantSurveyRepository repository) {
        this.tourParticipantSurveyRepository = repository;
    }

    public List<TourParticipantSurvey> getAllSurveys() {
        return tourParticipantSurveyRepository.findAll();
    }

    public Optional<TourParticipantSurvey> getSurveyById(Long id) {
        return tourParticipantSurveyRepository.findById(id);
    }

    public TourParticipantSurvey saveSurvey(TourParticipantSurvey survey) {
        return tourParticipantSurveyRepository.save(survey);
    }

    public void deleteSurveyById(Long id) {
        tourParticipantSurveyRepository.deleteById(id);
    }
}
