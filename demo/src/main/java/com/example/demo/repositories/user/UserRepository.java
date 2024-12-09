package com.example.demo.repositories.user;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.User;

public interface UserRepository<T extends User> extends JpaRepository<T, Long>{
    
}
