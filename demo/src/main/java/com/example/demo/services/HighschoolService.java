package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.highschool.Highschool;
import com.example.demo.repositories.highschool.HighschoolRepository;

@Service
public class HighschoolService {
    
    private HighschoolRepository highschoolRepository;

    public HighschoolService(HighschoolRepository hRepository) {
        this.highschoolRepository = hRepository;
    }

    public List<Highschool> getAllHighschool() {
        return highschoolRepository.findAll();
    }

    public Optional<Highschool> getHighschoolByID(long id){
        return highschoolRepository.findById(id);
    }

    public Highschool saveHighschool(Highschool highschool) {
        return highschoolRepository.save(highschool);
    }

    public void deleteHighschoolByID(Long id) {
        highschoolRepository.deleteById(id);
    }
}
