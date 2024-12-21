package com.example.demo.entities.user;

import com.example.demo.dto.TraineeDTO;
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

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "Advisor")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Advisor extends User {

    public Advisor(UserDTO userDTO, DayOfWeek undertakenDay){
        super();
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.phoneNo = userDTO.getPhoneNo();
        this.setImagePath(userDTO.getImagePath());
        this.latestAcitivites = new ArrayList<Long>();
        this.undertakenDay = undertakenDay;
        this.role = UserRole.ADVISOR;
        this.notifications = new ArrayList<Long>();
        this.dateAdded = LocalDate.now();
        Payment newPayment = new Payment();
        newPayment.setAmount(0);
        newPayment.setReceiptFullName(userDTO.getFirstName() + " " + userDTO.getLastName());
        this.payment = newPayment;
    }

    @OneToMany(mappedBy = "advisor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Trainee> trainees = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "undertaken_day", nullable = false)
    private DayOfWeek undertakenDay;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @JsonGetter("trainees")
    public List<TraineeDTO> getTraineesDetails() {
        return trainees != null ? 
            trainees.stream()
                    .map(trainee -> new TraineeDTO(
                            trainee.getId(),
                            trainee.getFirstName(),
                            trainee.getLastName(),
                            trainee.getEmail(),
                            trainee.getPhoneNo()))
                    .toList() : 
            new ArrayList<>();
    }

    
}
