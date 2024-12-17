package com.example.demo.services.UsersService;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.enums.TraineeStatus;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repositories.user.TraineeRepository;


@Service
public class TraineeService implements RoleService {

    private final TraineeRepository traineeRepository;

    public TraineeService(TraineeRepository repo){
        this.traineeRepository = repo;
    }

    public boolean isEligibleForPromotion(Long traineeId) throws UserNotFoundException {
        Trainee trainee = traineeRepository.findById(traineeId)
                .orElseThrow(() -> new UserNotFoundException("Trainee not found with ID: " + traineeId));
                
        return trainee.isEligibleForPromotion();
    }
    
    public Trainee updateTraineeStatus(Long traineeId) throws UserNotFoundException {
        Trainee trainee = traineeRepository.findById(traineeId)
                .orElseThrow(() -> new UserNotFoundException("Trainee not found with ID: " + traineeId));

        int completedTours = trainee.getTours() != null ? trainee.getTours().size() : 0;

        switch (trainee.getStatus()) {
            case OBSERVATION_TOURS:
                if (completedTours >= 2) {
                    trainee.setStatus(TraineeStatus.PRACTICE_TOURS);
                }
                break;

            case PRACTICE_TOURS:
                if (completedTours >= 4) {
                    trainee.setStatus(TraineeStatus.TRIAL_TOURS);
                }
                break;

            case TRIAL_TOURS:
                if (completedTours >= 6) {
                    trainee.setEligibleForPromotion(true);
                }
                break;
        }

        return traineeRepository.save(trainee);
    }

    @Override
    public User save(User user) {
        return traineeRepository.save((Trainee) user);
    }

    @Override
    public Optional<Trainee> findById(Long id) {
        return traineeRepository.findById(id);
    }

    @Override
    public List<Trainee> findAll() {
        return traineeRepository.findAll();   
    }

    @Override
    public boolean deleteById(Long id) {
        Optional<Trainee> advisor = traineeRepository.findById(id);
        if (advisor.isPresent()) {
            traineeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<? extends User> findByEmail(String email) {
        return traineeRepository.findByEmail(email);
    }

    @Override
    public long count() {
        return traineeRepository.count();
    }

    public List<Trainee> findByStatus(TraineeStatus status){
        return traineeRepository.findByStatus(status);
    }

    @Override
    public Optional<Trainee> login(String email, String rawPassword) {
        return traineeRepository.findByEmail(email)
                .stream()
                .filter(u -> u.getPassword().equals(rawPassword))
                .findFirst();
    }
}
