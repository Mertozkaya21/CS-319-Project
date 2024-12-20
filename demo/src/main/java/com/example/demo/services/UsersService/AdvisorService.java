package com.example.demo.services.UsersService;

import com.example.demo.dto.UserUpdateDTO;
import com.example.demo.entities.event.Tour;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.User;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repositories.event.TourRepository;
import com.example.demo.repositories.user.AdvisorRepository;

import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Service
public class AdvisorService implements RoleService {

    private final AdvisorRepository advisorRepository;
    private final TourRepository tourRepository;

    public AdvisorService(AdvisorRepository advisorRepository,
                            TourRepository tourRepository) {
        this.advisorRepository = advisorRepository;
        this.tourRepository = tourRepository;
    }

    @Override
    public Advisor save(User user) {
        return advisorRepository.save((Advisor) user);
    }

    public Advisor updateAdvisor(Long id, UserUpdateDTO userUpdateDTO) throws UserNotFoundException {
        Advisor advisor = advisorRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("Advisor with ID " + id + " not found."));
        if (userUpdateDTO.getFirstName() != null) {
            advisor.setFirstName(userUpdateDTO.getFirstName());
        }
        if (userUpdateDTO.getLastName() != null) {
            advisor.setLastName(userUpdateDTO.getLastName());
        }
        if (userUpdateDTO.getEmail() != null) {
            advisor.setEmail(userUpdateDTO.getEmail());
        }
        if (userUpdateDTO.getPhoneNo() != null) {
            advisor.setPhoneNo(userUpdateDTO.getPhoneNo());
        }
        if (userUpdateDTO.getUndertakenDay() != null) {
            advisor.setUndertakenDay(DayOfWeek.valueOf(userUpdateDTO.getUndertakenDay()) );
        }
        return advisorRepository.save(advisor);
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
    public boolean deleteById(Long id) {
        Optional<Advisor> advisor = advisorRepository.findById(id);
        if (advisor.isPresent()) {
            advisorRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Advisor> findByEmail(String email) {
        return advisorRepository.findByEmail(email);
    }

    @Override
    public long count() {
        return advisorRepository.count();
    }

    public Advisor getAdvisorByUndertakenDay(DayOfWeek day) throws UserNotFoundException {
        List<Advisor> advisors = advisorRepository.findByUndertakenDay(day);

        if (advisors.isEmpty()) {
            throw new UserNotFoundException("No advisors found for day: " + day);
        }

        return advisors.get(0); 
    }

    public List<Tour> assignToursToAdvisors() {
        List<Advisor> advisors = advisorRepository.findAll();
        List<Tour> tours = tourRepository.findAll();

        for (Tour tour : tours) {
            DayOfWeek tourDay = tour.getDate().getDayOfWeek();

            for (Advisor advisor : advisors) {
                if (advisor.getUndertakenDay() == tourDay) {
                    tour.setAdvisor(advisor);
                    tourRepository.save(tour); // Save the tour with the assigned advisor
                    break;
                }
            }
        }

        return tours; 
    }
    

    @Override
    public Optional<Advisor> login(String email, String rawPassword) {
        return advisorRepository.findByEmail(email)
                .stream()
                .filter(u -> u.getPassword().equals(rawPassword))
                .findFirst();
    }
}
