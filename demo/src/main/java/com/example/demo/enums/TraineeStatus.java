package com.example.demo.enums;

public enum TraineeStatus {
    OBSERVATION_TOURS("Observation Tours"),
    PRACTICE_TOURS("Practice Tours"),
    TRIAL_TOURS("Trial Tours"),
    COMPLETED_TOURS("Completed Tours");

    private final String value;

    // Constructor
    TraineeStatus(String value) {
        this.value = value;
    }

    // Getter method for the value
    public String getValue() {
        return value;
    }
}
