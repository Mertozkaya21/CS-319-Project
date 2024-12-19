package com.example.demo.entities.form;

import java.time.LocalDate;

import com.example.demo.enums.ApplicationFormStatus;
import com.example.demo.enums.City;
import com.example.demo.enums.TourHours;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "Applicationform")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationForm {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long applicationFormID;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate submitTimeDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TourHours tourHour;

    @Column(nullable = false)
    private LocalDate eventDate;
    
    @Column(columnDefinition = "text")
    private String comments;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private ApplicationFormStatus status = ApplicationFormStatus.PENDING;

    @Column(nullable = true)
    private String chaperoneName;
    @Column(nullable = true)
    private String chaperoneRole;
    @Column(nullable = true)
    private String phoneNumber;
    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private City city;

    @Column(nullable = true)
    private int numberOfAttendees;

    private double priorityScore;
}
