package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.repositories.form.ApplicationFormRepository;
import com.example.demo.repositories.form.GroupFormRepository;
import com.example.demo.repositories.form.IndividualFormRepository;

@Service
public class ApplicationFormService {
    private final ApplicationFormRepository applicationFormRepository;
    private final GroupFormRepository groupFormRepository;
    private final IndividualFormRepository individualFormRepository;

    public ApplicationFormService(ApplicationFormRepository applicationFormRepo, GroupFormRepository groupFormRepo,
                                    IndividualFormRepository individualFormRepo){
        this.applicationFormRepository = applicationFormRepo;
        this.groupFormRepository = groupFormRepo;
        this.individualFormRepository = individualFormRepo;
    }

    public List<ApplicationForm> getAllApplicationForms() {
        return applicationFormRepository.findAll();
    }

    public List<GroupForm> getGroupForm() {
        return groupFormRepository.findAll();
    }

    public List<IndividualForm> getAllIndividualForms() {
        return individualFormRepository.findAll();
    }

    public IndividualForm saveIndividualForm(IndividualForm aIndividualForm) {
        return individualFormRepository.save(aIndividualForm);
    }

    public GroupForm saveGroupForm(GroupForm aGroupForm) {
        return groupFormRepository.save(aGroupForm);
    }

    public ApplicationForm getOneForm(Long formId){
        return applicationFormRepository.findById(formId).orElse(null);
    }

    public ApplicationForm updateOneApplicationFormStatus(Long formId, ApplicationFormStatus newStatus) {
        Optional<ApplicationForm> applicationForm = applicationFormRepository.findById(formId);
        if(applicationForm.isPresent()){
            ApplicationForm foundApplicationForm = applicationForm.get();
            foundApplicationForm.setStatus(newStatus);
            applicationFormRepository.save(foundApplicationForm);
            return foundApplicationForm;
        } else {
            return null;
        }
    }

    public ApplicationFormStatus getOneApplicationFormStatus(Long formId) {
        Optional<ApplicationForm> applicationForm = applicationFormRepository.findById(formId);
        if(applicationForm.isPresent()){
            ApplicationForm foundApplicationForm = applicationForm.get();
            return foundApplicationForm.getStatus();
        } else {
            return null;
        }
    }

    public void deleteById(Long eventId) {
        applicationFormRepository.deleteById(eventId);
    }
}
