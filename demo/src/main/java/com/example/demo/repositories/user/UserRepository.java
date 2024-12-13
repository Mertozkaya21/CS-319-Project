package com.example.demo.repositories.user;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long>{

    //Optional<User> findByEmail(String email);
}
