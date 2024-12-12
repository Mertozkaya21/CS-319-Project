package com.example.demo.repositories.form;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.time.LocalDate;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.TourHours;

public interface GroupFormRepository extends JpaRepository<GroupForm,Long>{

    List<GroupForm> findByStatus(ApplicationFormStatus status);
    List<GroupForm> findByEventDate(LocalDate eventDate);
    List<GroupForm> findByTourHour(TourHours tourHour);
    List<GroupForm> findByApplicationFormID(long applicationFormID);
}
