package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.enums.EventStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FairDTO {
    private long id;
    private String name;
    private String address;
    private String city;
    private String organizerName;
    private String organizerPhone;
    private String organizerEmail;
    private EventStatus status;
    private LocalDate date;
    private List<Long> guideIds; 
}
