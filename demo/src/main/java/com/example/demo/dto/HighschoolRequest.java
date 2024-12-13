package com.example.demo.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class HighschoolRequest { //bu nerde kullanılıyo
    private String name;
    private String city;
    private double priorityScore;
    private LocalDate dateUpdated;
}
