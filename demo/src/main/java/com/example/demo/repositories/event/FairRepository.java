package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.event.Fair;
import java.util.List;
import java.time.LocalDate;
import com.example.demo.entities.user.Guide;
import com.example.demo.enums.EventStatus;

@Repository
public interface FairRepository extends JpaRepository<Fair, Long>{

    List<Fair> findByDate(LocalDate date);
    List<Fair> findByGuides(List<Guide> guides);
    List<Fair> findByStatus(EventStatus status);
    List<Fair> findByCity(String city);
    
}
