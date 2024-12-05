package com.cs319.backend.user;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import com.cs319.backend.enums.*;
import com.cs319.backend.event.Event;
import com.cs319.backend.payment.Payment;

public class Guide extends User {
    private HashMap<Days, TourHours> availableTimes;
    private List<Event> assignedEvents;
    private Payment payment;
    private int tourParticipantSurveyRanking;

    // Default Constructor
    public Guide() {
        super(); // Calls the default constructor from the User class
        this.availableTimes = null;
        this.assignedEvents = null;
        this.payment = null;
        this.tourParticipantSurveyRanking = 0;
    }

    // Parameterized Constructor
    public Guide(String userName, String name, String email, String password, String phoneNo, String attribute,
                 String city, File imageFile, List<String> latestAcitivites, List<String> notifications,
                 HashMap<Days, TourHours> availableTimes, List<Event> assignedEvents, Payment payment,
                 int tourParticipantSurveyRanking) {
        super(userName, name, email, password, phoneNo, attribute, city, imageFile, latestAcitivites, notifications);
        this.availableTimes = availableTimes;
        this.assignedEvents = assignedEvents;
        this.payment = payment;
        this.tourParticipantSurveyRanking = tourParticipantSurveyRanking;
    }

    // Getters and Setters
    public HashMap<Days, TourHours> getAvailableTimes() {
        return availableTimes;
    }

    public void setAvailableTimes(HashMap<Days, TourHours> availableTimes) {
        this.availableTimes = availableTimes;
    }

    public List<Event> getAssignedEvents() {
        return assignedEvents;
    }

    public void setAssignedEvents(List<Event> assignedEvents) {
        this.assignedEvents = assignedEvents;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public int getTourParticipantSurveyRanking() {
        return tourParticipantSurveyRanking;
    }

    public void setTourParticipantSurveyRanking(int tourParticipantSurveyRanking) {
        this.tourParticipantSurveyRanking = tourParticipantSurveyRanking;
    }
}
