package com.example.demo.entities.user;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.enums.TraineeStatus;

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
        this.latestAcitivites = new ArrayList();
        this.notifications = new ArrayList();
        this.dateAdded = LocalDate.now();
    }

    @ManyToMany
    @JoinTable(
            name = "trainee_tour",
            joinColumns = @JoinColumn(name = "trainee_id"),
            inverseJoinColumns = @JoinColumn(name = "tour_id")
    )
    private List<Tour> tours;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TraineeStatus status;
    
    @ManyToOne
    @JoinColumn(name = "coordinator_id") 
    private Coordinator coordinator;
}
