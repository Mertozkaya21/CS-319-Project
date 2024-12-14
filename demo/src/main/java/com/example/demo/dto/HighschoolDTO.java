package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HighschoolDTO {
    private String name;
    private String city;
    private String counselorName;
    private String counselorEmail;
    private String counselorPhoneNo;
    private double lgsPercentile;
}