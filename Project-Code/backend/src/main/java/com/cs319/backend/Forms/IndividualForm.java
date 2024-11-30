package com.cs319.backend.Forms;
import java.util.List;

public class IndividualForm extends ApplicationForm {
    private List<Integer> idsOfDepartmentsOfInterest;

    public IndividualForm() {
        super(); // Calls the default constructor of ApplicationForm
        this.idsOfDepartmentsOfInterest = null;
    }

    public IndividualForm(int ID, java.util.Date submitTime, String notes, 
                          com.cs319.backend.Enums.ApplicationFormStatus status, 
                          String applicantName, String applicantPhone, String applicantEmail, 
                          com.cs319.backend.Event.TourTime[] vTimes, 
                          com.cs319.backend.Highschool.Highschool highschool, 
                          List<Integer> idsOfDepartmentsOfInterest) {
        super(ID, submitTime, notes, status, applicantName, applicantPhone, applicantEmail, vTimes, highschool);
        this.idsOfDepartmentsOfInterest = idsOfDepartmentsOfInterest;
    }

    public List<Integer> getIdsOfDepartmentsOfInterest() {
        return idsOfDepartmentsOfInterest;
    }

    public void setIdsOfDepartmentsOfInterest(List<Integer> idsOfDepartmentsOfInterest) {
        this.idsOfDepartmentsOfInterest = idsOfDepartmentsOfInterest;
    }

    @Override
    public String toString() {
        return "IndividualForm{" +
                "idsOfDepartmentsOfInterest=" + idsOfDepartmentsOfInterest +
                ", " + super.toString() +
                '}';
    }
}
