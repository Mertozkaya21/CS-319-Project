package com.example.demo.repositories.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.Coordinator;
import java.util.List;


public interface CoordinatorRepository extends JpaRepository<Coordinator, Long>{
    
    List<Coordinator> findById(long id);
    List<Coordinator> findByEmail(String email);
    List<Coordinator> findByPassword(String password);
}
