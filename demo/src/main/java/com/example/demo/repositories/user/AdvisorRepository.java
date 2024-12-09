package com.example.demo.repositories.user;

import com.example.demo.entities.user.Advisor;
import com.example.demo.enums.Days;

import java.util.List;


public interface  AdvisorRepository extends UserRepository<Advisor>{
    
    List<Advisor> findByName(String name);

    List<Advisor> findByDateAdded(Days dateAdded);
}
