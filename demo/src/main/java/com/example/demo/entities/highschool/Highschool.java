package com.example.demo.entities.highschool;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.entities.event.Tour;
import com.example.demo.entities.event.TourParticipantSurvey;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "Highschool")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Highschool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private double priorityScore;

    @Column(nullable = false)
    private LocalDate dateUpDated;

    @OneToMany(mappedBy = "highschool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Counselor> counselors;

    @OneToMany(mappedBy = "highschool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourParticipantSurvey> surveys;
    
    @OneToMany(mappedBy = "visitorSchool", cascade = CascadeType.ALL, orphanRemoval = true) 
    private List<Tour> groupTours;
}
