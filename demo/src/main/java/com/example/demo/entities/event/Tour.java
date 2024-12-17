package com.example.demo.entities.event;

import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.Trainee;
import com.example.demo.enums.Department;
import com.example.demo.enums.TourHours;
import com.example.demo.enums.TourType;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advisorID", nullable = false)
    @JsonIgnore
    private Advisor advisor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visitorSchoolID", nullable = true)
    @JsonIgnore
    private Highschool visitorSchool;

    @ElementCollection(targetClass = Department.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "DepartmentInterest", joinColumns = @JoinColumn(name = "tourID"))
    @Column(name = "departmentName")
    private List<Department> departmentsOfInterest;

    @ManyToMany
    @JoinTable(
        name = "trainee_tour",
        joinColumns = @JoinColumn(name = "tour_id"),
        inverseJoinColumns = @JoinColumn(name = "trainee_id")
    )
    @JsonIgnore
    private List<Trainee> trainees;

    @OneToMany(mappedBy = "tour", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
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
    @JsonIgnore
    private List<Guide> guides;

    // Custom JSON Getters to expose only IDs
    @JsonGetter("advisorId")
    public Long getAdvisorId() {
        return advisor != null ? advisor.getId() : null;
    }

    @JsonGetter("visitorSchoolId")
    public Long getVisitorSchoolId() {
        return visitorSchool != null ? visitorSchool.getId() : null;
    }

    @JsonGetter("guideIds")
    public List<Long> getGuideIds() {
        return guides != null ? guides.stream().map(Guide::getId).toList() : null;
    }

    @JsonGetter("traineeIds")
    public List<Long> getTraineeIds() {
        return trainees != null ? trainees.stream().map(Trainee::getId).toList() : null;
    }

    @JsonGetter("tourParticipantSurveyIds")
    public List<Long> getTourParticipantSurveyIds() {
        return tourParticipantSurveys != null ? tourParticipantSurveys.stream().map(TourParticipantSurvey::getTourSurveyID).toList() : null;
    }

    @JsonGetter("departmentsOfInterest")
    public List<String> getDepartmentsOfInterest() {
        return departmentsOfInterest != null ? departmentsOfInterest.stream().map(Enum::name).toList() : null;
    }

    public void setDepartmentsOfInterest(List<String> departmentNames) {
        if (departmentNames != null) {
            this.departmentsOfInterest = departmentNames.stream()
                    .map(String::toUpperCase)
                    .map(Department::valueOf)
                    .toList();
        } else {
            this.departmentsOfInterest = null;
        }
    }
}
