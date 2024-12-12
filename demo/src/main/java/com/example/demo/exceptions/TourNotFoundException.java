package com.example.demo.exceptions;

public class TourNotFoundException extends RuntimeException {

    public TourNotFoundException(String message) {
        super(message);
    }

    public TourNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
