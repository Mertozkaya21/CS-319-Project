package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GroupFormDTO;
import com.example.demo.dto.IndividualFormDTO;
import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.Department;
import com.example.demo.enums.TourHours;
import com.example.demo.services.EventService;
import com.example.demo.services.applicationformservice.ApplicationFormService;
import com.example.demo.services.applicationformservice.applicationformsorter.SortByDistance;
import com.example.demo.services.applicationformservice.applicationformsorter.SortByLgsPercentile;
import com.example.demo.services.applicationformservice.applicationformsorter.SortByPriorityScore;
import com.example.demo.services.applicationformservice.applicationformsorter.SortBySubmissionTime;

@RestController
@RequestMapping("/v1/applicationform")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationFormController {
    private final ApplicationFormService applicationFormService;
    private final EventService eventService;

    public ApplicationFormController(ApplicationFormService applicationFormService, EventService eventService){
        this.applicationFormService = applicationFormService;
        this.eventService = eventService;
    }

    @GetMapping("/departments")
    public ResponseEntity<List<String>> getAllDepartments() {
        List<String> departments = Arrays.stream(Department.values())
                                     .map(Department::getDisplayName) 
                                     .toList();
        return ResponseEntity.ok(departments);
    }

    @GetMapping
    public ResponseEntity<List<ApplicationForm>> getAllApplicationForms() {
        return ResponseEntity.ok(applicationFormService.getAllApplicationForms());
    }

    @GetMapping("/groupform")
    public ResponseEntity<List<GroupForm>> getAllGroupForms() {
        return ResponseEntity.ok(applicationFormService.getAllGroupForms());
    }

    @PostMapping("/groupform/changeparameter")
    public ResponseEntity<Void> changeSortingParameter(@RequestBody String newParameter) {
        if("byDistance".equals(newParameter)){
            applicationFormService.setSortingStrategy(new SortByDistance());
            return ResponseEntity.noContent().build();
        }
        else if("byLgsPercentile".equals(newParameter)){
            applicationFormService.setSortingStrategy(new SortByLgsPercentile());
            return ResponseEntity.noContent().build();
        }
        else if("bySubmitTime".equals(newParameter)){
            applicationFormService.setSortingStrategy(new SortBySubmissionTime());
            return ResponseEntity.noContent().build();
        }
        else if("byPriorityScore".equals(newParameter)){
            applicationFormService.setSortingStrategy(new SortByPriorityScore());
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/individualform")
    public ResponseEntity<List<IndividualForm>> getAllIndividualForms() {
        return ResponseEntity.ok(applicationFormService.getAllIndividualForms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationForm> getApplicationForm(@PathVariable Long id) {
        ApplicationForm form = applicationFormService.getOneFormById(id);
        if (form != null) {
            return ResponseEntity.ok(form);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/individualform")
    public ResponseEntity<IndividualForm> saveIndividualForm(@RequestBody IndividualFormDTO form) {
        if (!isValidDepartment(form.getDepartmentOfInterest())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationFormService.saveIndividualForm(form));
    }
    
    private boolean isValidDepartment(String department) {
        return Arrays.stream(Department.values())
                     .anyMatch(d -> d.name().equalsIgnoreCase(department) || d.getDisplayName().equalsIgnoreCase(department));
    }
    

    @PostMapping("/groupform")
    public ResponseEntity<GroupForm> saveGroupForm(@RequestBody GroupFormDTO groupFormDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationFormService.saveGroupForm(groupFormDTO));
    }

    @GetMapping("/{date}/{tourHour}")
    public ResponseEntity<List<GroupForm>> getApplicationsByDateAndTourHour(@PathVariable LocalDate date, @PathVariable TourHours tourHour) {

        List<GroupForm> forms = applicationFormService.getApplicationFormsByTourHour(date, tourHour);
        if (forms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(forms); 
        }
        else{
            return ResponseEntity.ok(forms);
        }

    }

    @PatchMapping("/{id}/{status}") 
    public ResponseEntity<Void> updateFormStatus(@PathVariable Long id, @PathVariable ApplicationFormStatus status) {
        if(status == ApplicationFormStatus.CONFIRMED){
            eventService.saveEvent(applicationFormService.getOneFormById(id));
        }
        boolean updated = applicationFormService.updateOneApplicationFormStatus(id, status);
        if (updated) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/{id}/status") 
    public ResponseEntity<ApplicationFormStatus> getFormStatus(@PathVariable Long id) {
        ApplicationFormStatus status = applicationFormService.getOneApplicationFormStatusByID(id);
        if (status != null) {
            return ResponseEntity.ok(status);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> deleteApplicationForm(@PathVariable Long id) {
        boolean deleted = applicationFormService.deleteById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
