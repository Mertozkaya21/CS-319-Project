package com.cs319.backend.Event;

import java.util.List;

import com.cs319.backend.Enums.EventStatus;
import com.cs319.backend.User.Advisor;
import com.cs319.backend.User.Guide;

public class Tour extends Event {
    private TourTime tourTime;
    private Advisor advisor;
    private List<Guide> guides;
    private int QAroomID;
    private int noOfGuests;

    public Tour() {
        super(); // Call default constructor of Event
        this.tourTime = null;
        this.advisor = null;
        this.guides = null;
        this.QAroomID = 0;
        this.noOfGuests = 0;
    }

    public Tour(EventStatus eventStatus, int eventID, TourTime tourTime, Advisor advisor, List<Guide> guides, int QAroomID, int noOfGuests) {
        super(eventStatus, eventID); // Call parameterized constructor of Event
        this.tourTime = tourTime;
        this.advisor = advisor;
        this.guides = guides;
        this.QAroomID = QAroomID;
        this.noOfGuests = noOfGuests;
    }

    public TourTime getTourTime() {
        return tourTime;
    }

    public void setTourTime(TourTime tourTime) {
        this.tourTime = tourTime;
    }

    public Advisor getAdvisor() {
        return advisor;
    }

    public void setAdvisor(Advisor advisor) {
        this.advisor = advisor;
    }

    public List<Guide> getGuides() {
        return guides;
    }

    public void setGuides(List<Guide> guides) {
        this.guides = guides;
    }

    public int getQAroomID() {
        return QAroomID;
    }

    public void setQAroomID(int QAroomID) {
        this.QAroomID = QAroomID;
    }

    public int getNoOfGuests() {
        return noOfGuests;
    }

    public void setNoOfGuests(int noOfGuests) {
        this.noOfGuests = noOfGuests;
    }
}
