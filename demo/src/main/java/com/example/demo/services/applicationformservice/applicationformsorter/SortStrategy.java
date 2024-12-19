package com.example.demo.services.applicationformservice.applicationformsorter;

import java.util.List;

import com.example.demo.entities.form.GroupForm;


public interface SortStrategy {
    List<GroupForm> sort(List<GroupForm> applicationForms);
}