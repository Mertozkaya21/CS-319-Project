package com.example.demo.services.applicationformservice.applicationformsorter;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entities.form.ApplicationForm;
import com.example.demo.entities.form.GroupForm;

@Component
public class SortByPriorityScore implements SortStrategy{


        public static double calculatePriorityScore(GroupForm form, 
                                                double w1, double w2, double w3, 
                                                double minLGS, double maxLGS, 
                                                LocalDate earliestSubmissionDate, LocalDate latestSubmissionDate, 
                                                int minDistance, int maxDistance) {
        // LGS% Normalization (Inverse)
        double normalizedLGS;
        if (maxLGS == minLGS) {
            normalizedLGS = 0.5;  // or some default value if no variation
        } else {
            normalizedLGS = 1 - (form.getHighschool().getLgsPercentile() - minLGS) / (maxLGS - minLGS);
        }

        // Submission Time Normalization
        long daysSinceSubmission = LocalDate.now().toEpochDay() - form.getSubmitTimeDate().toEpochDay();
        long maxDaysSinceSubmission = latestSubmissionDate.toEpochDay() - earliestSubmissionDate.toEpochDay();
        double normalizedSubmissionTime;

        if (maxDaysSinceSubmission == 0) {
            normalizedSubmissionTime = 0.5; // or a default value
        } else {
            normalizedSubmissionTime = 1 - (double) daysSinceSubmission / maxDaysSinceSubmission;
        }

        // Distance Normalization
        int distance = form.getHighschool().getCity().getDistanceFromAnkara();
        double normalizedDistance;
        if (maxDistance == minDistance) {
            normalizedDistance = 0.5; // or a default value
        } else {
            normalizedDistance = (double) (distance - minDistance) / (maxDistance - minDistance);
        }
        // Weighted Priority Score
        return (w1 * normalizedLGS) + (w2 * normalizedSubmissionTime) + (w3 * normalizedDistance);
    }

    @Override
    public List<GroupForm> sort(List<GroupForm> applicationForms) {
        double w1 = 0.5; // Weight for LgsPercentile
        double w2 = 0.3; // Weight for SubmissionTime
        double w3 = 0.2; // Weight for Distance

        double minLGS = Double.MAX_VALUE;
        double maxLGS = Double.MIN_VALUE;
        LocalDate earliestDate = LocalDate.MAX;
        LocalDate latestDate = LocalDate.MIN;
        int minDistance = Integer.MAX_VALUE;
        int maxDistance = Integer.MIN_VALUE;

        for (GroupForm form : applicationForms) {
            // LGS Percentile
            double lgsPercentile = form.getHighschool().getLgsPercentile();
            if (lgsPercentile < minLGS) minLGS = lgsPercentile;
            if (lgsPercentile > maxLGS) maxLGS = lgsPercentile;

            // Submit date
            LocalDate submissionDate = form.getSubmitTimeDate();
            if (submissionDate.isBefore(earliestDate)) earliestDate = submissionDate;
            if (submissionDate.isAfter(latestDate)) latestDate = submissionDate;

            // Distance
            int distance = form.getHighschool().getCity().getDistanceFromAnkara();
            if (distance < minDistance) minDistance = distance;
            if (distance > maxDistance) maxDistance = distance;
        }
        for (GroupForm form : applicationForms) {
            form.setPriorityScore(calculatePriorityScore(form, w1, w2, w3, minLGS, maxLGS, earliestDate, latestDate, minDistance, maxDistance));
            form.setSortType("byPriorityScore");
        }
        applicationForms.sort(Comparator.comparingDouble(ApplicationForm::getPriorityScore).reversed());
        return applicationForms;

    }

}
