package com.example.demo.entities.form;

import java.time.LocalDate;

import com.example.demo.enums.TourHours;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PreferredVisitTime")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PreferredVisitTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private LocalDate day;

    @Enumerated
    @Column(nullable = false)
    private TourHours tourHour;

    @ManyToOne
    @JoinColumn(name = "application_form_id", nullable = false) // This establishes the foreign key
    private ApplicationForm applicationForm;   
}
