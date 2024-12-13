package com.example.demo.services.UsersService;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class RoleServiceFactory {

    private final Map<String, RoleService> roleServiceMap = new HashMap<>();

    public RoleServiceFactory(
        GuideService guideService,
        AdvisorService advisorService,
        CoordinatorService coordinatorService,
        TraineeService traineeService
    ) 
    {
        roleServiceMap.put("guide", guideService);
        roleServiceMap.put("advisor", advisorService);
        roleServiceMap.put("coordinator", coordinatorService);
        roleServiceMap.put("trainee", traineeService);
    }

    public RoleService getRoleService(String role) {
        RoleService service = roleServiceMap.get(role.toLowerCase());
        if (service == null) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }
        return service;
    }

    public RoleService[] getAllRoleServices() {
        return roleServiceMap.values().toArray(new RoleService[0]);
    }
}
