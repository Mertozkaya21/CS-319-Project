package com.example.demo.services.UsersService;

import com.example.demo.entities.user.User;
import com.example.demo.exceptions.UserNotFoundException;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    User save(User user);
    Optional<? extends User> findById(Long id);
    User getById(Long id) throws UserNotFoundException;
    List<? extends User> findAll();
    boolean deleteById(Long id);
    List<? extends User> findByEmail(String email); 
    Optional<? extends User> login(String email, String rawPassword);
    long count();
}
