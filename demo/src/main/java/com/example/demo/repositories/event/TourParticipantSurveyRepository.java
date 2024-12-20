package com.example.demo.repositories.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.event.Tour;
import com.example.demo.entities.event.TourParticipantSurvey;
import java.util.List;
import java.util.Map;

import com.example.demo.entities.highschool.Highschool;

@Repository
public interface TourParticipantSurveyRepository extends JpaRepository<TourParticipantSurvey, Long>{

    List<TourParticipantSurvey> findByTour(Tour tour);
    List<TourParticipantSurvey> findByGuideRate(double guideRate);
    List<TourParticipantSurvey> findByHighschool(Highschool highschool);
    List<TourParticipantSurvey> findByTourSurveyID(long tourSurveyID);

    List<TourParticipantSurvey> findByTour_Id(Long tourId);
    List<TourParticipantSurvey> findByGuide_Id(Long guideId);

    @Query("SELECT COUNT(t) FROM TourParticipantSurvey t")
    Long getTotalSurveys();

    @Query("SELECT COUNT(DISTINCT t.highschool.id) FROM TourParticipantSurvey t")
    Long countUniqueHighschools();

    // @Query("SELECT t.nameOfDepartment as department, COUNT(t) as count " +
    //        "FROM TourParticipantSurvey t GROUP BY t.nameOfDepartment")
    // List<Map<String, Object>> getDepartmentDistribution();
}
