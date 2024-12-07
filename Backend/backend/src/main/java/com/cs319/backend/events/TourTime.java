package com.cs319.backend.events;

import java.util.Date;

import com.cs319.backend.enums.TourHours;

public class TourTime {
    private TourHours tourHours; // This is an enumeration
    private Date date;

    public TourTime() {
        this.tourHours = null;
        this.date = null;
    }

    public TourTime(TourHours tourHours, Date date) {
        this.tourHours = tourHours;
        this.date = date;
    }

    public TourHours getTourHours() {
        return tourHours;
    }

    public void setTourHours(TourHours tourHours) {
        this.tourHours = tourHours;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
