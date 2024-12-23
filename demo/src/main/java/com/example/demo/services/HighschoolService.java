package com.example.demo.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.HighschoolDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.highschool.Counselor;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.enums.City;
import com.example.demo.exceptions.HighschoolNotFoundException;
import com.example.demo.repositories.form.GroupFormRepository;
import com.example.demo.repositories.highschool.CounselorRepository;
import com.example.demo.repositories.highschool.HighschoolRepository;

@Service
public class HighschoolService {
    
    private final HighschoolRepository highschoolRepository;
    private final CounselorRepository counselorRepository;
    private final GroupFormRepository groupFormRepository;

    public HighschoolService(HighschoolRepository hRepository, CounselorRepository counselorRepository, GroupFormRepository groupFormRepository) {
        this.highschoolRepository = hRepository;
        this.counselorRepository = counselorRepository;
        this.groupFormRepository = groupFormRepository;
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
        Highschool highschool = getHighschoolByID(highschoolId);
        highschool.setCounselor(counselor);
        return highschoolRepository.save(highschool);
    } 

    public Highschool updateCounselor(Long highschoolId, Counselor updatedCounselor) throws HighschoolNotFoundException {
        Highschool highschool = getHighschoolByID(highschoolId);
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

    public Highschool updateHighschool(Long id, HighschoolDTO highschoolDTO) throws HighschoolNotFoundException {
        Highschool highschool = getHighschoolByID(id);
        highschool.setName(highschoolDTO.getName());
        highschool.setCity(highschoolDTO.getCity());
        highschool.getCounselor().setCounselorName(highschoolDTO.getCounselorName());
        highschool.getCounselor().setEmail(highschoolDTO.getCounselorEmail());
        highschool.getCounselor().setPhone(highschoolDTO.getCounselorPhoneNo());
        highschool.setDateUpDated(LocalDate.now());
        highschool.setLgsPercentile(highschoolDTO.getLgsPercentile());
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
        Highschool highschool = getHighschoolByID(highschoolId);
        highschool.setCounselor(null);
        return highschoolRepository.save(highschool);
    }

    
    public List<Tour> getToursByHighschoolId(Long highschoolId) throws HighschoolNotFoundException {
        return highschoolRepository.findById(highschoolId)
                .map(Highschool::getGroupTours)
                .orElseThrow(() -> new HighschoolNotFoundException("Highschool with ID " + highschoolId + " not found"));
    }

    public Highschool saveHighschool(HighschoolDTO highschoolDTO) throws HighschoolNotFoundException {
        Highschool temp = highschoolRepository.findByName(highschoolDTO.getName());

        if (temp!=null && (temp.getCity() == highschoolDTO.getCity() &&
            temp.getName().equals(highschoolDTO.getName()) )) {
            throw new HighschoolNotFoundException("Highschool with name '" + highschoolDTO.getName() + "' already exists.");
        }

        Counselor counselor = new Counselor();
        counselor.setCounselorName(highschoolDTO.getCounselorName());
        counselor.setEmail(highschoolDTO.getCounselorEmail());
        counselor.setPhone(highschoolDTO.getCounselorPhoneNo());
    
        counselorRepository.save(counselor); 
    
        Highschool highschool = new Highschool();
        highschool.setName(highschoolDTO.getName());
        highschool.setCity(highschoolDTO.getCity());
        highschool.setLgsPercentile(highschoolDTO.getLgsPercentile());
        highschool.setDateUpDated(LocalDate.now());
        highschool.setCounselor(counselor);
    
        return highschoolRepository.save(highschool);
    }
    

    public void deleteHighschoolById(Long id) {
        if (!highschoolRepository.existsById(id)) {
            throw new IllegalArgumentException("Highschool with ID " + id + " does not exist.");
        }
    
        List<GroupForm> groupForms = groupFormRepository.findByHighschoolId(id);
        if (!groupForms.isEmpty()) {
            for (GroupForm groupForm : groupForms) {
                groupForm.setHighschool(null); 
                groupFormRepository.save(groupForm); 
            }
        }
    
        highschoolRepository.deleteById(id);
    }
    

    public boolean checkHighschoolHasGroupForms(Long id) {
        if (!highschoolRepository.existsById(id)) {
            throw new IllegalArgumentException("Highschool with ID " + id + " does not exist.");
        }
    
        List<GroupForm> groupForms = groupFormRepository.findByHighschoolId(id);
        return !groupForms.isEmpty();
    }

    public List<Long> checkHighschoolsHaveGroupForms(List<Long> highschoolIds) {
        List<Long> idsWithGroupForms = new ArrayList<>();
    
        for (Long id : highschoolIds) {
            if (!highschoolRepository.existsById(id)) {
                continue;
            }
    
            List<GroupForm> groupForms = groupFormRepository.findByHighschoolId(id);
            if (!groupForms.isEmpty()) {
                idsWithGroupForms.add(id);
            }
        }
    
        return idsWithGroupForms;
    }

    public void deleteHighschoolsByIds(List<Long> highschoolIds) {
        for (Long id : highschoolIds) {
            if (!highschoolRepository.existsById(id)) {
                continue;
            }
    
            List<GroupForm> groupForms = groupFormRepository.findByHighschoolId(id);
            if (!groupForms.isEmpty()) {
                for (GroupForm groupForm : groupForms) {
                    groupForm.setHighschool(null); 
                    groupFormRepository.save(groupForm); 
                }
            }
    
            highschoolRepository.deleteById(id);
        }
    }

}
