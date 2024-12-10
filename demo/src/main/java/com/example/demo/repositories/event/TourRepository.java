package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.event.Tour;

public interface TourRepository extends JpaRepository<Tour, Long>{

}
