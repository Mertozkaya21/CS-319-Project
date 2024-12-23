package com.example.demo.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.HighschoolDTO;
import com.example.demo.entities.highschool.Highschool;
import com.example.demo.enums.City;
import com.example.demo.enums.TraineeStatus;
import com.example.demo.enums.Department;
import com.example.demo.enums.TourHours;
import com.example.demo.exceptions.HighschoolNotFoundException;
import com.example.demo.services.HighschoolService;

@RestController
@RequestMapping("/v1/highschool")
@CrossOrigin(origins = "http://localhost:3000")
public class HighshcoolController {
    private final HighschoolService highschoolService;

    public HighshcoolController(HighschoolService highschoolService){
        this.highschoolService = highschoolService;
    }

    @GetMapping
    public ResponseEntity<List<Highschool>> getAllHighschools() {
        return ResponseEntity.ok(highschoolService.getAllHighschool());
    }

    @GetMapping("/dropdown/highschools")
    public ResponseEntity<List<String>> getHighSchoolNames() {
        List<String> highSchoolNames = highschoolService.getAllHighschoolNames();
        return ResponseEntity.ok(highSchoolNames);
    }

    @GetMapping("/dropdown/cities")
    public ResponseEntity<List<String>> getCities() {
        List<String> cityList = Arrays.stream(City.values())
                                      .map(Enum::name)
                                      .toList();
        return ResponseEntity.ok(cityList);
    }

    @GetMapping("/dropdown/traineestatus")
    public ResponseEntity<List<String>> getTraineeStatus() {
        List<String> traineeStatus = Arrays.stream(TraineeStatus.values())
                                      .map(TraineeStatus::getDisplayName)
                                      .toList();
        return ResponseEntity.ok(traineeStatus);
    }

    @GetMapping("/dropdown/tourhours")
    public ResponseEntity<List<String>> getTourHours() {
        List<String> tourHours = Arrays.stream(TourHours.values())
                                      .map(Enum::name)
                                      .toList();
        return ResponseEntity.ok(tourHours);
    }

    @GetMapping("/dropdown/departments")
    public ResponseEntity<List<String>> getDepartments() {
        List<String> departments = Arrays.stream(Department.values())
                                         .map(Department::getDisplayName)
                                         .toList();
        return ResponseEntity.ok(departments);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Highschool> getHighschoolByID(@PathVariable Long id) throws HighschoolNotFoundException {
        Highschool highschool = highschoolService.getHighschoolByID(id);
        if (highschool != null) {
            return ResponseEntity.ok(highschool);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    @PostMapping
    public ResponseEntity<Highschool> saveHighschool(@RequestBody HighschoolDTO highschoolDTO) throws HighschoolNotFoundException {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(highschoolService.saveHighschool(highschoolDTO));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Highschool> updateHighschool(@PathVariable Long id, @RequestBody HighschoolDTO highschoolDTO) throws HighschoolNotFoundException {
        return ResponseEntity.ok(highschoolService.updateHighschool(id,highschoolDTO));
    }

    @PatchMapping("/{id}/name")
    public ResponseEntity<Highschool> updateHighschoolName(@PathVariable Long id, @RequestBody Map<String, String> request) throws HighschoolNotFoundException {
        String newName = request.get("name");
        Highschool updatedHighschool = highschoolService.updateHighschoolName(id, newName);
        return ResponseEntity.ok(updatedHighschool);
    }

    @PatchMapping("/{id}/city")
    public ResponseEntity<Highschool> updateHighschoolCity(@PathVariable Long id, @RequestBody Map<String, City> request) throws HighschoolNotFoundException {
        City newCity = request.get("city");
        Highschool updatedHighschool = highschoolService.updateHighschoolCity(id, newCity);
        return ResponseEntity.ok(updatedHighschool);
    }

    @PatchMapping("/{id}/counselor-name")
    public ResponseEntity<Highschool> updateHighschoolCounselorName(@PathVariable Long id, @RequestBody Map<String, String> request) throws HighschoolNotFoundException {
        String newCounselorName = request.get("counselorName");
        Highschool updatedHighschool = highschoolService.updateHighschoolCounselorName(id, newCounselorName);
        return ResponseEntity.ok(updatedHighschool);
    }

    @PatchMapping("/{id}/contact-phone")
    public ResponseEntity<Highschool> updateHighschoolContactPhone(@PathVariable Long id, @RequestBody Map<String, String> request) throws HighschoolNotFoundException {
        String newContactPhone = request.get("contactPhone");
        Highschool updatedHighschool = highschoolService.updateHighschoolContactPhone(id, newContactPhone);
        return ResponseEntity.ok(updatedHighschool);
    }

    @PatchMapping("/{id}/email-address")
    public ResponseEntity<Highschool> updateHighschoolEmailAddress(@PathVariable Long id, @RequestBody Map<String, String> request) throws HighschoolNotFoundException {
        String newEmailAddress = request.get("emailAddress");
        Highschool updatedHighschool = highschoolService.updateHighschoolEmailAddress(id, newEmailAddress);
        return ResponseEntity.ok(updatedHighschool);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHighschool(@PathVariable Long id) {
        try {
            highschoolService.deleteHighschoolById(id);
            return ResponseEntity.ok("Highschool with ID " + id + " has been removed successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Highschool with associated group forms cannot be deleted.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Highschool with ID " + id + " does not exist.");
        }
    }
    
    @DeleteMapping("/remove")
    public ResponseEntity<?> deleteSelectedHighschools(@RequestBody List<Long> highschoolIds) {
        try {
            highschoolService.deleteHighschoolsByIds(highschoolIds);
            return ResponseEntity.ok("Selected highschools have been removed successfully.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Some highschools have associated group forms and cannot be deleted.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request. Some highschool IDs do not exist.");
        }
    }

    
}
