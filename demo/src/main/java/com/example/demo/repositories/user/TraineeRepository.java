package com.example.demo.repositories.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.Trainee;

public interface TraineeRepository extends JpaRepository<Trainee, Long>{
    
}
