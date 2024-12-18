package com.example.demo.services;

import com.example.demo.entities.event.Fair;
import com.example.demo.entities.user.Guide;
import com.example.demo.enums.EventStatus;
import com.example.demo.exceptions.FairNotFoundException;
import com.example.demo.exceptions.GuideNotFoundException;
import com.example.demo.repositories.event.FairRepository;
import com.example.demo.repositories.user.GuideRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FairService {

    private final FairRepository fairRepository;
    private final GuideRepository guideRepository;

    public FairService(FairRepository fairRepository, GuideRepository guideRepository) {
        this.fairRepository = fairRepository;
        this.guideRepository = guideRepository;
    }

    public List<Fair> getAllFairs() {
        return fairRepository.findAll();
    }

    public Fair getFairById(Long id) {
        return fairRepository.findById(id)
            .orElseThrow(() -> new FairNotFoundException("Fair with ID " + id + " not found"));
    }

    public List<Fair> getFairByCity(String city) {
        return fairRepository.findByCity(city);
    }

    public Fair saveFair(Fair fair) {
        return fairRepository.save(fair);
    }

    public Fair updateFairStatus(Long id, EventStatus status) {
        Fair fair = getFairById(id);
        fair.setStatus(status);
        return fairRepository.save(fair);
    }

    public Fair updateFairDate(Long id, LocalDate newDate) {
        Fair fair = getFairById(id);
        fair.setDate(newDate);
        return fairRepository.save(fair);
    }

    public boolean deleteFairById(Long id) {
        if (fairRepository.existsById(id)) {
            fairRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Fair assignGuideToFair(Long fairId, Long guideId) throws GuideNotFoundException {
        Fair fair = getFairById(fairId);
        Guide guide = getGuideById(guideId);

        if (fair.getGuides().contains(guide)) {
            throw new GuideNotFoundException("Guide is already assigned to this fair.");
        }

        fair.getGuides().add(guide);
        return fairRepository.save(fair);
    }

    public Fair removeGuideFromFair(Long fairId, Guide guide) throws GuideNotFoundException {
        Fair fair = getFairById(fairId);

        if (!fair.getGuides().remove(guide)) {
            throw new GuideNotFoundException("Guide with ID " + guide.getId() + " is not assigned to the fair with ID " + fairId);
        }

        return fairRepository.save(fair);
    }

    public Fair removeAllGuidesFromFair(Long fairId) {
        Fair fair = getFairById(fairId);
        fair.getGuides().clear();
        return fairRepository.save(fair);
    }
    

    public Guide getGuideById(Long guideId) throws GuideNotFoundException {
        return guideRepository.findById(guideId)
                .orElseThrow(() -> new GuideNotFoundException("Guide with ID " + guideId + " not found"));
    }

    public List<Fair> getFairsByDate(LocalDate date) {
        return fairRepository.findByDate(date);
    }


    public List<Fair> getFairsByDateRange(LocalDate startDate, LocalDate endDate) {
        return fairRepository.findByDateBetween(startDate, endDate);
    }
    

    public List<Object[]> countEventsByMonthAndStatus(EventStatus status) {
        return fairRepository.countEventsByMonthAndStatus(status);
    }
}
