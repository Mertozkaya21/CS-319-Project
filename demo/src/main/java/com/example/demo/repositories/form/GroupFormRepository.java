package com.example.demo.repositories.form;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.form.GroupForm;
import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.TourHours;

@Repository
public interface GroupFormRepository extends JpaRepository<GroupForm,Long>{
    List<GroupForm> findByEventDate(LocalDate eventDate);
    List<GroupForm> findByTourHour(TourHours tourHour);
    List<GroupForm> findByStatus(ApplicationFormStatus status);
    List<GroupForm> findByEventDateAndTourHour(LocalDate eventDate, TourHours tourHour);
    List<GroupForm> findByApplicationFormID(long applicationFormID);

}
