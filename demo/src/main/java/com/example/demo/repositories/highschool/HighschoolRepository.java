package com.example.demo.repositories.highschool;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.highschool.Highschool;

public interface HighschoolRepository extends JpaRepository<Highschool, Long>{
    
}
