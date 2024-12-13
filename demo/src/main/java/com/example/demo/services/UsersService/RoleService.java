package com.example.demo.services.UsersService;

import com.example.demo.entities.user.User;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    User save(User user);
    Optional<? extends User> findById(Long id);
    List<? extends User> findAll();
    void deleteById(Long id);
    List<? extends User> findByEmail(String email); 
    Optional<? extends User> login(String email, String rawPassword);
    long count();
}
