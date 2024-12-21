package com.example.demo.services.UsersService;

import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.User;
import com.example.demo.exceptions.GuideNotFoundException;
import com.example.demo.repositories.user.GuideRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuideService implements RoleService {

    private final GuideRepository guideRepository;

    public GuideService(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
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
    public boolean deleteById(Long id) {
        Optional<Guide> advisor = guideRepository.findById(id);
        if (advisor.isPresent()) {
            guideRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Guide> findByEmail(String email) {
        return guideRepository.findByEmail(email);
    }

    @Override
    public long count() {
        return guideRepository.count();
    }

    @Override
    public Optional<Guide> login(String email, String rawPassword) {
        return guideRepository.findByEmail(email)
                .stream()
                .filter(u -> u.getPassword().equals(rawPassword))
                .findFirst();
    }

    public void updateGuideAverageRating(Long guideId) throws GuideNotFoundException {
        Guide guide = guideRepository.findById(guideId)
                .orElseThrow(() -> new GuideNotFoundException("Guide with ID " + guideId + " not found."));
        
        guide.updateAverageRating();
        guideRepository.save(guide);
    }

    public List<Guide> findAllByIds(List<Long> guideIds) {
        return guideRepository.findAllByIdIn(guideIds);
    }
    
}
