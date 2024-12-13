package com.example.demo.services.UsersService;

import com.example.demo.dto.UserDTO;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.exceptions.LoginException;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final RoleServiceFactory roleServiceFactory;

    public UserService(RoleServiceFactory roleServiceFactory ) {
        this.roleServiceFactory = roleServiceFactory;
    }

    public User saveUser(String role, UserDTO newUserDTO) {
        User user;
        switch (role.toLowerCase()) {
            case "coordinator":
                user = Coordinator.getInstance(newUserDTO);
                break;
            case "guide":
                user = new Guide(newUserDTO); 
                break;
            case "advisor":
                user = new Advisor(newUserDTO); 
                break;
            case "trainee":
                user = new Trainee(newUserDTO); 
                break;
            default:
                throw new IllegalArgumentException("Invalid role: " + role);
        }

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

    public List<? extends User> findByEmail(String role,String email) {
        return roleServiceFactory.getRoleService(role).findByEmail(email);
    }

    public long count(String role){
        return roleServiceFactory.getRoleService(role).count();
    }

    public User loginUser(String email, String rawPassword) {
        for (RoleService roleService : roleServiceFactory.getAllRoleServices()) {
            Optional<? extends User> user = roleService.login(email, rawPassword);
            if (user.isPresent()) {
                return user.get();
            }
        }
        throw new LoginException("Invalid email or password.");
    }
}
