package com.example.demo.repositories.highschool;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.highschool.Counselor;
import java.util.List;

@Repository
public interface CounselorRepository extends JpaRepository<Counselor, Long>{

    List<Counselor> findById(long id);
}
