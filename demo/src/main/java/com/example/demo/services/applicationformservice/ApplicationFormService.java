package com.example.demo.services.applicationformservice;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.TourHours;
import com.example.demo.exceptions.ApplicationFormNotFoundException;
import com.example.demo.services.applicationformservice.applicationformsorter.ApplicationFormSorter;
import com.example.demo.services.applicationformservice.applicationformsorter.SortByLgsPercentile;
import com.example.demo.services.applicationformservice.applicationformsorter.SortStrategy;

@Service
public class ApplicationFormService {
    
    private final GroupFormService groupFormService;
    private final IndividualFormService individualFormService;
    private final ApplicationFormSorter applicationFormSorter;

    public ApplicationFormService(  IndividualFormService individualFormService,
                                    GroupFormService groupFormService){
        this.individualFormService = individualFormService;
        this.groupFormService = groupFormService;                                
        this.applicationFormSorter = new ApplicationFormSorter(new SortByLgsPercentile()); //default sorting strategy is lgsPercentile
    }

    public void setSortingStrategy(SortStrategy strategy){
        this.applicationFormSorter.setSortStrategy(strategy); 
    }

    public List<ApplicationForm> getAllApplicationForms() {
        List<ApplicationForm> allForms = new ArrayList<>();
        allForms.addAll(groupFormService.getAllGroupForms());
        allForms.addAll(individualFormService.getAllIndividualForms());

        allForms.sort(Comparator.comparing(ApplicationForm::getSubmitTimeDate));
        return allForms;
    }
    

    public ApplicationForm getOneFormById(Long formId) throws ApplicationFormNotFoundException {
        GroupForm groupForm = groupFormService.getGroupFormById(formId);
        if(groupForm != null)
            return groupForm;
        
        IndividualForm individualForm = individualFormService.getIndividualFormById(formId);
        if(individualForm != null)
            return individualForm;

        return null;
    }

    public List<ApplicationForm> getApplicationFormsByEventDate(LocalDate eventDate) {
        List<ApplicationForm> allForms = getAllApplicationForms(); 
        return allForms.stream()
            .filter(form -> form.getEventDate().equals(eventDate))
            .sorted((form1, form2) -> form1.getTourHour().compareTo(form2.getTourHour()))
            .collect(Collectors.toList());
    }


    public boolean updateOneApplicationFormStatus(Long formId, ApplicationFormStatus newStatus) throws ApplicationFormNotFoundException { //BTO_APPROVED or BTO_DENIED
        GroupForm groupForm = groupFormService.updateGroupFormStatus(formId, newStatus);
        if(groupForm != null)
            return true;

        IndividualForm individualForm = individualFormService.updateIndividualFormStatus(formId, newStatus);
        if(individualForm != null)
            return true;

        return false;
    }

    public ApplicationFormStatus getOneApplicationFormStatusByID(Long formId) throws ApplicationFormNotFoundException {
        GroupForm groupForm = groupFormService.getGroupFormById(formId);
        if(groupForm != null){
            return groupForm.getStatus();
        } 

        IndividualForm individualForm = individualFormService.getIndividualFormById(formId);
        if(individualForm != null){
            return individualForm.getStatus();
        } 

        return null;        
    }

    public boolean deleteById(Long formId) {
        if(groupFormService.deleteGroupFormById(formId)) {
            return true;
        }

        if(individualFormService.deleteIndividualFormById(formId)) {
            return true;
        }
        
        return false;
    }
}


class FormDateHourKey {
    LocalDate date;
    TourHours tourHour;

    public FormDateHourKey(LocalDate date, TourHours tourHour) {
        this.date = date;
        this.tourHour = tourHour;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FormDateHourKey that = (FormDateHourKey) o;
        return date.equals(that.date) && tourHour == that.tourHour;
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, tourHour);
    }
}