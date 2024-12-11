package com.example.demo.requests;

import java.time.LocalDate;

import com.example.demo.enums.TourHours;

import lombok.Data;

@Data
public class ApplicationFormRequest {
    private String highschoolName;
    private String email;
    private String phoneNo;
    private String city;
    private LocalDate date;
    private TourHours tourHours;
    private String chaperoneName;
    private String chaperoneRole;
    private int numberOfAttendees;
    private String comment; 
}
