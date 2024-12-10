package com.example.demo.entities.form;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "IndividualForm")
public class IndividualForm extends ApplicationForm{

    @Column(nullable = true) 
    private String departmentOfInterest;

    @Column(nullable = false)
    private String individualName;
}
