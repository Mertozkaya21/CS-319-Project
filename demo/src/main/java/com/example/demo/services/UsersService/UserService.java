package com.example.demo.services.UsersService;

import com.example.demo.entities.user.User;
import com.example.demo.exceptions.LoginException;
import com.example.demo.repositories.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final RoleServiceFactory roleServiceFactory;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(RoleServiceFactory roleServiceFactory, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.roleServiceFactory = roleServiceFactory;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    public List<? extends User> findByEmail(String role,String email) {
        return roleServiceFactory.getRoleService(role).findByEmail(email);
    }

    public long count(String role){
        return roleServiceFactory.getRoleService(role).count();
    }

    public User loginUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new LoginException("Invalid email or password."));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new LoginException("Invalid email or password.");
        }

        return user;
    }

}
