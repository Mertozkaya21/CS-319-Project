package com.example.demo.services;

import com.example.demo.entities.event.Tour;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Guide;
import com.example.demo.enums.TourHours;
import com.example.demo.enums.TourType;
import com.example.demo.exceptions.TourNotFoundException;
import com.example.demo.repositories.event.TourRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TourService {

    private final TourRepository tourRepository;

    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    public List<Tour> getToursByDate(LocalDate date) {
        return tourRepository.findByDate(date);
    }

    public List<Tour> getToursByType(TourType type) {
        return tourRepository.findByTourType(type);
    }

    public List<Tour> getToursByVisitorSchool(Highschool school) {
        return tourRepository.findByVisitorSchool(school);
    }

    public List<Tour> getToursByHours(TourHours hours) {
        return tourRepository.findByTourHours(hours);
    }

    public List<Tour> getToursByDateAndHours(LocalDate date, TourHours hours) {
        return tourRepository.findByDateAndTourHours(date, hours);
    }

    public Tour getTourById(Long id) {
        return tourRepository.findById(id)
            .orElseThrow(() -> new TourNotFoundException("Tour with ID " + id + " not found"));
    }

    public Tour saveTour(Tour tour) {
        return tourRepository.save(tour);
    }

    // I do not think that it is logical to update an existing tour maybe we can delete
    public Tour updateTour(Long id, Tour updatedTour) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        tour.setTourType(updatedTour.getTourType());
        tour.setTourHours(updatedTour.getTourHours());
        tour.setAdvisor(updatedTour.getAdvisor());
        tour.setVisitorSchool(updatedTour.getVisitorSchool());
        tour.setIdsOfDepartmentsOfInterest(updatedTour.getIdsOfDepartmentsOfInterest());
        tour.setTrainees(updatedTour.getTrainees());
        tour.setTourParticipantSurveys(updatedTour.getTourParticipantSurveys());
        tour.setGuides(updatedTour.getGuides());
        tour.setNoOfGuests(updatedTour.getNoOfGuests());
        tour.setQAroomID(updatedTour.getQAroomID());
        return tourRepository.save(tour);
    }

    public boolean deleteTourById(Long id) {
        if (tourRepository.existsById(id)) {
            tourRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Tour assignGuideToTour(Long tourId, Guide guide) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() ->  new TourNotFoundException("Tour with ID " + tourId + " not found"));;
        tour.getGuides().add(guide);
        return tourRepository.save(tour);
    }
}
