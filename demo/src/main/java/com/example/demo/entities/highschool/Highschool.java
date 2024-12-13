package com.example.demo.entities.highschool;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.dto.HighschoolDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.event.TourParticipantSurvey;
import com.fasterxml.jackson.annotation.JsonGetter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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

    public Highschool(HighschoolDTO highschoolDTO) {
        this.name = highschoolDTO.getName();
        this.city = highschoolDTO.getCity();
        this.dateUpDated = LocalDate.now(); 
        this.priorityScore = 0.0;

        if (highschoolDTO.getCounselorName() != null) {
            this.counselor = new Counselor();
            this.counselor.setName(highschoolDTO.getCounselorName());
            this.counselor.setEmail(highschoolDTO.getCounselorEmail());
            this.counselor.setPhone(highschoolDTO.getCounselorPhoneNo());
            //this.counselor.setHighschool(this);
            //this.counselor.setGroupForms(new ArrayList<>());
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private double priorityScore;

    @Column(nullable = false)
    private LocalDate dateUpDated;
    

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "counselor_id", nullable = true) 
    private Counselor counselor;

    @OneToMany(mappedBy = "highschool", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<TourParticipantSurvey> surveys;

    @OneToMany(mappedBy = "visitorSchool", cascade = CascadeType.ALL, orphanRemoval = true) 
    private List<Tour> groupTours;

    @JsonGetter("counselorId")
    public Long getCounselorId() {
        return counselor != null ? counselor.getId() : null;
    }

    @JsonGetter("groupTourIds")
    public List<Long> getGroupTourIds() {
        return groupTours != null ? groupTours.stream().map(Tour::getId).toList() : null;
    }

}
