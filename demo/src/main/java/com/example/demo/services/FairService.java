package com.example.demo.services;

import com.example.demo.entities.event.Fair;
import com.example.demo.exceptions.FairNotFoundException;
import com.example.demo.repositories.event.FairRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FairService {
    private final FairRepository fairRepository;

    public FairService(FairRepository fairRepository) {
        this.fairRepository = fairRepository;
    }

    public List<Fair> getAllFairs() {
        return fairRepository.findAll();
    }

    public Fair getFairById(Long id) {
        return fairRepository.findById(id)
                .orElseThrow(() -> new FairNotFoundException("Fair with ID " + id + " not found"));
    }

    public Fair saveFair(Fair fair) {
        return fairRepository.save(fair);
    }

    // I do not think that it is logical to update an existing fair 
    public Fair updateFair(Long id, Fair updatedFair) {
        Fair existingFair = getFairById(id);
        updatedFair.setId(existingFair.getId());
        return fairRepository.save(updatedFair);
    }

    public void deleteFairById(Long id) {
        Fair fair = getFairById(id);
        fairRepository.delete(fair);
    }

    public boolean existsById(Long id) {
        return fairRepository.existsById(id);
    }

}
