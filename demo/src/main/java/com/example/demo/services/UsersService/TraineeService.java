package com.example.demo.services.UsersService;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.enums.TraineeStatus;
import com.example.demo.repositories.user.TraineeRepository;


@Service
public class TraineeService implements RoleService {

    private final TraineeRepository traineeRepository;
    private final PasswordEncoder passwordEncoder;

    public TraineeService(TraineeRepository repo, PasswordEncoder passwordEncoder){
        this.traineeRepository = repo;
        this.passwordEncoder = passwordEncoder;
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
    public void deleteById(Long id) {
        traineeRepository.deleteById(id);
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
                .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
                .findFirst();
    }
}
