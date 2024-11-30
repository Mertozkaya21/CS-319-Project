package com.cs319.backend.User;
import  com.cs319.backend.enums.*;

import java.io.File;
import java.util.List;
import com.cs319.backend.Event.GroupTour;

public class Trainee extends User {
    private int traineeId;
    private GroupTour[] tours;
    private TraineeStatus status;

    // Default Constructor
    public Trainee() {
        super(null, null, null, null, null, null, null, null, null, null);
        this.traineeId = 0;
        this.tours = null;
        this.status = null;
    }

    // Parameterized Constructor
    public Trainee(String userName, String name, String email, String password, String phoneNo, String attribute,
                   String city, File imageFile, List<String> latestAcitivites, List<String> notifications,
                   int traineeId, GroupTour[] tours, TraineeStatus status) {
        super(userName, name, email, password, phoneNo, attribute, city, imageFile, latestAcitivites, notifications);
        this.traineeId = traineeId;
        this.tours = tours;
        this.status = status;
    }

    // Getters and Setters
    public int getTraineeId() {
        return traineeId;
    }

    public void setTraineeId(int traineeId) {
        this.traineeId = traineeId;
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
