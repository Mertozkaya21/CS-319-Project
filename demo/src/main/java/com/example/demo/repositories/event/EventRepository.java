package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.event.Event;

public interface EventRepository<T extends Event> extends JpaRepository<T, Long>{

}
