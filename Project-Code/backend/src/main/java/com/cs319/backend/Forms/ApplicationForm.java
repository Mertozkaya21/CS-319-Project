package com.cs319.backend.Forms;

import java.util.Date;
import com.cs319.backend.Enums.ApplicationFormStatus;
import com.cs319.backend.Event.TourTime;
import com.cs319.backend.Highschool.Highschool;

public class ApplicationForm {
    private int ID;
    private Date submitTime;
    private String notes;
    private ApplicationFormStatus status;
    private String applicantName;
    private String applicantPhone;
    private String applicantEmail;
    private TourTime[] vTimes; // Array of preferred visit times
    private Highschool highschool;


    public ApplicationForm() {
        this.ID = 0;
        this.submitTime = null;
        this.notes = null;
        this.status = null;
        this.applicantName = null;
        this.applicantPhone = null;
        this.applicantEmail = null;
        this.vTimes = null;
        this.highschool = null;
    }

    public ApplicationForm(int ID, Date submitTime, String notes, ApplicationFormStatus status, String applicantName,
                           String applicantPhone, String applicantEmail, TourTime[] vTimes, Highschool highschool) {
        this.ID = ID;
        this.submitTime = submitTime;
        this.notes = notes;
        this.status = status;
        this.applicantName = applicantName;
        this.applicantPhone = applicantPhone;
        this.applicantEmail = applicantEmail;
        this.vTimes = vTimes;
        this.highschool = highschool;
    }

    // Getters and Setters
    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public Date getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Date submitTime) {
        this.submitTime = submitTime;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public ApplicationFormStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationFormStatus status) {
        this.status = status;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantPhone() {
        return applicantPhone;
    }

    public void setApplicantPhone(String applicantPhone) {
        this.applicantPhone = applicantPhone;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public TourTime[] getvTimes() {
        return vTimes;
    }

    public void setvTimes(TourTime[] vTimes) {
        this.vTimes = vTimes;
    }

    public Highschool getHighschool() {
        return highschool;
    }

    public void setHighschool(Highschool highschool) {
        this.highschool = highschool;
    }

    @Override
    public String toString() {
        return "ApplicationForm{" +
                "ID=" + ID +
                ", submitTime=" + submitTime +
                ", notes='" + notes + '\'' +
                ", status=" + status +
                ", applicantName='" + applicantName + '\'' +
                ", applicantPhone='" + applicantPhone + '\'' +
                ", applicantEmail='" + applicantEmail + '\'' +
                ", vTimes=" + (vTimes != null ? vTimes.length : "null") +
                ", highschool=" + highschool +
                '}';
    }
}
