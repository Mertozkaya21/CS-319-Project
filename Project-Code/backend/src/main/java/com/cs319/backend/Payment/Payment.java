package com.cs319.backend.Payment;

public class Payment {
    private String receiptFullName;
    private int claimedPoints; // What is this one exactly ??
    private double amount; // Payment amount

    public Payment() {
        this.receiptFullName = null;
        this.claimedPoints = 0;
        this.amount = 0.0;
    }

    public Payment(String receiptFullName, int claimedPoints, double amount) {
        this.receiptFullName = receiptFullName;
        this.claimedPoints = claimedPoints;
        this.amount = amount;
    }

    public String getReceiptFullName() {
        return receiptFullName;
    }

    public void setReceiptFullName(String receiptFullName) {
        this.receiptFullName = receiptFullName;
    }

    public int getClaimedPoints() {
        return claimedPoints;
    }

    public void setClaimedPoints(int claimedPoints) {
        this.claimedPoints = claimedPoints;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "receiptFullName='" + receiptFullName + '\'' +
                ", claimedPoints=" + claimedPoints +
                ", amount=" + amount +
                '}';
    }
}
