package com.example.demo.repositories.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.Guide;

public interface GuideRepository extends JpaRepository<Guide, Long>{
    
}
