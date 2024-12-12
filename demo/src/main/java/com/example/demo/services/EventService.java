package com.example.demo.services;

import com.example.demo.entities.event.Event;
import com.example.demo.entities.event.Fair;
import com.example.demo.entities.event.Tour;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {
    private final TourService tourService;
    private final FairService fairService;

    public EventService(TourService tourService, FairService fairService) {
        this.tourService = tourService;
        this.fairService = fairService;
    }

    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        events.addAll(fairService.getAllFairs());
        events.addAll(tourService.getAllTours());
        return events;
    }

    public Event getEventById(Long eventId) {
        try {
            return fairService.getFairById(eventId);
        } catch (Exception e) {
            return tourService.getTourById(eventId);
        }
    }

    public void deleteEventById(Long eventId) {
        try {
            fairService.deleteFairById(eventId);
        } catch (Exception e) {
            tourService.deleteTourById(eventId);
        }
    }

    public Event saveEvent(Event event) {
        if (event instanceof Fair) {
            return fairService.saveFair((Fair) event);
        } else if (event instanceof Tour) {
            return tourService.saveTour((Tour) event);
        } else {
            // It can return null as well but if we return null
            // then we cannot check where is the error
            throw new IllegalArgumentException("Unsupported event type");
        }
    }

    public Event updateEvent(Long eventId, Event updatedEvent) {
        if (updatedEvent instanceof Fair) {
            return fairService.updateFair(eventId, (Fair) updatedEvent);
        } else if (updatedEvent instanceof Tour) {
            return tourService.updateTour(eventId, (Tour) updatedEvent);
        } else {
            throw new IllegalArgumentException("Unsupported event type");
        }
    }
}
