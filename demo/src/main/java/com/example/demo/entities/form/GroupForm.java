package com.example.demo.entities.form;


import java.time.LocalDate;

import com.example.demo.dto.GroupFormDTO;
import com.example.demo.entities.highschool.Counselor;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.enums.TourHours;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "GroupForm")
public class GroupForm extends ApplicationForm{
    
    public GroupForm(GroupFormDTO groupFormDTO){
        super();
        this.setTourHour(TourHours.fromString(groupFormDTO.getTimeSlot()));
        this.setEventDate(LocalDate.parse(groupFormDTO.getDate()));
        this.setComments(groupFormDTO.getComments());
        this.setChaperoneName(groupFormDTO.getChaperoneName());
        this.setChaperoneRole(groupFormDTO.getChaperoneRole());
        this.setPhoneNumber(groupFormDTO.getPhoneNumber());
        this.setEmail(groupFormDTO.getEmail());
        this.setCity(groupFormDTO.getCity());
        this.setNumberOfAttendees(Integer.parseInt(groupFormDTO.getNumberOfAttendees()));
        this.setSubmitTimeDate(LocalDate.now());
    }

    @ManyToOne
    @JoinColumn(name = "counselorID", nullable = false)
    @JsonIgnore
    private Counselor counselor;

    @ManyToOne
    @JoinColumn(name = "highschoolID", nullable = true)
    @JsonIgnore
    private Highschool highschool;

    @JsonProperty("highschoolId")
    public Long getHighschoolIdOnly() {
        return highschool != null ? highschool.getId() : null;
    }

    @JsonProperty("counselorId")
    public Long getCounselorId() {
        return counselor != null ? counselor.getId() : null;
    }
}
