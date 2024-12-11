package com.example.demo.services.UsersService;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.repositories.user.TraineeRepository;


@Service
public class TraineeService implements RoleService {

    private TraineeRepository traineeRepository;

    public TraineeService(TraineeRepository repo){
        this.traineeRepository = repo;
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

}
