package com.example.demo.repositories.user;

import com.example.demo.entities.user.Advisor;

import java.time.DayOfWeek;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface  AdvisorRepository extends JpaRepository<Advisor, Long>{
    
    List<Advisor> findByFirstName(String firstName);
    List<Advisor> findByLastName(String lastName);
    List<Advisor> findByEmail(String email);
    List<Advisor> findByDateAdded(DayOfWeek dateAdded);
    List<Advisor> findByPassword(String password);
    List<Advisor> findByUndertakenDay(DayOfWeek day);
}
