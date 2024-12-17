package com.example.demo.entities.Auth;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @Column(nullable = false)
    private String email; 

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate expiryDate;

    public PasswordResetToken(String token, String email) {
        this.token = token;
        this.email = email;
        this.expiryDate = Instant.now()
                             .plus(15, ChronoUnit.MINUTES)
                             .atZone(ZoneId.systemDefault()) 
                             .toLocalDate();
    }

    public boolean isExpired() {
        return LocalDate.now().isAfter(this.expiryDate);
    }
    
}

