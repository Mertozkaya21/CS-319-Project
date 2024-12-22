package com.example.demo.services.applicationformservice.applicationformsorter;

import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import com.example.demo.entities.form.GroupForm;

@Component
@Primary
public class SortBySubmissionTime implements SortStrategy{

    @Override
    public List<GroupForm> sort(List<GroupForm> applicationForms) {
        Collections.sort(applicationForms, (a, b) -> a.getSubmitTimeDate().compareTo(b.getSubmitTimeDate()));
        for (GroupForm form : applicationForms) {
            form.setSortType("bySubmitTime");
        }
        return applicationForms;
    }

}
