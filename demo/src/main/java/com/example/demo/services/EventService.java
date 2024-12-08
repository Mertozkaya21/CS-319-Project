package com.example.demo.services;

import org.springframework.stereotype.Service;

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
}
