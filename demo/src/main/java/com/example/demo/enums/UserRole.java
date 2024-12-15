package com.example.demo.enums;

public enum UserRole {
    COORDINATOR("Coordinator"),
    GUIDE("Guide"),
    TRAINEE("Trainee"),
    ADVISOR("Advisor");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
    
    public static UserRole fromString(String role) {
        for (UserRole userRole : UserRole.values()) {
            if (userRole.toString().equalsIgnoreCase(role)) {
                return userRole;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + role);
    }
}
