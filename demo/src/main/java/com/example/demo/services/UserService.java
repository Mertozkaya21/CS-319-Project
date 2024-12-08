package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.user.User;
import com.example.demo.repositories.user.AdvisorRepository;
import com.example.demo.repositories.user.CoordinatorRepository;
import com.example.demo.repositories.user.GuideRepository;
import com.example.demo.repositories.user.TraineeRepository;
import com.example.demo.repositories.user.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final CoordinatorRepository coordinatorRepository;
    private final AdvisorRepository advisorRepository;
    private final GuideRepository guideRepository;
    private final TraineeRepository traineeRepository;

    public UserService(UserRepository userRepo, CoordinatorRepository coordinatorRepo,
                        AdvisorRepository advisorRepo, GuideRepository guideRepo,
                        TraineeRepository traineeRepo){
        this.userRepository = userRepo;
        this.coordinatorRepository = coordinatorRepo;
        this.advisorRepository = advisorRepo;
        this.guideRepository = guideRepo;
        this.traineeRepository = traineeRepo;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveOneUser(User newUser) {
        return userRepository.save(newUser);
    }

    public User getOneUser(Long userId){
        return userRepository.findById(userId).orElse(null);
    }

    public User updateOneUser(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            User foundUser = user.get();
            // Örnek olarak isim ve şifresini değiştirip kaydettim
            foundUser.setName(newUser.getName());
            foundUser.setPassword(newUser.getPassword());
            userRepository.save(foundUser);
            return foundUser;
        } else {
            return null;
        }
    }

    public void deleteById(Long userId) {
        userRepository.deleteById(userId);
    }
}
