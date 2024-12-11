package com.example.demo.services.UsersService;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
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
}
