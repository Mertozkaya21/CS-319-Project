package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entities.user.Advisor;
import com.example.demo.enums.Days;
import com.example.demo.repositories.user.AdvisorRepository;

@Service
public class AdvisorService { //This class is for testing purposes

    private final AdvisorRepository advisorRepository;

    public AdvisorService(AdvisorRepository advisorRepository) {
        this.advisorRepository = advisorRepository;
    }

    public List<Advisor> getAllAdvisors() {
        return advisorRepository.findAll();
    }

    public Advisor getAdvisorById(Long id) {
        return advisorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Advisor not found with ID: " + id));
    }

    public Advisor saveAdvisor(Advisor advisor) {
        return advisorRepository.save(advisor);
    }

    public void deleteAdvisorById(Long id) {
        if (advisorRepository.existsById(id)) {
            advisorRepository.deleteById(id);
        } else {
            throw new RuntimeException("Advisor not found with ID: " + id);
        }
    }

    public List<Advisor> findAdvisorsByName(String name) {
        return advisorRepository.findByName(name);
    }

    public List<Advisor> findAdvisorsByDateAdded(Days dateAdded) {
        return advisorRepository.findByDateAdded(dateAdded);
    }
}

