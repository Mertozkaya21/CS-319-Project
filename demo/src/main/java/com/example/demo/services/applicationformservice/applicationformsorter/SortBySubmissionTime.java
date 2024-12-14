package com.example.demo.services.applicationformservice.applicationformsorter;

import java.util.Collections;
import java.util.List;

import com.example.demo.entities.form.ApplicationForm;

public class SortBySubmissionTime implements SortStrategy{

    @Override
    public List<ApplicationForm> sort(List<ApplicationForm> applicationForms) {
        Collections.sort(applicationForms, (a, b) -> a.getSubmitTimeDate().compareTo(b.getSubmitTimeDate()));
        return applicationForms;
    }

}
