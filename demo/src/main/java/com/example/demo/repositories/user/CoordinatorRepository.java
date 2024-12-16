package com.example.demo.repositories.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.user.Coordinator;
import java.util.List;


@Repository
public interface CoordinatorRepository extends JpaRepository<Coordinator, Long>{
    
    Coordinator findById(long id);
    List<Coordinator> findByEmail(String email);
    List<Coordinator> findByPassword(String password);
}
