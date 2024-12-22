package com.example.demo.services.applicationformservice;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.IndividualFormDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.Department;
import com.example.demo.enums.EventStatus;
import com.example.demo.enums.TourType;
import com.example.demo.exceptions.ApplicationFormNotFoundException;
import com.example.demo.repositories.event.TourRepository;
import com.example.demo.repositories.form.IndividualFormRepository;

@Service
public class IndividualFormService {

    private final IndividualFormRepository individualFormRepository;
    private final TourRepository tourRepository;

    public IndividualFormService(IndividualFormRepository individualFormRepository,
                                TourRepository tourRepository) {
        this.individualFormRepository = individualFormRepository;
        this.tourRepository = tourRepository;
    }


    public List<IndividualForm> getAllIndividualForms() {
        return individualFormRepository.findAll();
    }
    
    public List<IndividualForm> getFormsByDepartment(Department department) {
        return individualFormRepository.findByDepartmentOfInterest(department);
    }

    public List<IndividualForm> getIndividualFormsByDepartment(Department department) {
        return  getAllIndividualForms().stream()
                .filter(form -> form.getDepartmentOfInterest() == department)
                .collect(Collectors.toList());
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

        if (newStatus == ApplicationFormStatus.BTO_APPROVED) {
            createIndividualTour(individualForm); 
        }

        return individualFormRepository.save(individualForm);
    }

    private void createIndividualTour(IndividualForm individualForm) {
        Tour individualTour = new Tour();
        
        individualTour.setTourType(TourType.INDIVIDUAL); 
        individualTour.setTourHours(individualForm.getTourHour()); 
        individualTour.setDate(individualForm.getEventDate());
        individualTour.setNoOfGuests(individualForm.getNumberOfAttendees()); 
        individualTour.setDepartmentOfInterest(individualForm.getDepartmentOfInterest()); 
        individualTour.setStatus(EventStatus.SCHEDULED);

        tourRepository.save(individualTour);
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

    public List<IndividualForm> getAllApplicationFormByStatus(ApplicationFormStatus stat) {
        return individualFormRepository.findByStatus(stat);
    }

    public IndividualForm save(IndividualForm form) {
        return individualFormRepository.save(form);
    }
}
