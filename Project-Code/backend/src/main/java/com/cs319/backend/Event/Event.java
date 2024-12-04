package com.cs319.backend.event;

import com.cs319.backend.enums.EventStatus;

public class Event {
    private EventStatus eventStatus;
    private int eventID;

    public Event() {
        this.eventStatus = null; 
        this.eventID = -1; // as a sentinal value empty event        
    }

    public Event(EventStatus eventStatus, int eventID) {
        this.eventStatus = eventStatus;
        this.eventID = eventID;
    }

    public EventStatus getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(EventStatus eventStatus) {
        this.eventStatus = eventStatus;
    }

    public int getEventID() {
        return eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }
}
