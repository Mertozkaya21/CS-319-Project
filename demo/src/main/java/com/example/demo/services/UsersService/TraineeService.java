package com.example.demo.services.UsersService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        if (completedTours >= 6) {
            trainee.setStatus(TraineeStatus.COMPLETED_TOURS);
        }
        else if (completedTours >= 4) {
            trainee.setStatus(TraineeStatus.TRIAL_TOURS);
        }
        else if (completedTours >= 2) {
            trainee.setStatus(TraineeStatus.PRACTICE_TOURS);
        }
        else{
            trainee.setStatus(TraineeStatus.OBSERVATION_TOURS);
        }

        return traineeRepository.save(trainee);
    }
    
    @Override
    public Trainee getById(Long id) throws UserNotFoundException {
        return traineeRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Trainee not found with ID: " + id));
    }

    public List<Trainee> findAllByAdvisorId(Long advisorId) {
        return traineeRepository.findAllByAdvisor_Id(advisorId);
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

    public List<String> getAllEligibleTraineeFullNamesWithIds() {
        return traineeRepository
                                 .findByStatus(TraineeStatus.COMPLETED_TOURS)
                                 .stream()
                                 .map(user -> user.getId() +" - "+user.getFirstName() + " " + user.getLastName()) //id + fullName
                                 .collect(Collectors.toList());
    }

}
