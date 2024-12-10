package com.example.demo.entities.form;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.entities.highschool.Highschool;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.enums.ApplicationFormStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    private LocalDate submitTime;
    
    @Column(columnDefinition = "text")
    private String notes;

    @Enumerated
    @Column(name = "Status")
    private ApplicationFormStatus status;

    @Column(nullable = true)
    private String applicantName;
    @Column(nullable = true)
    private String applicantPhone;
    @Column(nullable = true)
    private String applicantEmail;

    @Column(nullable = false)
    private int numberOfParticipants;

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
