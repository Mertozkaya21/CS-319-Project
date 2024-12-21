package com.example.demo.enums;

public enum TourHours {
    NINE,
    ELEVEN,
    THIRTEEN,
    FOUR;

    public static TourHours fromString(String hour) {
        switch (hour) {
            case "09:00", "NINE":
                return NINE;
            case "11:00", "ELEVEN":
                return ELEVEN;
            case "13:30","THIRTEEN":
                return THIRTEEN;
            case "16:00","FOUR":
                return FOUR;
            default:
                throw new IllegalArgumentException("Invalid hour: " + hour);
        }
    }
    
}
