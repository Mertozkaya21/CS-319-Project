package com.example.demo.services.applicationformservice.applicationformsorter;

import java.util.Collections;
import java.util.List;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.enums.City;

public class SortByDistance implements SortStrategy{

    @Override
    public List<ApplicationForm> sort(List<ApplicationForm> applicationForms) {
       Collections.sort(applicationForms, (a, b) -> {
            City cityA = a.getHighschool().getCity();
            City cityB = b.getHighschool().getCity();

            return Integer.compare(cityB.getDistanceFromAnkara(), cityA.getDistanceFromAnkara());
        });
        return applicationForms;
    }
    

}
