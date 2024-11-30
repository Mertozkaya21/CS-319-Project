package com.cs319.backend.Highschool;

import java.util.Date;
import java.util.List;
import com.cs319.backend.Event.GroupTour;

public class Highschool {
    private int ID;
    private String name;
    private String city;
    private Counselor counselor;
    private int priorityScore;
    private Date dateUpDated;
    private List<GroupTour> groupTours;

    public Highschool() {
        this.ID = 0;
        this.name = null;
        this.city = null;
        this.counselor = null;
        this.priorityScore = 0;
        this.dateUpDated = null;
        this.groupTours = null;
    }

    public Highschool(int ID, String name, String city, Counselor counselor, int priorityScore, Date dateUpDated, List<GroupTour> groupTours) {
        this.ID = ID;
        this.name = name;
        this.city = city;
        this.counselor = counselor;
        this.priorityScore = priorityScore;
        this.dateUpDated = dateUpDated;
        this.groupTours = groupTours;
    }

    // Getters and Setters
    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Counselor getCounselor() {
        return counselor;
    }

    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }

    public int getPriorityScore() {
        return priorityScore;
    }

    public void setPriorityScore(int priorityScore) {
        this.priorityScore = priorityScore;
    }

    public Date getDateUpDated() {
        return dateUpDated;
    }

    public void setDateUpDated(Date dateUpDated) {
        this.dateUpDated = dateUpDated;
    }

    public List<GroupTour> getGroupTours() {
        return groupTours;
    }

    public void setGroupTours(List<GroupTour> groupTours) {
        this.groupTours = groupTours;
    }
}
