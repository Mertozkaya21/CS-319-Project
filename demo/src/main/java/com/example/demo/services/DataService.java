package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.demo.dto.HighschoolDTO;
import com.example.demo.entities.highschool.Highschool;
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

    public List<Highschool> getAllHighschools() {
        return highschoolRepository.findAll();
    }

    public Highschool getOneHighschoolById(Long id) {
        Optional<Highschool> highschoolOpt = highschoolRepository.findById(id);
        if (highschoolOpt.isPresent()) return highschoolOpt.get();
    
        return null;
    }


    public Highschool saveHighschool(HighschoolDTO highschoolDTO) {
        Highschool highschool = new Highschool(highschoolDTO);
        return highschoolRepository.save(highschool);

    }

    public boolean deleteHighschoolById(Long id) {
        if (highschoolRepository.existsById(id)) {
            highschoolRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
