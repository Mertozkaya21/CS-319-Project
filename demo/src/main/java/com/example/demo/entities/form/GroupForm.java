package com.example.demo.entities.form;


import java.time.LocalDate;

import com.example.demo.dto.GroupFormDTO;
import com.example.demo.entities.highschool.Counselor;
import com.example.demo.enums.TourHours;

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
        this.setTourHour(TourHours.valueOf(groupFormDTO.getTimeSlot()));
        this.setEventDate(LocalDate.parse(groupFormDTO.getDate()));
        this.setComments(groupFormDTO.getComments());
        this.setChaperoneName(groupFormDTO.getChaperoneName());
        this.setChaperoneRole(groupFormDTO.getChaperoneRole());
        this.setPhoneNumber(groupFormDTO.getPhoneNumber());
        this.setEmail(groupFormDTO.getEmail());
        this.setCity(groupFormDTO.getCity());
        this.setNumberOfAttendees(Integer.parseInt(groupFormDTO.getNumberOfAttendees()));
    }

    @ManyToOne
    @JoinColumn(name = "counselorID", nullable = false)
    private Counselor counselor;
}
