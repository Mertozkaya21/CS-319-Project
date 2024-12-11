package com.example.demo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class HighschoolRequest {
    private String name;
    private String city;
    private double priorityScore;
    private LocalDate dateUpdated;
}
