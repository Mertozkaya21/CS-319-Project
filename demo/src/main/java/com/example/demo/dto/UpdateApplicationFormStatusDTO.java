package com.example.demo.dto;

import com.example.demo.enums.ApplicationFormStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateApplicationFormStatusDTO {
    private List<Long> ids; 
    private ApplicationFormStatus status; 
}
