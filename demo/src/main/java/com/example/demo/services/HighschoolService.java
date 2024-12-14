package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.event.Tour;
import com.example.demo.entities.highschool.Counselor;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.exceptions.HighschoolNotFoundException;
import com.example.demo.repositories.highschool.HighschoolRepository;

@Service
public class HighschoolService {
    
    private HighschoolRepository highschoolRepository;

    public HighschoolService(HighschoolRepository hRepository) {
        this.highschoolRepository = hRepository;
    }

    public List<Highschool> getAllHighschool() {
        return highschoolRepository.findAll();
    }

    public Optional<Highschool> getHighschoolByID(long id){
        return highschoolRepository.findById(id);
    }

    public Highschool assignCounselorToHighschool(Long highschoolId, Counselor counselor) throws HighschoolNotFoundException {
        Highschool highschool = highschoolRepository.findById(highschoolId)
                .orElseThrow(() -> new HighschoolNotFoundException("Highschool with ID " + highschoolId + " not found"));
        highschool.setCounselor(counselor);
        return highschoolRepository.save(highschool);
    }

    public Highschool updateCounselor(Long highschoolId, Counselor updatedCounselor) throws HighschoolNotFoundException {
        Highschool highschool = highschoolRepository.findById(highschoolId)
                .orElseThrow(() -> new HighschoolNotFoundException("Highschool with ID " + highschoolId + " not found"));
        Counselor currentCounselor = highschool.getCounselor();
        if (currentCounselor != null) {
            currentCounselor.setName(updatedCounselor.getName());
            currentCounselor.setEmail(updatedCounselor.getEmail());
            currentCounselor.setPhone(updatedCounselor.getPhone());
        } else {
            highschool.setCounselor(updatedCounselor);
        }
        return highschoolRepository.save(highschool);
    }
    
    public Highschool removeCounselorFromHighschool(Long highschoolId) throws HighschoolNotFoundException {
        Highschool highschool = highschoolRepository.findById(highschoolId)
                .orElseThrow(() -> new HighschoolNotFoundException("Highschool with ID " + highschoolId + " not found"));
        highschool.setCounselor(null);
        return highschoolRepository.save(highschool);
    }

    
    public List<Tour> getToursByHighschoolId(Long highschoolId) throws HighschoolNotFoundException {
        return highschoolRepository.findById(highschoolId)
                .map(Highschool::getGroupTours)
                .orElseThrow(() -> new HighschoolNotFoundException("Highschool with ID " + highschoolId + " not found"));
    }

    //priority score is not used or assigned directly anymore
    /*public Highschool updatePriorityScore(Long highschoolId, double newScore) throws HighschoolNotFoundException {
        Highschool highschool = highschoolRepository.findById(highschoolId)
                .orElseThrow(() -> new HighschoolNotFoundException("Highschool with ID " + highschoolId + " not found"));
        highschool.setPriorityScore(newScore);
        return highschoolRepository.save(highschool);
    }*/ 

    public Highschool saveHighschool(Highschool highschool) {
        return highschoolRepository.save(highschool);
    }

    public void deleteHighschoolByID(Long id) {
        if(highschoolRepository.existsById(id))
            highschoolRepository.deleteById(id);
    }
}
