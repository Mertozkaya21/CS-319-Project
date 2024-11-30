package com.cs319.backend.User;
import java.io.File;
import java.util.List;

import com.cs319.backend.Enums.*;
import com.cs319.backend.Event.GroupTour;

public class Trainee extends User {
    private GroupTour[] tours;
    private TraineeStatus status;

    // Default Constructor
    public Trainee() {
        super(-1 ,null, null, null, null, null, null, null, null, null, null);
        this.tours = null;
        this.status = null;
    }

    // Parameterized Constructor
    public Trainee(String userName, String name, String email, String password, String phoneNo, String attribute,
                   String city, File imageFile, List<String> latestAcitivites, List<String> notifications,
                   int traineeId, GroupTour[] tours, TraineeStatus status) {
        super(traineeId ,userName, name, email, password, phoneNo, attribute, city, imageFile, latestAcitivites, notifications);
        this.tours = tours;
        this.status = status;
    }


    public GroupTour[] getTours() {
        return tours;
    }

    public void setTours(GroupTour[] tours) {
        this.tours = tours;
    }

    public TraineeStatus getStatus() {
        return status;
    }

    public void setStatus(TraineeStatus status) {
        this.status = status;
    }
}
