package com.example.demo.repositories;

import com.example.demo.entities.user.Advisor;
import com.example.demo.enums.Days;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface  AdvisorRepository extends JpaRepository<Advisor, Long>{
    
    List<Advisor> findByName(String name);

    List<Advisor> findByDateAdded(Days dateAdded);
}
