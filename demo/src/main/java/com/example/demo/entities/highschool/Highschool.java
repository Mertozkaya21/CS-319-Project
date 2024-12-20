package com.example.demo.entities.highschool;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.dto.HighschoolDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.event.TourParticipantSurvey;
import com.example.demo.enums.City;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
        this.lgsPercentile = highschoolDTO.getLgsPercentile();

        if (highschoolDTO.getCounselorName() != null) {
            Counselor counselor = new Counselor();
            counselor.setCounselorName(highschoolDTO.getCounselorName());
            counselor.setEmail(highschoolDTO.getCounselorEmail());
            counselor.setPhone(highschoolDTO.getCounselorPhoneNo());
            this.counselor = counselor;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private City city;

    @Column(nullable = true)
    private double lgsPercentile;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate dateUpDated;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "counselor_id", nullable = false) 
    private Counselor counselor;

    @OneToMany(mappedBy = "highschool", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<TourParticipantSurvey> surveys;

    @OneToMany(mappedBy = "visitorSchool", cascade = CascadeType.ALL, orphanRemoval = true) 
    @JsonIgnore
    private List<Tour> groupTours;

    @JsonGetter("counselorId")
    public Long getCounselorId() {
        return counselor != null ? counselor.getId() : null;
    }

    @JsonGetter("counselorName")
    public String getCounselorName() {
        return counselor != null ? counselor.getCounselorName() : null;
    }

    @JsonGetter("counselorPhoneNo")
    public String getCounselorPhoneNo() {
        return counselor != null ? counselor.getPhone() : null;
    }

    @JsonGetter("counselorEmail")
    public String getCounselorEmail() {
        return counselor != null ? counselor.getEmail() : null;
    }

    @JsonGetter("groupTourIds")
    public List<Long> getGroupTourIds() {
        return groupTours != null ? groupTours.stream().map(Tour::getId).toList() : null;
    }
    
}
