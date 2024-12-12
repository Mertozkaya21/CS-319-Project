package com.example.demo.repositories.form;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.form.IndividualForm;
import java.util.List;
import com.example.demo.enums.ApplicationFormStatus;
import java.time.LocalDate;
import com.example.demo.enums.TourHours;


public interface IndividualFormRepository extends JpaRepository<IndividualForm, Long>{

    List<IndividualForm> findByStatus(ApplicationFormStatus status);
    List<IndividualForm> findByEventDate(LocalDate eventDate);
    List<IndividualForm> findByTourHour(TourHours tourHour);
}
