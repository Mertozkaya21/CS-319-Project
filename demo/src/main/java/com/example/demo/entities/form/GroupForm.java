package com.example.demo.entities.form;


import com.example.demo.entities.highschool.Counselor;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "GroupForm")
public class GroupForm extends ApplicationForm{
    
    @ManyToOne
    @JoinColumn(name = "counselorID", nullable = false)
    private Counselor counselor;
}
