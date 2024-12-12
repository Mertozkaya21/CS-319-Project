package com.example.demo.entities.user;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.payment.Payment;
import com.example.demo.enums.Days;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Advisor")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Advisor extends User {

    @ElementCollection
    @CollectionTable(name = "advisor_undertaken_days", joinColumns = @JoinColumn(name = "advisor_id"))
    @Enumerated(EnumType.STRING)
    private List<Days> undertakenDays;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @OneToMany(mappedBy = "advisor", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ApplicationForm> applicationForms;   
}
