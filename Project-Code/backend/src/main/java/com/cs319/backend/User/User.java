package com.cs319.backend.User;

import java.io.File;
import java.util.List;

public class User {
    private String userName;
    private String name;
    private String email;
    private String password;
    private String phoneNo;
    private String attribute;
    private String city;
    private File imageFile;

    private List<String> latestAcitivites;
    private List<String> notifications;

    
    public User(String userName, String name, String email, String password, String phoneNo, String attribute,
                String city, File imageFile, List<String> latestAcitivites, List<String> notifications) {
        this.userName = userName;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNo = phoneNo;
        this.attribute = attribute;
        this.city = city;
        this.imageFile = imageFile;
        this.latestAcitivites = latestAcitivites;
        this.notifications = notifications;
    }

    public User() {
        this.userName = null;
        this.name = null;
        this.email = null;
        this.password = null;
        this.phoneNo = null;
        this.attribute = null;
        this.city = null;
        this.imageFile = null;
        this.latestAcitivites = null;
        this.notifications = null;
    }
    

    // Getters and Setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public File getImageFile() {
        return imageFile;
    }

    public void setImageFile(File imageFile) {
        this.imageFile = imageFile;
    }

    public List<String> getLatestAcitivites() {
        return latestAcitivites;
    }

    public void setLatestAcitivites(List<String> latestAcitivites) {
        this.latestAcitivites = latestAcitivites;
    }

    public List<String> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<String> notifications) {
        this.notifications = notifications;
    }
}
