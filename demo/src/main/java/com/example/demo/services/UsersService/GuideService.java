package com.example.demo.services.UsersService;

import com.example.demo.entities.user.Guide;
import com.example.demo.entities.user.User;
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
    public void deleteById(Long id) {
        guideRepository.deleteById(id);
    }
}
