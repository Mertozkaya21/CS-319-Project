package com.example.demo.entities.event;

import java.time.LocalDate;

import com.example.demo.enums.EventStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "Event")
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long ID;

    @Column(nullable = false)
    private EventStatus status;

    @Column(nullable = false)
    private LocalDate date;
}
