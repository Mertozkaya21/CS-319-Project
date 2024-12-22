package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateApplicationFormStatusDTO {
    private Map<Long, String> statuses;

    public Map<Long, String> getStatuses() {
        return statuses;
    }

    public void setStatuses(Map<Long, String> statuses) {
        this.statuses = statuses;
    }
}
