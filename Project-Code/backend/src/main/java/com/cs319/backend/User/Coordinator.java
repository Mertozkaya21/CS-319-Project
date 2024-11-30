package com.cs319.backend.User;

import java.io.File;
import java.util.Date;
import java.util.List;
import com.cs319.backend.Event.EventDay;
import com.cs319.backend.Forms.ApplicationForm;
import com.cs319.backend.Payment.Payment;

public class Coordinator extends User {
    private List<Guide> advisors;
    private List<Trainee> trainees;
    private List<EventDay> eventDays;
    private Payment payment;
    private Date dateAdded;
    private List<ApplicationForm> applicationForms;

    // Constructor
    public Coordinator(int id,String userName, String name, String email, String password, String phoneNo, String attribute,
                       String city, File imageFile, List<String> latestAcitivites, List<String> notifications,
                       List<Guide> advisors, List<Trainee> trainees, List<EventDay> eventDays, Payment payment,
                       Date dateAdded, List<ApplicationForm> applicationForms) {
        super(id,userName, name, email, password, phoneNo, attribute, city, imageFile, latestAcitivites, notifications);
        this.advisors = advisors;
        this.trainees = trainees;
        this.eventDays = eventDays;
        this.payment = payment;
        this.dateAdded = dateAdded;
        this.applicationForms = applicationForms;
    }

    public Coordinator() {
        super();
        this.advisors = null;
        this.trainees = null;
        this.eventDays = null;
        this.payment = null;
        this.dateAdded = null;
        this.applicationForms = null;        
    }

    // Getters and Setters
    public List<Guide> getAdvisors() {
        return advisors;
    }

    public void setAdvisors(List<Guide> advisors) {
        this.advisors = advisors;
    }

    public List<Trainee> getTrainees() {
        return trainees;
    }

    public void setTrainees(List<Trainee> trainees) {
        this.trainees = trainees;
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

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public List<ApplicationForm> getApplicationForms() {
        return applicationForms;
    }

    public void setApplicationForms(List<ApplicationForm> applicationForms) {
        this.applicationForms = applicationForms;
    }
}
