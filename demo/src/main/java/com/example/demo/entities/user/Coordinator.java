package com.example.demo.entities.user;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.payment.Payment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Coordinator")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Coordinator extends User {

    private static Coordinator instance;

    private Coordinator(UserDTO userDTO){
        super();
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.phoneNo = userDTO.getPhoneNo();
        this.imagePath = userDTO.getImagePath();
        this.latestAcitivites = new ArrayList();
        this.notifications = new ArrayList();
        this.guides = new ArrayList();
        this.trainees = new ArrayList();
        this.applicationFormIds = new ArrayList();
        this.dateAdded = LocalDate.now();
    }

    public static synchronized Coordinator getInstance(UserDTO userDTO) {
        if (instance == null) {
            instance = new Coordinator(userDTO);
        }
        return instance;
    }

    public static synchronized Coordinator getInstance() {
        return instance;
    }

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Guide> guides;

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Trainee> trainees;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    //@OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Long> applicationFormIds;
}
