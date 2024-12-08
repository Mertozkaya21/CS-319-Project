package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.repositories.event.EventRepository;
import com.example.demo.repositories.event.FairRepository;
import com.example.demo.repositories.event.TourParticipantSurveyRepository;
import com.example.demo.repositories.event.TourRepository;
import com.example.demo.repositories.form.ApplicationFormRepository;

@Service
public class DataService {
    private final TourParticipantSurveyRepository tourParticipantSurveyRepository;
    private final EventRepository eventRepository;
    private final TourRepository tourRepository;
    private final FairRepository fairRepository;
    private final ApplicationFormRepository applicationFormRepository;

    public DataService(TourParticipantSurveyRepository tourParticipantSurveyRepo, EventRepository eventRepo,
                        TourRepository tourRepo, FairRepository fairRepo, ApplicationFormRepository applicationFormRepo){
        this.tourParticipantSurveyRepository = tourParticipantSurveyRepo;
        this.eventRepository = eventRepo;
        this.tourRepository = tourRepo;
        this.fairRepository = fairRepo;
        this.applicationFormRepository = applicationFormRepo;
    }
}
