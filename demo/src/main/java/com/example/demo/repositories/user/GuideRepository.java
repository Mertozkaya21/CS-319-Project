package com.example.demo.repositories.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.user.Guide;
import java.util.List;

@Repository
public interface GuideRepository extends JpaRepository<Guide, Long>{
    List<Guide> findByEmail(String email);
    List<Guide> findByPassword(String password);
    List<Guide> findAllByIdIn(List<Long> ids);
}
