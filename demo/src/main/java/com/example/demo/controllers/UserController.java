package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.services.UserService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService service){
        this.userService = service;
    }
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/coordinator")
    public List<Coordinator> getCoordinator() {
        return userService.getCoordinator();
    }

    @GetMapping("/advisor")
    public List<Advisor> getAllAdvisors() {
        return userService.getAllAdvisors();
    }

    @GetMapping("/guide")
    public List<Guide> getAllGuides() {
        return userService.getAllGuides();
    }

    @GetMapping("/trainee")
    public List<Trainee> getAllTrainees() {
        return userService.getAllTrainees();
    }

    @PostMapping("/coordinator")
    public Coordinator createCoordinator(@RequestBody Coordinator theCoordinator) {
        return userService.saveCoordinator(theCoordinator);
    }

    @PostMapping("/advisor")
    public Advisor createAdvisor(@RequestBody Advisor anAdvisor) {
        return userService.saveAdvisor(anAdvisor);
    }

    @PostMapping("/guide")
    public Guide createGuide(@RequestBody Guide aGuide) {
        return userService.saveGuide(aGuide);
    }

    @PostMapping("/trainee")
    public Trainee createTrainee(@RequestBody Trainee aTrainee) {
        return userService.saveTrainee(aTrainee);
    }

    @GetMapping("/{userId}")
    public User getOneUser(@PathVariable Long userId) {
        return userService.getOneUser(userId);
    }

    @PutMapping("/guide/{userId}")
    public User updateOneUser(@PathVariable Long userId, @RequestBody Guide newUser) {
        return userService.saveGuide(newUser);
    }
    
    @DeleteMapping("/{userId}")
    public void deleteOneUser(@PathVariable Long userId){
        userService.deleteById(userId);
    }    
}
