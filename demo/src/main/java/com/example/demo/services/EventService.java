package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.event.Event;
import com.example.demo.entities.event.Fair;
import com.example.demo.entities.event.Tour;
import com.example.demo.repositories.event.FairRepository;
import com.example.demo.repositories.event.TourRepository;

@Service
public class EventService {
    private final FairRepository fairRepository;
    private final TourRepository tourRepository;

    public EventService(FairRepository fairRepo, TourRepository tourRepo){
        this.fairRepository = fairRepo;
        this.tourRepository = tourRepo;
    }

    public List<Event> getAllEvents() {
        
        List<Event> events = new ArrayList<>();
        events.addAll(fairRepository.findAll());
        events.addAll(tourRepository.findAll());
        return events;
    }

    public List<Fair> getAllFairs() {
        return fairRepository.findAll();
    }

    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    public Tour saveTour(Tour aTour) {
        return tourRepository.save(aTour);
    }

    public Fair saveFair(Fair aFair) {
        return fairRepository.save(aFair);
    }

    public Event getOneEventById(Long eventId) {
        Optional<Fair> fairOpt = fairRepository.findById(eventId);
        if (fairOpt.isPresent()) return fairOpt.get();

        Optional<Tour> tourOpt = tourRepository.findById(eventId);
        if (tourOpt.isPresent()) return tourOpt.get();
    
        return null;
    }

    public boolean deleteById(Long eventId) {
        if (fairRepository.existsById(eventId)) {
            fairRepository.deleteById(eventId);
            return true;
        }

        else if (tourRepository.existsById(eventId)) {
            tourRepository.deleteById(eventId);
            return true;
        }

        return false;
    }
}
