package com.example.demo.services.UsersService;

import com.example.demo.dto.EmailDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.Auth.PasswordResetToken;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.exceptions.LoginException;
import com.example.demo.repositories.Auth.PasswordResetTokenRepository;
import com.example.demo.services.EmailService;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final RoleServiceFactory roleServiceFactory;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    public UserService(RoleServiceFactory roleServiceFactory , PasswordResetTokenRepository repo, EmailService service) {
        this.roleServiceFactory = roleServiceFactory;
        this.passwordResetTokenRepository = repo;
        this.emailService = service;
    }

    public User saveUser(String role, UserDTO newUserDTO) {
        if (!isValidEmail(newUserDTO.getEmail())) {
            throw new IllegalArgumentException("Invalid email. Please use an email address with 'bilkent' in the domain.");
        }
        if (!isValidPassword(newUserDTO.getPassword())) {
            throw new IllegalArgumentException("Invalid password. Password must be at least 5 characters.");
        }

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

    private boolean isValidEmail(String email) {
        // This one checks if there is any bilkent after the @ 
        return email != null && email.matches("^[A-Za-z0-9._%+-]+@.*bilkent.*\\.[A-Za-z]{2,}$");
    }

    private boolean isValidPassword(String password) {
        // I only checked if the password length is greater than 5
        return password != null && password.length() >= 5;
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
            Optional<? extends User> user = roleService.findByEmail(email).stream()
                    .filter(u -> u.getPassword().equals(rawPassword)) 
                    .findFirst();
    
            if (user.isPresent()) {
                return user.get();
            }
        }
        throw new LoginException("Invalid email or password.");
    }

    public String generateResetToken(String email) {
        //Optional<? extends User> user = Arrays.stream(roleServiceFactory.getAllRoleServices())
        //        .flatMap(roleService -> roleService.findByEmail(email).stream())
        //       .findFirst();
    
        //if (user.isEmpty()) {
        //    throw new IllegalArgumentException("Email not found.");
        //}
    
        String token = UUID.randomUUID().toString();
    
        //passwordResetTokenRepository.deleteByEmail(email); 
        //passwordResetTokenRepository.save(new PasswordResetToken(token, email));
    
        EmailDTO emailDetails = new EmailDTO();
        emailDetails.setRecipient(email);
        emailDetails.setSubject("Password Reset Request");
        emailDetails.setBody("Your password reset token is: " + token);
        
        boolean isSent = emailService.sendSimpleMail(emailDetails);

        if (!isSent) {
            throw new IllegalStateException("Failed to send password reset email.");
        }
    
        return token;
    }
    
}
