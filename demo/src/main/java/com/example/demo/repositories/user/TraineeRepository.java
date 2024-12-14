package com.example.demo.repositories.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.user.Trainee;
import java.util.List;
import com.example.demo.enums.TraineeStatus;

@Repository
public interface TraineeRepository extends JpaRepository<Trainee, Long>{
    
    List<Trainee> findByStatus(TraineeStatus status);
    List<Trainee> findByEmail(String email);
    List<Trainee> findByPassword(String password);
}