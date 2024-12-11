package com.example.demo.services.UsersService;

import com.example.demo.entities.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final RoleServiceFactory roleServiceFactory;

    public UserService(RoleServiceFactory roleServiceFactory) {
        this.roleServiceFactory = roleServiceFactory;
    }

    public User saveUser(String role, User user) {
        return roleServiceFactory.getRoleService(role).save(user);
    }

    public Optional<? extends User> getUserById(String role, Long id) {
        return roleServiceFactory.getRoleService(role).findById(id);
    }

    public List<? extends User> getAllUsers(String role) {
        return roleServiceFactory.getRoleService(role).findAll();
    }

    public void deleteUser(String role, Long id) {
        roleServiceFactory.getRoleService(role).deleteById(id);
    }
}
