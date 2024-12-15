package com.example.demo.services.UsersService;

import org.springframework.stereotype.Component;

import com.example.demo.enums.UserRole;

import java.util.HashMap;
import java.util.Map;

@Component
public class RoleServiceFactory {

    private final Map<UserRole, RoleService> roleServiceMap = new HashMap<>();

    public RoleServiceFactory(
        GuideService guideService,
        AdvisorService advisorService,
        CoordinatorService coordinatorService,
        TraineeService traineeService
    ) 
    {
        roleServiceMap.put(UserRole.GUIDE, guideService);
        roleServiceMap.put(UserRole.ADVISOR, advisorService);
        roleServiceMap.put(UserRole.COORDINATOR, coordinatorService);
        roleServiceMap.put(UserRole.TRAINEE, traineeService);
    }

    public RoleService getRoleService(UserRole role) {
        RoleService service = roleServiceMap.get(role);
        if (service == null) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }
        return service;
    }

    public RoleService[] getAllRoleServices() {
        return roleServiceMap.values().toArray(new RoleService[0]);
    }
}
