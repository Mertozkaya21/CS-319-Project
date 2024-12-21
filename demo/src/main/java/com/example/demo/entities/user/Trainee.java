package com.example.demo.entities.user;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
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
import jakarta.persistence.FetchType;
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
        if (userDTO.getImage() != null && !userDTO.getImage().isEmpty()) {
            byte[] imageData = Base64.getDecoder().decode(userDTO.getImage());
            this.setImage(imageData);
        }
        this.role = UserRole.TRAINEE;
        this.eligibleForPromotion = false;
        this.latestAcitivites = new ArrayList<Long>();
        this.notifications = new ArrayList<Long>();
        this.dateAdded = LocalDate.now();
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "advisor_id")
    private Advisor advisor;


    @ManyToMany
    @JoinTable(
        name = "trainee_tour",
        joinColumns = @JoinColumn(name = "trainee_id"),
        inverseJoinColumns = @JoinColumn(name = "tour_id")
    )
    @JsonIgnore 
    private List<Tour> tours;

    @Column(nullable = false)
    private boolean eligibleForPromotion = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TraineeStatus status = TraineeStatus.OBSERVATION_TOURS;

    @JsonGetter("tourIds")
    public List<Long> getTourIds() {
        return tours != null ? tours.stream().map(Tour::getId).toList() : null;
    }

    @JsonGetter("advisorIds")
    public Long getAdvisorId() {
        return advisor != null ? advisor.getId() : null;
    }

    /*@JsonGetter("coordinatorId")
    public Long getCoordinatorId() {
        return coordinator != null ? coordinator.getId() : null;
    }*/
    
    public void setStatus(TraineeStatus newStatus){
        this.status = newStatus;
        if(status == TraineeStatus.COMPLETED_TOURS){
            this.eligibleForPromotion = true;
        }
    }
}
