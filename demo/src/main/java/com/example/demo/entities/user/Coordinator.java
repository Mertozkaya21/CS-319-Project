package com.example.demo.entities.user;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.payment.Payment;
import com.example.demo.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Entity
@Table(name = "Coordinator")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Coordinator extends User { 

    public Coordinator(UserDTO userDTO){
        super();
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.phoneNo = userDTO.getPhoneNo();
        this.role = UserRole.COORDINATOR;
        if (userDTO.getImage() != null && !userDTO.getImage().isEmpty()) {
            byte[] imageData = Base64.getDecoder().decode(userDTO.getImage());
            this.setImage(imageData);
        }
        this.latestAcitivites = new ArrayList<Long>();
        this.notifications = new ArrayList<Long>();
        this.guides = new ArrayList<Guide>();
        this.trainees = new ArrayList<Trainee>();
        this.dateAdded = LocalDate.now();
        Payment newPayment = new Payment();
        newPayment.setAmount(0);
        newPayment.setReceiptFullName(userDTO.getFirstName() + " " + userDTO.getLastName());
        this.payment = newPayment;
    }

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore // Prevent recursion
    private List<Guide> guides;

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore // Prevent recursion
    private List<Trainee> trainees;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "payment_id")
    @JsonIgnore 
    private Payment payment;

    @JsonGetter("guideIds")
    public List<Long> getGuideIds() {
        return guides != null ? guides.stream().map(Guide::getId).toList() : null;
    }

    @JsonGetter("traineeIds")
    public List<Long> getTraineeIds() {
        return trainees != null ? trainees.stream().map(Trainee::getId).toList() : null;
    }
}
