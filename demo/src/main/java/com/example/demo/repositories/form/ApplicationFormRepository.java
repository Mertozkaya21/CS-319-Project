package com.example.demo.repositories.form;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.entities.form.PreferredVisitTime;



public interface ApplicationFormRepository extends JpaRepository<ApplicationForm, Long>{

    List<ApplicationForm> findBySubmitTime(LocalDate submitTime);
    List<ApplicationForm> findByStatus(ApplicationFormStatus status);
    List<ApplicationForm> findByPreferredVisitTimes(List<PreferredVisitTime> preferredVisitTimes);
}
