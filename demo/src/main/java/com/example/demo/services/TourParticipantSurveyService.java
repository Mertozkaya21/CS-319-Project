package com.example.demo.services;

import com.example.demo.entities.event.TourParticipantSurvey;
import com.example.demo.repositories.event.TourParticipantSurveyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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
        if(tourParticipantSurveyRepository.existsById(id))
            tourParticipantSurveyRepository.deleteById(id);
    }
    

    public Map<String, Long> getInfoCardStats() {
        long totalSurveys = tourParticipantSurveyRepository.getTotalSurveys();
        long uniqueSchools = tourParticipantSurveyRepository.countUniqueHighschools();
        return Map.of(
                "Surveys Completed", totalSurveys,
                "Number of Visiting Schools", uniqueSchools
        );
    }

    public List<Map<String, Object>> getDepartmentDistribution() {
        return tourParticipantSurveyRepository.getDepartmentDistribution();
    }
}
