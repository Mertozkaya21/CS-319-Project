package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.event.PreferredVisitTime;

public interface PreferredVisitTimeRepository extends JpaRepository<PreferredVisitTime, Long>{

}
