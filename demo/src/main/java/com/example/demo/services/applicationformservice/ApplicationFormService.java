package com.example.demo.services.applicationformservice;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
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
        this.applicationFormSorter = new ApplicationFormSorter(new SortByLgsPercentile()); 
    }

    @Scheduled(cron = "0 0 0 * * ?") 
    public void updateApplicationFormStatusesDaily() {
        updateStatusForPastApplications();
    }

    private void updateStatusForPastApplications() {
        LocalDate today = LocalDate.now();

        List<GroupForm> groupForms = groupFormService.getAllGroupForms();
        for (GroupForm form : groupForms) {
            if (form.getEventDate().isBefore(today) && form.getStatus() == ApplicationFormStatus.BTO_APPROVED) {
                form.setStatus(ApplicationFormStatus.COMPLETED);
                groupFormService.save(form);
            }
        }

        List<IndividualForm> individualForms = individualFormService.getAllIndividualForms();
        for (IndividualForm form : individualForms) {
            if (form.getEventDate().isBefore(today) && form.getStatus() == ApplicationFormStatus.BTO_APPROVED) {
                form.setStatus(ApplicationFormStatus.COMPLETED);
                individualFormService.save(form);
            }
        }
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
    
    
    public List<ApplicationForm> getAllApplicationFormByStatus(ApplicationFormStatus stat) {
        List<ApplicationForm> allForms = new ArrayList<>();
        allForms.addAll(groupFormService.getAllApplicationFormByStatus(stat));
        allForms.addAll(individualFormService.getAllApplicationFormByStatus(stat));
        allForms.sort(Comparator.comparing(ApplicationForm::getSubmitTimeDate));
        return allForms;
    }

    public ApplicationForm getOneFormById(Long formId) throws ApplicationFormNotFoundException {
        try {
            GroupForm groupForm = groupFormService.getGroupFormById(formId);
            if (groupForm != null) return groupForm;
        } catch (ApplicationFormNotFoundException ignored) {
        }

        try {
            IndividualForm individualForm = individualFormService.getIndividualFormById(formId);
            if (individualForm != null) return individualForm;
        } catch (ApplicationFormNotFoundException ignored) {
        }

        throw new ApplicationFormNotFoundException("No application form found with ID: " + formId);
    }

    public List<ApplicationForm> getApplicationFormsByEventDate(LocalDate eventDate) {
        List<ApplicationForm> allForms = getAllApplicationForms(); 
        return allForms.stream()
            .filter(form -> form.getEventDate().equals(eventDate))
            .sorted((form1, form2) -> form1.getTourHour().compareTo(form2.getTourHour()))
            .collect(Collectors.toList());
    }


    public void updateApplicationFormStatus(Long formId, ApplicationFormStatus newStatus) throws ApplicationFormNotFoundException {
        ApplicationForm form = getOneFormById(formId);
    
        if (form == null) {
            throw new ApplicationFormNotFoundException("Application form not found for ID: " + formId);
        }
    
        form.setStatus(newStatus);
    
        if (form instanceof GroupForm) {
            groupFormService.save((GroupForm) form);
        } else if (form instanceof IndividualForm) {
            individualFormService.save((IndividualForm) form);
        }
    }
    

    public ApplicationFormStatus getOneApplicationFormStatusByID(Long formId) throws ApplicationFormNotFoundException {
        ApplicationForm form = getOneFormById(formId);
        return form.getStatus();
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

    public List<ApplicationForm> updateStatuses(List<Long> ids, ApplicationFormStatus status) {
        List<ApplicationForm> updatedForms = new ArrayList<>();
        for (Long id : ids) {
            try {
                ApplicationForm form = getOneFormById(id);
                if (form != null) {
                    form.setStatus(status);
                    if (form instanceof GroupForm) {
                        groupFormService.save((GroupForm) form);
                    } else if (form instanceof IndividualForm) {
                        individualFormService.save((IndividualForm) form);
                    }
                    updatedForms.add(form);
                }
            } catch (ApplicationFormNotFoundException e) {
            }
        }
        return updatedForms;
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