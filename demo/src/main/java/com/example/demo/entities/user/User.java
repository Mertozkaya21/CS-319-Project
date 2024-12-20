package com.example.demo.entities.user;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.*;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    protected String firstName;

    @Column(nullable = false)
    protected String lastName;

    @Column(nullable = false)
    protected String email;

    @Column(nullable = false)
    protected String password;

    @Column(nullable = false)
    protected String phoneNo;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, columnDefinition = "DATE")
    protected LocalDate dateAdded;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    protected UserRole role;

    @Lob
    @Column(name = "image", nullable = true) 
    private byte[] image; 
    
    protected List<Long> latestAcitivites; // Contains ID's of latest Activities
    protected List<Long> notifications;
    
}
