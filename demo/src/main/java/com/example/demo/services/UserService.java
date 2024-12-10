package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.repositories.user.AdvisorRepository;
import com.example.demo.repositories.user.CoordinatorRepository;
import com.example.demo.repositories.user.GuideRepository;
import com.example.demo.repositories.user.TraineeRepository;

@Service
public class UserService {
    private final CoordinatorRepository coordinatorRepository;
    private final AdvisorRepository advisorRepository;
    private final GuideRepository guideRepository;
    private final TraineeRepository traineeRepository;

    public UserService(CoordinatorRepository coordinatorRepo,
                        AdvisorRepository advisorRepo, GuideRepository guideRepo,
                        TraineeRepository traineeRepo){
        this.coordinatorRepository = coordinatorRepo;
        this.advisorRepository = advisorRepo;
        this.guideRepository = guideRepo;
        this.traineeRepository = traineeRepo;
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        users.addAll(coordinatorRepository.findAll());
        users.addAll(advisorRepository.findAll());
        users.addAll(guideRepository.findAll());
        users.addAll(traineeRepository.findAll());
        return users;
    }

    public List<Coordinator> getCoordinator() {
        return coordinatorRepository.findAll();
    }

    public List<Advisor> getAllAdvisors() {
        return advisorRepository.findAll();
    }

    public List<Guide> getAllGuides() {
        return guideRepository.findAll();
    }

    public List<Trainee> getAllTrainees() {
        return traineeRepository.findAll();
    }

    public User saveUser(String role, User newUser) {
        switch (role.toLowerCase()) {
            case "guide":
                return guideRepository.save((Guide) newUser);
            case "advisor":
                return advisorRepository.save((Advisor) newUser);
            case "coordinator":
                return coordinatorRepository.save((Coordinator) newUser);
            case "trainee":
                return traineeRepository.save((Trainee) newUser);
            default:
                throw new IllegalArgumentException("Unknown role: " + role);
        }
    }

    public Coordinator saveCoordinator(Coordinator theCoordinator) {
        return coordinatorRepository.save(theCoordinator);
    }

    public Advisor saveAdvisor(Advisor anAdvisor) {
        return advisorRepository.save(anAdvisor);
    }

    public Guide saveGuide(Guide aGuide) {
        return guideRepository.save(aGuide);
    }

    public Trainee saveTrainee(Trainee aTrainee) {
        return traineeRepository.save(aTrainee);
    }

    public User getOneUser(Long userId) {
        Optional<Coordinator> coordinatorOpt = coordinatorRepository.findById(userId);
        if (coordinatorOpt.isPresent()) return coordinatorOpt.get();

        Optional<Advisor> advisorOpt = advisorRepository.findById(userId);
        if (advisorOpt.isPresent()) return advisorOpt.get();
    
        Optional<Guide> guideOpt = guideRepository.findById(userId);
        if (guideOpt.isPresent()) return guideOpt.get();
    
        Optional<Trainee> traineeOpt = traineeRepository.findById(userId);
        if (traineeOpt.isPresent()) return traineeOpt.get();
    
        return null;
    }

    public boolean deleteById(Long userId) {
        if (coordinatorRepository.existsById(userId)) {
            coordinatorRepository.deleteById(userId);
            return true;
        }

        else if (advisorRepository.existsById(userId)) {
            advisorRepository.deleteById(userId);
            return true;
        }
    
        else if (guideRepository.existsById(userId)) {
            guideRepository.deleteById(userId);
            return true;
        }
    
        else if (traineeRepository.existsById(userId)) {
            traineeRepository.deleteById(userId);
            return true;
        }

        return false;
    }
}
