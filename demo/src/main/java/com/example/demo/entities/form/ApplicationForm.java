package com.example.demo.entities.form;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.enums.ApplicationFormStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class ApplicationForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long applicationFormID;

    @Column(nullable = false)
    private LocalDate submitTime;
    
    @Column(columnDefinition = "text")
    private String notes;

    @Enumerated
    @Column(name = "Status")
    private ApplicationFormStatus status;

    @Column(nullable = false)
    private String applicantName;
    @Column(nullable = false)
    private String applicantPhone;
    @Column(nullable = false)
    private String applicantEmail;

    @OneToMany(mappedBy = "applicationForm", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PreferredVisitTime> preferredVisitTimes;

    @ManyToOne
    @JoinColumn(name = "highschoolID", nullable = false)
    private Highschool highschool;

    @ManyToOne
    @JoinColumn(name = "advisor_id") 
    private Advisor advisor;

    @ManyToOne
    @JoinColumn(name = "coordinator_id")
    private Coordinator coordinator;
}
