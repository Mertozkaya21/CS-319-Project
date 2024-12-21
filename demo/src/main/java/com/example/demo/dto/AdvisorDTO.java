package com.example.demo.dto;

import java.time.DayOfWeek;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdvisorDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNo;
    private DayOfWeek undertakenDay;
}

