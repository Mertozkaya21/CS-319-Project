package com.example.demo.enums;

public enum Department {
    COMPUTER_ENGINEERING("Computer Engineering"),
    ELECTRICAL_ENGINEERING("Electrical Engineering"),
    MECHANICAL_ENGINEERING("Mechanical Engineering"),
    INDUSTRIAL_ENGINEERING("Industrial Engineering"),
    ARCHITECTURE("Architecture"),
    BUSINESS_ADMINISTRATION("Business Administration"),
    ECONOMICS("Economics"),
    MANAGEMENT_INFORMATION_SYSTEMS("Management Information Systems"),
    MATHEMATICS("Mathematics"),
    PHYSICS("Physics"),
    CHEMISTRY("Chemistry"),
    MOLECULAR_BIOLOGY("Molecular Biology and Genetics"),
    PSYCHOLOGY("Psychology"),
    LAW("Law"),
    INTERNATIONAL_RELATIONS("International Relations"),
    POLITICAL_SCIENCE_AND_PUBLIC_ADMINISTRATION("Political Science and Public Administration"),
    PHILOSOPHY("Philosophy"),
    ENGLISH_LANGUAGE_AND_LITERATURE("English Language and Literature"),
    ELECTRICAL_AND_ELECTRONICS_ENGINEERING("Electrical and Electronics Engineering"),
    COMMUNICATION_DESIGN("Communication and Design");

    private final String displayName;

    Department(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Department fromString(String value) {
        for (Department department : Department.values()) {
            if (department.name().equalsIgnoreCase(value) || department.displayName.equalsIgnoreCase(value)) {
                return department;
            }
        }
        throw new IllegalArgumentException("Invalid Department: " + value);
    }
}
