package com.cs319.backend.User;
import java.util.HashMap;
import java.util.List;

import com.cs319.backend.Enums.*;
import com.cs319.backend.Event.Event;
import com.cs319.backend.Payment.Payment;

public class Guide {
    private int guideId;
    private HashMap<Days, TourHours> availableTimes;
    private List<Event> assignedEvents;
    private Payment payment;
    private int tourParticipantSurveyRanking;

    // Default Constructor
    public Guide() {
        super();
        this.guideId = 0;
        this.availableTimes = null;
        this.assignedEvents = null;
        this.payment = null;
        this.tourParticipantSurveyRanking = 0;
    }

    // Parameterized Constructor
    public Guide(int guideId, HashMap<Days, TourHours> availableTimes, List<Event> assignedEvents, Payment payment, int tourParticipantSurveyRanking) {
        this.guideId = guideId;
        this.availableTimes = availableTimes;
        this.assignedEvents = assignedEvents;
        this.payment = payment;
        this.tourParticipantSurveyRanking = tourParticipantSurveyRanking;
    }

    // Getters and Setters
    public int getGuideId() {
        return guideId;
    }

    public void setGuideId(int guideId) {
        this.guideId = guideId;
    }

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
