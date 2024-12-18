package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.HighschoolDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.highschool.Counselor;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.enums.City;
import com.example.demo.enums.UserRole;
import com.example.demo.exceptions.HighschoolNotFoundException;
import com.example.demo.repositories.highschool.HighschoolRepository;
import com.example.demo.services.UsersService.RoleService;

@Service
public class HighschoolService {
    
    private HighschoolRepository highschoolRepository;

    public HighschoolService(HighschoolRepository hRepository) {
        this.highschoolRepository = hRepository;
    }

    public List<Highschool> getAllHighschool() {
        return highschoolRepository.findAll();
    }

    public Highschool getHighschoolByID(long id) throws HighschoolNotFoundException{
        return highschoolRepository.findById(id).
                orElseThrow(() -> new HighschoolNotFoundException("Highschool with ID " + id + " not found"));
    }

    public List<String> getAllHighschoolNames() {
        return highschoolRepository.findAll()
                                   .stream()
                                   .map(Highschool::getName)
                                   .toList();
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
            currentCounselor.setCounselorName(updatedCounselor.getCounselorName());
            currentCounselor.setEmail(updatedCounselor.getEmail());
            currentCounselor.setPhone(updatedCounselor.getPhone());
        } else {
            highschool.setCounselor(updatedCounselor);
        }
        return highschoolRepository.save(highschool);
    }

    public Highschool updateHighschoolName(Long id, String newName) throws HighschoolNotFoundException {
        Highschool highschool = getHighschoolByID(id);

        if (!highschool.getName().equals(newName)) {
            highschool.setName(newName);
            return highschoolRepository.save(highschool);
        }
        return highschool; 
    }

    public Highschool updateHighschoolCity(Long id, City newCity) throws HighschoolNotFoundException {
        Highschool highschool = getHighschoolByID(id);

        if (!highschool.getCity().equals(newCity)) {
            highschool.setCity(newCity);
            return highschoolRepository.save(highschool);
        }
        return highschool; 
    }

    public Highschool updateHighschoolCounselorName(Long id, String newCounselorName) throws HighschoolNotFoundException {
        Highschool highschool = getHighschoolByID(id);

        if (!highschool.getCounselor().getCounselorName().equals(newCounselorName)) {
            highschool.getCounselor().setCounselorName(newCounselorName);
            return highschoolRepository.save(highschool);
        }
        return highschool; 
    }

    public Highschool updateHighschoolContactPhone(Long id, String newContactPhone) throws HighschoolNotFoundException {
        Highschool highschool = getHighschoolByID(id);

        if (!highschool.getCounselor().getPhone().equals(newContactPhone)) {
            highschool.getCounselor().setPhone(newContactPhone);
            return highschoolRepository.save(highschool);
        }
        return highschool; 
    }

    public Highschool updateHighschoolEmailAddress(Long id, String newEmailAddress) throws HighschoolNotFoundException {
        Highschool highschool = getHighschoolByID(id);

        if (!highschool.getCounselor().getEmail().equals(newEmailAddress)) {
            highschool.getCounselor().setEmail(newEmailAddress);
            return highschoolRepository.save(highschool);
        }
        return highschool; 
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

    public Highschool saveHighschool(Highschool highschool) {
        return highschoolRepository.save(highschool);
    }

    public Highschool saveHighschool(HighschoolDTO highschoolDTO) {
        Highschool highschool = new Highschool(highschoolDTO);
        return highschoolRepository.save(highschool);
    }

    public boolean deleteHighschoolByID(Long id) {
        if (highschoolRepository.existsById(id)) {
            highschoolRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void deleteHighschoolsByIds(List<Long> highschoolIds) {
        for (Long id : highschoolIds) {
            highschoolRepository.deleteById(id);
        }
    }
}
