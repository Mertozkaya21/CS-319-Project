package com.cs319.backend.highschools;

public class Counselor {
    private String name;
    private String phone;
    private String email;
    private Highschool highschool;

    public Counselor() {
        this.name = null;
        this.phone = null;
        this.email = null;
        this.highschool = null;
    }

    public Counselor(String name, String phone, String email, Highschool highschool) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.highschool = highschool;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Highschool getHighschool() {
        return highschool;
    }

    public void setHighschool(Highschool highschool) {
        this.highschool = highschool;
    }
}
