package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.event.Event;
import com.example.demo.entities.event.Fair;
import com.example.demo.entities.event.Tour;
import com.example.demo.repositories.event.EventRepository;
import com.example.demo.repositories.event.FairRepository;
import com.example.demo.repositories.event.TourRepository;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final FairRepository fairRepository;
    private final TourRepository tourRepository;

    public EventService(EventRepository eventRepo, FairRepository fairRepo, TourRepository tourRepo){
        this.eventRepository = eventRepo;
        this.fairRepository = fairRepo;
        this.tourRepository = tourRepo;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Fair> getFair() {
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

    public Event getOneEvent(Long eventId){
        return eventRepository.findById(eventId).orElse(null);
    }

    public Event updateOneUser(Long eventId, Event newEvent) {
        Optional<Event> event = eventRepository.findById(eventId);
        if(event.isPresent()){
            Event foundEvent = event.get();
            foundEvent.setStatus(newEvent.getStatus());
            foundEvent.setDate(newEvent.getDate());
            foundEvent.setGuide(newEvent.getGuide());
            eventRepository.save(foundEvent);
            return foundEvent;
        } else {
            return null;
        }
    }

    public void deleteById(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
