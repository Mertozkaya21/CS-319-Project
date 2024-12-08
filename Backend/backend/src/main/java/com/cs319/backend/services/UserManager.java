package com.cs319.backend.services;

import java.util.ArrayList;

import com.cs319.backend.users.User;

public class UserManager {
    private ArrayList<User> users;

    public boolean addUser(User newUser) {
        // Check if the user already exists based on email
        String email = newUser.getEmail();
        if(users != null){
            for (User user : users) {
                if (user.getEmail().equals(email)) {
                    return false; // Email already exists
                }
            }
        }
        else{
            users = new ArrayList<>();
        }
        // Add new user to the list
        users.add(newUser);
        return true; // User added successfully
    }
    public int doesUserExist(String email, String password) {
        if(users != null){
            for (User user : users) {
                if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                    return user.getID();
                }
            }
        }
        return -1; // User not found
    }
}
