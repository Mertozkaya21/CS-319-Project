package com.example.demo.services.UsersService;

import com.example.demo.dto.EmailDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserUpdateDTO;
import com.example.demo.entities.Auth.PasswordResetToken;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.enums.NotificationType;
import com.example.demo.enums.TraineeStatus;
import com.example.demo.enums.UserRole;
import com.example.demo.exceptions.EmailAlreadyExistsException;
import com.example.demo.exceptions.InvalidCredentialsException;
import com.example.demo.exceptions.LoginException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repositories.Auth.PasswordResetTokenRepository;
import com.example.demo.services.EmailService;
import com.example.demo.services.NotificationService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final RoleServiceFactory roleServiceFactory;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final NotificationService notificationService;


    public UserService(RoleServiceFactory roleServiceFactory , 
                        PasswordResetTokenRepository repo, 
                         EmailService service,
                         NotificationService notificationService) {
        this.roleServiceFactory = roleServiceFactory;
        this.passwordResetTokenRepository = repo;
        this.emailService = service;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.notificationService = notificationService;
    }
    

    public User saveUser(String role, UserDTO newUserDTO) throws EmailAlreadyExistsException, InvalidCredentialsException {
        UserRole userRole = UserRole.fromString(role);

        validateCredentials(newUserDTO);
        checkIfEmailExists(newUserDTO.getEmail());

        newUserDTO.setPassword(passwordEncoder.encode(newUserDTO.getPassword()));

        User user = switch (userRole) {
            case COORDINATOR -> new Coordinator(newUserDTO);
            case GUIDE -> new Guide(newUserDTO);
            case ADVISOR -> throw new IllegalArgumentException("Advisor must be saved with a day.");
            case TRAINEE -> new Trainee(newUserDTO);
        };

        return roleServiceFactory.getRoleService(userRole).save(user);
    }
    

    public User saveAdvisor(UserDTO newUserDTO, String day) throws EmailAlreadyExistsException, InvalidCredentialsException {
        validateCredentials(newUserDTO);
        checkIfEmailExists(newUserDTO.getEmail());
    
        DayOfWeek undertakenDay;
        try {
            undertakenDay = DayOfWeek.valueOf(day.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid day of the week: " + day);
        }

        newUserDTO.setPassword(passwordEncoder.encode(newUserDTO.getPassword()));
        Advisor advisor = new Advisor(newUserDTO, undertakenDay);
        return roleServiceFactory.getRoleService(UserRole.ADVISOR).save(advisor);
    }

    public User saveTraineeWithAdvisor(UserDTO userDTO, Long advisorId) throws EmailAlreadyExistsException, InvalidCredentialsException {
        validateCredentials(userDTO);
        checkIfEmailExists(userDTO.getEmail());
    
        Advisor advisor = (Advisor) roleServiceFactory.getRoleService(UserRole.ADVISOR)
                .findById(advisorId)
                .orElseThrow(() -> new IllegalArgumentException("Advisor not found"));
    
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        Trainee trainee = new Trainee(userDTO);
        trainee.setAdvisor(advisor);
        return roleServiceFactory.getRoleService(UserRole.TRAINEE).save(trainee);
    }

    public User promoteTraineeToGuide(Long traineeId) throws UserNotFoundException {
        TraineeService traineeService = (TraineeService) roleServiceFactory.getRoleService(UserRole.TRAINEE);
        Trainee trainee = traineeService.findById(traineeId)
                        .orElseThrow(() -> new IllegalArgumentException("Trainee not found with ID: " + traineeId));

        if (!traineeService.isEligibleForPromotion(traineeId)) {
            throw new IllegalStateException("Trainee has not completed all required tours.");
        }
    
        Guide newGuide = new Guide();
        newGuide.setFirstName(trainee.getFirstName());
        newGuide.setLastName(trainee.getLastName());
        newGuide.setEmail(trainee.getEmail());
        newGuide.setPassword(passwordEncoder.encode(trainee.getPassword())); // The trainee password is already hashed
        newGuide.setPhoneNo(trainee.getPhoneNo());
        newGuide.setDateAdded(trainee.getDateAdded());
        newGuide.setRole(UserRole.GUIDE);

        notificationService.addNotificationToUser(
            traineeId,
            "Congratulations! You have been promoted to a guide.",
            NotificationType.TRAINEE_PROMOTED
        );

        notificationService.createNotificationToAllUsersByRole(
            "COORDINATOR",
            "Trainee " + trainee.getFirstName() + " " + trainee.getLastName() + " has been promoted to a guide.",
            NotificationType.TRAINEE_PROMOTED
        );

        roleServiceFactory.getRoleService(UserRole.TRAINEE).deleteById(traineeId);
        return roleServiceFactory.getRoleService(UserRole.GUIDE).save(newGuide);
    }
    
    public Trainee updateTraineeStatus(Long traineeId) throws UserNotFoundException {
        TraineeService service = (TraineeService) roleServiceFactory.getRoleService(UserRole.TRAINEE);
        return service.updateTraineeStatus(traineeId);
    }
    

    private void checkIfEmailExists(String email) throws EmailAlreadyExistsException {
        boolean emailExists = Arrays.stream(roleServiceFactory.getAllRoleServices())
                .flatMap(roleService -> roleService.findByEmail(email).stream())
                .findFirst()
                .isPresent();
    
        if (emailExists) {
            throw new EmailAlreadyExistsException("Email already exists: " + email);
        }
    }

    private void validateCredentials(UserDTO userDTO) throws InvalidCredentialsException {
        if (!isValidEmail(userDTO.getEmail())) {
            throw new InvalidCredentialsException("Invalid email. Please use an email address with 'bilkent' in the domain.");
        }
        if (!isValidPassword(userDTO.getPassword())) {
            throw new InvalidCredentialsException("Invalid password. Password must be at least 5 characters.");
        }
    }
    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9._%+-]+@.*bilkent.*\\.[A-Za-z]{2,}$");
    }

    private boolean isValidPassword(String password) {
        return password != null && password.length() >= 5;
    }
    
    public Optional<? extends User> getUserById(String role, Long id) {
        UserRole userRole = UserRole.fromString(role);
        return roleServiceFactory.getRoleService(userRole).findById(id);
    }

    public User getUserById(Long id) throws UserNotFoundException {
        return Arrays.stream(roleServiceFactory.getAllRoleServices())
            .flatMap(roleService -> roleService.findById(id).stream())
            .findFirst()
            .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found."));
    }
    

    public List<? extends User> getAllUsers(String role) {
        UserRole userRole = UserRole.fromString(role);
        return roleServiceFactory.getRoleService(userRole).findAll();
    }

    public List<Map<Long, String>> getAllUserFullNamesWithIds(String role) {
        UserRole userRole = UserRole.fromString(role);
        return roleServiceFactory.getRoleService(userRole)
                                 .findAll()
                                 .stream()
                                 .map(user -> Map.of(
                                     user.getId(),
                                     user.getFirstName() + " " + user.getLastName()
                                 ))
                                 .collect(Collectors.toList());
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
                    .filter(u -> passwordEncoder.matches(rawPassword, u.getPassword())) 
                    .findFirst();
    
            if (user.isPresent()) {
                return user.get();
            }
        }
        throw new LoginException("Invalid email or password.");
    }
    
    public String generateResetToken(String email) {
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
    

    public void resetPassword(String token, String newPassword) throws UserNotFoundException {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired reset token."));
    
        if (resetToken.isExpired()) {
            throw new IllegalArgumentException("Reset token has expired.");
        }
    
        Optional<? extends User> user = Arrays.stream(roleServiceFactory.getAllRoleServices()) 
                                            .flatMap(roleService -> roleService.findByEmail(resetToken.getEmail()).stream()) 
                                            .findFirst(); 
    
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found.");
        }
    
        User updatedUser = user.get();
        updatedUser.setPassword(newPassword); 
        roleServiceFactory.getRoleService(updatedUser.getRole()).save(updatedUser);

        notificationService.addNotificationToUser(
            updatedUser.getId(),
        "Your password has been successfully reset.",
            NotificationType.PASSWORD_RESET
        );
        
        passwordResetTokenRepository.delete(resetToken);
    }

    public User updateUser(String role, Long id, UserUpdateDTO userUpdateDTO) throws UserNotFoundException, EmailAlreadyExistsException, InvalidCredentialsException {
        UserRole userRole = UserRole.fromString(role);
        RoleService roleService = roleServiceFactory.getRoleService(userRole);

        User user = roleService.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found."));

        switch (userRole) {
            case TRAINEE -> {
                updateTraineeFields((Trainee) user, userUpdateDTO);
            }
            case ADVISOR -> {
                updateAdvisorFields((Advisor) user, userUpdateDTO);
            }
            case GUIDE, COORDINATOR -> {
                updateCommonFields(user, userUpdateDTO);
            }
        }

        return roleService.save(user);
    }

    private void updateCommonFields(User user, UserUpdateDTO userUpdateDTO) throws InvalidCredentialsException {
        if (userUpdateDTO.getFirstName() != null) {
            user.setFirstName(userUpdateDTO.getFirstName());
        }
        if (userUpdateDTO.getLastName() != null) {
            user.setLastName(userUpdateDTO.getLastName());
        }
        if (userUpdateDTO.getEmail() != null) {
            if (!isValidEmail(userUpdateDTO.getEmail())) {
                throw new InvalidCredentialsException("Invalid email format.");
            }
            user.setEmail(userUpdateDTO.getEmail());
        }
        if (userUpdateDTO.getPassword() != null) {
            if (!isValidPassword(userUpdateDTO.getPassword())) {
                throw new InvalidCredentialsException("Invalid password format.");
            }
            user.setPassword(passwordEncoder.encode(userUpdateDTO.getPassword()));
        }
        if (userUpdateDTO.getPhoneNo() != null) {
            user.setPhoneNo(userUpdateDTO.getPhoneNo());
        }
    }

    private void updateTraineeFields(Trainee trainee, UserUpdateDTO userUpdateDTO) throws UserNotFoundException, InvalidCredentialsException {
        updateCommonFields(trainee, userUpdateDTO);

        if (userUpdateDTO.getAdvisorId() != null) {
            AdvisorService advisorService = (AdvisorService) roleServiceFactory.getRoleService(UserRole.ADVISOR);
            Advisor advisor = advisorService.findById(userUpdateDTO.getAdvisorId())
                    .orElseThrow(() -> new UserNotFoundException("Advisor not found with ID: " + userUpdateDTO.getAdvisorId()));
            trainee.setAdvisor(advisor);
        }

        if (userUpdateDTO.getStatus() != null) {
            try {
                TraineeStatus status = TraineeStatus.fromString(userUpdateDTO.getStatus());
                trainee.setStatus(status);
            } catch (IllegalArgumentException e) {
                throw new IllegalStateException("Invalid status value: " + userUpdateDTO.getStatus());
            }
        }
    }

    private void updateAdvisorFields(Advisor advisor, UserUpdateDTO userUpdateDTO) throws InvalidCredentialsException {
        updateCommonFields(advisor, userUpdateDTO);

        if (userUpdateDTO.getUndertakenDay() != null) {
            advisor.setUndertakenDay(DayOfWeek.valueOf(userUpdateDTO.getUndertakenDay().toUpperCase()));
        }
    }
    
    public void cancelEvent(Long userId, Long eventId, String eventType) throws UserNotFoundException {
        CoordinatorService roleService = roleServiceFactory.getCoordinatorService();
    
        User user = roleService.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Coordinator not found."));
        
        if (user.getRole() != UserRole.COORDINATOR) {
            throw new IllegalStateException("Only coordinators can cancel events.");
        }
    
        roleService.cancelEvent(userId, eventId, eventType);
    }

    public void deleteAdvisorsByIds(List<Long> advisorIds) {
        RoleService advisorService = roleServiceFactory.getRoleService(UserRole.ADVISOR);
        for (Long id : advisorIds) {
            advisorService.deleteById(id);
        }
    }

    public void deleteGuidesByIds(List<Long> guideIds) {
        RoleService guidService = roleServiceFactory.getRoleService(UserRole.GUIDE);
        for (Long id : guideIds) {
            guidService.deleteById(id);
        }
    }

    public void deleteTraineeByIds(List<Long> traineeIds) {
        RoleService traineeService = roleServiceFactory.getRoleService(UserRole.TRAINEE);
        for(Long id: traineeIds) {
            traineeService.deleteById(id);
        }
    }

    public List<String> getAllEligibleTraineeFullNamesWithIds() {
        TraineeService traineeService = (TraineeService) roleServiceFactory.getRoleService(UserRole.TRAINEE);
        List<String> returnval = traineeService.getAllEligibleTraineeFullNamesWithIds();
        return returnval;
    }

    public List<Trainee> getTraineesByAdvisorId(Long id){
        TraineeService traineeService = (TraineeService) roleServiceFactory.getRoleService(UserRole.TRAINEE);
        return traineeService.findAllByAdvisorId(id);
    }
}
