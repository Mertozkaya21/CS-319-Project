package com.example.demo.entities.user;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.enums.TraineeStatus;
import com.example.demo.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Trainee")
public class Trainee extends User{
    
    public Trainee(UserDTO userDTO){
        super();
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.phoneNo = userDTO.getPhoneNo();
        this.imagePath = userDTO.getImagePath();
        this.role = UserRole.TRAINEE;
        this.eligibleForPromotion = false;
        this.latestAcitivites = new ArrayList<Long>();
        this.notifications = new ArrayList<Long>();
        this.dateAdded = LocalDate.now();
    }

    @ManyToMany
    @JoinTable(
        name = "trainee_tour",
        joinColumns = @JoinColumn(name = "trainee_id"),
        inverseJoinColumns = @JoinColumn(name = "tour_id")
    )
    @JsonIgnore 
    private List<Tour> tours;

    @Column(nullable = false)
    private boolean eligibleForPromotion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TraineeStatus status;

    @ManyToOne
    @JoinColumn(name = "coordinator_id")
    @JsonIgnore 
    private Coordinator coordinator;

    @ManyToOne
    @JoinColumn(name = "advisor_id") 
    @JsonIgnore
    private Advisor advisor; 

    @JsonGetter("tourIds")
    public List<Long> getTourIds() {
        return tours != null ? tours.stream().map(Tour::getId).toList() : null;
    }

    @JsonGetter("tourIds")
    public Long getAdvisorId() {
        return advisor != null ? advisor.getId() : null;
    }

    @JsonGetter("coordinatorId")
    public Long getCoordinatorId() {
        return coordinator != null ? coordinator.getId() : null;
    }
}
