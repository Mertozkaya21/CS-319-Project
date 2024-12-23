package com.example.demo.entities.event;

import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Guide;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "TourParticipantSurvey")
public class TourParticipantSurvey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tourSurveyID;

    
    private String feedbackMessage;

    @Column(nullable = false)
    private double guideRate;

    @Column(nullable = false)
    private double tourRate;

    @Column(nullable = false)
    private double universityRate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "highschool_id", referencedColumnName = "ID", nullable = false)
    @JsonIgnore 
    private Highschool highschool;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tour_id", referencedColumnName = "ID", nullable = false)
    @JsonIgnore 
    private Tour tour;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "guide_id", referencedColumnName = "ID", nullable = false)
    @JsonIgnore
    private Guide guide;

    @JsonGetter("highschoolId")
    public Long getHighschoolId() {
        return highschool != null ? highschool.getId() : null;
    }

    @JsonGetter("tourId")
    public Long getTourId() {
        return tour != null ? tour.getId() : null;
    }

    @JsonGetter("guideId")
    public Long getGuideId() {
        return guide != null ? guide.getId() : null;
    }
}
