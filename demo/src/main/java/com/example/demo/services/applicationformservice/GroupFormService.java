package com.example.demo.services.applicationformservice;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.example.demo.dto.GroupFormDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.highschool.Counselor;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.EventStatus;
import com.example.demo.enums.TourHours;
import com.example.demo.enums.TourType;
import com.example.demo.exceptions.ApplicationFormNotFoundException;
import com.example.demo.repositories.event.TourRepository;
import com.example.demo.repositories.form.GroupFormRepository;
import com.example.demo.repositories.highschool.HighschoolRepository;
import com.example.demo.services.applicationformservice.applicationformsorter.ApplicationFormSorter;
import com.example.demo.services.applicationformservice.applicationformsorter.SortStrategy;

@Service
public class GroupFormService {
    private final GroupFormRepository groupFormRepository;
    private final ApplicationFormSorter applicationFormSorter;
    private final HighschoolRepository highschoolRepository;
    private final TourRepository tourRepository;


    public GroupFormService(GroupFormRepository groupFormRepository, 
                            ApplicationFormSorter applicationFormSorter,
                            HighschoolRepository highschoolRepository,
                            TourRepository tourRepository) {
        this.groupFormRepository = groupFormRepository;
        this.applicationFormSorter = applicationFormSorter;
        this.highschoolRepository = highschoolRepository;
        this.tourRepository = tourRepository;
    }
    

    public List<GroupForm> getGroupFormsByTourHours(LocalDate date, TourHours tourHour){
        List<GroupForm> forms = groupFormRepository.findByEventDateAndTourHour(date,tourHour);
        return applicationFormSorter.sortApplicationForms(forms);
    }

    public void setSortingStrategy(SortStrategy strategy){
        this.applicationFormSorter.setSortStrategy(strategy); 
    }

    public List<GroupForm> getAllGroupForms() {
        List<GroupForm> groupForms = groupFormRepository.findAll();
        List<GroupForm> sortedForms = new ArrayList<>();

        groupForms.stream()
            .collect(Collectors.groupingBy(form -> new FormDateHourKey(form.getEventDate(), form.getTourHour())))
            .forEach((key, forms) -> {
                List<GroupForm> sortedGroup = getApplicationFormsByTourHour(key.date, key.tourHour);
                sortedForms.addAll(sortedGroup);
            });

        return sortedForms;
    }

    public List<GroupForm> getApplicationFormsByTourHour(LocalDate date, TourHours tourHour){
        List<GroupForm> forms = groupFormRepository.findByEventDateAndTourHour(date,tourHour);
        return applicationFormSorter.sortApplicationForms(forms);
    }

    public GroupForm getGroupFormById(Long id) throws ApplicationFormNotFoundException {
        return groupFormRepository.findById(id)
                .orElseThrow(() -> new ApplicationFormNotFoundException("Group form with ID " + id + " not found"));
    }

    public GroupForm updateGroupFormStatus(Long groupFormId, ApplicationFormStatus newStatus) throws ApplicationFormNotFoundException {
        GroupForm groupForm = getGroupFormById(groupFormId);
        groupForm.setStatus(newStatus);

        if(newStatus == ApplicationFormStatus.BTO_APPROVED) {
            createGroupTour(groupForm);
        } 

        return groupFormRepository.save(groupForm);
    }

    private void createGroupTour(GroupForm groupForm) {
        Tour groupTour = new Tour();
        groupTour.setTourType(TourType.GROUP); 
        groupTour.setTourHours(groupForm.getTourHour()); 
        groupTour.setDate(groupForm.getEventDate());
        groupTour.setNoOfGuests(groupForm.getNumberOfAttendees());
        groupTour.setVisitorSchool(groupForm.getHighschool()); 
        groupTour.setNumberOfGuidesNeeded((int) Math.ceil(groupTour.getNoOfGuests() / 60.0));
        groupTour.setStatus(EventStatus.SCHEDULED);
        
        tourRepository.save(groupTour);
    }


    public GroupForm saveGroupForm(GroupFormDTO groupFormDto) {
        Highschool highschool = highschoolRepository.findByName(groupFormDto.getHighSchoolName());
        if (highschool == null) {
            highschool = createNewHighSchool(groupFormDto);
            highschoolRepository.save(highschool);
        } else if (hasHighschoolAlreadyApplied(highschool.getName(), groupFormDto.getEventDateAsLocalDate())) {
            throw new IllegalArgumentException("High school has already applied for a tour on this date.");
        }

        GroupForm groupForm = new GroupForm(groupFormDto);
        groupForm.setHighschool(highschool);
        groupForm.setCounselor(highschool.getCounselor());

        return groupFormRepository.save(groupForm);
    }

    private Highschool createNewHighSchool(GroupFormDTO groupFormDto) {
        Highschool newHighschool = new Highschool();
        newHighschool.setName(groupFormDto.getHighSchoolName());
        newHighschool.setCity(groupFormDto.getCity());
        newHighschool.setLgsPercentile(100);
        newHighschool.setDateUpDated(LocalDate.now());

        Counselor counselor = new Counselor();
        counselor.setCounselorName(groupFormDto.getChaperoneName());
        counselor.setEmail(groupFormDto.getEmail());
        counselor.setPhone(groupFormDto.getPhoneNumber());
        newHighschool.setCounselor(counselor);

        return newHighschool;
    }

    private boolean hasHighschoolAlreadyApplied(String highschoolName, LocalDate tourDate) {
        List<GroupForm> forms = groupFormRepository.findByEventDateAndHighschoolName(tourDate, highschoolName);
        return !forms.isEmpty();
    }

    public boolean deleteGroupFormById(Long groupFormId) {
        if (groupFormRepository.existsById(groupFormId)) {
            groupFormRepository.deleteById(groupFormId);
            return true;
        }
        return false;
    }

}
