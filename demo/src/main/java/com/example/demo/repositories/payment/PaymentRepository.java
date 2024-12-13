package com.example.demo.repositories.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.payment.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{

}
