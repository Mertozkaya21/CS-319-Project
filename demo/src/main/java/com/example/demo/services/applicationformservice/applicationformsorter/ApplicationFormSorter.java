package com.example.demo.services.applicationformservice.applicationformsorter;

import java.util.List;

import com.example.demo.entities.form.ApplicationForm;

public class ApplicationFormSorter { //Strategy Pattern is implemented for sorting forms
    private SortStrategy sortStrategy;
    public ApplicationFormSorter(SortStrategy sortStrategy) {
        this.sortStrategy = sortStrategy;
    }

    public void setSortStrategy(SortStrategy sortStrategy) {
        this.sortStrategy = sortStrategy;
    }

    public List<ApplicationForm> sortApplicationForms(List<ApplicationForm> applicationForms) {
        return sortStrategy.sort(applicationForms);
    }
}
