package com.cs319.backend.event;

import java.util.Date;

import com.cs319.backend.enums.EventStatus;

public class Fair extends Event {
    private String name;
    private Date localDate;
    private String address;
    private String city;
    private String organizerName;
    private String organizerPhone;
    private String organizerEmail;

    public Fair() {
        super(); // Call default constructor of Event
        this.name = null;
        this.localDate = null;
        this.address = null;
        this.city = null;
        this.organizerName = null;
        this.organizerPhone = null;
        this.organizerEmail = null;
    }

    public Fair(EventStatus eventStatus, int eventID, String name, Date localDate, String address, String city, String organizerName, String organizerPhone, String organizerEmail) {
        super(eventStatus, eventID); // Call parameterized constructor of Event
        this.name = name;
        this.localDate = localDate;
        this.address = address;
        this.city = city;
        this.organizerName = organizerName;
        this.organizerPhone = organizerPhone;
        this.organizerEmail = organizerEmail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getLocalDate() {
        return localDate;
    }

    public void setLocalDate(Date localDate) {
        this.localDate = localDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getOrganizerName() {
        return organizerName;
    }

    public void setOrganizerName(String organizerName) {
        this.organizerName = organizerName;
    }

    public String getOrganizerPhone() {
        return organizerPhone;
    }

    public void setOrganizerPhone(String organizerPhone) {
        this.organizerPhone = organizerPhone;
    }

    public String getOrganizerEmail() {
        return organizerEmail;
    }

    public void setOrganizerEmail(String organizerEmail) {
        this.organizerEmail = organizerEmail;
    }
}
