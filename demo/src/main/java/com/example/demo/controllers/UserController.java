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

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/coordinator")
    public ResponseEntity<List<Coordinator>> getCoordinator() {
        return ResponseEntity.ok(userService.getCoordinator());
    }

    @GetMapping("/advisor")
    public ResponseEntity<List<Advisor>> getAllAdvisors() {
        return ResponseEntity.ok(userService.getAllAdvisors());
    }

    @GetMapping("/guide")
    public ResponseEntity<List<Guide>> getAllGuides() {
        return ResponseEntity.ok(userService.getAllGuides());
    }

    @GetMapping("/trainee")
    public ResponseEntity<List<Trainee>> getAllTrainees() {
        return ResponseEntity.ok(userService.getAllTrainees());
    }

    @PostMapping("/coordinator")
    public ResponseEntity<Coordinator> createCoordinator(@RequestBody Coordinator theCoordinator) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveCoordinator(theCoordinator));
    }

    @PostMapping("/advisor")
    public ResponseEntity<Advisor> createAdvisor(@RequestBody Advisor anAdvisor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveAdvisor(anAdvisor));
    }

    @PostMapping("/guide")
    public ResponseEntity<Guide> createGuide(@RequestBody Guide aGuide) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveGuide(aGuide));
    }

    @PostMapping("/trainee")
    public ResponseEntity<Trainee> createTrainee(@RequestBody Trainee aTrainee) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveTrainee(aTrainee));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getOneUser(@PathVariable Long id) {
        User user = userService.getOneUser(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PutMapping("/{role}/{id}")
    public User updateOneUser(@PathVariable String role, @PathVariable String id, @RequestBody User newUser) {
        return userService.saveUser(role, newUser);
    }
    
    /*@PutMapping("/guide/{userId}")
    public User updateOneGuide(@PathVariable Long userId, @RequestBody Guide newUser) {
        return userService.saveGuide(newUser);
    }
    
    @PutMapping("/trainee/{userId}")
    public User updateOneTrainee(@PathVariable Long userId, @RequestBody Trainee newUser) {
        return userService.saveTrainee(newUser);
    }

    @PutMapping("/advisor/{userId}")
    public User updateOneAdvisor(@PathVariable Long userId, @RequestBody Advisor newUser) {
        return userService.saveAdvisor(newUser);
    }

    @PutMapping("/coordinator/{userId}")
    public User updateCoordinator(@PathVariable Long userId, @RequestBody Coordinator newUser) {
        return userService.saveCoordinator(newUser);
    }*/

    @DeleteMapping("/{userId}")
    public void deleteOneUser(@PathVariable Long userId){
        userService.deleteById(userId);
    }    
}
