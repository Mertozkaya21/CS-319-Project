package com.example.demo.repositories.form;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.form.GroupForm;
import java.util.List;
import com.example.demo.enums.ApplicationFormStatus;
import java.time.LocalDate;



public interface GroupFormRepository extends JpaRepository<GroupForm,Long>{

    List<GroupForm> findByStatus(ApplicationFormStatus status);
    List<GroupForm> findBySubmitTime(LocalDate submitTime);
    List<GroupForm> findByApplicationFormID(long applicationFormID);
    
}
