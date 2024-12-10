package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.event.Event;
import java.util.List;
import java.time.LocalDate;
import com.example.demo.enums.EventStatus;

public interface EventRepository extends JpaRepository<Event, Long>{

    List<Event> findByDate(LocalDate date);
    List<Event> findByStatus(EventStatus status);
}
