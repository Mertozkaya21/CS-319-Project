package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.event.Tour;
import java.util.List;
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

}