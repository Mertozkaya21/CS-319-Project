package com.example.demo.services;

import com.example.demo.entities.Notification.Notification;
import com.example.demo.entities.user.User;
import com.example.demo.enums.NotificationType;
import com.example.demo.repositories.Notification.NotificationRepository;
import com.example.demo.services.UsersService.RoleService;
import com.example.demo.services.UsersService.RoleServiceFactory;
import com.example.demo.services.UsersService.UserService;
import com.example.demo.enums.UserRole;
import com.example.demo.exceptions.UserNotFoundException;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserService userService;
    private final RoleServiceFactory roleServiceFactory;

    public NotificationService(NotificationRepository notificationRepository, UserService userService, RoleServiceFactory roleServiceFactory) {
        this.notificationRepository = notificationRepository;
        this.userService = userService;
        this.roleServiceFactory = roleServiceFactory;
    }

    public Notification createNotification(User user, String title, String message, NotificationType type) {
        Notification notification = new Notification();
        notification.setUserId(user.getId());
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        return notificationRepository.save(notification);
    }

    public Notification createNotification(Long userId, String title, String message, NotificationType type) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public void deleteNotification(Long notificationId) {
        if (notificationRepository.existsById(notificationId)) {
            notificationRepository.deleteById(notificationId);
        } else {
            throw new IllegalArgumentException("Notification with ID " + notificationId + " does not exist.");
        }
    }

    public void deleteNotificationsByUserId(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        notificationRepository.deleteAll(notifications);
    }

    public void createNotificationToAllUsersByRole(String role, String message, NotificationType type) {
        UserRole userRole = UserRole.fromString(role.toUpperCase());
        RoleService roleService = roleServiceFactory.getRoleService(userRole);

        List<? extends User> users = roleService.findAll();

        List<Notification> notifications = users.stream()
            .map(user -> {
                Notification notification = new Notification();
                notification.setUserId(user.getId());
                notification.setTitle(generateNotificationTitle(type));
                notification.setMessage(message);
                notification.setType(type);
                return notification;
            })
            .toList();

        notificationRepository.saveAll(notifications);
    }

    public void addNotificationToUser(Long userId, String message, NotificationType type) throws UserNotFoundException {
        User user = userService.getUserById(userId);

        Notification notification = new Notification();
        notification.setUserId(user.getId());
        notification.setTitle(generateNotificationTitle(type));
        notification.setMessage(message);
        notification.setType(type);

        notificationRepository.save(notification);
    }

    public String generateNotificationTitle(NotificationType type) {
        return switch (type) {
            case PENDING_APPLICATION_FORM -> "Pending Application Form Alert";
            case UPCOMING_NOT_ASSIGNED_EVENT -> "Upcoming Event Requires Guides";
            case CONFIRMED_TOUR -> "Tour Confirmation";
            case CANCELLED_EVENT -> "Event Cancellation Notification";
            case NEW_TOUR_CREATED -> "New Tour Created Notification";
            case NEW_FAIR_CREATED -> "New Fair Created Notification";
            case GUIDE_FEEDBACK_RECEIVED -> "Guide Feedback Received";
            case TRAINEE_COMPLETION_REACHED -> "Trainee Promotion Pending";
            case TRAINEE_PROMOTED -> "Trainee is Promoted to Guide";
            case NEW_TRAINEE_ASSIGNED -> "New Trainee Assigned Notification";
            case EVENT_RESCHEDULED -> "Event Reschedule Update";
            case REJECTED_FORM -> "The Application Form Rejected";
            case ACCEPTED_FORM -> "The Application Form Accepted";
            case PASSWORD_RESET -> "The Password is Reset";
        };
    }

    public void notifyCancellation(String entityType, Long entityId, String entityDescription, LocalDate eventDate, List<User> usersToNotify) {
        String message = String.format(
            "The %s (%s) scheduled on %s has been cancelled.",
            entityType,
            entityDescription,
            eventDate
        );
    
        usersToNotify.forEach(user -> {
            try {
                addNotificationToUser(
                    user.getId(),
                    message,
                    NotificationType.CANCELLED_EVENT
                );
            } catch (UserNotFoundException e) {
            }
        });
    }
    
    
}
