package com.example.demo.repositories.user;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.Guide;
import java.util.List;
import com.example.demo.enums.TourHours;

import java.time.DayOfWeek;
import java.util.HashMap;


public interface GuideRepository extends JpaRepository<Guide, Long>{
    
    List<Guide> findByAvailableTimes(HashMap<DayOfWeek,TourHours> availableTimes);
    List<Guide> findByEmail(String email);
    List<Guide> findByPassword(String password);
    
}
