package com.example.demo.repositories.user;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.user.Guide;
import java.util.List;
import com.example.demo.enums.TourHours;
import java.util.HashMap;
import com.example.demo.enums.Days;


public interface GuideRepository extends JpaRepository<Guide, Long>{
    
    List<Guide> findByAvailableTimes(HashMap<Days,TourHours> availableTimes);
}
