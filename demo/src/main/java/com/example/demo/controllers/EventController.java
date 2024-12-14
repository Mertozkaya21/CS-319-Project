package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.event.Event;
import com.example.demo.entities.event.Fair;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.user.Guide;
import com.example.demo.enums.EventStatus;
import com.example.demo.enums.TourHours;
import com.example.demo.exceptions.GuideNotFoundException;
import com.example.demo.services.EventService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping("/fairs")
    public ResponseEntity<Fair> createFair(@RequestBody Fair fair) {
        return ResponseEntity.status(HttpStatus.CREATED).body((Fair) eventService.saveEvent(fair));
    }

    @PostMapping("/tours")
    public ResponseEntity<Tour> createTour(@RequestBody Tour tour) {
        return ResponseEntity.status(HttpStatus.CREATED).body((Tour) eventService.saveEvent(tour));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Event> updateEventStatus(@PathVariable Long id, @RequestParam EventStatus status) {
        return ResponseEntity.ok(eventService.updateEventStatus(id, status));
    }

    @PatchMapping("/{id}/date")
    public ResponseEntity<Event> updateEventDate(@PathVariable Long id, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(eventService.updateEventDate(id, date));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventById(@PathVariable Long id) {
        if (eventService.deleteEventById(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/guides/{guideId}")
    public ResponseEntity<Event> assignGuideToEvent(@PathVariable Long id, @PathVariable Long guideId) throws GuideNotFoundException {
        return ResponseEntity.ok(eventService.assignGuideToEvent(id, guideId));
    }

    @DeleteMapping("/{id}/guides/{guideId}")
    public ResponseEntity<Event> removeGuideFromEvent(@PathVariable Long id, @PathVariable Long guideId) throws GuideNotFoundException {
        Guide guide = eventService.getGuideById(guideId);
        return ResponseEntity.ok(eventService.removeGuideFromEvent(id, guide));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Event>> getEventsByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(eventService.getEventsByDate(date));
    }

    @GetMapping("/date/{date}/hours/{hours}")
    public ResponseEntity<List<Event>> getEventsByDateAndHours(
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
        @PathVariable TourHours hours
    ) {
        return ResponseEntity.ok(eventService.getEventsByDateAndHours(date, hours));
    }
}
