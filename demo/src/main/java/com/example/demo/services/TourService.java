package com.example.demo.services;

import com.example.demo.entities.event.Tour;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Guide;
import com.example.demo.enums.EventStatus;
import com.example.demo.enums.TourHours;
import com.example.demo.enums.TourType;
import com.example.demo.exceptions.GuideNotFoundException;
import com.example.demo.exceptions.TourNotFoundException;
import com.example.demo.repositories.event.TourRepository;
import com.example.demo.repositories.user.GuideRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TourService {

    private final TourRepository tourRepository;
    private final GuideRepository guideRepository;

    public TourService(TourRepository tourRepository,GuideRepository repository) {
        this.tourRepository = tourRepository;
        this.guideRepository = repository;
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

    public List<Tour> getToursByGuide(Long guideId) throws GuideNotFoundException {
        Guide guide = getGuideById(guideId);
        return tourRepository.findByGuides(guide);
    }

    public Tour saveTour(Tour tour) {
        return tourRepository.save(tour);
    }

    // I do not think that it is logical to update an existing tour maybe we can delete
    public Tour updateTour(Long id, Tour updatedTour) {
        Tour tour = tourRepository.findById(id)
                    .orElseThrow(() -> new TourNotFoundException("Tour with ID " + id + " not found"));
        tour.setTourType(updatedTour.getTourType());
        tour.setTourHours(updatedTour.getTourHours());
        tour.setVisitorSchool(updatedTour.getVisitorSchool());
        tour.setDepartmentOfInterest(updatedTour.getDepartmentOfInterest());
        tour.setTrainees(updatedTour.getTrainees());
        tour.setTourParticipantSurveys(updatedTour.getTourParticipantSurveys());
        tour.setGuides(updatedTour.getGuides());
        tour.setNoOfGuests(updatedTour.getNoOfGuests());
        tour.setQAroomID(updatedTour.getQAroomID());
        return tourRepository.save(tour);
    }

    public Tour updateTourDate(Long id, LocalDate newDate) {
        Tour tour = getTourById(id); 
        tour.setDate(newDate);
        return tourRepository.save(tour);
    }

    public Tour updateTourStatus(Long id, EventStatus status) {
        Tour tour = getTourById(id);
        tour.setStatus(status);
        return tourRepository.save(tour);
    }

    public Tour removeGuideFromTour(Long tourId, Guide guide) throws GuideNotFoundException{
        Tour tour = getTourById(tourId);
        if (!tour.getGuides().remove(guide)) {
            throw new GuideNotFoundException("Guide with ID " + guide.getId() + " is not assigned to the tour with ID " + tourId);
        }
        return tourRepository.save(tour);
    }

    public Tour removeAllGuidesFromTour(Long tourid) {
        Tour tour = getTourById(tourid);
        tour.getGuides().clear();
        return tourRepository.save(tour);
    }
    
    public Tour assignGuideToTour(Long tourId, Long guideId) throws GuideNotFoundException {
        Tour tour = getTourById(tourId);
        Guide guide = getGuideById(guideId);
    
        if (tour.getGuides().contains(guide)) {
            throw new GuideNotFoundException("Guide is already assigned to this tour.");
        }
        tour.getGuides().add(guide);
        return tourRepository.save(tour);
    }

    public Tour assignGuidesToTour(Long tourId, List<Long> guideIds) {
        Tour tour = getTourById(tourId);
        List<Guide> guides = guideRepository.findAllById(guideIds);
        tour.getGuides().addAll(guides);
        return tourRepository.save(tour);
    }
    

    public Guide getGuideById(Long guideId) throws GuideNotFoundException {
        return guideRepository.findById(guideId)
                .orElseThrow(() -> new GuideNotFoundException("Guide with ID " + guideId + " not found"));
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

    public List<Object[]> countEventsByMonthAndStatus(EventStatus status) {
        return tourRepository.countEventsByMonthAndStatus(status);
    }
    
}
