package com.example.demo.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UpdateApplicationFormStatusDTO;
import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.Department;
import com.example.demo.exceptions.ApplicationFormNotFoundException;
import com.example.demo.services.applicationformservice.ApplicationFormService;
import com.example.demo.services.applicationformservice.applicationformsorter.*;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/v1/applicationform")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationFormController {
    private final ApplicationFormService applicationFormService;

    public ApplicationFormController(ApplicationFormService applicationFormService){
        this.applicationFormService = applicationFormService;
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

    @GetMapping("/status")
    public ResponseEntity<List<ApplicationForm>> getApplicationFormsByStatus(@RequestParam("stat") ApplicationFormStatus stat) {
        List<ApplicationForm> forms = applicationFormService.getAllApplicationFormByStatus(stat);
        if (forms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(forms);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ApplicationForm>> getScheduledApplicationForms() {
        List<ApplicationForm> scheduledForms = applicationFormService.getAllApplicationFormByStatus(ApplicationFormStatus.PENDING);
        if (scheduledForms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(scheduledForms);
    }

    @GetMapping("/{id}/status") 
    public ResponseEntity<ApplicationFormStatus> getFormStatus(@PathVariable Long id) throws ApplicationFormNotFoundException {
        ApplicationFormStatus status = applicationFormService.getOneApplicationFormStatusByID(id);
        if (status != null) {
            return ResponseEntity.ok(status);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationForm> getApplicationForm(@PathVariable Long id) throws ApplicationFormNotFoundException {
        ApplicationForm form = applicationFormService.getOneFormById(id);
        if (form != null) {
            return ResponseEntity.ok(form);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/changeparameter")
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

    @PostMapping("/update-statuses")
    public ResponseEntity<List<ApplicationForm>> updateApplicationFormStatuses(
            @RequestBody UpdateApplicationFormStatusDTO dto) {
        List<ApplicationForm> updatedForms = applicationFormService.updateStatuses(dto.getIds(), dto.getStatus());
    
        if (updatedForms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(updatedForms);
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
