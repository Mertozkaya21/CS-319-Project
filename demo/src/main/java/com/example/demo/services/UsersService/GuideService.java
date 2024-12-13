package com.example.demo.services.UsersService;

import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.User;
import com.example.demo.enums.TourHours;
import com.example.demo.repositories.user.GuideRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class GuideService implements RoleService {

    private final GuideRepository guideRepository;
    private final PasswordEncoder passwordEncoder;

    public GuideService(GuideRepository guideRepository, PasswordEncoder passwordEncoder) {
        this.guideRepository = guideRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Guide save(User user) {
        return guideRepository.save((Guide) user);
    }

    @Override
    public Optional<Guide> findById(Long id) {
        return guideRepository.findById(id);
    }

    @Override
    public List<Guide> findAll() {
        return guideRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        guideRepository.deleteById(id);
    }

    @Override
    public List<Guide> findByEmail(String email) {
        return guideRepository.findByEmail(email);
    }

    @Override
    public long count() {
        return guideRepository.count();
    }

    // I am not sure about the hashmap data structure of the available times slot but 
    // we will see
    public List<Guide> findByAvailableTimes(HashMap<DayOfWeek,TourHours> availableTimes){
        return guideRepository.findByAvailableTimes(availableTimes);
    }

    @Override
    public Optional<Guide> login(String email, String rawPassword) {
        return guideRepository.findByEmail(email)
                .stream()
                .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
                .findFirst();
    }
    
}
