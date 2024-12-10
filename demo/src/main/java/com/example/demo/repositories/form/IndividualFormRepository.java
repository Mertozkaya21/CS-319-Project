package com.example.demo.repositories.form;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.form.IndividualForm;
import java.util.List;
import com.example.demo.entities.form.PreferredVisitTime;
import com.example.demo.enums.ApplicationFormStatus;
import java.time.LocalDate;

public interface IndividualFormRepository extends JpaRepository<IndividualForm, Long>{

    List<IndividualForm> findByPreferredVisitTimes(List<PreferredVisitTime> preferredVisitTimes);
    List<IndividualForm> findByStatus(ApplicationFormStatus status);
    List<IndividualForm> findBySubmitTime(LocalDate submitTime);
    
}
