package com.example.demo.controllers;

import com.example.demo.entities.user.Advisor;
import com.example.demo.enums.Days;
import com.example.demo.services.AdvisorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/advisors")
public class AdvisorController {

    private final AdvisorService advisorService;

    public AdvisorController(AdvisorService advisorService) {
        this.advisorService = advisorService;
    }

    @GetMapping
    public List<Advisor> getAllAdvisors() {
        return advisorService.getAllAdvisors();
    }

    @GetMapping("/{id}")
    public Advisor getAdvisorById(@PathVariable Long id) {
        return advisorService.getAdvisorById(id);
    }

    @PostMapping
    public Advisor saveAdvisor(@RequestBody Advisor advisor) {
        return advisorService.saveAdvisor(advisor);
    }

    @DeleteMapping("/{id}")
    public String deleteAdvisorById(@PathVariable Long id) {
        advisorService.deleteAdvisorById(id);
        return "Advisor with ID " + id + " deleted successfully.";
    }

    @GetMapping("/search")
    public List<Advisor> findAdvisorsByName(@RequestParam String name) {
        return advisorService.findAdvisorsByName(name);
    }

    @GetMapping("/by-date")
    public List<Advisor> findAdvisorsByDateAdded(@RequestParam Days dateAdded) {
        return advisorService.findAdvisorsByDateAdded(dateAdded);
    }
}
