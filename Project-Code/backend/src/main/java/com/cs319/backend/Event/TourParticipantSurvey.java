package com.cs319.backend.Event;

public class TourParticipantSurvey {
    private int ID;
    private String participantSchoolName;
    private int participantSchoolID;
    private int participantSchoolTourID;
    private int IDofDepartmentOfInterest;
    private String feedbackMessage;
    // Rates
    private int guideRate;
    private int tourRate;
    private int universityRate;

    public TourParticipantSurvey() {
        this.ID = 0;
        this.participantSchoolName = null;
        this.participantSchoolID = 0;
        this.participantSchoolTourID = 0;
        this.IDofDepartmentOfInterest = 0;
        this.feedbackMessage = null;
        this.guideRate = 0;
        this.tourRate = 0;
        this.universityRate = 0;
    }

    public TourParticipantSurvey(int ID, String participantSchoolName, int participantSchoolID, 
                                 int participantSchoolTourID, int IDofDepartmentOfInterest, 
                                 String feedbackMessage, int guideRate, int tourRate, int universityRate) {
        this.ID = ID;
        this.participantSchoolName = participantSchoolName;
        this.participantSchoolID = participantSchoolID;
        this.participantSchoolTourID = participantSchoolTourID;
        this.IDofDepartmentOfInterest = IDofDepartmentOfInterest;
        this.feedbackMessage = feedbackMessage;
        this.guideRate = guideRate;
        this.tourRate = tourRate;
        this.universityRate = universityRate;
    }

    // Getters and Setters
    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getParticipantSchoolName() {
        return participantSchoolName;
    }

    public void setParticipantSchoolName(String participantSchoolName) {
        this.participantSchoolName = participantSchoolName;
    }

    public int getParticipantSchoolID() {
        return participantSchoolID;
    }

    public void setParticipantSchoolID(int participantSchoolID) {
        this.participantSchoolID = participantSchoolID;
    }

    public int getParticipantSchoolTourID() {
        return participantSchoolTourID;
    }

    public void setParticipantSchoolTourID(int participantSchoolTourID) {
        this.participantSchoolTourID = participantSchoolTourID;
    }

    public int getIDofDepartmentOfInterest() {
        return IDofDepartmentOfInterest;
    }

    public void setIDofDepartmentOfInterest(int IDofDepartmentOfInterest) {
        this.IDofDepartmentOfInterest = IDofDepartmentOfInterest;
    }

    public String getFeedbackMessage() {
        return feedbackMessage;
    }

    public void setFeedbackMessage(String feedbackMessage) {
        this.feedbackMessage = feedbackMessage;
    }

    public int getGuideRate() {
        return guideRate;
    }

    public void setGuideRate(int guideRate) {
        this.guideRate = guideRate;
    }

    public int getTourRate() {
        return tourRate;
    }

    public void setTourRate(int tourRate) {
        this.tourRate = tourRate;
    }

    public int getUniversityRate() {
        return universityRate;
    }

    public void setUniversityRate(int universityRate) {
        this.universityRate = universityRate;
    }
}
