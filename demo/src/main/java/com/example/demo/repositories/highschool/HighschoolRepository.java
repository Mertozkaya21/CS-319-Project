package com.example.demo.repositories.highschool;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.highschool.Highschool;
import java.util.List;



@Repository
public interface HighschoolRepository extends JpaRepository<Highschool, Long>{
    Highschool findByName(String name);
    
}
