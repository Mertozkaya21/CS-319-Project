package com.example.demo.services.applicationformservice.applicationformsorter;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;
import com.example.demo.entities.form.GroupForm;

@Component
public class SortByLgsPercentile implements SortStrategy{

    @Override
    public List<GroupForm> sort(List<GroupForm> applicationForms) {
        Collections.sort(applicationForms, (a, b) -> Double.compare(a.getHighschool().getLgsPercentile(), b.getHighschool().getLgsPercentile()));
        return applicationForms;    }

}
