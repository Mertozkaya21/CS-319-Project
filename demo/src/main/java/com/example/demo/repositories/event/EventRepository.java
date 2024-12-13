package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.event.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>{

}
