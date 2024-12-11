package com.example.demo.services;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.demo.repositories.event.TourParticipantSurveyRepository;
import com.example.demo.repositories.highschool.HighschoolRepository;

@Service
public class DataService {
    @Lazy
    private final EventService eventService;

    private final TourParticipantSurveyRepository tourParticipantSurveyRepository;
    private final HighschoolRepository highschoolRepository;

    public DataService(@Lazy EventService eventService, TourParticipantSurveyRepository tourParticipantSurveyRepo, HighschoolRepository highschoolRepository){
        this.eventService = eventService;
        this.tourParticipantSurveyRepository = tourParticipantSurveyRepo;
        this.highschoolRepository = highschoolRepository;
    }

    
}
