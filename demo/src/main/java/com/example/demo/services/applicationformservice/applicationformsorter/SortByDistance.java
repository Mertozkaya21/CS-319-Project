package com.example.demo.services.applicationformservice.applicationformsorter;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entities.form.GroupForm;
import com.example.demo.enums.City;

@Component
public class SortByDistance implements SortStrategy{

    @Override
    public List<GroupForm> sort(List<GroupForm> applicationForms) {
        for (GroupForm form : applicationForms) {
            form.setSortType("byDistance");
        }
       Collections.sort(applicationForms, (a, b) -> {
            City cityA = a.getHighschool().getCity();
            City cityB = b.getHighschool().getCity();

            return Integer.compare(cityB.getDistanceFromAnkara(), cityA.getDistanceFromAnkara());
        });
        return applicationForms;
    }
    

}
