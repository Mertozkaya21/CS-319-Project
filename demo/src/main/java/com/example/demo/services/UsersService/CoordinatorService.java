package com.example.demo.services.UsersService;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.EmailDTO;
import com.example.demo.entities.event.Fair;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.user.Coordinator;
import com.example.demo.entities.user.User;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repositories.event.FairRepository;
import com.example.demo.repositories.event.TourRepository;
import com.example.demo.repositories.user.CoordinatorRepository;
import com.example.demo.services.EmailService;

@Service
public class CoordinatorService implements RoleService{
    
    private final CoordinatorRepository coordinatorRepository;
    private final TourRepository tourRepository;
    private final FairRepository fairRepository;
    private final EmailService emailService;

    public CoordinatorService(CoordinatorRepository repo, TourRepository tourRepository, FairRepository fairRepository, EmailService service) {
        this.coordinatorRepository= repo;
        this.fairRepository = fairRepository;
        this.tourRepository = tourRepository;
        this.emailService = service;
    }

    @Override
    public Coordinator save(User user) {
        return coordinatorRepository.save((Coordinator) user);
    }

    @Override
    public Optional<Coordinator> findById(Long id) {
        return coordinatorRepository.findById(id);
    }

    @Override
    public List<Coordinator> findAll() {
        return coordinatorRepository.findAll();
    }

    @Override
    public boolean deleteById(Long id) {
        Optional<Coordinator> advisor = coordinatorRepository.findById(id);
        if (advisor.isPresent()) {
            coordinatorRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Coordinator> findByEmail(String email) {
        return coordinatorRepository.findByEmail(email);
    }

    @Override
    public long count() {
        return coordinatorRepository.count();
    }

    @Override
    public Optional<Coordinator> login(String email, String rawPassword) {
        return coordinatorRepository.findByEmail(email)
                .stream()
                .filter(u -> u.getPassword().equals(rawPassword))
                .findFirst();
    }

    public void cancelEvent(Long coordinatorId, Long eventId, String eventType) throws UserNotFoundException {
        Coordinator coordinator = findById(coordinatorId)
                .orElseThrow(() -> new UserNotFoundException("Coordinator not found."));

        if (eventType.equalsIgnoreCase("fair")) {
            Fair fair = fairRepository.findById(eventId)
                    .orElseThrow(() -> new IllegalArgumentException("Fair not found."));
            fairRepository.delete(fair);
            sendCancellationEmail(fair.getOrganizerEmail(), fair.getName(), eventType);
            
        } else if (eventType.equalsIgnoreCase("tour")) {
            Tour tour = tourRepository.findById(eventId)
                    .orElseThrow(() -> new IllegalArgumentException("Tour not found."));
            tourRepository.delete(tour);
            sendCancellationEmail(tour.getVisitorSchool().getCounselor().getEmail(), "Tour to " + tour.getVisitorSchool().getName(), eventType);
        } else {
            throw new IllegalArgumentException("Invalid event type: " + eventType);
        }
    }

    private void sendCancellationEmail(String recipientEmail, String eventName, String eventType) {
        EmailDTO emailDetails = new EmailDTO();
        emailDetails.setRecipient(recipientEmail);
        emailDetails.setSubject("Event Cancellation Notification");
        emailDetails.setBody("Dear Institute,\n\nThe " + eventType + " named '" + eventName + "' has been canceled.\n\nRegards,\nBilkent University Coordination Team");

        boolean isSent = emailService.sendSimpleMail(emailDetails);
        if (!isSent) {
            throw new IllegalStateException("Failed to send cancellation email.");
        }
    }
    
}
