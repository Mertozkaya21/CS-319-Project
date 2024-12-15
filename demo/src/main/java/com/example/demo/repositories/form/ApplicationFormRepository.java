package com.example.demo.repositories.form;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.TourHours;

@Repository
public interface ApplicationFormRepository extends JpaRepository<ApplicationForm, Long>{
    
    List<ApplicationForm> findByEventDate(LocalDate eventDate);
    List<ApplicationForm> findByTourHour(TourHours tourHour);
    List<ApplicationForm> findByStatus(ApplicationFormStatus status);
    List<ApplicationForm> findByEventDateAndTourHour(LocalDate eventDate, TourHours tourHour);
    List<ApplicationForm> findByApplicationFormID(long applicationFormID);

}
