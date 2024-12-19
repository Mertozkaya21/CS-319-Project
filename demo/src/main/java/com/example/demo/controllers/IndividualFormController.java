package com.example.demo.controllers;

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

import com.example.demo.dto.IndividualFormDTO;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.exceptions.ApplicationFormNotFoundException;
import com.example.demo.services.applicationformservice.IndividualFormService;

@RestController
@RequestMapping("/v1/individualform")
@CrossOrigin(origins = "http://localhost:3000")
public class IndividualFormController {

    private final IndividualFormService individualFormService;

    public IndividualFormController(IndividualFormService individualFormService) {
        this.individualFormService = individualFormService;
    }

    @GetMapping
    public ResponseEntity<List<IndividualForm>> getAllIndividualForms() {
        return ResponseEntity.ok(individualFormService.getAllIndividualForms());
    }

    @PostMapping
    public ResponseEntity<IndividualForm> saveIndividualForm(@RequestBody IndividualFormDTO individualFormDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(individualFormService.saveIndividualForm(individualFormDTO));
    }

    @PatchMapping("/{id}/{status}")
    public ResponseEntity<IndividualForm> updateFormStatus(@PathVariable Long id, @PathVariable ApplicationFormStatus status) throws ApplicationFormNotFoundException {
        return ResponseEntity.ok(individualFormService.updateIndividualFormStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIndividualForm(@PathVariable Long id) {
        boolean deleted = individualFormService.deleteIndividualFormById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
