package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.repositories.payment.PaymentRepository;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepo){
        this.paymentRepository = paymentRepo;
    }
}
