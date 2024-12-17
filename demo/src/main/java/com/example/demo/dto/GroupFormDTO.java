package com.example.demo.dto;

import com.example.demo.enums.City;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class GroupFormDTO {
    private String chaperoneName;
    private String chaperoneRole;
    private City city;
    private String comments;
    private String date;
    private String email;
    private String highSchoolName;
    private String numberOfAttendees;
    private String phoneNumber;
    private boolean termsAccepted;
    private String timeSlot;
}
