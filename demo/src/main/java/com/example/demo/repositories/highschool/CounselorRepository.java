package com.example.demo.repositories.highschool;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.highschool.Counselor;
import java.util.List;

public interface CounselorRepository extends JpaRepository<Counselor, Long>{

    //List<Counselor> findByHighschool(Highschool highschool);
    List<Counselor> findById(long id);
}
