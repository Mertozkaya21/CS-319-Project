package com.cs319.backend.forms;
import java.util.List;

public class IndividualForm extends ApplicationForm {
    private List<Integer> idsOfDepartmentsOfInterest;

    public IndividualForm() {
        super(); // Calls the default constructor of ApplicationForm
        this.idsOfDepartmentsOfInterest = null;
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
