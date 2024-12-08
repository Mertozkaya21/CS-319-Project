package com.example.demo.entities.user;

import java.util.List;

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
