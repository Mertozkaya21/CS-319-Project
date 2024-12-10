package com.example.demo.repositories.form;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.TourHours;




public interface ApplicationFormRepository extends JpaRepository<ApplicationForm, Long>{

    List<ApplicationForm> findByDate(LocalDate date);
    List<ApplicationForm> findByTourHour(TourHours tourHour);
    List<ApplicationForm> findByTourHourAndDate(TourHours tourHour, LocalDate date);
    List<ApplicationForm> findByStatus(ApplicationFormStatus status);
}
