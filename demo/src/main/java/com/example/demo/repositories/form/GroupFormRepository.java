package com.example.demo.repositories.form;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.form.GroupForm;
import java.util.List;
import com.example.demo.enums.ApplicationFormStatus;
import java.time.LocalDate;
import com.example.demo.enums.TourHours;




public interface GroupFormRepository extends JpaRepository<GroupForm,Long>{

    List<GroupForm> findByStatus(ApplicationFormStatus status);
    List<GroupForm> findByDate(LocalDate date);
    List<GroupForm> findByTourHour(TourHours tourHour);
    List<GroupForm> findByApplicationFormID(long applicationFormID);

}
