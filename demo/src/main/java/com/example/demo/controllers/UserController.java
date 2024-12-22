package com.example.demo.controllers;

import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserUpdateDTO;
import com.example.demo.entities.user.Trainee;
import com.example.demo.entities.user.User;
import com.example.demo.exceptions.EmailAlreadyExistsException;
import com.example.demo.exceptions.InvalidCredentialsException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.services.UsersService.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService service) {
        this.userService = service;
    }

    @GetMapping("/{role}")
    public ResponseEntity<List<? extends User>> getAllUsers(@PathVariable String role) {
        return ResponseEntity.ok(userService.getAllUsers(role));
    }

    @GetMapping("/{role}/{id}")
    public ResponseEntity<? extends User> getUserById(@PathVariable String role, @PathVariable Long id) {
        return  userService.getUserById(role, id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/{role}/email/{email}")
    public ResponseEntity<List<? extends User>> findUsersByEmail(@PathVariable String role, @PathVariable String email) {
        return ResponseEntity.ok(userService.findByEmail(role, email));
    }

    @GetMapping("/{role}/count")
    public ResponseEntity<Long> countUsers(@PathVariable String role) {
        return ResponseEntity.ok(userService.count(role));
    }

    @GetMapping("/advisor/{advisorId}/trainees")
    public ResponseEntity<List<Trainee>> getTraineesByAdvisor(@PathVariable Long advisorId) {
        List<Trainee> trainees = userService.getTraineesByAdvisorId(advisorId);
        return ResponseEntity.ok(trainees);
    }

    @GetMapping("/dropdown/trainees")
    public ResponseEntity<List<Map<Long, String>>> getTraineeNames() {
        return ResponseEntity.ok(userService.getAllUserFullNamesWithIds("trainee"));
    }

    @GetMapping("/dropdown/advisors")
    public ResponseEntity<List<Map<Long, String>>> getAdvisorNames() {
        return ResponseEntity.ok(userService.getAllUserFullNamesWithIds("advisor"));
    }

    @GetMapping("/dropdown/eligibletrainees")
    public ResponseEntity<List<String>> getEligibleTraineeNames() {
        return ResponseEntity.ok(userService.getAllEligibleTraineeFullNamesWithIds());
    }


    @PostMapping("/trainee/{advisorId}") 
    public ResponseEntity<User> createTraineeByAdvisor(@PathVariable Long advisorId, @RequestBody UserDTO userDTO) throws InvalidCredentialsException {
        try {
            User savedTrainee = userService.saveTraineeWithAdvisor(userDTO, advisorId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTrainee);
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.ok().body(null);
        }
    }

    @PostMapping("/{role}")
    public ResponseEntity<User> createUser(
            @PathVariable String role,
            @RequestBody UserDTO userDTO) throws InvalidCredentialsException {
        try {
            if ("ADVISOR".equalsIgnoreCase(role)) {
                String undertakenDay = userDTO.getDay();
                if (undertakenDay == null || undertakenDay.isBlank()) {
                    throw new IllegalArgumentException("Undertaken day is required for an Advisor.");
                }
                User savedAdvisor = userService.saveAdvisor(userDTO, undertakenDay);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedAdvisor);
            } else {
                User savedUser = userService.saveUser(role.toUpperCase(), userDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
            }
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/trainee/{traineeId}/promote")
    public ResponseEntity<?> promoteTraineeToGuide(@PathVariable Long traineeId) throws UserNotFoundException {
        try {
            User newGuide = userService.promoteTraineeToGuide(traineeId);
            return ResponseEntity.ok(newGuide);
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping("/{role}/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable String role,
            @PathVariable Long id,
            @RequestBody UserUpdateDTO userUpdateDTO) throws UserNotFoundException, EmailAlreadyExistsException, InvalidCredentialsException {
        User updatedUser = userService.updateUser(role, id, userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{role}/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String role, @PathVariable Long id) {
        userService.deleteUser(role, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/coordinator/{userId}/cancel-event/{eventId}")
    public ResponseEntity<?> cancelEvent(
        @PathVariable Long userId,
        @PathVariable Long eventId,
        @RequestParam String eventType) throws UserNotFoundException {
        try {
            userService.cancelEvent(userId, eventId, eventType);
        return ResponseEntity.ok("Event has been successfully canceled.");
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/advisor/remove") 
    public ResponseEntity<String> deleteSelectedAdvisors(@RequestBody List<Long> advisorIds) {
        userService.deleteAdvisorsByIds(advisorIds);
        return ResponseEntity.ok("Selected advisors have been removed successfully.");
    }

    @DeleteMapping("/guide/remove")
    public ResponseEntity<String> deleteSelectedGuides(@RequestBody List<Long> guideIds) {
        userService.deleteGuidesByIds(guideIds);
        return ResponseEntity.ok("Selected guides have been removed successfully.");
    }

    @DeleteMapping("/trainee/remove")
    public ResponseEntity<String> deleteSelectedTrainees(@RequestBody List<Long> traineeIds) {
        userService.deleteTraineeByIds(traineeIds);
        return ResponseEntity.ok("Selected trainees have been removed successfully.");
    }
    
}