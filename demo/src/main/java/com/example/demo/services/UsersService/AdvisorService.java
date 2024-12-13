package com.example.demo.services.UsersService;

import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.User;
import com.example.demo.repositories.user.AdvisorRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Service
public class AdvisorService implements RoleService {

    private final AdvisorRepository advisorRepository;

    public AdvisorService(AdvisorRepository advisorRepository) {
        this.advisorRepository = advisorRepository;
    }

    @Override
    public Advisor save(User user) {
        return advisorRepository.save((Advisor) user);
    }

    @Override
    public Optional<Advisor> findById(Long id) {
        return advisorRepository.findById(id);
    }

    @Override
    public List<Advisor> findAll() {
        return advisorRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        advisorRepository.deleteById(id);
    }

    @Override
    public List<Advisor> findByEmail(String email) {
        return advisorRepository.findByEmail(email);
    }

    @Override
    public long count() {
        return advisorRepository.count();
    }

    public Long getAdvisorIdByUndertakenDay(DayOfWeek day){
        Advisor advisor = advisorRepository.findByUndertakenDays(day);
        if(advisor!=null)
            return advisor.getId();
        else
            return -1L;
    }
}
