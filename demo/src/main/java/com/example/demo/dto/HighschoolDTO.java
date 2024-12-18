package com.example.demo.dto;

import java.time.LocalDate;

import com.example.demo.enums.City;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HighschoolDTO {
    private String name; 
    private City city; 
    private String counselorName; 
    private String counselorEmail; 
    private String counselorPhoneNo; 
    private double lgsPercentile;
    private LocalDate dateUpdated; 
}