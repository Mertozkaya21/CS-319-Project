package com.cs319.backend.events;

import java.util.Date;
import java.util.List;

public class EventDay {
    private Date date;
    private List<Event> events;

    public EventDay() {
        this.date = null;
        this.events = null;
    }

    public EventDay(Date date, List<Event> events) {
        this.date = date;
        this.events = events;
    }

    // Getters and Setters
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
}
