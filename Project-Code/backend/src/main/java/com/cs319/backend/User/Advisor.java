package com.cs319.backend.User;
import com.cs319.backend.enums.*;

import java.io.File;
import java.util.List;

public class Advisor extends User {
    private int advisorID;
    private List<Days> undertakenDays;


    public Advisor(String userName, String name, String email, String password, String phoneNo, String attribute,
            String city, File imageFile, List<String> latestAcitivites, List<String> notifications) {
        super(userName, name, email, password, phoneNo, attribute, city, imageFile, latestAcitivites, notifications);
    }
}
