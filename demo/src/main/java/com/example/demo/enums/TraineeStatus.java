package com.example.demo.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TraineeStatus {
    OBSERVATION_TOURS("Observation Tours"),
    PRACTICE_TOURS("Practice Tours"),
    TRIAL_TOURS("Trial Tours"),
    COMPLETED_TOURS("Completed Tours");

    private final String displayName;

    TraineeStatus(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static TraineeStatus fromString(String value) {
        for (TraineeStatus status : TraineeStatus.values()) {
            if (status.name().equalsIgnoreCase(value) || status.getDisplayName().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No enum constant for value: " + value);
    }
}
