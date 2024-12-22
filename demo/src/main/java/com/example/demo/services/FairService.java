package com.example.demo.services;

import com.example.demo.entities.event.Fair;
import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.User;
import com.example.demo.enums.EventStatus;
import com.example.demo.enums.NotificationType;
import com.example.demo.enums.UserRole;
import com.example.demo.exceptions.FairNotFoundException;
import com.example.demo.exceptions.GuideNotFoundException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repositories.event.FairRepository;
import com.example.demo.services.UsersService.GuideService;
import com.example.demo.services.UsersService.RoleServiceFactory;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class FairService {

    private final FairRepository fairRepository;
    private final GuideService guideService;
    private final RoleServiceFactory roleServiceFactory;
    private final NotificationService notificationService;

    public FairService(FairRepository fairRepository, 
                        GuideService guideService, 
                        RoleServiceFactory roleServiceFactory,
                        NotificationService notificationService) {
        this.fairRepository = fairRepository;
        this.guideService = guideService;
        this.roleServiceFactory = roleServiceFactory;
        this.notificationService = notificationService;
    }

    public List<Fair> getAllFairs() {
        return fairRepository.findAll();
    }

    public Fair getFairById(Long id) {
        return fairRepository.findById(id)
            .orElseThrow(() -> new FairNotFoundException("Fair with ID " + id + " not found"));
    }

    public List<Fair> getFairByCity(String city) {
        return fairRepository.findByCity(city);
    }

    public Fair saveFair(Fair fair) {
        return fairRepository.save(fair);
    }

    public Fair upadteFairStatus(Long fairid, EventStatus status) {
        Fair fair = getFairById(fairid);

        switch (status) {
            case ASSIGNED -> {
                if (fair.getGuides() != null && fair.getGuides().size() >= 0) {
                    fair.setStatus(EventStatus.ASSIGNED);
                }
            }
            case COMPLETED -> {
                if (fair.getDate().isBefore(LocalDate.now())) {
                    fair.setStatus(EventStatus.COMPLETED);
                }
            }
            case CANCELLED -> {
                fair.setStatus(EventStatus.CANCELLED);
                notifyCancellation(fair);
            }
            default -> {
                return fair;
            }
        }

        return fairRepository.save(fair);
    }

    public Fair updateFairDate(Long id, LocalDate newDate) {
        Fair fair = getFairById(id);
        fair.setDate(newDate);
        return fairRepository.save(fair);
    }

    public boolean deleteFairById(Long id) {
        if (fairRepository.existsById(id)) {
            Fair fair = getFairById(id);
            notifyCancellation(fair);
            fairRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Fair assignGuideToFair(Long fairId, Long guideId) throws GuideNotFoundException, UserNotFoundException {
        Fair fair = getFairById(fairId);
        Guide guide = guideService.getById(guideId);

        if (fair.getGuides().contains(guide)) {
            throw new GuideNotFoundException("Guide is already assigned to this fair.");
        }

        fair.getGuides().add(guide);

        notificationService.addNotificationToUser(
            guide.getId(),
            "You have been assigned to a fair scheduled on " + fair.getDate(),
            NotificationType.CONFIRMED_TOUR
        );
        
        return fairRepository.save(fair);
    }


    public Fair removeGuideFromFair(Long fairId, Long guideId) throws GuideNotFoundException, UserNotFoundException {
        Fair fair = getFairById(fairId);
        Guide guide = guideService.getById(guideId);

        if (!fair.getGuides().remove(guide)) {
            throw new GuideNotFoundException("Guide with ID " + guide.getId() + " is not assigned to the fair with ID " + fairId);
        }

        notificationService.addNotificationToUser(
            guide.getId(),
            "You have been removed from the fair scheduled on " + fair.getDate(),
            NotificationType.CANCELLED_EVENT
        );

        return fairRepository.save(fair);
    }

    public Fair removeAllGuidesFromFair(Long fairId) {
        Fair fair = getFairById(fairId);
        fair.getGuides().clear();

        fair.getGuides().forEach(guide -> {
            try {
                notificationService.addNotificationToUser(
                    guide.getId(),
                    "You have been removed from the fair scheduled on " + fair.getDate(),
                    NotificationType.CANCELLED_EVENT
                );
            } catch (UserNotFoundException e) {
            }
        });

        return fairRepository.save(fair);
    }
    

    public List<Fair> getFairsByDate(LocalDate date) {
        return fairRepository.findByDate(date);
    }


    public List<Fair> getFairsByDateRange(LocalDate startDate, LocalDate endDate) {
        return fairRepository.findByDateBetween(startDate, endDate);
    }
    
    public List<Object[]> countEventsByMonthAndStatus(EventStatus status) {
        return fairRepository.countEventsByMonthAndStatus(status);
    }


    private void notifyCancellation(Fair fair) {
        List<User> usersToNotify = new ArrayList<>();

        usersToNotify.addAll(roleServiceFactory.getRoleService(UserRole.COORDINATOR).findAll());

        usersToNotify.addAll(fair.getGuides());
        notificationService.notifyCancellation(
            "fair",
            fair.getId(),
            fair.getName(),
            fair.getDate(),
            usersToNotify
        );
    }

}
