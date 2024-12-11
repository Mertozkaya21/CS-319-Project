package com.example.demo.enums;

public enum TourHours {
    NINE,
    ELEVEN,
    THIRTEEN,
    FOUR;

    public static TourHours fromString(String hour) {
        switch (hour) {
            case "09:00":
                return NINE;
            case "11:00":
                return ELEVEN;
            case "13:30":
                return THIRTEEN;
            case "16:00":
                return FOUR;
            default:
                throw new IllegalArgumentException("Invalid hour: " + hour);
        }
    }
    
}
