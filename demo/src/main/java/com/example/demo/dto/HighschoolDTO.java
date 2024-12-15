package com.example.demo.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HighschoolDTO {
    private Long id; 
    private String name; 
    private String city; 
    private String counselorName; 
    private String counselorEmail; 
    private String counselorPhoneNo; 
    private double priority; 
    private double lgsPercentile;
    private LocalDate dateUpdated; 
}
