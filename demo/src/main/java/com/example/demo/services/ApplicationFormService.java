package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.repositories.form.GroupFormRepository;
import com.example.demo.repositories.form.IndividualFormRepository;

@Service
public class ApplicationFormService {
    private final GroupFormRepository groupFormRepository;
    private final IndividualFormRepository individualFormRepository;

    public ApplicationFormService(GroupFormRepository groupFormRepo,
                                    IndividualFormRepository individualFormRepo){
        this.groupFormRepository = groupFormRepo;
        this.individualFormRepository = individualFormRepo;
    }

    public List<ApplicationForm> getAllApplicationForms() {
    
        List<ApplicationForm> allForms = new ArrayList<>();
        allForms.addAll(groupFormRepository.findAll());
        allForms.addAll(individualFormRepository.findAll());

        return allForms;
    }

    public List<GroupForm> getGroupForm() {
        return groupFormRepository.findAll();
    }

    public List<IndividualForm> getAllIndividualForms() {
        return individualFormRepository.findAll();
    }

    public IndividualForm saveIndividualForm(IndividualForm individualForm) {
        if (individualForm.getEventDate() == null || individualForm.getTourHour() == null) {
            throw new IllegalArgumentException("Date and Tour Hour must not be null");
        }
        return individualFormRepository.save(individualForm);
    }
    
    public GroupForm saveGroupForm(GroupForm groupForm) {
        if (groupForm.getEventDate() == null || groupForm.getTourHour() == null) {
            throw new IllegalArgumentException("Date and Tour Hour must not be null");
        }
        return groupFormRepository.save(groupForm);
    }

    public ApplicationForm getOneForm(Long formId) {
        Optional<GroupForm> groupFormOpt = groupFormRepository.findById(formId);
        if (groupFormOpt.isPresent()) return groupFormOpt.get();

        Optional<IndividualForm> individualFormOpt = individualFormRepository.findById(formId);
        if (individualFormOpt.isPresent()) return individualFormOpt.get();
    
        return null;
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

    public ApplicationFormStatus getOneApplicationFormStatus(Long formId) {
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
