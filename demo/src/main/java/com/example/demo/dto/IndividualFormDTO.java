package com.example.demo.dto;

import com.example.demo.enums.City;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class IndividualFormDTO {
    private City city;
    private String comments;
    private String date;
    private String departmentOfInterest;
    private String email;
    private String individualName;
    private String numberOfAttendees;
    private String phoneNumber;
    private boolean termsAccepted;
    private String timeSlot;
}
