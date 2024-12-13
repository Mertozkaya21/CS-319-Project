package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.event.Tour;
import com.example.demo.entities.event.TourParticipantSurvey;
import java.util.List;
import com.example.demo.entities.highschool.Highschool;

@Repository
public interface TourParticipantSurveyRepository extends JpaRepository<TourParticipantSurvey, Long>{

    List<TourParticipantSurvey> findByTour(Tour tour);
    List<TourParticipantSurvey> findByGuideRate(double guideRate);
    List<TourParticipantSurvey> findByHighschool(Highschool highschool);
    List<TourParticipantSurvey> findByTourSurveyID(long tourSurveyID);
}
