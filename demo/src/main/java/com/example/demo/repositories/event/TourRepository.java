package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.event.Tour;
import com.example.demo.entities.form.GroupForm;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import com.example.demo.enums.EventStatus;
import com.example.demo.enums.TourHours;
import com.example.demo.enums.TourType;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Guide;



@Repository
public interface TourRepository extends JpaRepository<Tour, Long>{
    List<Tour> findByDate(LocalDate date);
    List<Tour> findByGuides(Guide guide);
    List<Tour> findByStatus(EventStatus status);
    List<Tour> findByTourHours(TourHours tourHours);
    List<Tour> findByTourType(TourType tourType);
    List<Tour> findByVisitorSchool(Highschool visitorSchool);
    List<Tour> findByDateAndTourHours(LocalDate date, TourHours hours);
    Optional<Tour> findById(Long id);
    <S extends GroupForm> S save(S groupForm);


    @Query(value = "SELECT MONTH(date) AS month, COUNT(*) AS count " +
    "FROM Tour " +
    "WHERE status = :status " +
    "GROUP BY MONTH(date)", 
    nativeQuery = true)
    List<Object[]> countEventsByMonthAndStatus(@Param("status") EventStatus status);

}
