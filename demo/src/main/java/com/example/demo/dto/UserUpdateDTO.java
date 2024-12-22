package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNo;
    private String password;
    private String undertakenDay;
    private Long advisorId; 
    private String status; 
}
