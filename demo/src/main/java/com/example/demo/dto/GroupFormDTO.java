package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class GroupFormDTO {
    private String chaperoneName;
    private String chaperoneRole;
    private String city;
    private String comments;
    private String date;
    private String email;
    private Long highSchoolId;
    private String numberOfAttendees;
    private String phoneNumber;
    private boolean termsAccepted;
    private String timeSlot;
}
