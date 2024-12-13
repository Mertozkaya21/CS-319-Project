package com.example.demo.entities.user;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.payment.Payment;
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

    public Advisor(UserDTO userDTO){
        super();
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.phoneNo = userDTO.getPhoneNo();
        this.imagePath = userDTO.getImagePath();
        this.latestAcitivites = new ArrayList<Long>();
        this.notifications = new ArrayList<Long>();
        this.dateAdded = LocalDate.now();
        Payment newPayment = new Payment();
        newPayment.setAmount(0);
        newPayment.setReceiptFullName(userDTO.getFirstName() + " " + userDTO.getLastName());
        this.payment = newPayment;
    }

    @ElementCollection
    @CollectionTable(name = "advisor_undertaken_days", joinColumns = @JoinColumn(name = "advisor_id"))
    @Enumerated(EnumType.STRING)
    private List<DayOfWeek> undertakenDays;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @OneToMany(mappedBy = "advisor", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<ApplicationForm> applicationForms;

    @JsonGetter("applicationFormIds")
    public List<Long> getApplicationFormIds() {
        return applicationForms != null ? applicationForms.stream().map(ApplicationForm::getApplicationFormID).toList() : null;
    }
}
