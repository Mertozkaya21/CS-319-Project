package com.cs319.backend.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs319.backend.services.UserManager;
import com.cs319.backend.users.User;

@RestController
@RequestMapping("/public")
public class LoginController {

    @GetMapping("/login")
	public String login(){
        UserManager userManager = new UserManager();
        User newUser = new User("userName","name", "email", "password", "phoneNo", "attribute",
        "city", null, null, null);
        userManager.addUser(newUser);
		return Integer.toString(userManager.doesUserExist("email", "password"));
	}
}
