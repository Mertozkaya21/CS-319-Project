package com.example.demo.repositories.user;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.Trainee;
import java.util.List;
import com.example.demo.enums.TraineeStatus;


public interface TraineeRepository extends JpaRepository<Trainee, Long>{
    
    List<Trainee> findByStatus(TraineeStatus status);
}
