package com.example.demo.controllers;

import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserUpdateDTO;
import com.example.demo.entities.user.User;
import com.example.demo.enums.UserRole;
import com.example.demo.exceptions.EmailAlreadyExistsException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.services.UsersService.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


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

    @PostMapping("/coordinator")
    public ResponseEntity<User> createCoordinator(@RequestBody UserDTO newUserDTO) throws EmailAlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser("COORDINATOR", newUserDTO));
    }

    @PostMapping("/trainee")
    public ResponseEntity<User> createTrainee(@RequestBody UserDTO newUserDTO) throws EmailAlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser("TRAINEE", newUserDTO));
    }

    @PostMapping("/guide")
    public ResponseEntity<User> createGuide(@RequestBody UserDTO newUserDTO) throws EmailAlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser("GUIDE", newUserDTO));
    }

    @PostMapping("/advisor")
    public ResponseEntity<User> createAdvisor(@RequestBody UserDTO userDTO) {
        try {
            String undertakenDay = userDTO.getDay();
            if (undertakenDay == null || undertakenDay.isBlank()) {
                throw new IllegalArgumentException("Undertaken day is required for an Advisor.");
            }

            User savedAdvisor = userService.saveAdvisor(userDTO, undertakenDay);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAdvisor);

        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{role}/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String role, @PathVariable Long id, @RequestBody UserDTO updatedUser) throws EmailAlreadyExistsException {
        return ResponseEntity.ok(userService.saveUser(role, updatedUser));
    }

    @PatchMapping("/{role}/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable String role, 
        @PathVariable Long id, 
        @RequestBody UserUpdateDTO userUpdateDTO) throws UserNotFoundException {
    
        User updatedUser = userService.updateUser(UserRole.fromString(role), id, userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{role}/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String role, @PathVariable Long id) {
        userService.deleteUser(role, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{role}/email/{email}")
    public ResponseEntity<List<? extends User>> findUsersByEmail(@PathVariable String role, @PathVariable String email) {
        return ResponseEntity.ok(userService.findByEmail(role, email));
    }

    @GetMapping("/{role}/count")
    public ResponseEntity<Long> countUsers(@PathVariable String role) {
        return ResponseEntity.ok(userService.count(role));
    }

    @DeleteMapping("/coordinator/{userId}/cancel-event/{eventId}")
    public ResponseEntity<?> cancelEvent(
        @PathVariable Long userId,
        @PathVariable Long eventId,
        @RequestParam String eventType) {
        try {
            userService.cancelEvent(userId, eventId, eventType);
        return ResponseEntity.ok("Event has been successfully canceled.");
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
