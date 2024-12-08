package com.example.demo.entities.form;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.entities.event.PreferredVisitTime;
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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "ApplicationForm")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ApplicationForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long applicationFormID;

    @Column(nullable = false)
    private LocalDate submitTime;
    
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
    @JoinColumn(name = "advisor_id") // Matches the 'mappedBy' in Advisor
    private Advisor advisor;

    @ManyToOne
    @JoinColumn(name = "coordinator_id") // Matches the 'mappedBy' in Coordinator
    private Coordinator coordinator;
}
