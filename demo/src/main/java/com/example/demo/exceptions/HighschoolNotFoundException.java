package com.example.demo.exceptions;

public class HighschoolNotFoundException extends Exception {
    
    public HighschoolNotFoundException(String message) {
        super(message);
    }

    public HighschoolNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
