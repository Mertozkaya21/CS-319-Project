package com.cs319.backend.User;

import com.cs319.backend.enums.*;
import java.io.File;
import java.util.List;
import com.cs319.backend.Event.EventDay;
import com.cs319.backend.Payment.Payment;

public class Advisor extends User {
    private int advisorID;
    private List<Days> undertakenDays;
    private List<EventDay> eventDays;
    private Payment payment;
    private Days dateAdded;
    private List<ApplicationForm> applicationForms;

    public Advisor() {
        super();
        this.advisorID = 0;
        this.undertakenDays = null;
        this.eventDays = null;
        this.payment = null;
        this.dateAdded = null;
        this.applicationForms = null;
    }

    public Advisor(String userName, String name, String email, String password, String phoneNo, String attribute,
                   String city, File imageFile, List<String> latestAcitivites, List<String> notifications,
                   int advisorID, List<Days> undertakenDays, List<EventDay> eventDays, Payment payment,
                   Days dateAdded, List<ApplicationForm> applicationForms) {
        super(userName, name, email, password, phoneNo, attribute, city, imageFile, latestAcitivites, notifications);
        this.advisorID = advisorID;
        this.undertakenDays = undertakenDays;
        this.eventDays = eventDays;
        this.payment = payment;
        this.dateAdded = dateAdded;
        this.applicationForms = applicationForms;
    }

    public int getAdvisorID() {
        return advisorID;
    }

    public void setAdvisorID(int advisorID) {
        this.advisorID = advisorID;
    }

    public List<Days> getUndertakenDays() {
        return undertakenDays;
    }

    public void setUndertakenDays(List<Days> undertakenDays) {
        this.undertakenDays = undertakenDays;
    }

    public List<EventDay> getEventDays() {
        return eventDays;
    }

    public void setEventDays(List<EventDay> eventDays) {
        this.eventDays = eventDays;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Days getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Days dateAdded) {
        this.dateAdded = dateAdded;
    }

    public List<ApplicationForm> getApplicationForms() {
        return applicationForms;
    }

    public void setApplicationForms(List<ApplicationForm> applicationForms) {
        this.applicationForms = applicationForms;
    }
}
