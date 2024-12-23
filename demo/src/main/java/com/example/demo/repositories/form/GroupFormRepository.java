package com.example.demo.repositories.form;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
    List<GroupForm> findByHighschoolId(long highschoolID);


    @Query("SELECT gf FROM GroupForm gf WHERE gf.eventDate = :eventDate AND gf.highschool.name = :highschoolName")
    List<GroupForm> findByEventDateAndHighschoolName(@Param("eventDate") LocalDate eventDate, @Param("highschoolName") String highschoolName);
}
