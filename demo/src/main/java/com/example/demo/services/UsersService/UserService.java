package com.example.demo.services.UsersService;

import com.example.demo.dto.EmailDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.Auth.PasswordResetToken;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.enums.UserRole;
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
        UserRole userRole = UserRole.fromString(role);

        validateEmailAndPassword(newUserDTO);

        User user = switch (userRole) {
            case COORDINATOR -> Coordinator.getInstance(newUserDTO);
            case GUIDE -> new Guide(newUserDTO);
            case ADVISOR -> new Advisor(newUserDTO);
            case TRAINEE -> new Trainee(newUserDTO);
        };

        return roleServiceFactory.getRoleService(userRole).save(user);
    }

    private void validateEmailAndPassword(UserDTO userDTO) {
        if (!isValidEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Invalid email. Please use an email address with 'bilkent' in the domain.");
        }
        if (!isValidPassword(userDTO.getPassword())) {
            throw new IllegalArgumentException("Invalid password. Password must be at least 5 characters.");
        }
    }
    private boolean isValidEmail(String email) {
        // This one checks if there is any bilkent after the @ 
        return email != null && email.matches("^[A-Za-z0-9._%+-]+@.*bilkent.*\\.[A-Za-z]{2,}$");
    }

    private boolean isValidPassword(String password) {
        return password != null && password.length() >= 5;
    }
    
    public Optional<? extends User> getUserById(String role, Long id) {
        UserRole userRole = UserRole.fromString(role);
        return roleServiceFactory.getRoleService(userRole).findById(id);
    }

    public List<? extends User> getAllUsers(String role) {
        UserRole userRole = UserRole.fromString(role);
        return roleServiceFactory.getRoleService(userRole).findAll();
    }

    public void deleteUser(String role, Long id) {
        UserRole userRole = UserRole.fromString(role);
        roleServiceFactory.getRoleService(userRole).deleteById(id);
    }

    public List<? extends User> findByEmail(String role,String email) {
        UserRole userRole = UserRole.fromString(role);
        return roleServiceFactory.getRoleService(userRole).findByEmail(email);
    }

    public long count(String role){
        UserRole userRole = UserRole.fromString(role);
        return roleServiceFactory.getRoleService(userRole).count();
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
        // Verify email exists in the system
        Optional<? extends User> user = Arrays.stream(roleServiceFactory.getAllRoleServices()) // Convert array to Stream
                                            .flatMap(roleService -> roleService.findByEmail(email).stream()) // Flatten results of findByEmail
                                            .findFirst(); // Get the first matching user
    
        if (user.isEmpty()) {
            throw new IllegalArgumentException("Email not found.");
        }
    
        String token = UUID.randomUUID().toString();
    
        passwordResetTokenRepository.deleteByEmail(email); // Delete old tokens for this email
        passwordResetTokenRepository.save(new PasswordResetToken(token, email));
    
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
    

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired reset token."));
    
        if (resetToken.isExpired()) {
            throw new IllegalArgumentException("Reset token has expired.");
        }
    
        Optional<? extends User> user = Arrays.stream(roleServiceFactory.getAllRoleServices()) 
                                            .flatMap(roleService -> roleService.findByEmail(resetToken.getEmail()).stream()) 
                                            .findFirst(); 

        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found.");
        }
        User updatedUser = user.get();
        updatedUser.setPassword(newPassword); 
        roleServiceFactory.getRoleService(updatedUser.getRole()).save(updatedUser);
    
        passwordResetTokenRepository.delete(resetToken);
    }
    
    
}
