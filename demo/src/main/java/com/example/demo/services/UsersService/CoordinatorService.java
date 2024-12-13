package com.example.demo.services.UsersService;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.user.Coordinator;
import com.example.demo.entities.user.User;
import com.example.demo.repositories.user.CoordinatorRepository;

@Service
public class CoordinatorService implements RoleService{
    
    private final CoordinatorRepository coordinatorRepository;

    public CoordinatorService(CoordinatorRepository repo) {
        this.coordinatorRepository= repo;
    }

    @Override
    public Coordinator save(User user) {
        if(Coordinator.getInstance()!=null)
            return coordinatorRepository.save((Coordinator) user);
        return null;
    }

    @Override
    public Optional<Coordinator> findById(Long id) {
        return coordinatorRepository.findById(id);
    }

    @Override
    public List<Coordinator> findAll() {
        return coordinatorRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        coordinatorRepository.deleteById(id);
    }

    @Override
    public List<Coordinator> findByEmail(String email) {
        return coordinatorRepository.findByEmail(email);
    }

    @Override
    public long count() {
        return coordinatorRepository.count();
    }
}
