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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Coordinator")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Coordinator extends User { //Singleton Pattern

    private static Coordinator instance;

    private Coordinator(UserDTO userDTO){
        super();
        this.firstName = userDTO.getFirstName();
        this.lastName = userDTO.getLastName();
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.phoneNo = userDTO.getPhoneNo();
        this.imagePath = userDTO.getImagePath();
        this.latestAcitivites = new ArrayList<Long>();
        this.notifications = new ArrayList<Long>();
        this.guides = new ArrayList<Guide>();
        this.trainees = new ArrayList<Trainee>();
        this.applicationForms = new ArrayList<ApplicationForm>();
        this.dateAdded = LocalDate.now();
        Payment newPayment = new Payment();
        newPayment.setAmount(0);
        newPayment.setReceiptFullName(userDTO.getFirstName() + " " + userDTO.getLastName());
        this.payment = newPayment;
    }

    public static synchronized Coordinator getInstance(UserDTO userDTO) {
        if (instance == null) {
            instance = new Coordinator(userDTO);
        }
        else{
            instance.setFirstName(userDTO.getFirstName());
            instance.setLastName(userDTO.getLastName());
            instance.setEmail(userDTO.getEmail());
            instance.setPassword(userDTO.getPassword());
            instance.setPhoneNo(userDTO.getPhoneNo());
            instance.setImagePath(userDTO.getImagePath());
        }
        return instance;
    }

    public static synchronized Coordinator getInstance() {
        return instance;
    }

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore // Prevent recursion
    private List<Guide> guides;

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore // Prevent recursion
    private List<Trainee> trainees;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id")
    @JsonIgnore // Prevent recursion
    private Payment payment;

    @OneToMany(mappedBy = "coordinator", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore // Prevent recursion
    private List<ApplicationForm> applicationForms;


    @JsonGetter("guideIds")
    public List<Long> getGuideIds() {
        return guides != null ? guides.stream().map(Guide::getId).toList() : null;
    }

    @JsonGetter("traineeIds")
    public List<Long> getTraineeIds() {
        return trainees != null ? trainees.stream().map(Trainee::getId).toList() : null;
    }

    @JsonGetter("applicationFormIds")
    public List<Long> getApplicationFormIds() {
        return applicationForms != null ? applicationForms.stream().map(ApplicationForm::getApplicationFormID).toList() : null;
    }
}
