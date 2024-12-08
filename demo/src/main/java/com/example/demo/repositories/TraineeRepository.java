package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.Trainee;

public interface TraineeRepository extends JpaRepository<Trainee, Long>{
    
}
