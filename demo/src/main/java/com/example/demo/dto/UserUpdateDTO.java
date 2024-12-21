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
    private String undertakenDay;
    private String advisorId; //
    private String status; //bu ikisinin ismi aynı kalsın
}
