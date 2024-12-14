package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

import com.example.demo.enums.EventStatus;
import com.example.demo.enums.TourHours;
import com.example.demo.enums.TourType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TourDTO {
    private long id;
    private EventStatus status;
    private LocalDate date;
    private TourType tourType;
    private TourHours tourHours;
    private Long advisorId; 
    private Long visitorSchoolId; 
    private List<Integer> idsOfDepartmentsOfInterest; 
    private int noOfGuests;
    private int qAroomID;
    private List<Long> guideIds; 
    private List<Long> traineeIds; 
    private List<Long> tourParticipantSurveyIds; 
}
