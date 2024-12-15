package com.example.demo.repositories.form;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.form.GroupForm;
import com.example.demo.entities.form.IndividualForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.TourHours;

@Repository
public interface IndividualFormRepository extends JpaRepository<IndividualForm,Long>{
    List<IndividualForm> findByEventDate(LocalDate eventDate);
    List<IndividualForm> findByTourHour(TourHours tourHour);
    List<IndividualForm> findByStatus(ApplicationFormStatus status);
    List<IndividualForm> findByEventDateAndTourHour(LocalDate eventDate, TourHours tourHour);
    List<IndividualForm> findByApplicationFormID(long applicationFormID);

}
