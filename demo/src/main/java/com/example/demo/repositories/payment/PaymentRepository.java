package com.example.demo.repositories.payment;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.payment.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

}
