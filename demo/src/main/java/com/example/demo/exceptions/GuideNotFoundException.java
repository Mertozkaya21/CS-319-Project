package com.example.demo.exceptions;

public class GuideNotFoundException extends Exception {
    
    public GuideNotFoundException() {
        super("Guide is not assigned to this tour.");
    }

    public GuideNotFoundException(String message) {
        super(message);
    }

    public GuideNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public GuideNotFoundException(Throwable cause) {
        super(cause);
    }
}
