package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.event.Fair;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import com.example.demo.entities.user.Guide;
import com.example.demo.enums.EventStatus;

@Repository
public interface FairRepository extends JpaRepository<Fair, Long>{

    Optional<Fair> findByNameIgnoreCase(String name);
    List<Fair> findByDate(LocalDate date);
    List<Fair> findByGuides(List<Guide> guides);
    List<Fair> findByStatus(EventStatus status);
    List<Fair> findByCity(String city);
    List<Fair> findByDateBetween(LocalDate startDate, LocalDate endDate);
    

    @Query(value = "SELECT MONTH(date) AS month, COUNT(*) AS count " +
    "FROM Tour " +
    "WHERE status = :status " +
    "GROUP BY MONTH(date)", 
    nativeQuery = true)
    List<Object[]> countEventsByMonthAndStatus(@Param("status") EventStatus status);

}
