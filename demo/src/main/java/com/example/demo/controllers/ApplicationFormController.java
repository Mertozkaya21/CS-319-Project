package com.example.demo.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GroupFormDTO;
import com.example.demo.dto.IndividualFormDTO;
import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.services.ApplicationFormService;

@RestController
@RequestMapping("/v1/applicationform")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationFormController {
    private final ApplicationFormService applicationFormService;

    public ApplicationFormController(ApplicationFormService applicationFormService){
        this.applicationFormService = applicationFormService;
    }

    @GetMapping
    public ResponseEntity<List<ApplicationForm>> getAllApplicationForms() {
        return ResponseEntity.ok(applicationFormService.getAllApplicationForms());
    }

    @GetMapping("/groupform")
    public ResponseEntity<List<GroupForm>> getAllGroupForms() {
        return ResponseEntity.ok(applicationFormService.getAllGroupForms());
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
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationFormService.saveIndividualForm(form));
    }

    @PostMapping("/groupform")
    public ResponseEntity<GroupForm> saveGroupForm(@RequestBody GroupFormDTO groupFormDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationFormService.saveGroupForm(groupFormDTO));
    }

    @GetMapping("/event-day")
    public ResponseEntity<List<ApplicationForm>> getApplicationsByEventDay(@RequestParam String eventDay) {
    try {
        LocalDate eventDate = LocalDate.parse(eventDay);
        List<ApplicationForm> forms = applicationFormService.getApplicationFormsByEventDate(eventDate);
        if (!forms.isEmpty()) {
            return ResponseEntity.ok(forms);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(forms); 
    } catch (DateTimeParseException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); 
    }
}

    @PatchMapping("/{id}/status") 
    public ResponseEntity<Void> updateFormStatus(@PathVariable Long id, @RequestParam ApplicationFormStatus status) {
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
