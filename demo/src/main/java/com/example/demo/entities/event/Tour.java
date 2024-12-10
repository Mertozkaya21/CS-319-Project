package com.example.demo.entities.event;

import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.Trainee;
import com.example.demo.enums.TourHours;
import com.example.demo.enums.TourType;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Tour")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Tour extends Event {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TourType tourType; // Enum to differentiate between GROUP and INDIVIDUAL tours

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TourHours tourHours;

    @ManyToOne
    @JoinColumn(name = "advisorID", nullable = false)
    private Advisor advisor;

    @ManyToOne
    @JoinColumn(name = "visitorSchoolID", nullable = true)
    private Highschool visitorSchool; 

    @ElementCollection
    @CollectionTable(name = "DepartmentInterest", joinColumns = @JoinColumn(name = "tourID"))
    @Column(name = "departmentID")
    private List<Integer> idsOfDepartmentsOfInterest; 

    @ManyToMany
    @JoinTable(
        name = "trainee_tour",
        joinColumns = @JoinColumn(name = "tour_id"),
        inverseJoinColumns = @JoinColumn(name = "trainee_id")
    )
    private List<Trainee> trainees;

    @OneToMany(mappedBy = "tour", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<TourParticipantSurvey> tourParticipantSurveys;

    private int qAroomID;

    @Column(nullable = false)
    private int noOfGuests;

    @ManyToMany
    @JoinTable(
        name = "guide_tour",
        joinColumns = @JoinColumn(name = "tour_id"),
        inverseJoinColumns = @JoinColumn(name = "guide_id")
    )
    private List<Guide> guides;

}