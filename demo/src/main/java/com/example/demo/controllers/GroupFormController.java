package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GroupFormDTO;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.TourHours;
import com.example.demo.exceptions.ApplicationFormNotFoundException;
import com.example.demo.services.applicationformservice.GroupFormService;
import com.example.demo.services.applicationformservice.applicationformsorter.*;

@RestController
@RequestMapping("/v1/groupform")
@CrossOrigin(origins = "http://localhost:3000")
public class GroupFormController {

    private final GroupFormService groupFormService;

    public GroupFormController(GroupFormService groupFormService) {
        this.groupFormService = groupFormService;
    }

    @GetMapping
    public ResponseEntity<List<GroupForm>> getAllGroupForms() {
        return ResponseEntity.ok(groupFormService.getAllGroupForms());
    }

    @GetMapping("/{date}/{tourHour}")
    public ResponseEntity<List<GroupForm>> getApplicationsByDateAndTourHour(@PathVariable LocalDate date, @PathVariable TourHours tourHour) {
        List<GroupForm> forms = groupFormService.getGroupFormsByTourHours(date, tourHour);
        if (forms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(forms);
        }
        return ResponseEntity.ok(forms);
    }

    @PostMapping("/changeparameter")
    public ResponseEntity<Void> changeSortingParameter(@RequestBody String newParameter) {
        if ("byDistance".equals(newParameter)) {
            groupFormService.setSortingStrategy(new SortByDistance());
        } else if ("byLgsPercentile".equals(newParameter)) {
            groupFormService.setSortingStrategy(new SortByLgsPercentile());
        } else if ("bySubmitTime".equals(newParameter)) {
            groupFormService.setSortingStrategy(new SortBySubmissionTime());
        } else if ("byPriorityScore".equals(newParameter)) {
            groupFormService.setSortingStrategy(new SortByPriorityScore());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<GroupForm> saveGroupForm(@RequestBody GroupFormDTO groupFormDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(groupFormService.saveGroupForm(groupFormDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupForm> getGroupFormById(@PathVariable Long id) {
        try {
            GroupForm groupForm = groupFormService.getGroupFormById(id);
            return ResponseEntity.ok(groupForm);
        } catch (ApplicationFormNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupForm> updateGroupForm(@PathVariable Long id, @RequestBody GroupFormDTO groupFormDTO) {
        try {
            GroupForm updatedForm = groupFormService.updateGroupForm(id, groupFormDTO);
            return ResponseEntity.ok(updatedForm);
        } catch (ApplicationFormNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/{id}/{status}")
    public ResponseEntity<GroupForm> updateFormStatus(@PathVariable Long id, @PathVariable ApplicationFormStatus status) throws ApplicationFormNotFoundException {
        return ResponseEntity.ok(groupFormService.updateGroupFormStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroupForm(@PathVariable Long id) {
        boolean deleted = groupFormService.deleteGroupFormById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
