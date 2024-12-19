package com.example.demo.services.applicationformservice;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.IndividualFormDTO;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.exceptions.ApplicationFormNotFoundException;
import com.example.demo.repositories.form.IndividualFormRepository;

@Service
public class IndividualFormService {

    private final IndividualFormRepository individualFormRepository;

    public IndividualFormService(IndividualFormRepository individualFormRepository) {
        this.individualFormRepository = individualFormRepository;
    }

    public List<IndividualForm> getAllIndividualForms() {
        return individualFormRepository.findAll();
    }

    public IndividualForm getIndividualFormById(Long id) throws ApplicationFormNotFoundException {
        return individualFormRepository.findById(id)
                .orElseThrow(() -> new ApplicationFormNotFoundException("Individual form with ID " + id + " not found"));
    }

    public List<IndividualForm> getIndividualFormsByEventDate(LocalDate eventDate) {
        return individualFormRepository.findAll().stream()
                .filter(form -> form.getEventDate().equals(eventDate))
                .toList();
    }

    public IndividualForm updateIndividualFormStatus(Long individualFormId, ApplicationFormStatus newStatus) throws ApplicationFormNotFoundException {
        IndividualForm individualForm = getIndividualFormById(individualFormId);
        individualForm.setStatus(newStatus);
        return individualFormRepository.save(individualForm);
    }

    public IndividualForm saveIndividualForm(IndividualFormDTO individualFormDto) {
        IndividualForm individualForm = new IndividualForm(individualFormDto);
        return individualFormRepository.save(individualForm);
    }

    public boolean deleteIndividualFormById(Long individualFormId) {
        if (individualFormRepository.existsById(individualFormId)) {
            individualFormRepository.deleteById(individualFormId);
            return true;
        }
        return false;
    }
}
