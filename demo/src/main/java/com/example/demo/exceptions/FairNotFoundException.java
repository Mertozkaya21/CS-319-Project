package com.example.demo.exceptions;

public class FairNotFoundException extends RuntimeException {

    public FairNotFoundException(String message) {
        super(message);
    }

    public FairNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
