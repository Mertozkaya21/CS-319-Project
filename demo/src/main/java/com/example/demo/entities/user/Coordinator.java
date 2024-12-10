package com.example.demo.entities.user;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.payment.Payment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Coordinator")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Coordinator extends User {

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Guide> guides;

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Trainee> trainees;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ApplicationForm> applicationForms;
}
