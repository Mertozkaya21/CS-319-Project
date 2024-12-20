package com.example.demo.services.UsersService;

import com.example.demo.dto.UserUpdateDTO;
import com.example.demo.entities.user.Advisor;
import com.example.demo.entities.user.User;
import com.example.demo.exceptions.UserNotFoundException;
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
        if (userUpdateDTO.getDay() != null) {
            advisor.setUndertakenDay(DayOfWeek.valueOf(userUpdateDTO.getDay()) );
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

    public Advisor getAdvisorByUndertakenDay(DayOfWeek day) {
        List<Advisor> advisors = advisorRepository.findByUndertakenDay(day);

        if (advisors.isEmpty()) {
            throw new IllegalArgumentException("No advisors found for day: " + day);
        }

        return advisors.get(0); 
    }

    @Override
    public Optional<Advisor> login(String email, String rawPassword) {
        return advisorRepository.findByEmail(email)
                .stream()
                .filter(u -> u.getPassword().equals(rawPassword))
                .findFirst();
    }
}
