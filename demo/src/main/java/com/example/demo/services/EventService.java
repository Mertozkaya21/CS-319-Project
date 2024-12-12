package com.example.demo.services;

import com.example.demo.entities.event.Event;
import com.example.demo.entities.event.Fair;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.user.Guide;
import com.example.demo.enums.EventStatus;
import com.example.demo.enums.TourHours;
import com.example.demo.exceptions.FairNotFoundException;
import com.example.demo.exceptions.GuideNotFoundException;
import com.example.demo.exceptions.TourNotFoundException;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public Event getEventById(Long eventId) throws FairNotFoundException, TourNotFoundException {
        try {
            return fairService.getFairById(eventId);
        } catch (FairNotFoundException e) {
            return tourService.getTourById(eventId);
        }
    }

    public boolean deleteEventById(Long eventId) {
        try {
            return fairService.deleteFairById(eventId);
        } catch (FairNotFoundException e) {
            return tourService.deleteTourById(eventId);
        }
    }

    public Event saveEvent(Event event) {
        if (event instanceof Fair) {
            return fairService.saveFair((Fair) event);
        } else if (event instanceof Tour) {
            return tourService.saveTour((Tour) event);
        } else {
            throw new IllegalArgumentException("Unsupported event type.");
        }
    }

    public Event updateEventStatus(Long eventId, EventStatus status) throws FairNotFoundException, TourNotFoundException {
        try {
            return fairService.updateFairStatus(eventId, status);
        } catch (FairNotFoundException e) {
            return tourService.updateTourStatus(eventId, status);
        }
    }

    public Event updateEventDate(Long eventId, LocalDate newDate) throws FairNotFoundException, TourNotFoundException {
        try {
            return fairService.updateFairDate(eventId, newDate);
        } catch (FairNotFoundException e) {
            return tourService.updateTourDate(eventId, newDate);
        }
    }

    public List<Event> getEventsByDate(LocalDate date) {
        List<Event> events = new ArrayList<>();
        events.addAll(fairService.getFairsByDate(date));
        events.addAll(tourService.getToursByDate(date));
        return events;
    }

    public List<Event> getEventsByDateAndHours(LocalDate date, TourHours hours) {
        List<Event> events = new ArrayList<>();
        events.addAll(fairService.getFairsByDate(date)); 
        events.addAll(tourService.getToursByDateAndHours(date, hours));
        return events;
    }

    public Event assignGuideToEvent(Long eventId, Long guideId) throws GuideNotFoundException {
        try {
            return fairService.assignGuideToFair(eventId, guideId);
        } catch (FairNotFoundException e) {
            return tourService.assignGuideToTour(eventId, guideId);
        }
    }

    public Event removeGuideFromEvent(Long eventId, Guide guide) throws GuideNotFoundException {
        try {
            return fairService.removeGuideFromFair(eventId, guide);
        } catch (FairNotFoundException e) {
            return tourService.removeGuideFromTour(eventId, guide);
        }
    }
}
