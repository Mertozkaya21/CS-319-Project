package com.example.demo.services.applicationformservice.applicationformsorter;

import java.util.List;

import com.example.demo.entities.form.ApplicationForm;

public interface SortStrategy {
    List<ApplicationForm> sort(List<ApplicationForm> applicationForms);

}
