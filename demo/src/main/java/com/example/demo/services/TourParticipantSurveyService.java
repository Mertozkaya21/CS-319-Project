package com.example.demo.services;

import com.example.demo.entities.event.TourParticipantSurvey;
import com.example.demo.exceptions.GuideNotFoundException;
import com.example.demo.repositories.event.TourParticipantSurveyRepository;
import com.example.demo.services.UsersService.GuideService;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TourParticipantSurveyService {

    private final TourParticipantSurveyRepository tourParticipantSurveyRepository;
    private final GuideService guideService;

    public TourParticipantSurveyService(TourParticipantSurveyRepository repository, GuideService service) {
        this.tourParticipantSurveyRepository = repository;
        this.guideService = service;
    }

    public List<TourParticipantSurvey> getAllSurveys() {
        return tourParticipantSurveyRepository.findAll();
    }

    public Optional<TourParticipantSurvey> getSurveyById(Long id) {
        return tourParticipantSurveyRepository.findById(id);
    }

    public List<TourParticipantSurvey> getSurveysByTour(Long tourId) {
        return tourParticipantSurveyRepository.findByTour_Id(tourId);
    }

    public List<TourParticipantSurvey> getSurveysByGuide(Long guideId) {
        return tourParticipantSurveyRepository.findByGuide_Id(guideId);
    }

    public TourParticipantSurvey addSurvey(TourParticipantSurvey survey) throws GuideNotFoundException {
        if (!survey.getTour().getGuides().contains(survey.getGuide())) {
            throw new IllegalArgumentException("The guide is not assigned to this tour.");
        }

        TourParticipantSurvey savedSurvey = tourParticipantSurveyRepository.save(survey);

        guideService.updateGuideAverageRating(survey.getGuide().getId());

        return savedSurvey;
    }

    public void deleteSurvey(Long id) {
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
}
