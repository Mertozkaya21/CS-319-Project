package com.cs319.backend.forms;

import com.cs319.backend.highschool.Counselor;

public class GroupForm extends ApplicationForm {
    private int noOfParticipants;
    private Counselor counselor;
    private String chaperoneRole;

    public GroupForm() {
        super(); // Calls the default constructor of ApplicationForm
        this.noOfParticipants = 0;
        this.counselor = null;
        this.chaperoneRole = null;
    }

    public int getNoOfParticipants() {
        return noOfParticipants;
    }

    public void setNoOfParticipants(int noOfParticipants) {
        this.noOfParticipants = noOfParticipants;
    }

    public Counselor getCounselor() {
        return counselor;
    }

    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }

    public String getChaperoneRole() {
        return chaperoneRole;
    }

    public void setChaperoneRole(String chaperoneRole) {
        this.chaperoneRole = chaperoneRole;
    }

    @Override
    public String toString() {
        return "GroupForm{" +
                "noOfParticipants=" + noOfParticipants +
                ", counselor=" + counselor +
                ", chaperoneRole='" + chaperoneRole + '\'' +
                ", " + super.toString() +
                '}';
    }
}
