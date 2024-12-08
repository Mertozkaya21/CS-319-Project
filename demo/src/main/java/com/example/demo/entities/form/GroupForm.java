package com.example.demo.entities.form;

import com.example.demo.entities.highschool.Counselor;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GroupForm extends ApplicationForm{

    private int noOfParticipants;
    
    @ManyToOne
    @JoinColumn(name = "counselorID", nullable = false)
    private Counselor counselor;

    private String chaperoneRole;
}
