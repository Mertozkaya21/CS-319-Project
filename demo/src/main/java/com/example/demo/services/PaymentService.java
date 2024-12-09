package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entities.payment.Payment;
import com.example.demo.repositories.payment.PaymentRepository;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepo){
        this.paymentRepository = paymentRepo;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment savePayment(Payment aPayment){
        return paymentRepository.save(aPayment);
    }
}
