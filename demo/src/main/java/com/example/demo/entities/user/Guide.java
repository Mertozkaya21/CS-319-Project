package com.example.demo.entities.user;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.event.Fair;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.payment.Payment;
import com.example.demo.enums.TourHours;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyEnumerated;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Guide")
public class Guide extends User{

    public Guide(UserDTO userDTO){
        super();
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.phoneNo = userDTO.getPhoneNo();
        this.imagePath = userDTO.getImagePath();
        this.tourParticipantSurveyRanking = 0;
        this.latestAcitivites = new ArrayList<Long>();
        this.notifications = new ArrayList<Long>();
        this.dateAdded = LocalDate.now();
        Payment newPayment = new Payment();
        newPayment.setAmount(0);
        newPayment.setReceiptFullName(userDTO.getFirstName() + " " + userDTO.getLastName());
        this.payment = newPayment;
    }

    @ElementCollection
    @CollectionTable(name = "guide_available_times", joinColumns = @JoinColumn(name = "guide_id"))
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "tour_hours")
    private Map<DayOfWeek, List<TourHours>> availableTimes;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id")
    private Payment payment;
    
    // Relationship with Tour
    @ManyToMany
    @JoinTable(
        name = "guide_tour",
        joinColumns = @JoinColumn(name = "guide_id"),
        inverseJoinColumns = @JoinColumn(name = "tour_id")
    )
    private List<Tour> tours;

    // Relationship with Fair
    @ManyToMany
    @JoinTable(
        name = "guide_fair",
        joinColumns = @JoinColumn(name = "guide_id"),
        inverseJoinColumns = @JoinColumn(name = "fair_id")
    )
    private List<Fair> fairs;

    private double tourParticipantSurveyRanking;
    
    @ManyToOne
    @JoinColumn(name = "coordinator_id") 
    private Coordinator coordinator;
}
