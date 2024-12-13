package com.example.demo.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.GroupFormDTO;
import com.example.demo.dto.IndividualFormDTO;
import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.repositories.form.GroupFormRepository;
import com.example.demo.repositories.form.IndividualFormRepository;
import com.example.demo.repositories.highschool.HighschoolRepository;
import com.example.demo.services.UsersService.AdvisorService;

@Service
public class ApplicationFormService {
    private final AdvisorService advisorService;
    private final GroupFormRepository groupFormRepository;
    private final IndividualFormRepository individualFormRepository;
    private final HighschoolRepository highschoolRepository;

    public ApplicationFormService(GroupFormRepository groupFormRepo,
                                    IndividualFormRepository individualFormRepo,
                                    AdvisorService advisorService,
                                    HighschoolRepository highschoolRepository){
        this.groupFormRepository = groupFormRepo;
        this.individualFormRepository = individualFormRepo;
        this.advisorService = advisorService;
        this.highschoolRepository = highschoolRepository;
    }

    public List<ApplicationForm> getAllApplicationForms() {
    
        List<ApplicationForm> allForms = new ArrayList<>();
        allForms.addAll(groupFormRepository.findAll());
        allForms.addAll(individualFormRepository.findAll());

        return allForms;
    }

    public List<GroupForm> getAllGroupForms() {
        return groupFormRepository.findAll();
    }

    public List<IndividualForm> getAllIndividualForms() {
        return individualFormRepository.findAll();
    }

    // Save methods does not work properly
    public IndividualForm saveIndividualForm(IndividualFormDTO individualFormDto) {
        IndividualForm individualForm = new IndividualForm(individualFormDto);
        individualForm.setAdvisor(advisorService.getAdvisorByUndertakenDay(individualForm.getEventDate().getDayOfWeek()));
        Coordinator coordinator = Coordinator.getInstance();
        if(coordinator!=null){
            individualForm.setCoordinator(coordinator);
        }
        else{
            throw new IllegalArgumentException("Coordinator could not be found.");
        }
        return individualFormRepository.save(individualForm);
    }
    
    // Save methods does not work properly
    public GroupForm saveGroupForm(GroupFormDTO groupFormDto) {
        GroupForm groupForm = new GroupForm(groupFormDto);
        Highschool highschool = highschoolRepository.findById(groupFormDto.getHighSchoolId())
        .orElseThrow(() -> new IllegalArgumentException("HighSchool not found for id: " + groupFormDto.getHighSchoolId()));
        groupForm.setHighschool(highschool);
        groupForm.setCounselor(highschool.getCounselor());
        groupForm.setAdvisor(advisorService.getAdvisorByUndertakenDay(groupForm.getEventDate().getDayOfWeek()));
        Coordinator coordinator = Coordinator.getInstance();
        if(coordinator!=null){
            groupForm.setCoordinator(coordinator);
        }
        else{
            throw new IllegalArgumentException("Coordinator could not be found.");
        }
        return groupFormRepository.save(groupForm);
    }

    public ApplicationForm getOneFormById(Long formId) {
        Optional<GroupForm> groupFormOpt = groupFormRepository.findById(formId);
        if (groupFormOpt.isPresent()) return groupFormOpt.get();

        Optional<IndividualForm> individualFormOpt = individualFormRepository.findById(formId);
        if (individualFormOpt.isPresent()) return individualFormOpt.get();
    
        return null;
    }

    public List<ApplicationForm> getApplicationFormsByEventDate(LocalDate eventDate) {
        List<ApplicationForm> allForms = getAllApplicationForms(); 
        return allForms.stream()
            .filter(form -> form.getEventDate().equals(eventDate))
            .sorted((form1, form2) -> form1.getTourHour().compareTo(form2.getTourHour()))
            .collect(Collectors.toList());
    }

    public boolean updateOneApplicationFormStatus(Long formId, ApplicationFormStatus newStatus) {
        Optional<GroupForm> groupFormOpt = groupFormRepository.findById(formId);
        if (groupFormOpt.isPresent()) {
            GroupForm foundForm = groupFormOpt.get();
            foundForm.setStatus(newStatus);
            groupFormRepository.save(foundForm);
            return true;
        }

        Optional<IndividualForm> individualFormOpt = individualFormRepository.findById(formId);
        if (individualFormOpt.isPresent()){
            IndividualForm foundForm = individualFormOpt.get();
            foundForm.setStatus(newStatus);
            individualFormRepository.save(foundForm);
            return true;
        } 
    
        return false;
    }

    public ApplicationFormStatus getOneApplicationFormStatusByID(Long formId) {
        Optional<GroupForm> groupForm = groupFormRepository.findById(formId);
        if(groupForm.isPresent()){
            ApplicationForm foundApplicationForm = groupForm.get();
            return foundApplicationForm.getStatus();
        } 

        Optional<IndividualForm> individualForm = individualFormRepository.findById(formId);
        if(individualForm.isPresent()){
            ApplicationForm foundApplicationForm = individualForm.get();
            return foundApplicationForm.getStatus();
        } 

        return null;
        
    }

    public boolean deleteById(Long formId) {
        if (groupFormRepository.existsById(formId)) {
            groupFormRepository.deleteById(formId);
            return true;
        }

        else if (individualFormRepository.existsById(formId)) {
            individualFormRepository.deleteById(formId);
            return true;
        }

        return false;
    }
}
