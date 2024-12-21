package com.example.demo.entities.user;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.event.Fair;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.event.TourParticipantSurvey;
import com.example.demo.entities.payment.Payment;
import com.example.demo.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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
        this.imagePath = (userDTO.getImagePath());
        this.role = UserRole.GUIDE;
        this.averageRating = 0;
        this.latestAcitivites = new ArrayList<Long>();
        this.notifications = new ArrayList<Long>();
        this.dateAdded = LocalDate.now();
        Payment newPayment = new Payment();
        newPayment.setAmount(0);
        newPayment.setReceiptFullName(userDTO.getFirstName() + " " + userDTO.getLastName());
        this.payment = newPayment;
    }

    @Lob
    @Column(name = "schedule", nullable = true) 
    private byte[] schedule; 

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "payment_id")
    private Payment payment;
    
    @ManyToMany
    @JoinTable(
        name = "guide_tour",
        joinColumns = @JoinColumn(name = "guide_id"),
        inverseJoinColumns = @JoinColumn(name = "tour_id")
    )
    private List<Tour> tours;

    @ManyToMany
    @JoinTable(
        name = "guide_fair",
        joinColumns = @JoinColumn(name = "guide_id"),
        inverseJoinColumns = @JoinColumn(name = "fair_id")
    )
    private List<Fair> fairs;

    private double averageRating;

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TourParticipantSurvey> surveys = new ArrayList<>();

    public void updateAverageRating() {
        if (surveys.isEmpty()) {
            this.averageRating = 0.0;
        } else {
            this.averageRating = surveys.stream()
                .mapToDouble(TourParticipantSurvey::getGuideRate)
                .average()
                .orElse(0.0);
        }
    }
}
