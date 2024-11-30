package com.cs319.backend.Event;

import com.cs319.backend.Highschool.Highschool;
import com.cs319.backend.User.Trainee;
import com.cs319.backend.User.Advisor;
import com.cs319.backend.User.Guide;
import com.cs319.backend.enums.EventStatus;

import java.util.List;

public class GroupTour extends Tour {
    private Highschool visitorSchool;
    private List<Trainee> trainees;
    private List<TourParticipantSurvey> tourParticipantSurveys;

    public GroupTour() {
        super(); // Call the default constructor of the parent Tour class
        this.visitorSchool = null;
        this.trainees = null;
        this.tourParticipantSurveys = null;
    }

    public GroupTour(EventStatus eventStatus, int eventID, TourTime tourTime, Advisor advisor, List<Guide> guides, 
                     int QAroomID, int noOfGuests, Highschool visitorSchool, List<Trainee> trainees, 
                     List<TourParticipantSurvey> tourParticipantSurveys) {
        super(eventStatus, eventID, tourTime, advisor, guides, QAroomID, noOfGuests); 
        this.visitorSchool = visitorSchool;
        this.trainees = trainees;
        this.tourParticipantSurveys = tourParticipantSurveys;
    }

    // Getters and Setters
    public Highschool getVisitorSchool() {
        return visitorSchool;
    }

    public void setVisitorSchool(Highschool visitorSchool) {
        this.visitorSchool = visitorSchool;
    }

    public List<Trainee> getTrainees() {
        return trainees;
    }

    public void setTrainees(List<Trainee> trainees) {
        this.trainees = trainees;
    }

    public List<TourParticipantSurvey> getTourParticipantSurveys() {
        return tourParticipantSurveys;
    }

    public void setTourParticipantSurveys(List<TourParticipantSurvey> tourParticipantSurveys) {
        this.tourParticipantSurveys = tourParticipantSurveys;
    }
}
