package com.example.demo.entities.form;

import java.time.LocalDate;

import com.example.demo.dto.IndividualFormDTO;
import com.example.demo.enums.TourHours;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "IndividualForm")
public class IndividualForm extends ApplicationForm{

    public IndividualForm(IndividualFormDTO individualFormDto){
        super();
        this.setCity(individualFormDto.getCity());
        this.setComments(individualFormDto.getComments());
        this.setEventDate(LocalDate.parse(individualFormDto.getDate()));
        this.setEmail(individualFormDto.getEmail());
        this.setPhoneNumber(individualFormDto.getPhoneNumber());
        this.setNumberOfAttendees(Integer.parseInt(individualFormDto.getNumberOfAttendees()));
        this.setTourHour(TourHours.fromString(individualFormDto.getTimeSlot()));
        this.setDepartmentOfInterest(individualFormDto.getDepartmentOfInterest());
        this.setIndividualName(individualFormDto.getIndividualName());
        this.setSubmitTimeDate(LocalDate.now());
    }

    @Column(nullable = true) 
    private String departmentOfInterest;

    @Column(nullable = true)
    private String individualName;
}
