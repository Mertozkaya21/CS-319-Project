package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class IndividualFormDTO {
    private String city;
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
